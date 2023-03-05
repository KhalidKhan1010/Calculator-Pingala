const operation = {
    num1: null, //treated as string
    num2: null, //treated as string
    operator: null, //treated as string
    result: null, //treated as number
    operatorPressed: false, //boolean
    prevButton: document.createElement('div') //Buttons are implmented as div html elements
};

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
    num1 = +num1;
    num2 = +num2;

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

operation.num1 = '0';
document.querySelector('.display-box-1').textContent = operation.num1;

document.querySelectorAll('.button').forEach(button => {
    if(button.classList.contains('operator-button'))
    {
        button.addEventListener('mouseenter', mouseEntersOp); 
        button.addEventListener('mouseleave', mouseLeavesOp);

        button.addEventListener('mousedown', e => e.currentTarget.style.cssText =
        'background-color: rgb(250, 241, 0);'); //darkest yellow
        /* button.addEventListener('mouseup', e => e.currentTarget.style.cssText =
        'background-color: rgb(173, 167, 57);'); */
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

function mouseLeavesOp(e){
    e.currentTarget.style.cssText = 'background-color: rgb(151, 147, 78);'
}

function mouseEntersOp(e){
    e.currentTarget.style.cssText = 'background-color: rgb(173, 167, 57);' //darker yellow
}

document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
    //let buttonText = e.currentTarget.firstElementChild.firstChild.nodeValue;
    //let buttonText = button.firstElementChild.firstChild.nodeValue;

    if(button.classList.contains('operator-button'))
    {
        button.removeEventListener('mouseleave', mouseLeavesOp);
        button.removeEventListener('mouseenter', mouseEntersOp);
    }

    if(operation.prevButton.className !== button.className)
    {
        if(operation.prevButton.classList.contains('operator-button'))
        {
            operation.prevButton.style.cssText = 'background-color: rgb(173, 167, 57);' //light yellow // Akin to 'mouseup' event
        }
    }

    operation.prevButton = button;
}));

document.querySelectorAll('.value-button').forEach(valueButton =>
    valueButton.addEventListener('click', handleValueClick));

function handleValueClick(e){
    console.log(e.currentTarget.firstElementChild.firstChild.nodeValue); 
    if(operation.operatorPressed === false)
    {
        if(operation.num1 === null)
            operation.num1 = '0';

        if(e.currentTarget.firstElementChild.firstChild.nodeValue !== '.')
            operation.num1 = (operation.num1 === '0') ? '' : operation.num1;

        operation.num1 = operation.num1.concat(e.currentTarget.firstElementChild.firstChild.nodeValue);
        document.querySelector('.display-box-1').firstChild.nodeValue = operation.num1;
    }
    else
    {
        // this code .........................................
        if(operation.result !== null && operation.num1 === null)
            operation.num1 = operation.result;
        // this code .........................................

        if(operation.num2 === null)
            operation.num2 = '0';

        if(e.currentTarget.firstElementChild.firstChild.nodeValue !== '.')   
            operation.num2 = (operation.num2 === '0') ? '' : operation.num2;

        operation.num2 = operation.num2.concat(e.currentTarget.firstElementChild.firstChild.nodeValue);
        document.querySelector('.display-box-1').firstChild.nodeValue  = operation.num2;
    }
}

document.querySelector('#point-button').addEventListener('click', handlePointClick);

function handlePointClick(e){
    if(operation.operatorPressed === false)
    {
        operation.num1 = (operation.num1 === null) ? '0' : operation.num1;
        if(!operation.num1.includes('.'))
            handleValueClick(e); // Treat decimal point as a value
    }
    else
    {
        operation.num2 = (operation.num2 === null) ? '0' : operation.num2;
        if(!operation.num2.includes('.'))
            handleValueClick(e); // Treat decimal point as a value
    }
}

document.querySelectorAll('.operator-button').forEach(button => button.addEventListener('click',
handleOperatorClick));

function handleOperatorClick(e){
    if(operation.num1 !== null && operation.num2 !== null && operation.operator !== null)
        handleEqualClick();
    
    operation.operator = e.currentTarget.firstElementChild.firstChild.nodeValue;
    operation.operatorPressed = true;
    // highlight button

    //Deprecated square button code
    /* document.querySelectorAll('.value-button').forEach(valueButton =>
        valueButton.addEventListener('click', handleValueClick));
    document.querySelector('#point-button').addEventListener('click', handlePointClick); */

}

document.querySelector('#equal-button').addEventListener('click', handleEqualClick);

function handleEqualClick(){
    if(operation.num1 !== null && operation.num2 !== null && operation.operator !== null)
    {
        console.log('Equal');
        operation.result = operate(operation.num1, operation.num2, operation.operator);
        document.querySelector('.display-box-1').firstChild.nodeValue = operation.result.toString();
        operation.num1 = operation.num2 = operation.operator = null;
        operation.operatorPressed = false;
        
        //Deprecated square button code
        /* document.querySelectorAll('.value-button').forEach(valueButton =>
            valueButton.addEventListener('click', handleValueClick));
        document.querySelector('#point-button').addEventListener('click', handlePointClick); */

    }
}

//Deprecated square button code

/* document.querySelector('#square-button').addEventListener('click', () => {
    if(operation.result !== null && operation.num1 === null && operation.num2 === null)
    {
        operation.result = operate(operation.result, operation.result, '\xD7'); // multiply
        document.querySelector('.display-box-1').firstChild.nodeValue = operation.result.toString();
    }
    else
    {
        if(operation.operatorPressed === false)
        {
            operation.num1 = operate(operation.num1, operation.num1, '\xD7').toString(); // multiply
            document.querySelector('.display-box-1').firstChild.nodeValue = operation.num1;
        } 
        else
        {
            operation.num2 = operate(operation.num2, operation.num2, '\xD7').toString(); // multiply
            document.querySelector('.display-box-1').firstChild.nodeValue = operation.num2;    
        }
    }

    document.querySelectorAll('.value-button').forEach(valueButton =>
        valueButton.removeEventListener('click', handleValueClick));
    document.querySelector('#point-button').removeEventListener('click', handlePointClick);
}); */

document.querySelector('#back-button').addEventListener('click', handleBackClick);

function handleBackClick(){
    if(operation.operatorPressed === false && operation.num1 !== null && operation.num1 !== '0')
    {
        operation.num1 = operation.num1.slice(0, -1);

        if (operation.num1 === '')
            operation.num1 = '0';
    
        document.querySelector('.display-box-1').firstChild.nodeValue = operation.num1;
    }
    else if(operation.operatorPressed === true && operation.num2 !== null && operation.num2 !== '0')
    {
        operation.num2 = operation.num2.slice(0, -1);

        if (operation.num2 === '')
            operation.num2 = '0';

        document.querySelector('.display-box-1').firstChild.nodeValue = operation.num2;
    }
    else if(operation.operatorPressed === true && operation.num2 === null)
        operation.operatorPressed = false;   
}

document.querySelector('#ac-button').addEventListener('click', () => {
    operation.num2 = operation.operator = operation.result = null;
    operation.num1 = '0';
    operation.operatorPressed = false;
    document.querySelector('.display-box-1').textContent = operation.num1;

    //Deprecated square button code
    /* document.querySelectorAll('.value-button').forEach(valueButton =>
        valueButton.addEventListener('click', handleValueClick));
    document.querySelector('#point-button').addEventListener('click', handlePointClick); */
}); 
