import { tokenize } from "./tokenizer";
import { parse } from "./parser";
import { render } from "./render";

export default function wisk(template: string) {
    return render(parse(tokenize(template)));
};
