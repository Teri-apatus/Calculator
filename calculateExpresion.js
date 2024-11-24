class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.begin = null;
    this.length = 0;
  }

  add(listNode) {
    if (this.head && this.begin) {
      const prev = this.head;
      listNode.prev = prev;
      prev.next = listNode;
      this.head = listNode;
    } else {
      this.head = listNode;
      this.begin = listNode;
    }

    this.length += 1;

    return this;
  }

  remove(listNode) {
    if (this.begin === listNode) {
      this.begin = listNode.next;
    }

    if (this.head === listNode) {
      this.head = listNode.prev;
    }

    if (listNode.prev && listNode.next) {
      listNode.prev.next = listNode.next;
      listNode.next.prev = listNode.prev;
    } else if (listNode.prev) {
      listNode.prev.next = null;
    } else if (listNode.next) {
      listNode.next.prev = null;
    }

    this.length -= 1;

    return this;
  }
}

const MATH_OPERATION_SYMBOL_ENUM = {
  PLUS: "+",
  MINUS: "-",
  DIVIDE: "÷",
  MULTIPLY: "*",
};

const MATH_OPERATION_SYMBOLS = Object.values(MATH_OPERATION_SYMBOL_ENUM);

const OPERATIONS_FUNC = {
  [MATH_OPERATION_SYMBOL_ENUM.PLUS]: (a, b) => a + b,
  [MATH_OPERATION_SYMBOL_ENUM.MINUS]: (a, b) => a - b,
  [MATH_OPERATION_SYMBOL_ENUM.MULTIPLY]: (a, b) => a * b,
  [MATH_OPERATION_SYMBOL_ENUM.DIVIDE]: (a, b) => {
    if (b === 0) throw Error("нельзя делить на 0");
    return a / b;
  },
};

const OPEN_BRACKET = "(";
const CLOSE_BRACKET = ")";
const BRACKET_PRIORITY = 10;

const tests = [
  {
    testState: ["21", "-", "10", "÷", "2"],
    inputSymbol: "=",
    expectedOuput: ["16"],
    consoleText: "5 + 3 = 8",
  },
  {
    testState: ["5", "+", "3", "*", "2"],
    inputSymbol: "=",
    expectedOuput: ["11"],
    consoleText: "5 + 3 * 2 = 11",
  },
  {
    testState: ["5", "+", "3", "*", "(", "2", "+", "4", ")"],
    inputSymbol: "=",
    expectedOuput: ["23"],
    consoleText: "5 + 3  * ( 2 + 4 ) = 23",
  },
];

tests.forEach((test) => {
  console.log({ testState: test.testState });
  console.log({
    result: calculateExpression(test.testState),
    expected: +test.expectedOuput[0],
  });
});

function parseOperators(expression) {
  const OPERATION_WEIGH = {
    [MATH_OPERATION_SYMBOL_ENUM.PLUS]: 1,
    [MATH_OPERATION_SYMBOL_ENUM.MINUS]: 1,
    [MATH_OPERATION_SYMBOL_ENUM.MULTIPLY]: 2,
    [MATH_OPERATION_SYMBOL_ENUM.DIVIDE]: 2,
  };
  const priorityObj = {};
  let curPriority = 0;
  const list = new LinkedList();

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === OPEN_BRACKET) {
      curPriority += BRACKET_PRIORITY;
      continue;
    }
    if (expression[i] === CLOSE_BRACKET) {
      curPriority -= BRACKET_PRIORITY;
      continue;
    }

    const listNode = new ListNode(expression[i]);
    list.add(listNode);

    if (MATH_OPERATION_SYMBOLS.includes(expression[i])) {
      const curOperatorPriority = curPriority + OPERATION_WEIGH[expression[i]];
      if (!priorityObj[curOperatorPriority]) {
        priorityObj[curOperatorPriority] = [listNode];
      } else {
        priorityObj[curOperatorPriority].push(listNode);
      }
    }
  }

  return { priorityObj, list };
}

export function calculateExpression(expression) {
  const { priorityObj, list } = parseOperators(expression);

  const priorityQueue = Object.keys(priorityObj).sort((a, b) => b - a);

  priorityQueue.forEach((curPriority) => {
    priorityObj[curPriority].forEach((operationNode) => {
      const operationFunc = OPERATIONS_FUNC[operationNode.value];
      const leftListNode = operationNode.prev;
      const rightListNode = operationNode.next;
      const result = operationFunc(+leftListNode.value, +rightListNode.value);

      leftListNode.value = result;

      [operationNode, rightListNode].forEach((listNode) =>
        list.remove(listNode)
      );
    });
  });

  return list.begin.value;
}
