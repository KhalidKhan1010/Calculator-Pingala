const operation = {
    num1: 0,
    num2: null,
    operator: null,
    result: null,
    operatorPressed: false
}

let displayMode = 'replace';
//let operatorPressed = false;

function add(num1, num2){
    return num1 + num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function multiply(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function operate(num1, num2, operator){
    switch (operator)
    {
        case '+':
            return add(num1, num2);
        case '\u2212':
            return subtract(num1, num2);
        case '\xD7':
            return multiply(num1, num2);
        case '\xF7':
            return divide(num1, num2);
    }
}

document.querySelector('.display-box-1').textContent = operation.num1.toString();

document.querySelectorAll('.button').forEach(button => {
    if (button.classList.contains('operator-button'))
    {
        button.addEventListener('mouseenter', e => e.currentTarget.style.cssText =
        'background-color: rgb(173, 167, 57);'); //darker yellow
        button.addEventListener('mouseleave', e => e.currentTarget.style.cssText =
        'background-color: rgb(151, 147, 78);');

        button.addEventListener('mousedown', e => e.currentTarget.style.cssText =
        'background-color: rgb(250, 241, 0);'); //darkest yellow
    }
    else
    {
        button.addEventListener('mouseenter', e => e.currentTarget.style.cssText =
        'background-color: lightblue;');
        button.addEventListener('mouseleave', e => e.currentTarget.style.cssText =
        'background-color: initial;');

        button.addEventListener('mousedown', e => e.currentTarget.style.cssText =
        'background-color: rgb(8, 115, 151);'); //dark blue
        button.addEventListener('mouseup', e => e.currentTarget.style.cssText =
        'background-color: lightblue;');
    }
});

document.querySelectorAll('.value-button').forEach(valueButton => {
    valueButton.addEventListener('click', e => {
        if(operation.operatorPressed === false)
        {
            operation.num1 = Number((+operation.num1).toString().concat(e.currentTarget.firstElementChild.firstChild.nodeValue));
            document.querySelector('.display-box-1').firstChild.nodeValue =
            operation.num1.toString();
        }
        else
        {
            if(operation.result !== null)
                operation.num1 = operation.result;

            operation.num2 = Number((+operation.num2).toString().concat(e.currentTarget.firstElementChild.firstChild.nodeValue));
            document.querySelector('.display-box-1').firstChild.nodeValue  =
            operation.num2.toString();
        }
    });
});

document.querySelectorAll('.operator-button').forEach(button => button.addEventListener('click',
handleOperatorClick));

function handleOperatorClick(e){
    if(operation.num1 !== null && operation.num2 !== null && operation.operator !== null)
        handleEqualClick();
    
    operation.operator = e.currentTarget.firstElementChild.firstChild.nodeValue;
    operation.operatorPressed = true;
    // highlight button    
}

document.querySelector('#equal-button').addEventListener('click', handleEqualClick);

function handleEqualClick(){
    if(operation.num1 !== null && operation.num2 !== null && operation.operator !== null)
    {
        operation.result = operate(operation.num1, operation.num2, operation.operator);
        document.querySelector('.display-box-1').firstChild.nodeValue = operation.result.toString();
        operation.num1 = operation.num2 = operation.operator = null;
        operation.operatorPressed = false;
    }
}


function getOperand(){
    return Number(document.querySelector('.display-box-1').firstChild.nodeValue);
}

function beginNextOperand(){
    displayMode = 'replace';
}

document.querySelector('#ac-button').addEventListener('click', () => {
    operation.num2 = operation.operator = operation.result = null;
    operation.num1 = 0;
    operation.operatorPressed = false;
    document.querySelector('.display-box-1').textContent = operation.num1.toString();
});



    
