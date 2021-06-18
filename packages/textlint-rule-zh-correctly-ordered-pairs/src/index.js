import {
  REGEX_CHINESE_PUNCTUATION_PAIR_BEGIN,
  REGEX_CHINESE_PUNCTUATION_PAIR_END,
  REGEX_CHINESE_PUNCTUATION_PAIR_USED
} from 'textlint-util-zh';

const PAIR_MAPPING = {
  ['）']: '（',
  ['〉']: '〈',
  ['》']: '《',
  ['」']: '「',
  ['』']: '『',
  ['〕']: '〔',
  ['】']: '【',
  ['”']: '“',
  ['’']: '‘'
};

export default {
  type: 'node',
  Paragraph: (context, node, helper) => {
    const { RuleError } = context;
    const nodeRaw = node.raw;
    const stack = [];

    let index = -1;
    for (const char of nodeRaw) {
      index++;
      if (REGEX_CHINESE_PUNCTUATION_PAIR_BEGIN.test(char)) {
        stack.unshift({ char, type: 'begin', index });
      } else if (REGEX_CHINESE_PUNCTUATION_PAIR_END.test(char)) {
        stack.unshift({ char, type: 'end', index });
      } else {
        continue;
      }

      const top = stack[0];
      if (top.type === 'end') {
        const pairBegin = PAIR_MAPPING[top.char];

        let target = -1;
        for (let i = 1; i < stack.length; i++) {
          if (stack[i].char === pairBegin) {
            target = i;
            break;
          }
        }

        if (target < 0) {
          return new RuleError('标点符号的使用有误，此符号不应在此出现', {
            index: top.index
          });
        }

        for (let i = 1; i < target; i++) {
          if (REGEX_CHINESE_PUNCTUATION_PAIR_USED.test(stack[i].char)) {
            return new RuleError(`标点符号的使用有误，此符号不应在${pairBegin}和${top.char}之间出现`, {
              index: stack[i].index
            });
          }
        }

        let length = target + 1;
        while (length--) {
          stack.shift();
        }
      }
    }
  }
};
