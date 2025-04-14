import React from 'react';
import { Button, Container } from 'react-bootstrap';

const CategoryChips = ({ category, setCategory }) => {
    const categories = [
        '비즈니스',
        'IT',
        '건강',
        '연예',
        '스포츠',
        '패션',
        '과학',
        '여행',
    ];

    return (
        <Container className="d-flex flex-wrap gap-2 mb-4">
            {categories.map((a, i) => (
                <Button
                    key={i}
                    className="rounded-pill px-3 py-1"
                    onClick={() => {
                        setCategory(a);
                    }}
                    variant={category === a ? 'primary' : 'outline-primary'}
                >
                    {a}
                </Button>
            ))}
        </Container>
    );
};

export default CategoryChips;
