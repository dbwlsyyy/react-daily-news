import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { fetchNaverNews } from '../../api/newsApi';
import '../../css/NewsRecommendationList.css';

const NewsRecommendationList = ({ category }) => {
    const [newsList, setNewsList] = useState([]);

    useEffect(() => {
        console.log('newsList : ', newsList);

        const loadNews = async () => {
            try {
                const result = await fetchNaverNews(category);
                setNewsList(result);
                console.log('result:', result);
            } catch (error) {
                console.error('뉴스 불러오기 실패 : ', error);
            }
        };

        if (category) {
            loadNews();
        }
    }, [category]);

    return (
        <Container className="news-recommendation-container">
            <h4 className="section-title">
                {category ? (
                    `📬 요즘 뜨는 ${category} ISSUE`
                ) : (
                    <>
                        요즘 뜨는 트렌드 이슈들을 확인할 수 있습니다. <br />
                        궁금한 내용은 THT NEW's 챗봇에게 바로 질문해보세요!
                    </>
                )}
            </h4>
            <Row className="gy-4">
                {newsList.map((news, i) => (
                    <Col xs={12} key={i}>
                        <Card className="news-card">
                            <Card.Body>
                                <Card.Title className="news-title">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: news.title,
                                        }}
                                    />
                                </Card.Title>
                                <Card.Text className="news-description">
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: news.description,
                                        }}
                                    />
                                </Card.Text>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    className="view-more-btn"
                                    onClick={() =>
                                        window.open(news.link, '_blank')
                                    }
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
