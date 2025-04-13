import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiBell, FiUser } from 'react-icons/fi'; // 알림 아이콘 가져오기
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import LoginModal from '../auth/LoginModal';
import { useEffect } from 'react';

const TopNavbar = () => {
    const { user, logout } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [isShrunk, setIsShrunk] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsShrunk(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar
                bg="light"
                variant="light"
                expand="lg"
                className={`shadow-sm px-4 py-2 fixed-top transition-navbar ${
                    isShrunk ? 'navbar-shrink' : ''
                }`}
            >
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold text-dark logo-text"
                >
                    THE NEW's
                </Navbar.Brand>

                <Nav className="ms-auto d-flex flex-row align-items-center gap-3">
                    {user ? (
                        <>
                            <Nav.Link as={Link} to="/profile">
                                {user.email}
                            </Nav.Link>
                            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link
                                onClick={() => {
                                    setShowLogin(true);
                                }}
                            >
                                로그인
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                회원가입
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar>
            <LoginModal
                show={showLogin}
                onHide={() => {
                    setShowLogin(false);
                }}
            />
        </>
    );
};

export default TopNavbar;
