import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { Alert, Button, Card, Container, Form } from 'react-bootstrap';
import { auth } from '../firebase/firebaseConfig';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('회원가입 정보:', { email, password });
        setSuccess('');
        setError('');

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccess('회원가입 성공 ✔️');
            setEmail('');
            setPassword('');
        } catch (error) {
            handleFirebaseError(error.code);
        }
    };

    const handleFirebaseError = (code) => {
        let message = '';

        switch (code) {
            case 'auth/email-already-in-use':
                message = '이미 사용 중인 이메일입니다.';
                break;
            case 'auth/invalid-email':
                message = '이메일 형식이 올바르지 않습니다.';
                break;
            case 'auth/weak-password':
                message = '비밀번호는 6자 이상이어야 합니다.';
                break;
            default:
                message = '회원가입 중 오류가 발생했습니다.';
        }

        setError(message);

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
                style={{
                    width: '100%',
                    maxWidth: '400px',
                }}
                className="p-4 shadow"
            >
                <br />
                <h2 className="mb-4 text-center">SignUp 🖋️</h2>
                <br />

                <Form onSubmit={handleSignup}>
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
                    <Form.Group className="mb-3" controlId="formPassword">
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

                    <Button variant="primary" type="submit" className="w-100">
                        회원가입
                    </Button>
                    {success && <Alert className="mt-3">{success}</Alert>}
                    {error && (
                        <Alert variant="danger" className="mt-3">
                            {error}
                        </Alert>
                    )}
                    <div style={{ marginBottom: '1.5rem' }}></div>
                </Form>
            </Card>
        </Container>
    );
};

export default Signup;
