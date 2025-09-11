import { describe, expect, it } from 'vitest'
import json from './spec/specs/comments.json';
import wisk from '../src';

describe(json.overview, () => {
    json.tests.forEach(test => {
        it(test.desc, () => {
            expect(wisk(test.template)).toBe(test.expected);
        });
    });
});
