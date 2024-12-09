import { testGetNewExpressionState } from './testGetNewExpressionState.js';
import { testCalculateExpression } from './testCalculateExpression.js';

const allTests = [testGetNewExpressionState, testCalculateExpression];

export function runTests() {
    allTests.forEach((test) => {
        test();
    });
}

runTests();
