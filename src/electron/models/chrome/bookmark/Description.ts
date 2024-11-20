import {Type} from "../../../interfaces/chrome/bookmark/Type";

export class Description implements Type {
    type: 'description';
    text: string;

    constructor(text: string) {
        this.type = 'description';
        this.text = text;
    }
}
