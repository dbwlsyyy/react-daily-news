import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export const fetchDigestNews = async (from, to) => {
    try {
        const res = await axios.get(`${API}/api/digest-news`, {
            params: {
                query: '정치',
                from: from,
                to: to,
            },
        });
        console.log('🔥 digestNews:', res.data);

        return res.data;
    } catch (error) {
        console.error('fetchDigestNews 에러 :', error);
        return [];
    }
};
