import { Token } from './types';

export function parse(tokens: Token[]): Token[] {
  const ast: Token[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case 'text':
        ast.push({ type: 'text', value: token.value });
        break;
      case 'comment':
        ast.push({ type: 'comment', value: token.value });
        break;
      case 'variable':
        ast.push({
          type: 'variable',
          value: token.value.trim(),
          isEscaped: token.isEscaped,
        });
        break;
    }
  }

  return ast;
}
