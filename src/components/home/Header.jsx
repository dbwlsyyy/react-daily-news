import React from 'react';
import { ButtonGroup, Card, Container, ToggleButton } from 'react-bootstrap';

const Header = ({ period, setPeriod }) => {
    //#3F51B5

    const filters = [
        { name: 'Daily', value: 'daily' },
        { name: 'Weekly', value: 'weekly' },
        { name: 'Monthly', value: 'monthly' },
    ];

    return (
        <Container className="mt-5">
            <h1 className="fw-bold">유진님, 뉴스가 도착했습니다 🗞️</h1>
            <p className="text-muted mb-5">
                나에게 알맞는 뉴스를 추천해드립니다. 지금 카테고리를
                선택해보세요 !
            </p>

            <ButtonGroup className="mb-3">
                {filters.map((a, i) => (
                    <ToggleButton
                        key={i}
                        id={`btn-${i}`}
                        name="radio" //
                        type="radio"
                        variant={
                            period === a.value ? 'secondary' : 'outline-dark'
                        }
                        checked={period === a.value}
                        value={a.value}
                        onChange={(e) => {
                            setPeriod(e.currentTarget.value);
                        }}
                        className="rounded-pill px-3 mx-1"
                    >
                        {a.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </Container>
    );
};

export default Header;
