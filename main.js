const operation = {
    num1:{
        value: null, //treated as string
    },
    num2:{
        value: null, //treated as string
    },
    operator: null, //treated as string
    result: null, //treated as number
    operatorPressed: false, //boolean
    prevButton: document.createElement('div') //Buttons are implmented as div html elements
};

function insertDigit(digit){
    if(this.value === null || this.value === '0')
        this.value = '';
    
    this.value = this.value.toString().concat(digit);
    document.querySelector('.display-box-1').firstChild.nodeValue = this.value;
}

function insertPoint(){
    if(this.value === null)
        this.value = '0';

    if(!this.value.toString().includes('.'))
    {   
        this.value = this.value.toString().concat('.');
        document.querySelector('.display-box-1').firstChild.nodeValue = this.value;
    }
}

operation.num1.insertDigit = insertDigit;
operation.num1.insertPoint = insertPoint;

operation.num2.insertDigit = insertDigit;
operation.num2.insertPoint = insertPoint;

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

operation.operate = operate;

initializeCalculator();
colorNonoperatorButtons(); // handles the UI part of mouse events (enter, leave, click(down and up))
colorOperatorButtons(); // handles the UI part of mouse events (enter, leave, click(down and up))

function initializeCalculator(){
    operation.num1.value = '0';
    document.querySelector('.display-box-1').textContent = operation.num1.value;
}

function colorNonoperatorButtons(){
    document.querySelectorAll('.button').forEach(button => {
        if(!button.classList.contains('operator-button'))
        {
            button.addEventListener('mouseenter', e => e.currentTarget.style.cssText =
            'background-color: lightblue;');
            button.addEventListener('mouseleave', e => e.currentTarget.style.cssText =
            'background-color: initial;'); //transparent
            button.addEventListener('mousedown', e => e.currentTarget.style.cssText =
            'background-color: rgb(8, 115, 151);'); //dark blue
            button.addEventListener('mouseup', e => e.currentTarget.style.cssText =
            'background-color: lightblue;');   
        }
    });
}

function colorOperatorButtons(){
    document.querySelectorAll('.operator-button').forEach(opButton => {
        //operator buttons have a default color of light yellow
        opButton.addEventListener('mouseenter', mouseEntersOpButton); //darker yellow
        opButton.addEventListener('mouseleave', mouseLeavesOpButton); //light yellow (default)
    
        opButton.addEventListener('mousedown', e => pressOperatorButton(e.currentTarget));
        /* button.addEventListener('mouseup', e => e.currentTarget.style.cssText =
        'background-color: rgb(173, 167, 57);'); */
    });

    //This is (sort of) mouseup event for operator buttons.
    //Akin to the 'mouseup' event of the other (non-operator) buttons.
    //An operator button (lets call it op1) is unpressed ('mouseup') when (if and only if) the user presses ANY OTHER button (except op1) while op1 is in the pressed state.
    document.querySelectorAll('.button').forEach(button => button.addEventListener('click', () => {
    
        if(operation.prevButton.classList.contains('operator-button') &&
        (operation.prevButton.className !== button.className)) //previous button and current button are not the same i.e. the user isn't clicking(pressing) an already pressed operator button
            unpressOperatorButton(operation.prevButton);
    
        operation.prevButton = button;
    }));
}

function pressOperatorButton(opButton) {
    opButton.style.cssText = 'background-color: rgb(250, 241, 0);' //darkest yellow

    opButton.removeEventListener('mouseleave', mouseLeavesOpButton);
    opButton.removeEventListener('mouseenter', mouseEntersOpButton);
    //Both these events are added back when (if and only if) the (particular) operator button GETS unpressed
}

function unpressOperatorButton(opButton){
    opButton.style.cssText = 'background-color: rgb(151, 147, 78);' //light yellow (deafult)
    //Akin to the 'mouseup' event of other (non-operator) buttons

    //The mouseenter & mouseleave events (that were removed by pressOperatorButton) are added back
    opButton.addEventListener('mouseenter', mouseEntersOpButton); //darker yellow
    opButton.addEventListener('mouseleave', mouseLeavesOpButton); //light yellow (default)
}

function mouseEntersOpButton(e){
    e.currentTarget.style.cssText = 'background-color: rgb(173, 167, 57);' //darker yellow
}

function mouseLeavesOpButton(e){
    e.currentTarget.style.cssText = 'background-color: rgb(151, 147, 78);' //light yellow (default)
}

document.querySelectorAll('.digit-button').forEach(digitButton =>
    digitButton.addEventListener('click', handleDigitClick));

function handleDigitClick(e){
    const digit = e.currentTarget.firstElementChild.firstChild.nodeValue;

    if(operation.operatorPressed === false)
        operation.num1.insertDigit(digit);
    else
        operation.num2.insertDigit(digit);
}

/* function getCurrentOperand(){
    if(operation.operatorPressed === false)
        return operation.num1;
    else
        return operation.num2;
} */

function useResultOfPrevCalc(){
    //Use result of previous calculation as the first (operation.num1) operand
    if(operation.result !== null && operation.num1.value === null)
        return true;
    else
        return false;
}

function dataIsComplete(){
    if(operation.num1.value !== null && operation.num2.value !== null
        && operation.operator !== null)
        return true;
    else
        return false;
}

function resetParamExceptResult(){ // and prevButton 
    operation.num1.value = operation.num2.value = operation.operator = null;
    operation.operatorPressed = false;
}

function resetAllParams(){
    operation.num1.value = operation.num2.value = operation.operator = operation.result = null;
    operation.operatorPressed = false;
    operation.prevButton = document.createElement('div'); //Buttons are implmented as div html elements
}

