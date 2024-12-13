import { INITIAL_STATE } from './variables.js';

export let expressionState = INITIAL_STATE.slice();

export function updateExpression(domNode, newExpression) {
    expressionState = newExpression;
    domNode.innerHTML = expressionState.join(' ');
}
