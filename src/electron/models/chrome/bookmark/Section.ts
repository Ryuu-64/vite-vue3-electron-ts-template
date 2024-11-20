import {Type} from "../../../interfaces/chrome/bookmark/Type";

export class Section implements Type {
    type: 'section';
    title: string;
    attributes: {
        add_date: string;
        last_modified: string;
        personal_toolbar_folder: string;
    };

    constructor(title: string, add_date: string, last_modified: string, personal_toolbar_folder: string) {
        this.type = 'section';
        this.title = title;
        this.attributes = {
            add_date,
            last_modified,
            personal_toolbar_folder
        };
    }
}
