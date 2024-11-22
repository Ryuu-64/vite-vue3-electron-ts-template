import {Description} from "./Description";

export class Folder {
    text: string;
    createAt: string;
    updateAt: string;
    children: Description[];

    constructor(text: string, createAt: string, updateAt: string, children: Description[]) {
        this.text = text;
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.children = children;
    }
}
