import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { fetchDigestNews } from '../../api/digestApi';

const DigestCard = ({ period = 'daily' }) => {
    const [digest, setDigest] = useState(null);

    const titleMap = {
        daily: '오늘의 이슈',
        weekly: '주간 이슈',
        monthly: '월간 이슈',
    };

    useEffect(() => {
        const loadNews = async () => {
            const now = new Date();
            let from;

            if (period === 'daily') {
                from = new Date();
                from.setDate(now.getDate() - 1);
            } else if (period === 'weekly') {
                from = new Date();
                from.setDate(now.getDate() - 7);
            } else {
                from = new Date();
                from.setMonth(now.getMonth() - 1);
            }

            const formattedFrom = from.toISOString().split('T')[0];
            const formattedTo = now.toISOString().split('T')[0];

            const result = await fetchDigestNews(formattedFrom, formattedTo);
            setDigest(result);
        };

        loadNews();
    }, [period]);

    return (
        <Container>
            <Card className="mb-5 shadow-sm rounded-4">
                <Card.Body className="p-4">
                    <Card.Title className="fw-bold">
                        📌 {titleMap[period]}
                    </Card.Title>
                    <Card.Text className="text-muted"></Card.Text>

                    {digest ? (
                        <div className="mt-3">
                            <strong>{digest.original.title}</strong>
                            <p className="text-muted mt-3">{digest.summary}</p>
                        </div>
                    ) : (
                        <p className="text-muted mt-3">
                            뉴스를 불러오는 중입니다...
                        </p>
                    )}
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
