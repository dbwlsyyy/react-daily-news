import React from 'react';
import { Button, Container } from 'react-bootstrap';

const CategoryChips = ({ category, setCategory }) => {
    const categories = [
        'Business',
        'IT',
        'Health',
        'Entertainment',
        'Sports',
        'Fashion',
        'Science',
        'Travel',
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
