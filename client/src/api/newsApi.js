import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchNewsapiNews = async (query) => {
    try {
        const res = await axios.get(`${API}/api/newsapi-news`, {
            params: { query },
        });
        return res.data.articles;
    } catch (err) {
        console.error('뉴스 불러오기 실패:', err);
        return [];
    }
};

/* 네이버 뉴스
export const fetchNaverNews = async (query) => {
    console.log(`쿼리: ${query}`);
    try {
        const res = await axios.get(`${API}/api/naver-news`, {
            params: { query },
        });
        console.log('뉴스 데이터 :', res.data);
        return res.data.items;
    } catch (err) {
        console.error('뉴스 불러오기 실패:', err);
        return [];
    }
};
*/
