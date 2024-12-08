import { OPEN_BRACKET, CLOSE_BRACKET } from './variables.js';

export function compareArrays(arr1, arr2) {
    return arr1.join('') === arr2.join('');
}

export function isPossibleForCloseBracket(expression) {
    const bracketStack = [];

    for (const item of expression) {
        if (item === OPEN_BRACKET) {
            bracketStack.push(OPEN_BRACKET);
        } else if (item === CLOSE_BRACKET) {
            if (bracketStack.at(-1) === OPEN_BRACKET) {
                bracketStack.pop();
            } else {
                return false;
            }
        }
    }

    return bracketStack.length > 0;
}

export function joinToLastItem(symbol, lastItem, newExpressionState) {
    const newLastItem = lastItem + symbol;
    newExpressionState[newExpressionState.length - 1] = newLastItem;
}
