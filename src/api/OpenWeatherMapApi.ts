import axios from "axios";
import requests from "./requests";

export const getWeatherData = async (city: string, date: string) => {
  try {
    // 오늘인지 여부에 따라 요청 URL변경
    const url = new Date().toLocaleDateString() === new Date(date).toLocaleDateString() ? requests.fetchCurrentWeatherData : requests.fetchClimaticForecast30days;
    
    const response = await axios.get(url, {
      params: {
        q: city,
        appid: process.env.OPENWEATHERMAP_API_KEY,
        units: 'metric',
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
