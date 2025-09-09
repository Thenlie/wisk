import { describe, expect, it } from 'vitest'
import { tokenize } from '../src/tokenizer';
import json from './spec/specs/comments.json';

describe(json.overview, () => {
    json.tests.forEach(test => {
        it(test.desc, () => {
            expect(test.template).toBe(test.expected);
        });
    });
});
