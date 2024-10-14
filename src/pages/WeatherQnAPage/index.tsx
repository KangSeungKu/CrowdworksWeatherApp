import { useState } from "react"
import { getWeatherData } from "../../api/OpenWeatherMapApi";
import { getDatesWithCompromise, getPlaceWithCompromise } from "../../utils/CompromiseUtil";
import { callGoogleTranslate } from "../../api/TranslationApi";
import { WeatherChat } from "../../components/chats/WeatherChat";
import { WeatherQueryInput } from "../../components/inputs/WeatherQueryInput";
import { Message } from "../../types/weatherType";
import { WeatherContainer } from "./index.styles";

export default function WeatherQnAPage() {
    const [question, setQuestion] = useState("");               // 질문
    const [messages, setMessages] = useState<Message[]>([]);    // 화면에 표시할 답변

    const handleQuestionBtn = async () => {
        try {
            const translatedQuestion = await callGoogleTranslate(question, 'en');
            const place = getPlaceWithCompromise(translatedQuestion);
            const date = getDatesWithCompromise(translatedQuestion);

            const weatherData = await getWeatherData(place, date);
            console.log(weatherData);

            const userMessage: Message = { text: question, isUser: true };
            const botMessage: Message = { text: `현재 ${weatherData.name}의 날씨는 ${weatherData.weather[0].description}이며, 온도는 ${weatherData.main.temp}°C입니다.`, isUser: false };
            
            // 화면에 표시할 메세지 배열에 Setting
            setMessages((prev) => [...prev, userMessage]);
            setMessages((prev) => [...prev, botMessage]);
            // input 초기화
            setQuestion('');
        } catch (error) {
            if(error instanceof Error) {
                console.error(error.message);
            }
        }
    }

    const handleInputChange = (value: string) => {
        setQuestion(value);
    };

    return (
        <WeatherContainer>
            <WeatherChat messages={messages}/>
            <WeatherQueryInput 
                query={question}
                handleInputChange={handleInputChange}
                handleSendMessage={handleQuestionBtn}
            />
        </WeatherContainer>
    )
}