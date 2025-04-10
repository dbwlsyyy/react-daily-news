import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

const NewsRecommendationList = ({ category }) => {
    const dummyNews = [
        {
            id: 1,
            title: 'Apple launches new MacBook Air',
            summary:
                'Apple has released the latest MacBook Air featuring the M3 chip and improved battery life.',
        },
        {
            id: 2,
            title: 'Tesla stock rises after earnings report',
            summary:
                'Tesla’s stock saw a 5% increase following a strong Q1 earnings report beating analyst expectations.',
        },
        {
            id: 3,
            title: 'ChatGPT breaks new user records',
            summary:
                'OpenAI’s ChatGPT hits 100M daily users, revolutionizing the way people search and learn.',
        },
    ];

    return (
        <Container>
            <h5>{category} News</h5>
            <Row className="gy-3">
                {dummyNews.map((news) => (
                    <Col xs={12} key={news.id}>
                        <Card className="rounded-4 shadow-sm">
                            <Card.Body>
                                <Card.Title className="fw-semibold">
                                    {news.title}
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    {news.summary}
                                </Card.Text>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="rounded-pill"
                                >
                                    자세히 보기
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewsRecommendationList;
