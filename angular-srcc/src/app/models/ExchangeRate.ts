export interface ExchangeRate {
    date_recorded: string;
    currency_type: number;
    rate: number;
}

export interface CurrencyType {
    id: any;
    currency_code: string;
    currency_name: string;
}

//export const CurrencyTypes = ['CAD', 'USD'];