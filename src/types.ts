export type Token = 
    { type: 'text', value: string } |
    { type: 'comment', value: string } |
    { type: 'variable', value: string, isEscaped: boolean };
