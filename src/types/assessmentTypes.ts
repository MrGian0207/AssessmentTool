export interface Assessment {
    title:       string;
    description: string;
    questions:   Question[];
    results:     Result[];
}

export interface Question {
    id:      number;
    title:   string;
    options: Option[];
}

export interface Option {
    id:    number;
    text:  Text;    
    score: number;
}

export enum Text {
    Có = "Có",
    Không = "Không",
    KhôngRõVấnĐềNày = "Không rõ vấn đề này",
}

export interface Result {
    level:           number;
    icon:            string;
    name:            string;
    range:           number[];
    description:     Tion;
    key_actions:     Tion[];
    key_actions_cta: KeyActionsCta;
}

export interface Tion {
    text:      string;
    image_url: string;
}

export interface KeyActionsCta {
    text: string;
    url:  string;
}
