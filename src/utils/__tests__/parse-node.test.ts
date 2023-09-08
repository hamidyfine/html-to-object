import { describe, expect, it } from '@jest/globals';
import { parseNode } from '../parse-node';

describe('parseNode', () => {
    it('should parse a simple node without attributes correctly', () => {
        const inputNode = '<div>';
        const expectedOutput = {
            tag: 'div',
            attrs: {},
        };
        const parsedNode = parseNode(inputNode);
        expect(parsedNode).toEqual(expectedOutput);
    });

    it('should parse a node with attributes correctly', () => {
        const inputNode = '<a href="https://example.com" target="_blank" style="color: blue;">';
        const expectedOutput = {
            tag: 'a',
            attrs: {
                href: 'https://example.com',
                target: '_blank',
                style: {
                    color: 'blue',
                },
            },
        };
        const parsedNode = parseNode(inputNode);
        expect(parsedNode).toEqual(expectedOutput);
    });

    it('should handle an empty input node', () => {
        const inputNode = '';
        const expectedOutput = {
            tag: '',
            attrs: {},
        };
        const parsedNode = parseNode(inputNode);
        expect(parsedNode).toEqual(expectedOutput);
    });
});
