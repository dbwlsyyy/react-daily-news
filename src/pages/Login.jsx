import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { auth } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userSignIn = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log('로그인 성공 : ', userSignIn);
            navigate('/');
        } catch (err) {
            console.log('로그인 실패 : ', err.code);

            hendleFirebaseError(err.code);
        }
    };

    const hendleFirebaseError = (code) => {
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
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <Card
                style={{ width: '100%', maxWidth: '400px' }}
                className="p-4 shadow"
            >
                <br />
                <h2 className="mb-4 text-center">LogIn 🔒</h2>
                <br />
                <Form onSubmit={handleLogin}>
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
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>비밀번호</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="비밀번호를 입력하세요."
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            value={password}
                            required
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        className="w-100 mb-3"
                    >
                        로그인
                    </Button>

                    {error && (
                        <Alert variant="danger" className="mb-3">
                            {error}
                        </Alert>
                    )}
                </Form>
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
            </Card>
        </Container>
    );
};

export default Login;
