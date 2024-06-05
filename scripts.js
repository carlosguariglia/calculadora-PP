let currentOperand = '';
let previousOperand = '';
let operation = null;
let memory = 0;
let history = [];

document.addEventListener('DOMContentLoaded', () => {
    const numberButtons = document.querySelectorAll('[data-number]');
    const operatorButtons = document.querySelectorAll('[data-operator]');
    const equalButton = document.getElementById('equal');
    const clearButton = document.getElementById('clear');
    const memoryStoreButton = document.getElementById('memory-store');
    const memoryRecallButton = document.getElementById('memory-recall');
    const memoryClearButton = document.getElementById('memory-clear');
    const themeToggleButton = document.getElementById('theme-toggle');

    numberButtons.forEach(button => {
        button.addEventListener('click', () => appendNumber(button.dataset.number));
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => chooseOperation(button.dataset.operator));
    });

    equalButton.addEventListener('click', calculate);
    clearButton.addEventListener('click', clearDisplay);
    memoryStoreButton.addEventListener('click', memoryStore);
    memoryRecallButton.addEventListener('click', memoryRecall);
    memoryClearButton.addEventListener('click', memoryClear);
    themeToggleButton.addEventListener('click', toggleTheme);

    document.addEventListener('keydown', handleKeyDown);
});

function appendNumber(number) {
    if (currentOperand.includes('.') && number === '.') return;
    currentOperand = currentOperand.toString() + number.toString();
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    addHistory(`${previousOperand} ${operation} ${currentOperand} = ${computation}`);
    currentOperand = computation;
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function updateDisplay() {
    const display = document.getElementById('display');
    display.innerText = currentOperand;
}

function memoryStore() {
    memory = parseFloat(currentOperand);
}

function memoryRecall() {
    currentOperand = memory.toString();
    updateDisplay();
}

function memoryClear() {
    memory = 0;
}

function addHistory(entry) {
    history.push(entry);
    updateHistory();
}

function updateHistory() {
    const historyDisplay = document.getElementById('history');
    historyDisplay.innerHTML = history.join('<br>');
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function handleKeyDown(event) {
    if (event.key >= 0 && event.key <= 9) {
        appendNumber(event.key);
    }
    if (event.key === '.') {
        appendNumber(event.key);
    }
    if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
        chooseOperation(event.key);
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculate();
    }
    if (event.key === 'Escape') {
        clearDisplay();
    }
}
