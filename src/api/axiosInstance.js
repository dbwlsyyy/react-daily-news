import axios from 'axios';

export const naverNewsApi = axios.create({
    baseURL: 'https://openapi.naver.com/v1/search',
    headers: {
        'X-Naver-Client-Id': import.meta.env.VITE_NAVERNEWS_CLIENT_ID,
        'X-Naver-Client-Secret': import.meta.env.VITE_NAVERNEWS_CLIENT_SECRET,
    },
});

export const gptApi = axios.create({
    baseURL: 'https://api.openai.com/v1',
    headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
    },
});
