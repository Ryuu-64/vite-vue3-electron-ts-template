import {Description} from "./Description";
import {Nested} from "./Nested";
import {Section} from "./Section";
import {Type} from "../../../interfaces/chrome/bookmark/Type";

export class Item implements Type {
    type: 'item';
    text: string;
    children: (Section | Item | Description | Nested)[];

    constructor(text: string, children: (Section | Item | Description | Nested)[]) {
        this.type = 'item';
        this.text = text;
        this.children = children;
    }
}