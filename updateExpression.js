import { INITIAL_STATE } from './variables.js';

const outputElements = document.getElementById('expressionOutput');

export let expressionState = INITIAL_STATE.slice();

export function updateExpression(newExpression) {
    expressionState = newExpression;
    outputElements.innerHTML = expressionState.join(' ');
}
