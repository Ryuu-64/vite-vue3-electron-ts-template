import {DescriptionTerm} from "../../../../interfaces/chrome/bookmark/new/DescriptionTerm";

export class DescriptionTermLeafNode implements DescriptionTerm {
    href?: string;
    text?: string;
    createAt?: string;
}
