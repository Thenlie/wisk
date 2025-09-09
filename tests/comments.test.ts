import { describe, expect, it } from 'vitest'
import json from './spec/specs/comments.json';

describe(json.overview, () => {
    json.tests.forEach(test => {
        it(test.desc, () => {
            expect(test.template).toBe(test.expected);
        });
    });
});
