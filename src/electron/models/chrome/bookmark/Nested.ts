import {Type} from "../../../interfaces/chrome/bookmark/Type";
import {Item} from "./Item";
import {Link} from "./Link";

export class Nested implements Type {
    type: 'nested';
    content: (Item | Link)[];

    constructor(content: (Item | Link)[]) {
        this.type = 'nested';
        this.content = content;
    }
}
