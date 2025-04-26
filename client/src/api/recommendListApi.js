import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchRecommendListNews = async (category) => {
    try {
        const res = await axios.get(`${API}/api/recommend-news`, {
            params: { category },
        });
        console.log(res.data.articles);
        return res.data.articles;
    } catch (err) {
        console.error('fetchRecommendListNews 에러 : ', err);
        return [];
    }
};
