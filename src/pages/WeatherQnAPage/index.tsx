import { useState } from "react"
import { getWeatherData } from "../../api/OpenWeatherMapApi";
import { getDatesWithCompromise, getPlaceWithCompromise } from "../../utils/CompromiseUtil";
import { callGoogleTranslate } from "../../api/TranslationApi";
import { WeatherChat } from "../../components/chats/WeatherChat";
import { WeatherQueryInput } from "../../components/inputs/WeatherQueryInput";
import { Message } from "../../types/weatherType";
import { WeatherContainer } from "./index.styles";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { weatherHistoryState } from "../../utils/RecoilState";

export default function WeatherQnAPage() {
    const [question, setQuestion] = useState("");               // 질문
    const [messages, setMessages] = useRecoilState<Message[]>(weatherHistoryState);    // 화면에 표시할 답변

    const handleQuestionBtn = async () => {
        // 사용자 질문 메세지 배열에 추가
        setMessages((prev) => [...prev, { text: question, isUser: true }]);

        // 날씨 외에 다른 질문에 대한 처리
        if(!question.includes("날씨")) {
            setMessages((prev) => [...prev, { text: '현재 날씨에 관해서만 답할 수 있으므로, 날씨에 대해 물어봐주시기 바랍니다.', isUser: false }]);
            return;
        }

        try {
            const translatedQuestion = await callGoogleTranslate(question, 'en');   // Translation API를 통해 질문을 영문으로 번역
            const place = getPlaceWithCompromise(translatedQuestion);                   // 장소
            const koPlace = await callGoogleTranslate(place, 'ko')                   // 장소(한글)
            const date = getDatesWithCompromise(translatedQuestion);                 // 날짜
            const weatherData = await getWeatherData(place, date);      // WeatherMap API를 통한 데이터

            
            // 화면에 표시할 메세지 배열에 Setting
            const botMessage: Message = { 
                text: `${weatherData.date ? dayjs(weatherData.date).format('MM월 DD일') : '오늘'} ${koPlace}의 날씨는 ${weatherData.description}이며, 온도는 ${weatherData.temp}°C입니다.`, 
                isUser: false 
            };
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