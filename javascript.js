const MAX_NUM_LENGTH = 23;
const DIVISION_BY_ZERO_ERROR = 'Cannot divide by zero';
const NUM_KEYS = '0123456789';
const OP_KEYS = '/*-+';

const history = document.querySelector('.history');
const display = document.querySelector('.display');

let operator = '';
let leftOperand = '';
let rightOperand = '';
let justClickedOperator = false;
let justEvaluated = false;

let digitCount = 1;

document.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (NUM_KEYS.includes(e.key)) {
        processNumber(e.key);
    } else if (e.key === '.') {
        addDecimal();
    } else if (e.key === 'Escape') {
        reset();
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
        goBack();
    } else if (OP_KEYS.includes(e.key)) {
        if (e.key === '*') {
            processOperation('x');
        } else {
            processOperation(e.key);
        }
    } else if (e.key === 'Enter' || e.key === '=') {
        processEvaluation();
    }
});

const nums = document.querySelectorAll('.num');

nums.forEach((num) => {
    num.addEventListener('click', processNumber);
});

function processNumber(key) {
    const digit = this.textContent ? this.textContent : key;
    if (display.textContent === DIVISION_BY_ZERO_ERROR) {
        history.textContent = '';
        display.textContent = digit;
        digitCount = 1;
    } else if (display.textContent === '0' || justClickedOperator) {
        display.textContent = digit;
        digitCount = 1;
    } else if (digitCount < MAX_NUM_LENGTH) {
        display.textContent += digit;
        digitCount++;
    }
    justClickedOperator = false;
    rightOperand = '';
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
dot.addEventListener('click', addDecimal);

function addDecimal() {
    if (display.textContent === DIVISION_BY_ZERO_ERROR) return;
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

const clear = document.querySelector('.clear')
clear.addEventListener('click', reset);

function reset() {
    history.textContent = '';
    display.textContent = 0;
    digitCount = 1;
    operator = '';
    leftOperand = '';
    rightOperand = '';
    justClickedOperator = false;
    justEvaluated = false;
}

const back = document.querySelector('.back');
back.addEventListener('click', goBack);

function goBack() {
    if (justClickedOperator || justEvaluated) return;
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
}

const invert = document.querySelector('.invert');
invert.addEventListener('click', () => {
    if (display.textContent === DIVISION_BY_ZERO_ERROR) return;
    display.textContent = divide(1, display.textContent);
    leftOperand = display.textContent;
    justClickedOperator = false;
    justEvaluated = true;
});

const square = document.querySelector('.square');
square.addEventListener('click', () => {
    if (display.textContent === DIVISION_BY_ZERO_ERROR) return;
    display.textContent = multiply(display.textContent, display.textContent);
    leftOperand = display.textContent;
    justClickedOperator = false;
    justEvaluated = true;
});

const root = document.querySelector('.root');
root.addEventListener('click', () => {
    if (display.textContent === DIVISION_BY_ZERO_ERROR) return;
    display.textContent = Math.sqrt(display.textContent);
    leftOperand = display.textContent;
    justClickedOperator = false;
    justEvaluated = true;
});

const div = document.querySelector('.div');
div.addEventListener('click', processOperation);

const mult = document.querySelector('.mult');
mult.addEventListener('click', processOperation);

const sub = document.querySelector('.sub');
sub.addEventListener('click', processOperation);

const addition = document.querySelector('.addition');
addition.addEventListener('click', processOperation);

const eval = document.querySelector('.eval');
eval.addEventListener('click', processEvaluation);

function processOperation(key) {
    if (display.textContent === DIVISION_BY_ZERO_ERROR) return;
    let currentOp = this.textContent ? this.textContent : key;
    if (justEvaluated || !history.textContent) {
        operator = currentOp;
        leftOperand = display.textContent;
        history.textContent = `${leftOperand} ${operator}`;
    } else if (!justClickedOperator) {
        rightOperand = display.textContent;
        display.textContent = operate(operator, leftOperand, rightOperand);
        if (display.textContent !== DIVISION_BY_ZERO_ERROR) {
            operator = currentOp;
            leftOperand = display.textContent;
            history.textContent = `${display.textContent} ${currentOp}`;
        } else {
            history.textContent += ' 0 /';
        }
    } else if (operator !== currentOp) {
        operator = currentOp;
        history.textContent = history.textContent.slice(0, -1) + currentOp;
    }
    justClickedOperator = true;
    justEvaluated = false;
}

function processEvaluation() {
    if (display.textContent === DIVISION_BY_ZERO_ERROR ||
        !operator || !leftOperand) return;
    if (!rightOperand || justClickedOperator) {
        rightOperand = display.textContent;
    }
    display.textContent = operate(operator, leftOperand, rightOperand);
    if (display.textContent !== DIVISION_BY_ZERO_ERROR) {
        leftOperand = display.textContent;
        history.textContent = `${leftOperand} ${operator} ${rightOperand}`;
    } else {
        history.textContent += ' 0 /';
    }
    justEvaluated = true;
    justClickedOperator = false;
}

function operate(operator, num1, num2) {
    if (operator === '/') {
        return divide(num1, num2);
    } else if (operator === 'x') {
        return multiply(num1, num2);
    } else if (operator === '-') {
        return subtract(num1, num2);
    }
    return add(num1, num2);
}

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