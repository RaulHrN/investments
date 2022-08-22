export interface Report {
    id: string;
    investmentId: string;
    month: number;
    value: number;
    year: number;
    percent?: number | string;
}
