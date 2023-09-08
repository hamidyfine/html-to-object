import { parseNode } from './parse-node';
import { SELF_CLOSING } from '../constants';

interface ICount {
    [key: string]: {
        open: number;
        close: number;
    };
}

export const parseElement = (elements: any) => {
    if (!elements) return;
    const count: ICount = {};
    let elms: any = [];

    const addCount = (tag: string, is_close_tag: boolean) => {
        if (count[tag] === undefined) {
            count[tag] = {
                open: 0,
                close: 0,
            };
        }

        if (SELF_CLOSING.includes(tag)) {
            count[tag].close += 1;
            count[tag].open += 1;
        } else if (is_close_tag) {
            count[tag].close += 1;
        } else {
            count[tag].open += 1;
        }

        if (count[tag].open === count[tag].close) delete count[tag];
    };

    elements.forEach((el: any, i: number) => {
        const node = parseNode(el.node_string);

        const obj = {
            tag: el.tag,
            text: el.text,
            children: [],
            ...node.attrs,
        };

        if (el.is_close_tag) {
            addCount(el.tag, el.is_close_tag);
        } else {
            if (!elms.length) {
                elms.push(obj);
            } else {
                if (count[el.tag]?.close !== count[el.tag]?.open || Object.keys(count).length) {
                    const l = elms[elms.length - 1].children.length;
                    if (Object.keys(count).length > 1) {
                        elms[elms.length - 1].children[l - 1].children.push(obj);
                    } else {
                        elms[elms.length - 1].children.push(obj);
                    }
                } else {
                    elms.push(obj);
                }
            }
            addCount(el.tag, el.is_close_tag);
        }
    });

    return elms;
};
