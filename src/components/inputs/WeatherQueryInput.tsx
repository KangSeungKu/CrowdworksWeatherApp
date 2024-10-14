import { Input, InputContainer, SendButton } from "./WeatherQueryInput.styles"

interface Props {
    query?: string;
    handleInputChange?: (value: string) => void;
    handleSendMessage?: () => void;
}

export const WeatherQueryInput = ({ 
    query, 
    handleInputChange = (value: string) => value, 
    handleSendMessage = () => {},
}: Props) => {
    return (
        <InputContainer>
            <Input
                value={query}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="메시지를 입력하세요..."
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>➤</SendButton>
        </InputContainer>
    )
}