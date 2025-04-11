import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/home/Header';
import DigestCard from '../components/home/DigestCard';
import { useState } from 'react';
import CategoryChips from '../components/home/CategoryChips';
import NewsRecommendationList from '../components/home/NewsRecommendationList';
import TopNavBar from '../components/home/TopNavBar';

const Home = () => {
    const [period, setPeriod] = useState('daily');
    const [category, setCategory] = useState('');

    return (
        <>
            <TopNavBar />
            <Container
                fluid="md"
                className="main-wrapper"
                style={{ paddingTop: '80px' }}
            >
                <Header period={period} setPeriod={setPeriod} />
                <DigestCard period={period} />
                <CategoryChips category={category} setCategory={setCategory} />
                <NewsRecommendationList category={category} />
            </Container>
        </>
    );
};

export default Home;
