export class Link {
    type: 'link' = 'link';
    text: string;
    href: string;
    add_date?: string;
    icon?: string;

    constructor(text: string, href: string, add_date?: string, icon?: string) {
        this.text = text;
        this.href = href;
        this.add_date = add_date;
        this.icon = icon;
    }
}
