import {
    NUMBERS,
    OPEN_BRACKET,
    CLOSE_BRACKET,
    MATH_OPERATION_SYMBOLS,
    INITIAL_STATE,
} from './variables.js';

import {
    isPossibleForCloseBracket,
    joinToLastItem,
} from './utils.js';

export function getNewExpressionState(symbol, expressionState) {
    let newExpressionState = expressionState.slice();

    if (expressionState.length === 0) {
        if (NUMBERS.includes(symbol) || symbol === OPEN_BRACKET) {
            newExpressionState.push(symbol);
        }
        return newExpressionState;
    }

    if (
        symbol === CLOSE_BRACKET &&
        !isPossibleForCloseBracket(expressionState)
    ) {
        return newExpressionState;
    }

    const lastItem = expressionState.at(-1);

    if (
        NUMBERS.includes(lastItem) /* если однозначное число*/ ||
        lastItem.length > 1 /* если многозначное число*/
    ) {
        if (
            (lastItem.includes('.') && symbol === '.') ||
            symbol === OPEN_BRACKET
        ) {
            return newExpressionState;
        }

        const lastSymbolOfItem = lastItem.at(-1);

        if (lastSymbolOfItem === '.') {
            if (
                symbol === CLOSE_BRACKET ||
                MATH_OPERATION_SYMBOLS.includes(symbol)
            ) {
                return newExpressionState;
            }
        }

        if (NUMBERS.includes(symbol)) {
            joinToLastItem(symbol, lastItem, newExpressionState);
        } else if (symbol === '.' && !lastItem.includes('.')) {
            joinToLastItem(symbol, lastItem, newExpressionState);
        } else {
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    if (MATH_OPERATION_SYMBOLS.includes(lastItem)) {
        if (MATH_OPERATION_SYMBOLS.includes(symbol)) {
            newExpressionState[newExpressionState.length - 1] =
                symbol;
        }
        if (NUMBERS.includes(symbol) || symbol === OPEN_BRACKET) {
            newExpressionState.push(symbol);
        }
        return newExpressionState;
    }

    if (lastItem === OPEN_BRACKET) {
        if (NUMBERS.includes(symbol)) {
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    if (lastItem === CLOSE_BRACKET) {
        if (
            MATH_OPERATION_SYMBOLS.includes(symbol) ||
            symbol === CLOSE_BRACKET
        ) {
            newExpressionState.push(symbol);
        }

        return newExpressionState;
    }

    throw new Error('unexpeted behavior');
}
