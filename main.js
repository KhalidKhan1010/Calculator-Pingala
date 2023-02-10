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
    valueButton.addEventListener('click',
    e => {
        if(Number(document.querySelector('.display-box-1').textContent) === 0)
            document.querySelector('.display-box-1').textContent =
            e.currentTarget.firstElementChild.firstChild.nodeValue;
        else
            document.querySelector('.display-box-1').textContent +=
            e.currentTarget.firstElementChild.firstChild.nodeValue;
    });
});

document.querySelector('#ac-button').addEventListener('click',
() => document.querySelector('.display-box-1').textContent = '0');

/* let valueButtons = document.querySelectorAll('.value-button');
console.log(valueButtons[0]);
console.log(valueButtons[0].firstChild);
console.log(valueButtons[0].firstChild.firstChild);
console.log(valueButtons[0].firstChild.nodeValue); */



    
