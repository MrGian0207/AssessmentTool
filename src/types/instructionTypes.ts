export interface Instruction {
    title:       string;
    descriptions: Description[];
}

export interface Description {
    id:   number;
    text: string;
}
