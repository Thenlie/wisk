import { describe, it, expect } from 'vitest';
import { parse } from '../src/parser';
import { tokenize } from '../src/tokenizer';

describe('Parser', () => {
  it('parses text and variables', () => {
    const template = 'Hello {{ name }}!';
    const tokens = tokenize(template);
    const ast = parse(tokens);

    expect(ast).toEqual([
      { type: 'text', value: 'Hello ' },
      { type: 'variable', value: 'name', isEscaped: false },
      { type: 'text', value: '!' },
    ]);
  });

  it('parses comments and variables together', () => {
    const template = '{{!ignore}}{{ name }}';
    const tokens = tokenize(template);
    const ast = parse(tokens);

    expect(ast).toEqual([
      { type: 'comment', value: 'ignore' },
      { type: 'variable', value: 'name', isEscaped: false },
    ]);
  });
});
