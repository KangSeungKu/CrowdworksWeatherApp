import axios from "axios";
import requests from "./requests";
import { WeatherMapResponse } from "../types/weatherType";

export const getWeatherData = async (city: string, date: string): Promise<WeatherMapResponse> => {
  try {
    // 오늘인지 여부에 따라 요청 URL변경
    const isToday = new Date().toLocaleDateString() === new Date(date).toLocaleDateString();
    const url = isToday ? requests.fetchCurrentWeatherData : requests.fetchClimaticForecast30days;

    const response = await axios.get(url, {
      params: {
        q: city,
        appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    });

    // 요청 API에 따라 반환되는 데이터가 달라 분기처리
    if(!isToday) {
      const { city, list } = response.data;
      
      const weatherData = list.find((item: any) => item.dt_txt.includes(date));
      
      return {
        city: city.name,
        description: weatherData.weather?.[0].description,
        temp: weatherData.main.temp,
        date: date,
      };
    }

    return {
      city: response.data.name,
      description: response.data.weather[0].description,
      temp: response.data.main.temp,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
