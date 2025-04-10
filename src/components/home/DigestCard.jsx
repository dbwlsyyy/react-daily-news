import React from 'react';
import { Button, Card } from 'react-bootstrap';

const DigestCard = ({ period = 'daily' }) => {
    const titleMap = {
        daily: '오늘의 이슈',
        weekly: '주간 이슈',
        monthly: '월간 이슈',
    };
    const textMap = {
        daily: "Here's a summary of today's top stories.",
        weekly: "Catch up on this week's most important news.",
        monthly: 'A round-up of the biggest news from this month.',
    };

    return (
        <Card className="mb-5 shadow-sm rounded-4">
            <Card.Body className="p-5">
                <Card.Title className="fw-bold">
                    📌 {titleMap[period]}
                </Card.Title>
                <Card.Text className="text-muted">{textMap[period]}</Card.Text>
                <Button variant="secondary" className="rounded-pill px-4 mt-3">
                    더보기
                </Button>
            </Card.Body>
        </Card>
    );
};

export default DigestCard;
