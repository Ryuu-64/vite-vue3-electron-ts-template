export class Category {
    text: string;
    children?: Category[];

    constructor(text: string) {
        this.text = text;
    }
}