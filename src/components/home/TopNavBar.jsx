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
                bg="dark"
                variant="dark"
                expand="lg"
                className={`shadow-sm fixed-top transition-navbar ${
                    isShrunk ? 'navbar-shrink' : ''
                }`}
            >
                <Navbar.Brand
                    as={Link}
                    to="/"
                    className="fw-bold text-light logo-text"
                >
                    THE NEW's
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
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

                        {/*<Nav.Link as={Link} to="/notification" className="text-light">
                    <FiBell size={25} />
                </Nav.Link>*/}
                    </Nav>
                </Navbar.Collapse>
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
