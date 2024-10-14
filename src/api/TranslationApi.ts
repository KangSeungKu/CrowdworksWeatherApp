import axios from 'axios';
import requests from './requests';

// Google Translate API를 이용하여 영어로 번역하는 함수
export const callGoogleTranslate = async (text: string, target: string): Promise<string> => {
    if(!text.trim()) {
        return "";
    }

    try {
        const response = await axios.post(requests.fetchGoogleTranslation, null, {
            params: {
                q: text,
                target,
                key: process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY,
            },
        });

        return response.data.data.translations?.[0].translatedText;
    } catch (error) {
        console.error("Error fetching google translation api data:", error);
        throw error;
    }
};
