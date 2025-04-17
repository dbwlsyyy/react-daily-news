import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
/* 배포 전에 해당 내용 정확한 출처(origin) 지정해주기 !
const corsOptions = {
    origin: ['http://localhost:5173', 'https://side-news-client.vercel.app'], // 허용할 프론트 주소들
    credentials: true,
};
app.use(cors(corsOptions)); */
app.use(express.json());

const PORT = 5000;

app.get('/api/newsapi-news', async (req, res) => {
    const { query } = req.query;
    console.log(`newsAPI 쿼리 받음: ${query}`);

    try {
        const result = await axios.get('https://newsapi.org/v2/everything', {
            headers: {
                Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
            },
            params: {
                q: query,
                language: 'ko',
                sortBy: 'relevancy',
                pageSize: 10,
            },
        });
        console.log('news API 데이터:', result.data);
        res.json(result.data);
    } catch (error) {
        console.error(
            '🔥 news API 에러 발생:',
            error.response?.data || error.message
        );
        res.status(500).json({ error: 'news API에서 fetch 실패' });
    }
});

/* 네이버 뉴스 api
app.get('/api/naver-news', async (req, res) => {
    const { query } = req.query;
    console.log(`쿼리 받음: ${query}`);

    try {
        const result = await axios.get(
            'https://openapi.naver.com/v1/search/news.json',
            {
                headers: {
                    'X-Naver-Client-Id': process.env.NAVER_NEWS_CLIENT_ID,
                    'X-Naver-Client-Secret':
                        process.env.NAVER_NEWS_CLIENT_SECRET,
                },
                params: {
                    query,
                    display: 10,
                    sort: 'sim',
                },
            }
        );
        console.log('Naver response:', result.data);
        res.json(result.data);
    } catch (error) {
        console.error(
            '🔥 서버에서 에러 발생:',
            error.response?.data || error.message
        );
        res.status(500).json({ error: 'Failed to fetch news from Naver' });
    }
});
*/

app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
