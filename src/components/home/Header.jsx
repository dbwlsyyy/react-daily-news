import React from 'react';
import { ButtonGroup, Card, Container, ToggleButton } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Header = ({ period, setPeriod }) => {
    const filters = [
        { name: 'Daily', value: 'daily' },
        { name: 'Weekly', value: 'weekly' },
        { name: 'Monthly', value: 'monthly' },
    ];
    const { user } = useAuth();

    return (
        <Container className="mt-5 main-wrapper">
            <h1 className="fw-bold">
                {user ? `${user.displayName}님` : '안녕하세요'}, 뉴스가
                도착했습니다! 🗞️
            </h1>
            <p className="text-muted mb-5">
                알잘딱깔센 뉴스를 추천해드립니다. 지금 카테고리를 선택해보세요.
                😎
            </p>

            <ButtonGroup className="mb-3">
                {filters.map((a, i) => (
                    <ToggleButton
                        key={i}
                        id={`btn-${i}`}
                        name="radio"
                        type="radio"
                        variant={
                            period === a.value ? 'primary' : 'outline-primary'
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
