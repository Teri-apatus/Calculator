import { compareArrays } from "./utils.js";

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

const OPERATOR_ENUM = {
  PLUS: "+",
  MINUS: "-",
  DIVIDE: "÷",
  MULTIPLY: "*",
};

const MATH_OPERATION_SYMBOLS = Object.values(OPERATOR_ENUM);

const OPERATIONS_FUNC = {
  [OPERATOR_ENUM.PLUS]: (a, b) => a + b,
  [OPERATOR_ENUM.MINUS]: (a, b) => a - b,
  [OPERATOR_ENUM.MULTIPLY]: (a, b) => a * b,
  [OPERATOR_ENUM.DIVIDE]: (a, b) => {
    if (b === 0) throw Error("нельзя делить на 0");
    return a / b;
  },
};

const OPEN_BRACKET = "(";
const CLOSE_BRACKET = ")";
const BRACKET_PRIORITY = 10;

function parseOperators(expression) {
  const OPERATION_WEIGH = {
    [OPERATOR_ENUM.PLUS]: 1,
    [OPERATOR_ENUM.MINUS]: 1,
    [OPERATOR_ENUM.MULTIPLY]: 2,
    [OPERATOR_ENUM.DIVIDE]: 2,
  };

  const list = new LinkedList();
  const priorityObj = {};
  const bracketStack = [];
  let curPriority = 0;

  for (let i = 0; i < expression.length; i++) {
    if (expression[i] === OPEN_BRACKET) {
      curPriority += BRACKET_PRIORITY;
      bracketStack.push(OPEN_BRACKET);
      continue;
    }
    if (expression[i] === CLOSE_BRACKET) {
      curPriority -= BRACKET_PRIORITY;
      if (bracketStack.at(-1) === OPEN_BRACKET) {
        bracketStack.pop();
      } else {
        throw Error("Ошибка: некорректный порядок скобок");
      }

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
  let parseResult;
  try {
    parseResult = parseOperators(expression);
  } catch (e) {
    // если не получилось посчитать пока просто возвращаем как было
    // TODO: надо обработать этот кейс при вводе закрывающей скобки ,чтобы у пользователя не было возможности неправильно писать
    return expression;
  }

  const { priorityObj, list } = parseResult;

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

  return [String(list.begin.value)];
}

function testCalculateExpression() {
  const tests = [
    {
      testState: ["5", "+", "3"],
      expectedOuput: ["8"],
      consoleText: "5 + 3 = 8",
    },
    {
      testState: ["5", "+", "3", "*", "2"],
      expectedOuput: ["11"],
      consoleText: "5 + 3 * 2 = 11",
    },
    {
      testState: ["5", "+", "3", "*", "(", "2", "+", "4", ")"],
      expectedOuput: ["23"],
      consoleText: "5 + 3 * ( 2 + 4 ) = 23",
    },
    {
      testState: ["5", "+", "3", ")", "*", "(", "2", "+", "4", ")"],
      expectedOuput: ["5", "+", "3", ")", "*", "(", "2", "+", "4", ")"],
      consoleText:
        "возвращаем выражение как было при неправильном порядке скобок",
    },
  ];

  let isAllTestsPassed = true;

  tests.forEach((test) => {
    const result = calculateExpression(test.testState);

    if (!compareArrays(test.expectedOuput, result)) {
      isAllTestsPassed = false;
      console.warn(test.consoleText, {expected: test.expectedOuput, result });
    }
  });

  if (isAllTestsPassed) {
    console.log("calculateExpression: Все тесты пройдены");
  }
}

testCalculateExpression();
