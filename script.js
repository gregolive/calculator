// DECLARE VARIBLES & CONSTANTS
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

// DISPLAY INITIAL VALUE
display.innerText = 0;

// STORE NUMBER INPUT
numBtns.forEach(button => {
    button.addEventListener('click', e => {
        
        // 1) Check if equal button was just clicked
        if (operationArray.length == 3) {
            // if so clear
            display.innerText = 0;
            topLine.innerText = "";
            outputNum = "";
            operationArray = [];
            storedOperator = "";
            decimalBtn.disabled = false;

            // and add first number to output
            outputNum += e.target.innerText;
            display.innerText = outputNum;
            disableDecimal(outputNum);

        // 2) Check if calculation is ongoing...
        } else if (storedOperator != "") {
            
            console.log(outputNum);

            // on first click...
            if (topLine.innerText == "") {
                // add calculated number and stored operator to topline
                topLine.innerText = `${outputNum} ${storedOperator}`;
            
                // reset input counter
                outputNum = "";
            }

            // grow input number until operator is selected
            outputNum += e.target.innerText;
            display.innerText = outputNum;
            disableDecimal(outputNum);

        // 3) Otherwise begin entering number...
        } else {
            // grow input number until operator is selected
            outputNum += e.target.innerText;
            display.innerText = outputNum;
            disableDecimal(outputNum);
        }
    })
});

// LOG NUMBER ENTRY WHEN OPERATOR IS CLICKED
operatorBtns.forEach(button => {
    button.addEventListener('click', e => {
        
        // 1) Check if array is already populated (perform calculation without = button)...
        if (operationArray.length > 0) {
            
            // if no new number entered don't allow to continue...
            if (doubleOperatorCheck == 1 && topLine.innerText == "") {
                return;
            }

            // push entered number to 3rd array element
            operationArray.push(outputNum);

            // clear topline text
            topLine.innerText = '';

            // calculate and display answer
            outputNum = round(operate(operationArray));
            display.innerText = outputNum;

            // set array first value to answer
            operationArray = [outputNum, e.target.innerText];

            // store operator for next calculation
            storedOperator = e.target.innerText;
            
            // don't allow another operator to be passed until new number entered
            doubleOperatorCheck = 1;

        // 2) Otherwise prepare for first calculation...
        } else {
            // push entered number and operator to array
            operationArray.push(outputNum);
            operationArray.push(e.target.innerText);

            // add number and operator to topline
            topLine.innerText = `${outputNum} ${e.target.innerText}`;

            // reset bottom display 
            outputNum = "";
            display.innerText = 0;
        }
    })
});

// DISPLAY ANSWER WHEN EQUAL IS PUSHED
equal.addEventListener('click', () => {
    // reset checker
    doubleOperatorCheck = "";
    
    // check if a number has been entered
    if (outputNum != "") {

        // loop operation if = button is repeatedly pressed
        if (outputNum == "") {
            operationArray.push(outputNum);
            display.innerText = round(operate(operationArray));
            console.log(operationArray);
            return;
        }
        
        // push entered number to array
        operationArray.push(outputNum);
        
        // clear topline text
        topLine.innerText = '';

        // calculate and display answer
        display.innerText = round(operate(operationArray));
        outputNum = round(operate(operationArray));
        
    } else {
        return
    }
});

// CLEAR WHEN BUTTON IS CLICKED
clear.addEventListener('click', () => {
    display.innerText = 0;
    topLine.innerText = "";
    outputNum = "";
    operationArray = [];
    storedOperator = "";
    decimalBtn.disabled = false;
});

// DELETE ENTERED VALUES ON CLICK
del.addEventListener('click', () => {
    // delete when input has more than 1 character and not displaying answer
    if (outputNum.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
        outputNum = outputNum.slice(0, -1);
        console.log(outputNum);
    // when 1 character set input to 0
    } else if (outputNum.length == 1) {
        display.innerText = 0;
        outputNum = "";
        
    } else {
        return;
    }
});

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
                return 'Dividing by 0? :('
            }
            return divide(num1, num2);
        default:
            return 'Does not compute'
    }
}

function round (num) {
    return Math.round((parseFloat(num) + Number.EPSILON) * 100) / 100; // 2 decimal places
}