import {Type} from "../../../interfaces/chrome/bookmark/Type";
import {Item} from "./Item";

export class Nested implements Type {
    type: 'nested';
    content: Item[];

    constructor(content: Item[]) {
        this.type = 'nested';
        this.content = content;
    }
}
