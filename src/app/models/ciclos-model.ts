export interface Ciclos {
    data: Data;
}

export interface Data {
    results: Result[];
}

export interface Result {
    id:          number;
    emoji:       string;
    cycleNumber: string;
}