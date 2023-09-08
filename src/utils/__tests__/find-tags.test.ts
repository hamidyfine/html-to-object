import { describe, expect, it } from '@jest/globals';
import { findTags } from '../find-tags';

describe('findTags', () => {
    it('should correctly find and parse open and close tags', () => {
        const inputHtml = '<div>This is text</div>';
        const expectedOutput = {
            tags: [
                {
                    tag: 'div',
                    text: 'This is text',
                    start_index: 0,
                    end_index: 5,
                    node_string: '<div>',
                    is_close_tag: false,
                },
            ],
        };

        const foundTags = findTags(inputHtml);
        expect(foundTags).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const inputHtml = '';
        const expectedOutput = {
            tags: [],
        };
        const foundTags = findTags(inputHtml);
        expect(foundTags).toEqual(expectedOutput);
    });

    it('should handle self-closing tags', () => {
        const inputHtml = '<img src="image.jpg" />';
        const expectedOutput = {
            tags: [
                {
                    tag: 'img',
                    text: '',
                    start_index: 0,
                    end_index: 23,
                    node_string: '<img src="image.jpg" />',
                    is_close_tag: false,
                },
            ],
        };
        const foundTags = findTags(inputHtml);
        expect(foundTags).toEqual(expectedOutput);
    });
});

