import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

/* 배포 전에 해당 내용 정확한 출처(origin) 지정해주기 !
const corsOptions = {
    origin: ['http://localhost:5173', 'https://side-news-client.vercel.app'], // 허용할 프론트 주소들
    credentials: true,
};
app.use(cors(corsOptions)); */

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

const openai = new OpenAI({
    apikey: process.env.OPENAI_API_KEY,
});

app.get('/api/digest-news', async (req, res) => {
    const { query, from, to } = req.query;

    try {
        const newsResult = await axios.get(
            'https://newsapi.org/v2/everything',
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
                },
                params: {
                    q: query,
                    from: from,
                    to: to,
                    sortBy: 'popularity',
                    pageSize: 1,
                    language: 'ko',
                },
            }
        );

        const article = newsResult.data.articles[0];

        const contentToSummarize = article.description;

        const gptResult = await openai.responses.create({
            model: 'gpt-4', // 또는 'gpt-3.5-turbo'
            input: `${contentToSummarize} 이 기사를 이해하기 쉽게 요약해줘. 요약은 친절하고 정확한 말투로 써줘. ~입니다. 이런식으로`,
        });

        const summary = gptResult.output_text;

        res.json({
            original: article,
            summary,
        });
    } catch (error) {
        console.error('digest ERROR : ', error.response?.data || error.message);
        res.status(500).json({ error: 'DigestCard 요청 실패' });
    }
});

app.get('/api/recommend-news', async (req, res) => {
    const { category } = req.query;
    try {
        const result = await axios.get('http://newsapi.org/v2/everything', {
            headers: {
                Authorization: `Bearer ${process.env.NEWS_API_KEY}`,
            },
            params: {
                q: category,
                sortBy: 'relevancy',
                language: 'ko',
                pageSize: 10,
            },
        });
        res.json(result.data);
    } catch (error) {
        console.error(
            'recommendList ERROR : ',
            error.response?.data || error.message
        );
        res.status(500).json({ error: 'RecommendList 요청 실패' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
