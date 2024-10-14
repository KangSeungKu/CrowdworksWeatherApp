import { Message } from "../../types/weatherType";
import { Chat, ChatContainer } from "./WeatherChat.styles";

interface Props {
    messages: Message[];
}

export const WeatherChat = ({
    messages,

}: Props) => {
    return (
        <ChatContainer>
            {messages.map((message, index) => (
                <Chat key={index} isUser={message.isUser}>
                    {message.text}
                </Chat>
            ))}
        </ChatContainer>
    )
}