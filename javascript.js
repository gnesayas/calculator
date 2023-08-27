const MAX_NUM_LENGTH = 20;
const DIVISION_BY_ZERO_ERROR = 'Cannot divide by zero';

const history = document.querySelector('.history');
const display = document.querySelector('.display');

let leftOperand = '';
let currentOp = '';
let justClickedOp = false;

let digitCount = 1;

const nums = document.querySelectorAll('.num');

nums.forEach((num) => {
    num.addEventListener('click', processNumber);
});

function processNumber() {
    const digit = this.textContent;
    if (display.textContent === '0' ||
        display.textContent === DIVISION_BY_ZERO_ERROR ||
        justClickedOp) {
        display.textContent = digit;
    } else if (digitCount < MAX_NUM_LENGTH) {
        display.textContent += digit;
        digitCount++;
    }
    justClickedOp = false;
}

const sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (display.textContent !== '0' &&
        display.textContent !== DIVISION_BY_ZERO_ERROR) {
        if (display.textContent[0] !== '-') {
            display.textContent = '-' + display.textContent;
        } else {
            display.textContent = display.textContent.substring(1);
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
    history.textContent = '';
    display.textContent = 0;
    digitCount = 1;
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
        display.textContent = divide(1, display.textContent);
    }
});

const div = document.querySelector('.div');
div.addEventListener('click', () => {
    if (display.textContent !== DIVISION_BY_ZERO_ERROR) {
        currentOp = '/';
        if (!history.textContent) {
            leftOperand = display.textContent;
            history.textContent = `${leftOperand} ${currentOp}`;
        } else if (!justClickedOp) {
            display.textContent = divide(leftOperand, display.textContent);
            leftOperand = display.textContent;
            history.textContent = `${display.textContent} ${currentOp}`;
        }
        justClickedOp = true;
    }
});

function divide(num1, num2) {
    const operandOne = parseFloat(num1);
    const operandTwo = parseFloat(num2);
    if (operandTwo === 0) {
        return DIVISION_BY_ZERO_ERROR;
    }
    return operandOne / operandTwo;
}

function multiply(num1, num2) {
    const operandOne = parseFloat(num1);
    const operandTwo = parseFloat(num2);
    return operandOne * operandTwo;
}

function subtract(num1, num2) {
    const operandOne = parseFloat(num1);
    const operandTwo = parseFloat(num2);
    return operandOne - operandTwo;
}

function add(num1, num2) {
    const operandOne = parseFloat(num1);
    const operandTwo = parseFloat(num2);
    return operandOne + operandTwo;
}