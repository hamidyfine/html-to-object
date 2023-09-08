import { describe, expect, it } from '@jest/globals';
import { cleanComments } from '../clean-comments';

describe('cleanComments', () => {
    it('should remove HTML comments from the input string', () => {
        const inputHtml = '<p>This is a <!-- comment --> test.</p>';
        const expectedOutput = '<p>This is a  test.</p>';
        const cleanedHtml = cleanComments(inputHtml);
        expect(cleanedHtml).toEqual(expectedOutput);
    });

    it('should handle multiple comments in the input', () => {
        const inputHtml = '<!-- First comment --> Some text <!-- Second comment -->';
        const expectedOutput = ' Some text ';
        const cleanedHtml = cleanComments(inputHtml);
        expect(cleanedHtml).toEqual(expectedOutput);
    });

    it('should not modify HTML without comments', () => {
        const inputHtml = '<p>This is a test.</p>';
        const expectedOutput = '<p>This is a test.</p>';
        const cleanedHtml = cleanComments(inputHtml);
        expect(cleanedHtml).toEqual(expectedOutput);
    });
});
