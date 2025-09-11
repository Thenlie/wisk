import { Token } from "./types";

export function render(ast: Token[]) {
    let html = '';
    for (const token of ast) {
        switch (token.type) {
            case 'text':
                html += token.value
                break;
            case 'comment':
                break;
            case 'variable':
                html += `{{ ${token.value} }}`
                break;
        }
    }
    return html;
};
