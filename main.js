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
        case '-':
            return subtract(num1, num2);
        case '\xD7':
        case '*':
            return multiply(num1, num2);
        case '\xF7':
        case '/':
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

/* function handleValueClick(e, keyValue){ //keyboard support
    //console.log(e.currentTarget.firstElementChild.firstChild.nodeValue); 
    if(operation.operatorPressed === false)
    {
        if(operation.num1 === null)
            operation.num1 = '0';


        if(keyValue === undefined)
        {
            if(e.currentTarget.firstElementChild.firstChild.nodeValue !== '.')
                operation.num1 = (operation.num1 === '0') ? '' : operation.num1;
        }
        else
        {
            if(keyValue !== '.')
                operation.num1 = (operation.num1 === '0') ? '' : operation.num1;
        }


        if(keyValue === undefined)
            operation.num1 = operation.num1.concat(e.currentTarget.firstElementChild.firstChild.nodeValue);
        else
            operation.num1 = operation.num1.concat(keyValue);

        document.querySelector('.display-box-1').firstChild.nodeValue = operation.num1;
    }
    else
    {
        // this code .........................................
        if(operation.result !== null && operation.num1 === null)
            operation.num1 = operation.result; //
        // this code .........................................

        if(operation.num2 === null)
            operation.num2 = '0';


        if(keyValue === undefined)
        {
            if(e.currentTarget.firstElementChild.firstChild.nodeValue !== '.')   
                operation.num2 = (operation.num2 === '0') ? '' : operation.num2;
        }
        else
        {
            if(keyValue !== '.')   
                operation.num2 = (operation.num2 === '0') ? '' : operation.num2;
        }


        if(keyValue === undefined)
        {
            operation.num2 = operation.num2.concat(e.currentTarget.firstElementChild.firstChild.nodeValue);
        }
        else
        {
            operation.num2 = operation.num2.concat(keyValue);   
        }

        document.querySelector('.display-box-1').firstChild.nodeValue  = operation.num2;
    }
} */

function handleValueClick(eOrKey){ //Key for keyboard support
    //e is a mouse click event while key is a string (which is equal to the value of the keyboard key pressed)

    if(operation.operatorPressed === false)
    {
        if(operation.num1 === null)
            operation.num1 = '0';


        if(eOrKey instanceof Event)
        {
            let e = eOrKey; // eOrKey is an event, an 'e'
            if(e.currentTarget.firstElementChild.firstChild.nodeValue !== '.')
                operation.num1 = (operation.num1 === '0') ? '' : operation.num1;
        }
        else
        {
            let keyValueStr = eOrKey; // eOrKey is a string equal to value of the key pressed
            if(keyValueStr !== '.')
                operation.num1 = (operation.num1 === '0') ? '' : operation.num1;
        }


        if(eOrKey instanceof Event)
        {
            let e = eOrKey; // eOrKey is an event, an 'e'    
            operation.num1 = operation.num1.concat(e.currentTarget.firstElementChild.firstChild.nodeValue);
        }
        else
        {
            let keyValueStr = eOrKey; // eOrKey is a string equal to value of the key pressed
            operation.num1 = operation.num1.concat(keyValueStr);
        }

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


        if(eOrKey instanceof Event)
        {
            let e = eOrKey; // eOrKey is an event, an 'e'
            if(e.currentTarget.firstElementChild.firstChild.nodeValue !== '.')   
                operation.num2 = (operation.num2 === '0') ? '' : operation.num2;
        }
        else
        {
            let keyValueStr = eOrKey; // eOrKey is a string equal to value of the key pressed
            if(keyValueStr !== '.')   
                operation.num2 = (operation.num2 === '0') ? '' : operation.num2;
        }


        if(eOrKey instanceof Event)
        {
            let e = eOrKey; // eOrKey is an event, an 'e'
            operation.num2 = operation.num2.concat(e.currentTarget.firstElementChild.firstChild.nodeValue);
        }
        else
        {
            let keyValueStr = eOrKey; // eOrKey is a string equal to value of the key pressed
            operation.num2 = operation.num2.concat(keyValueStr);   
        }

        document.querySelector('.display-box-1').firstChild.nodeValue  = operation.num2;
    }
}

document.querySelector('#point-button').addEventListener('click', handlePointClick);

function handlePointClick(){
    if(operation.operatorPressed === false)
    {
        operation.num1 = (operation.num1 === null) ? '0' : operation.num1;
        if(!operation.num1.includes('.'))
            handleValueClick('.'); // Treat decimal point as a value. Key value is '.' (a string)
    }
    else
    {
        operation.num2 = (operation.num2 === null) ? '0' : operation.num2;
        if(!operation.num2.includes('.'))
            handleValueClick('.'); // Treat decimal point as a value. Key value is '.' (a string)
    }
}

document.querySelector('#sign-button').addEventListener('click', handleSignClick);

function handleSignClick(){
    let numString = document.querySelector('.display-box-1').firstChild.nodeValue;
    let newNumString;

    if(+numString !== 0){

        if(numString.startsWith('-'))
            document.querySelector('.display-box-1').firstChild.nodeValue =
            newNumString = numString.slice(1, );
        else
            document.querySelector('.display-box-1').firstChild.nodeValue =
            newNumString = '-' + numString;
        
        if(operation.operatorPressed === false)
            operation.num1 = newNumString;
        else
            operation.num2 = newNumString;
    } 
}

document.querySelectorAll('.operator-button').forEach(button => button.addEventListener('click',
handleOperatorClick));

function handleOperatorClick(eOrKey){
    if(operation.num1 !== null && operation.num2 !== null && operation.operator !== null)
        handleEqualClick();
    
    if(eOrKey instanceof Event)
    {
        let e = eOrKey;
        operation.operator = e.currentTarget.firstElementChild.firstChild.nodeValue;
    }
    else
    {
        let keyCharStr = eOrKey;
        operation.operator = keyCharStr;   
    }
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

document.querySelector('#ac-button').addEventListener('click', handleAcClick);

function handleAcClick(){
    operation.num2 = operation.operator = operation.result = null;
    operation.num1 = '0';
    operation.operatorPressed = false;
    document.querySelector('.display-box-1').textContent = operation.num1;

    //Deprecated square button code
    /* document.querySelectorAll('.value-button').forEach(valueButton =>
        valueButton.addEventListener('click', handleValueClick));
    document.querySelector('#point-button').addEventListener('click', handlePointClick); */
}

document.addEventListener('keydown', handleKeydown);

function handleKeydown(e){
    if(e.key >= '0' && e.key <= '9')
        handleValueClick(e.key); // e.key is a string
        // No mouse click, keyboard key value === e.key
    else if(e.key === '.')
        handlePointClick();
    else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        handleOperatorClick(e.key);
    else if(e.key === 'Enter')
        handleEqualClick();
    else if(e.key === 'Backspace')
        handleBackClick();
    else if(e.key === 'Escape')
        handleAcClick();
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
