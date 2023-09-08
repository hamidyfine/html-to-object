import { describe, expect, it } from '@jest/globals';
import { parseElement } from '../parse-elements';

describe('parseElement', () => {
    it('should parse elements correctly', () => {
        const elements = [
            {
                tag: 'div',
                text: 'This is a div',
                node_string: '<div>',
                is_close_tag: false,
            },
            {
                tag: 'p',
                text: 'This is a paragraph',
                node_string: '<p>',
                is_close_tag: false,
            },
            {
                tag: 'p',
                text: null,
                node_string: '</p>',
                is_close_tag: true,
            },
            {
                tag: 'div',
                text: null,
                node_string: '</div>',
                is_close_tag: true,
            },
        ];

        const expectedOutput = [
            {
                tag: 'div',
                text: 'This is a div',
                children: [
                    {
                        tag: 'p',
                        text: 'This is a paragraph',
                        children: [],
                    },
                ],
            },
        ];

        const parsedElements = parseElement(elements);
        expect(parsedElements).toEqual(expectedOutput);
    });

    it('should handle empty input', () => {
        const elements: any = [];
        const expectedOutput: any = [];
        const parsedElements = parseElement(elements);
        expect(parsedElements).toEqual(expectedOutput);
    });
});
