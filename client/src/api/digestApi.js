import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const fetchDigestSummary = async (period) => {};

const getQueryFromPeriod = (period) => {
    switch (period) {
        case 'daily':
            return '오늘의 주요뉴스';
    }
};
