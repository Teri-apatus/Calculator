const buttonNumber0 = document.getElementById('number0');
const buttonNumber1 = document.getElementById('number1');
const buttonNumber2 = document.getElementById('number2');
const buttonNumber3 = document.getElementById('number3');
const buttonNumber4 = document.getElementById('number4');
const buttonNumber5 = document.getElementById('number5');
const buttonNumber6 = document.getElementById('number6');
const buttonNumber7 = document.getElementById('number7');
const buttonNumber8 = document.getElementById('number8');
const buttonNumber9 = document.getElementById('number9');
const buttonPlus = document.getElementById('plus');
const buttonMinus = document.getElementById('minus');
const buttonMultiply = document.getElementById('multiply');
const buttonDivide = document.getElementById('divide');
const buttonOpeningBracket =
    document.getElementById('openingBracket');
const buttonClosingBracket =
    document.getElementById('closingBracket');
const buttonPoint = document.getElementById('point');
const buttonBackspace = document.getElementById('backspace');
const buttonClear = document.getElementById('clear');

let outputElements = document.getElementById('expressionOutput');

buttonNumber1.addEventListener('click', () => {
    outputElements.innerHTML += 0;
});

buttonNumber1.addEventListener('click', () => {
    outputElements.innerHTML += 1;
});

buttonNumber2.addEventListener('click', () => {
    outputElements.innerHTML += 2;
});

buttonNumber3.addEventListener('click', () => {
    outputElements.innerHTML += 3;
});

buttonNumber4.addEventListener('click', () => {
    outputElements.innerHTML += 4;
});

buttonNumber5.addEventListener('click', () => {
    outputElements.innerHTML += 5;
});

buttonNumber6.addEventListener('click', () => {
    outputElements.innerHTML += 6;
});

buttonNumber7.addEventListener('click', () => {
    outputElements.innerHTML += 7;
});

buttonNumber8.addEventListener('click', () => {
    outputElements.innerHTML += 8;
});

buttonNumber9.addEventListener('click', () => {
    outputElements.innerHTML += 9;
});

buttonPlus.addEventListener('click', () => {
    if (outputElements.innerHTML.endsWith('+')) {
        return outputElements;
    }
    outputElements.innerHTML += '+';
});

buttonMinus.addEventListener('click', () => {
    if (outputElements.innerHTML.endsWith('-')) {
        return outputElements;
    }
    outputElements.innerHTML += '-';
});

buttonMultiply.addEventListener('click', () => {
    if (outputElements.innerHTML.endsWith('*')) {
        return outputElements;
    }
    outputElements.innerHTML += '*';
});

buttonDivide.addEventListener('click', () => {
    if (outputElements.innerHTML.endsWith('÷')) {
        return outputElements;
    }
    outputElements.innerHTML += '÷';
});

buttonOpeningBracket.addEventListener('click', () => {
    outputElements.innerHTML = '(';
});

buttonClosingBracket.addEventListener('click', () => {
    outputElements.innerHTML = ')';
});

buttonPoint.addEventListener('click', () => {
    if (outputElements.innerHTML.endsWith('.')) {
        return outputElements;
    }
    outputElements.innerHTML = '.';
});

buttonBackspace.addEventListener('click', () => {
    outputElements.innerHTML = outputElements.innerHTML.slice(0, -1);
    console.log(outputElements);
});

buttonClear.addEventListener('click', () => {
    outputElements.innerHTML = '';
});
