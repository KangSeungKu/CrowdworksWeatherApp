import nlp from 'compromise';
import datePlugin from 'compromise-dates';
import dayjs from 'dayjs';
nlp.plugin(datePlugin);

// 특정 자연어로부터 장소를 반환하는 함수
export const getPlaceWithCompromise = (text: string) => {
    const doc = nlp(text);
    const places = doc.places().json();

    return places.length > 0 ? places[0].text : 'Seoul';
}

// 특정 자연어로부터 날짜를 반환하는 함수
export const getDatesWithCompromise = (text: string) => {
    // 작은 다옴표같은 특수문자가 포함될 경우, 정상동작하지 않는 오류가 존재
    const doc = nlp(text.replaceAll('\'', ' '));
    const resDate = doc.dates().get();
    const date = resDate?.[0]?.start;

    return dayjs(date).format('YYYY-MM-DD');
}