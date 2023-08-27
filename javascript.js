const MAX_NUM_LENGTH = 20;
const DIVISION_BY_ZERO_ERROR = 'Cannot divide by zero';
const INFINITY = 'inf';

const display = document.querySelector('.display');

let currentSign = '+';
let currentOp = '';

let digitCount = 1;

const nums = document.querySelectorAll('.num');

nums.forEach((num) => {
    num.addEventListener('click', processNumber);
});

function processNumber() {
    const digit = this.textContent;
    if (currentOp === '') {
        if (display.textContent === '0' ||
            display.textContent === DIVISION_BY_ZERO_ERROR) {
            display.textContent = digit;
        } else if (digitCount < MAX_NUM_LENGTH) {
            display.textContent += digit;
            digitCount++;
        }
    }
}

const sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (display.textContent !== '0' &&
        display.textContent !== DIVISION_BY_ZERO_ERROR) {
        if (currentSign === '+') {
            display.textContent = '-' + display.textContent;
            currentSign = '-';
        } else {
            display.textContent = display.textContent.substring(1);
            currentSign = '+';
        }
    }
});

const dot = document.querySelector('.dot');
dot.addEventListener('click', () => {
    if(display.textContent !== DIVISION_BY_ZERO_ERROR &&
        !display.textContent.includes('.')) {
        display.textContent += '.';
    }
});

const clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
    display.textContent = 0;
    digitCount = 1;
    currentSign = '+';
    currentOp = '';
});

const back = document.querySelector('.back');
back.addEventListener('click', () => {
    if (display.textContent === DIVISION_BY_ZERO_ERROR ||
        display.textContent.length === 1 ||
        (display.textContent.length === 2 &&
            display.textContent[0] === '-') ||
        (display.textContent.length === 3 &&
            display.textContent[0] === '-' &&
            display.textContent[1] === '0')) {
        display.textContent = 0;
        digitCount = 1;
        currentSign = '+';
    } else {
        if (display.textContent.slice(-1) !== '.') {
            digitCount--;
        }
        display.textContent = display.textContent.slice(0, -1);
    }
});

const invert = document.querySelector('.invert');
invert.addEventListener('click', () => {
    if (display.textContent !== DIVISION_BY_ZERO_ERROR) {
        const num = parseFloat(display.textContent);
        if (num === 0) {
            display.textContent = DIVISION_BY_ZERO_ERROR;
        } else {
            display.textContent = truncate(1 / num);
        }
    }
});

function truncate(num) {
    let stringForm = handleSmallScientificNotation(num.toString());
    let nonDigitCount = 0;
    if (stringForm.includes('.')) {
        nonDigitCount++;
    }
    if (stringForm.includes('-')) {
        nonDigitCount++;
    }
    if (stringForm.length - nonDigitCount <= MAX_NUM_LENGTH) {
        return stringForm;
    }
    let dotIndex = stringForm.indexOf('.');
    if (dotIndex >= 0) {
        let digitsToLeft = stringForm.includes('-') ? dotIndex - 1: dotIndex;
        if (digitsToLeft > MAX_NUM_LENGTH) {
            return stringForm.includes('-') ? '-' + INFINITY : INFINITY;
        }
        let truncatedNum = num.toFixed(MAX_NUM_LENGTH - digitsToLeft);
        return truncatedNum;
    }
    if (nonDigitCount === 1) {
        if (stringForm.substring(1).length > MAX_NUM_LENGTH) {
            return '-' + INFINITY;
        }
        return num;
    } else if (stringForm.length > MAX_NUM_LENGTH) {
        return INFINITY;
    }
    return num;
}

function handleSmallScientificNotation(string) {
    if (!string.includes('e')) return string;
    let eIdx = string.indexOf('e');
    let spotsToMoveOver = +string.slice(eIdx + 2);
    let result = string[0] === '-' ? '-0.' : '0.';
    for (let i = 0; i < spotsToMoveOver - 1; i++) {
        result += '0';
    }
    if (string[0] !== '-') {
        return result + string[0] + string.substring(2, eIdx);
    }
    return result + string[1] + string.substring(3, eIdx);
}