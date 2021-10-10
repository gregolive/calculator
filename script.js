/* 
VARIABLES AND CONSTANTS
*/
let outputNum = "";
let operationArray = [];
let storedOperator = "";
let doubleOperatorCheck = "";

const display = document.querySelector('.output');
const topLine = document.querySelector('.topline');
const numBtns = Array.from(document.querySelectorAll('.num'));
const decimalBtn = document.querySelector('.decimal');
const operatorBtns = Array.from(document.querySelectorAll('.operator'));
const equal = document.querySelector('.equal');
const clear = document.querySelector('.clr');
const del = document.querySelector('.del');

display.textContent = 0; // display initial value of 0

/* 
WATCH FOR BUTTON CLICK INPUT
*/

// 1) NUMBER INPUT
numBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        numberButtons(e.target.textContent);
    });
});

// 2) OPERATOR INPUT
operatorBtns.forEach(button => {
    button.addEventListener('click', (e) => {
        operatorButtons(e.target.textContent);
    });
});

// 3) EQUAL INPUT
equal.addEventListener('click', equalButton);

// 4) CLEAR INPUT
clear.addEventListener('click', clearButton);

// 5) DELETE INPUT
del.addEventListener('click', deleteButton);

/* 
WATCH FOR KEYDOWN INPUT
*/

window.addEventListener('keydown', (e) => {
    console.log(e.key);

    // 1) NUMBER INPUT
    if (e.key >= 0 && e.key <= 9) { // 0-9 only
        numberButtons(e.key);
    
    // 2) OPERATOR INPUT
    } else if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/") { // operator keys
        switch (e.key) {
            case "*":
                operatorButtons("×");
                break;
            case "/":
                operatorButtons("÷");
                break;
            default:
                operatorButtons(e.key);
                break;
        }
    
    // 3) EQUAL INPUT
    } else if (e.key == "=" || e.key == "Enter") { // works with = or enter key
        equalButton();

    // 4) CLEAR INPUT
    } else if (e.key == "c") { // works with c key
        clearButton();

    // 5) DELETE INPUT
    } else if (e.key == "Backspace") { // backspace key
        deleteButton();
    }
});

/* 
FUNCTIONS
*/

// 1) NUMBER BUTTON FUNCTION
function numberButtons(input) {
    // 1) Check if equal button was just clicked
    if (operationArray.length == 3) {
        // if so clear
        display.textContent = 0;
        topLine.textContent = "";
        outputNum = "";
        operationArray = [];
        storedOperator = "";
        decimalBtn.disabled = false;

        // and add first number to output
        outputNum += input;
        display.textContent = outputNum;
        disableDecimal(outputNum);

    // 2) Check if calculation is ongoing...
    } else if (storedOperator != "") {
        
        console.log(outputNum);

        // on first click...
        if (topLine.textContent == "") {
            // add calculated number and stored operator to topline
            topLine.textContent = `${outputNum} ${storedOperator}`;
        
            // reset input counter
            outputNum = "";
        }

        // grow input number until operator is selected
        outputNum += input;
        display.textContent = outputNum;
        disableDecimal(outputNum);

    // 3) Otherwise begin entering number...
    } else {
        // grow input number until operator is selected
        outputNum += input;
        display.textContent = outputNum;
        disableDecimal(outputNum);
    }
}

// 2) OPERATOR BUTTON FUNCTION
function operatorButtons(input) {
    // 1) Check if array is already populated (perform calculation without = button)...
    if (operationArray.length > 0) {
            
        // if no new number entered don't allow to continue...
        if (doubleOperatorCheck == 1 && topLine.textContent == "") {
            return;
        }

        // push entered number to 3rd array element
        operationArray.push(outputNum);

        // clear topline text
        topLine.textContent = '';

        // calculate and display answer
        outputNum = round(operate(operationArray));
        display.textContent = outputNum;

        // set array first value to answer
        operationArray = [outputNum, input];

        // store operator for next calculation
        storedOperator = input;
        
        // don't allow another operator to be passed until new number entered
        doubleOperatorCheck = 1;

    // 2) Otherwise prepare for first calculation...
    } else {
        // push entered number and operator to array
        operationArray.push(outputNum);
        operationArray.push(input);

        // add number and operator to topline
        topLine.textContent = `${outputNum} ${input}`;

        // reset bottom display 
        outputNum = "";
        display.textContent = 0;
    }
}

// 3) EQUAL BUTTON FUNCTIONS
function equalButton() {
    // reset checker
    doubleOperatorCheck = "";
    
    // check if a number has been entered
    if (outputNum != "") {

        // loop operation if = button is repeatedly pressed
        if (operationArray.length == 3) {
            operationArray[0] = display.textContent;
            display.textContent = round(operate(operationArray));
            console.log(operationArray);
            return;
        }
        
        // push entered number to array
        operationArray.push(outputNum);
        
        // clear topline text
        topLine.textContent = '';

        console.log(round(operate(operationArray)));

        // calculate and display answer
        outputNum = round(operate(operationArray));
        // if not NaN (div by 0 err msg) return the message
        if (isNaN(outputNum)) { 
            display.textContent = "error.gif";
        } else {
            display.textContent = round(operate(operationArray));
        }

    } else {
        return;
    }
}

// 4) CLEAR BUTTON FUNCTION
function clearButton() {
    display.textContent = 0;
    topLine.textContent = "";
    outputNum = "";
    operationArray = [];
    storedOperator = "";
    decimalBtn.disabled = false;
}

// 5) DELETE BUTTON FUNCTION
function deleteButton() {
    // delete when input has more than 1 character and not displaying answer
    if (outputNum.length > 1) {
        display.textContent = display.textContent.slice(0, -1);
        outputNum = outputNum.slice(0, -1);
        console.log(outputNum);
    // when 1 character set input to 0
    } else if (outputNum.length == 1) {
        display.textContent = 0;
        outputNum = "";
        
    } else {
        return;
    }
}

// DISABLE BUTTON FUNCTION
function disableDecimal(text) {
    if (text.includes(".")) {
        return decimalBtn.disabled = true;
    } else {
        return decimalBtn.disabled = false;
    }
}

// OPERATOR FUNCTIONS TO CALL
function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function subtract(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function operate ([num1, operator, num2]) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '×':
            return multiply(num1, num2);
        case '÷':
            if (num2 == 0) {
                return 'Does not compute';
            } else {
                return divide(num1, num2);
            }
        default:
            return 'Does not compute';
    }
}

function round (num) {
    return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100; // 2 decimal places
}