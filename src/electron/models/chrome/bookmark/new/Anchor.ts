/**
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a
 */
export class Anchor {
    text?: string;
    href?: string;
    createAt?: string;
    icon?: string;

    constructor(text: string, href: string, createAt: string, icon: string) {
        this.text = text;
        this.href = href;
        this.createAt = createAt;
        this.icon = icon;
    }
}
