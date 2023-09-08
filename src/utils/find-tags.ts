interface TNodeObject {
    tag: string;
    text: string | null;
    start_index: number;
    end_index: number;
    node_string: string;
    is_close_tag: boolean;
}

export const findTags = (html: string) => {
    const tags: Array<TNodeObject> = [];

    let temp = html;

    while ((temp.indexOf('<') > -1) && (temp.indexOf('>') > -1)) {
        const diff = html.length - temp.length;
        const _temp_for_text = temp.substring(temp.indexOf('>') + 1, html.length - 1);
        const text = _temp_for_text.substring(0, _temp_for_text.indexOf('<')).trim();
        const _temp = _temp_for_text.substring(_temp_for_text.indexOf('<'), temp.length - 1);

        const index = {
            start: temp.indexOf('<'),
            end: temp.indexOf('>') + 1,
            space: 0,
        };

        const node_string = temp.substring(index.start, index.end).replace('\n', ' ').replace(/\s+/g, ' ').trim();

        let is_close_tag = node_string.indexOf('/') === 1;
        if (temp.indexOf('/>') > -1 && temp.indexOf('/>') === (index.end - 2)) {
            index.end = temp.indexOf('/>') + 2;
            is_close_tag = false;
        }

        index.space = node_string.indexOf(' ') > -1 ? node_string.indexOf(' ') : node_string.length - 1;
        const tag = node_string.substring(is_close_tag ? index.start + 2 : index.start + 1, index.space);

        const obj: TNodeObject = {
            tag,
            text: is_close_tag ? null : text,
            start_index: index.start + diff,
            end_index: index.end + diff,
            node_string,
            is_close_tag,
        };

        tags.push(obj);
        temp = _temp;
    }

    return {
        tags,
    };
};
