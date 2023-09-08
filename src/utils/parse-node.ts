interface TAttr {
    [key: string]: unknown;
}

interface TNode {
    tag: string;
    attrs: TAttr;
}

const getPosition = (string: string, subString: string, index: number) => {
    return string.split(subString, index).join(subString).length;
};

const createStyleObject = (string: string) => {
    let propertyValuePairs = string.split(';');
    let styleObject: TAttr = {};
    for (const index in propertyValuePairs) {
        if (propertyValuePairs[index]) {
            let pair = propertyValuePairs[index].trim().split(':');
            let key = pair[0].trim();
            let value = pair[1].trim();
            styleObject[key] = value;
        }
    }
    return styleObject;
};

export const parseNode = (node: string): TNode => {
    if (!node) return { tag: '', attrs: {} };

    let _node: string = node;
    const has_attr = node.indexOf(' ') > -1;
    const name = node.substring(1, (has_attr ? node.indexOf(' ') : node.length - 1));
    const close_char = node.indexOf('/>') > -1 ? '/>' : '>';

    // Trim white spaces and <, name, and > from node string
    _node = _node.replace('<', '').replace(close_char, '').replace(name, '').replace('\n', ' ').replace(/\s+/g, ' ').trim();

    // Create an object of attributes
    let temp = _node;
    let attrs: TAttr = {};
    if (has_attr) {
        while (temp.indexOf('=') > -1) {
            const start = 0;
            const end = temp.indexOf('=');
            const key = temp.substring(start, end).trim();
            const value = temp.substring(temp.indexOf('="') + 2, getPosition(temp, '"', 2)).trim();
            let style_value: any = null;
            if (key === 'style') style_value = createStyleObject(value);
            attrs[key] = key === 'style' && style_value ? style_value : value;
            temp = temp.substring(getPosition(temp, '"', 2) + 1, temp.length).trim();
        }

        while (temp.length && temp.indexOf('=') === -1) {
            const arr = temp.split(' ');
            arr.forEach((item: string) => {
                attrs[item] = true;
            });

            // Clean temp
            temp = '';
        }
    }

    return {
        tag: name.replace('\n', ''),
        attrs,
    };
};
