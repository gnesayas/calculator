const result = document.querySelector('.result');

let currentSign = '+';
let currentOp = '';

const sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (result.textContent !== '0') {
        if (currentSign === '+') {
            result.textContent = '-' + result.textContent;
            currentSign = '-';
        } else {
            result.textContent = result.textContent.substring(1);
            currentSign = '+';
        }
    }
});

const dot = document.querySelector('.dot');
dot.addEventListener('click', () => {
    if(!result.textContent.includes('.')) {
        result.textContent += '.';
    }
});

const clear = document.querySelector('.clear')
clear.addEventListener('click', () => {
    result.textContent = 0;
    currentSign = '+';
    currentOp = '';
});

const back = document.querySelector('.back');
back.addEventListener('click', () => {
    if (result.textContent.length === 1 ||
        (result.textContent.length === 2 &&
            result.textContent[0] === '-') ||
        (result.textContent.length === 3 &&
            result.textContent[0] === '-' &&
            result.textContent[1] === '0')) {
        result.textContent = 0;
        currentSign = '+';
    } else {
        result.textContent = result.textContent.slice(0, -1);
    }
});

const nums = document.querySelectorAll('.num');

nums.forEach((num) => {
    num.addEventListener('click', processNumber);
});

function processNumber() {
    const digit = this.textContent;
    if (currentOp === '') {
        if (result.textContent === '0') {
            result.textContent = digit;
        } else {
            result.textContent += digit;
        }
    }
}