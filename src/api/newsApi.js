import { naverNewsApi } from './axiosInstance';

export const fetchNaverNews = async (query = '오늘의 뉴스') => {
    const res = await naverNewsApi.get('/news.json', {
        params: {
            query: query,
            display: 5,
            sort: 'sim',
        },
    });

    return res.data.items;
};
