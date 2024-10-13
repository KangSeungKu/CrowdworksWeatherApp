import { useState } from "react"
import { getWeatherData } from "../../api/OpenWeatherMapApi";

export default function WeatherQnAPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleQuestionBtn = async () => {
        try {
            const weatherData = await getWeatherData('Seoul', '2024-10-10');

            console.log(weatherData);
            setAnswer('Fetch 완료');
        } catch (error) {
            if(error instanceof Error) {
                setAnswer(error.message)
            }
        }
    }

    return (
        <div>
            <p>날씨 질문 페이지</p>
            <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button onClick={handleQuestionBtn}>확인</button>

            {answer &&
                <p>{answer}</p>
            }
        </div>
    )
}