function displayResult(){
    document.querySelector('.display-box-1').firstChild.nodeValue = operation.result.toString();
}

document.querySelector('#point-button').addEventListener('click', handlePointClick);

function handlePointClick(){
    if(operation.operatorPressed === false)
        operation.num1.insertPoint();
    else
        operation.num2.insertPoint();
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
            operation.num1.value = newNumString;
        else
            operation.num2.value = newNumString;
    } 
}

document.querySelectorAll('.operator-button').forEach(button => button.addEventListener('click',
handleOperatorClick));

function handleOperatorClick(e){
    if(useResultOfPrevCalc())
        operation.num1.value = operation.result.toString();
    
    if(dataIsComplete())
        handleEqualClick();
    
    operation.operator = e.currentTarget.firstElementChild.firstChild.nodeValue;
    operation.operatorPressed = true; //The op button that's pressed will be highlighted
}

document.querySelector('#equal-button').addEventListener('click', handleEqualClick);

function handleEqualClick(){
    if(useResultOfPrevCalc()) //MOST PROBABLY redundant. But Included in this function to be safe.
            operation.num1.value = operation.result.toString();

    if(dataIsComplete())
    {
        operation.result =
        operation.operate(operation.num1.value, operation.num2.value, operation.operator);
        displayResult();
    }

    resetParamExceptResult(); // Resets all parameters except operation.result (and        operation.prevButton)
}

document.querySelector('#back-button').addEventListener('click', handleBackClick);

function handleBackClick(){
    if(operation.operatorPressed === false && operation.num1.value !== null
        && operation.num1.value !== '0')
    {
        operation.num1.value = operation.num1.value.slice(0, -1);

        if (operation.num1.value === '')
            operation.num1.value = '0';
    
        document.querySelector('.display-box-1').firstChild.nodeValue = operation.num1.value;
    }
    else if(operation.operatorPressed === true && operation.num2.value !== null
        && operation.num2.value !== '0')
    {
        operation.num2.value = operation.num2.value.slice(0, -1);

        if (operation.num2.value === '')
            operation.num2.value = '0';

        document.querySelector('.display-box-1').firstChild.nodeValue = operation.num2.value;
    }
    else if(operation.operatorPressed === true && operation.num2.value === null)
        operation.operatorPressed = false;   // "undo" operator press. Allows the user to continue adding/removing digits to/from the operand (operation.num1)
}

document.querySelector('#ac-button').addEventListener('click', handleAcClick);

function handleAcClick(){
    resetAllParams();
    initializeCalculator();
}

document.addEventListener('keydown', handleKeydown);

function handleKeydown(e){
    if(e.key >= '0' && e.key <= '9')
        handleDigitKeydown(e.key); // e.key is a string
        // No mouse click, keyboard key value === e.key
    else if(e.key === '.')
        handlePointKeydown();
    else if(e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        handleOperatorKeydown(e.key);
    else if(e.key === 'Enter')
        handleEnterKeydown();
    else if(e.key === 'Backspace')
        handleBackKeydown();
    else if(e.key === 'Escape')
        handleEscapeKeydown();
    
    
    //Unpress the pressed operator button if operation.prevButton is an operator button
    let keyButton;

    //Determine which particular html div (buttons are implemented as divs) does the pressed key corresponds to 
    switch(e.key)
    {       
        case '+':
            keyButton = document.querySelector('.plus-button');
            break;
        case '-':
            keyButton = document.querySelector('.minus-button');
            break;
        case '*':
            keyButton = document.querySelector('.multiply-button');
            break;
        case '/':
            keyButton = document.querySelector('.divide-button');
            break;
        default:
            keyButton = document.querySelector(':not(.operator-button)');
    }
    
    if(operation.prevButton.classList.contains('operator-button') &&
    (operation.prevButton.className !== keyButton.className)) //previous button and current button are not the same i.e. the user isn't clicking(pressing) an already pressed operator button
        unpressOperatorButton(operation.prevButton);

    operation.prevButton = keyButton;
}

function handleDigitKeydown(digit){
    if(operation.operatorPressed === false)
        operation.num1.insertDigit(digit);
    else
        operation.num2.insertDigit(digit);
}

function handlePointKeydown(){
    if(operation.operatorPressed === false)
        operation.num1.insertPoint();
    else
        operation.num2.insertPoint();
}

function handleOperatorKeydown(operatorChar){
    if(useResultOfPrevCalc())
        operation.num1.value = operation.result;
    
    if(dataIsComplete())
        handleEqualClick();
    
    operation.operator = operatorChar;
    operation.operatorPressed = true;

    // Highlight the pressed operator button
    switch(operatorChar)
    {   
        case '+':
            pressOperatorButton(document.querySelector('.plus-button'));
            break;
        case '-':
            pressOperatorButton(document.querySelector('.minus-button'));
            break;
        case '*':
            pressOperatorButton(document.querySelector('.multiply-button'));
            break;
        case '/':
            pressOperatorButton(document.querySelector('.divide-button'));
    }        
   
}

function handleEnterKeydown(){
    handleEqualClick();
}

function handleBackKeydown(){
    handleBackClick();
}

function handleEscapeKeydown(){
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

    document.querySelectorAll('.digit-button').forEach(digitButton =>
        digitButton.removeEventListener('click', handleDigitClick));
    document.querySelector('#point-button').removeEventListener('click', handlePointClick);
}); */

/* function handleDigitClick(e, keyValue){ //keyboard support
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

/* function handleDigitClick(eOrKey){ //Key for keyboard support
    //eOrKey can have a data type of Event or String
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
} */