export const REGEX_CHINESE_CHARACTER = /^[\p{Script=Han}]$/u;

export const REGEX_CHINESE_PUNCTUATION = /^[（）〈〉《》「」『』〔〕…—～﹏、【】，。？！：；“”‘’]$/u;
export const REGEX_CHINESE_PUNCTUATION_PAIR_USED = /^[（）〈〉《》「」『』﹃﹄〔〕【】“”‘’]$/u;
export const REGEX_CHINESE_PUNCTUATION_PAIR_BEGIN = /^[（〈《「『〔【“‘]$/u;
export const REGEX_CHINESE_PUNCTUATION_PAIR_END = /^[）〉》」』〕】”’]$/u;

export const REGEX_UNIT_SYMBOL = /^[℉℃°%]$/u;

export const REGEX_NUMBER = /^\d$/;

export const REGEX_ENGLISH_WORD_CHARACTER = /^[a-z-]$/i;

export const REGEX_SPACE = /^\s$/;
