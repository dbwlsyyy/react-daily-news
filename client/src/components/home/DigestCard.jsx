import React from 'react';
import { Button, Card, Container } from 'react-bootstrap';

const DigestCard = ({ period = 'daily' }) => {
    const titleMap = {
        daily: '오늘의 이슈',
        weekly: '주간 이슈',
        monthly: '월간 이슈',
    };
    const textMap = {
        daily: 'GPT 쿤이 요약해줄것임',
        weekly: "Catch up on this week's most important news.",
        monthly: 'A round-up of the biggest news from this month.',
    };

    return (
        <Container>
            <Card className="mb-5 shadow-sm rounded-4">
                <Card.Body className="p-4">
                    <Card.Title className="fw-bold">
                        📌 {titleMap[period]}
                    </Card.Title>
                    <Card.Text className="text-muted">
                        {textMap[period]}
                    </Card.Text>
                    <Button
                        variant="secondary"
                        className="rounded-pill px-4 mt-3"
                    >
                        더보기
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default DigestCard;
