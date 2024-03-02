export interface Profesores {
    data: Data;
}

export interface Data {
    results: Result[];
}

export interface Result {
    id:          number;
    fullName:    string;
    thumbnail:   string;
    description: string;
    score:       null | string;
}
