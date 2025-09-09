import { describe, it, expect } from 'vitest';
import { tokenize } from '../src/tokenizer';

describe('Tokenizer - Comments', () => {
    it('parses text and comment tokens', () => {
        const input = 'Hello {{! this is a comment }}world!';
        const tokens = tokenize(input);

        expect(tokens).toEqual([
            { type: 'text', value: 'Hello ' },
            { type: 'comment', value: ' this is a comment ' },
            { type: 'text', value: 'world!' },
        ]);
    });

    it('handles multiple comments', () => {
        const input = '{{! a }}middle{{! b}}';
        const tokens = tokenize(input);

        expect(tokens).toEqual([
            { type: 'comment', value: ' a ' },
            { type: 'text', value: 'middle' },
            { type: 'comment', value: ' b' },
        ]);
    });

    it('throws on unclosed tag', () => {
        const input = 'Text {{! missing end';
        expect(() => tokenize(input)).toThrow('Unclosed mustache tag (1, 20)');
    });
});
