//Typing the number

    // Select the bar
const calBar = document.querySelector('.cal-bar');

    //Type a number
const numberButtons = document.querySelectorAll('.button.number');

    //Storing the input
let currentInput = '';

    //Update the bar
function updateCalBar() {
    calBar.textContent = currentInput || '0';
}

    //Input
function inputNumber(number) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    currentInput += number;
    updateCalBar();
}

    //Get the number on click
numberButtons.forEach(button => {
    button.addEventListener('click', function() {
        const number = this.textContent;
        inputNumber(number);
    });
});

//Typing the number

//Reset

const resetButtons = document.querySelector('.delete')

    //Reset on click
resetButtons.addEventListener('click', function() {
    currentInput = '';
    updateCalBar();
})

//Reset

//Operations

const operateButtons = document.querySelectorAll('.operate');
const equalButton = document.getElementById('equal');

let currentOperation = null;
let firstOperand = null;
let resultDisplayed = false;

function inputOperation(operation) {
    if (currentOperation !== null) {
        performOperation();
    }
    if (!resultDisplayed) {
        firstOperand = parseFloat(currentInput);
        currentInput = '';
    }

    currentOperation = operation;
}

operateButtons.forEach(button => {
    button.addEventListener('click', () => {
        inputOperation(button.id);
    });
});

equalButton.addEventListener('click', () => {
    if (currentOperation !== null) {
        performOperation();
    }
});

function performOperation() {
    const secondOperand = parseFloat(currentInput);
    let result;
    switch (currentOperation) {
    //Addition
        case 'plus':
            result = firstOperand + secondOperand;
            break;
    //Subtraction
        case 'minus':
            result = firstOperand - secondOperand;
            break;
    //Multiplication
        case 'mul':
            result = firstOperand * secondOperand;
            break;
    //Division
        case 'div':
            result = firstOperand / secondOperand;
            break;
    //Percentage
        case 'percentage':
            result = firstOperand / 100;
            firstOperand = result;
            break;
    //Plus or Minus
        case 'plus-minus':
            result = firstOperand * -1;
            firstOperand = result;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    currentOperation = null;
    resultDisplayed = true;
    updateCalBar();
}

//Operations