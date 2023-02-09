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

function operate(op, num1, num2){
    switch (op)
    {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('mouseenter', e => e.currentTarget.style.cssText =
    'background-color: lightblue;');
    button.addEventListener('mouseleave', e => e.currentTarget.style.cssText =
    'background-color: initial;');
});

    
