import { Token } from "./types";

enum State {
    TEXT,
    TAG_START,
    TAG,
}

export function tokenize(template: string): Token[] {
    const tokens: Token[] = [];
    let state = State.TEXT;
    let buffer = '';
    let tagBuffer = '';

    let lineNum = 1;
    let colNum = 0;
    for (let i = 0; i < template.length; i++) {
        const ch = template[i];
        const next = template[i + 1];

        colNum++;
        if (ch === '\n') {
            lineNum++;
            colNum = 1;
        }

        switch (state) {
            case State.TEXT:
                if (ch === '{' && next === '{') {
                    if (buffer) {
                        tokens.push({ type: 'text', value: buffer });
                        buffer = '';
                    }
                    state = State.TAG;
                    i++; // consume second '{'
                    colNum++;
                } else {
                    buffer += ch;
                }
                break;

            case State.TAG:
                if (ch === '}' && next === '}') {
                    if (tagBuffer.startsWith('!')) {
                        tokens.push({
                            type: 'comment',
                            value: tagBuffer.slice(1), // strip '!'
                        });
                    } else {
                        // For now, fall back to treating the raw tag as text
                        tokens.push({
                            type: 'text',
                            value: `{{${tagBuffer}}}`,
                        });
                    }
                    tagBuffer = '';
                    state = State.TEXT;
                    i++; // consume second '}'
                    colNum++;
                } else {
                    tagBuffer += ch;
                }
                break;
        }
    }

    if (state === State.TEXT && buffer) {
        tokens.push({ type: 'text', value: buffer });
    } else if (state === State.TAG) {
        throw new Error(`Unclosed mustache tag (${lineNum}, ${colNum})`);
    }

    return tokens;
}
