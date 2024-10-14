export interface Message {
    text: string;
    isUser: boolean;
}

export interface WeatherMapResponse {
    city: string;
    temp: number;
    description: string;
    date?: string;
}