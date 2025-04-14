import React from 'react';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';

const LoginModal = ({ show, onHide }) => {
    const { loginWithEmail, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await loginWithEmail(email, password);
            console.log('로그인 성공 : ', loginWithEmail);
            onHide();
        } catch (err) {
            console.log('로그인 실패 : ', err.code);
            handleFirebaseError(err.code);
        }
    };

    const handleGoogleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await loginWithGoogle();
            console.log('로그인 성공 : ', loginWithEmail);
            onHide();
        } catch (err) {
            console.log('로그인 실패 : ', err.code);
            handleFirebaseError(err.code);
        }
    };

    const handleFirebaseError = (code) => {
        switch (code) {
            case 'auth/user-not-found':
                setError('존재하지 않는 이메일입니다.');
                break;
            case 'auth/wrong-password':
                setError('비밀번호가 틀렸습니다.');
                break;
            case 'auth/invalid-email':
                setError('이메일 형식이 올바르지 않습니다.');
                break;
            case 'auth/invalid-credential':
                setError('존재하지 않는 이메일입니다.');
                break;
            default:
                setError('로그인 중 오류가 발생했습니다.');
        }

        setTimeout(() => {
            setError('');
        }, 3000);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title className="ps-4">로그인</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4 px-5">
                <Form onSubmit={handleEmailLogin}>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>이메일</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="이메일을 입력하세요."
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            value={email}
                            required
                            className="py-2 px-3"
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            required
                            className="py-2 px-3"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-2"
                    >
                        로그인
                    </Button>
                </Form>
                <Button
                    variant="outline-dark"
                    onClick={handleGoogleLogin}
                    className="d-flex align-items-center justify-content-center w-100 mb-2"
                >
                    <FcGoogle size={20} className="me-2" />
                    Google 계정으로 로그인
                </Button>

                {error && (
                    <Alert variant="danger" className="mb-2">
                        {error}
                    </Alert>
                )}
                <Button
                    onClick={() => {
                        navigate('/signup');
                    }}
                    variant="secondary"
                    type="submit"
                    className="w-100 mb-4"
                >
                    회원가입
                </Button>
            </Modal.Body>
        </Modal>
    );
};

export default LoginModal;
