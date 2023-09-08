export const cleanComments = (html: string) => {
    let new_html: string = html;
    while (new_html.indexOf('<!--') > -1) {
        const start = new_html.indexOf('<!--');
        const end = new_html.indexOf('-->') + 3;
        new_html = new_html.substring(0, start) + new_html.substring(end, new_html.length);
    }

    return new_html;
};
