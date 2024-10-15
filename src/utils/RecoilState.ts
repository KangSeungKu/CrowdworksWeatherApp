import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
    key: "weatherLocalStorage",
    storage: localStorage,
})

// 날씨앱 - 메세지 히스토리 데이터
export const weatherHistoryState = atom({
    key: 'weatherHistoryStateKey',
    default: [], 
    effects_UNSTABLE: [persistAtom]
});