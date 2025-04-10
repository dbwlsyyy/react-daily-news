import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/home/Header';
import DigestCard from '../components/home/DigestCard';
import { useState } from 'react';
import CategoryChips from '../components/home/CategoryChips';
import NewsRecommendationList from '../components/home/NewsRecommendationList';

const Home = () => {
    const [period, setPeriod] = useState('daily');
    const [category, setCategory] = useState('');

    return (
        <Container>
            <Header period={period} setPeriod={setPeriod} />
            <DigestCard period={period} />
            <CategoryChips category={category} setCategory={setCategory} />
            <NewsRecommendationList category={category} />
        </Container>
    );
};

export default Home;
