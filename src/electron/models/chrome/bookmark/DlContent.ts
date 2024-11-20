import {Type} from "../../../interfaces/chrome/bookmark/Type";
import {Section} from "./Section";
import {Item} from "./Item";
import {Description} from "./Description";

export class DlContent implements Type {
    type: 'item' | 'section' | 'nested' | 'description';
    text?: string;
    title?: string;
    children?: (Section | Item | Description)[];
    content?: Item[];
    attributes?: {
        add_date?: string;
        last_modified?: string;
        personal_toolbar_folder?: string;
    };
    footer?: string;

    constructor(type: 'item' | 'section' | 'nested' | 'description', options: any) {
        this.type = type;
        if (options.text) this.text = options.text;
        if (options.title) this.title = options.title;
        if (options.children) this.children = options.children;
        if (options.content) this.content = options.content;
        if (options.attributes) this.attributes = options.attributes;
        if (options.footer) this.footer = options.footer;
    }
}
