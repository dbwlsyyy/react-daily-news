import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { createContext } from 'react';
import { auth } from '../firebase/firebaseConfig';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// context 만들기
const AuthContext = createContext();

// provider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    console.log(user);

    useEffect(() => {
        // 로그인 상태 감시
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // 컴포넌트 언마운트 시 감시 중단
        return () => {
            unsubscribe();
        };
    }, []);

    const loginWithEmail = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('로그인 중 오류 발생:', error.message);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error('로그인 오류 : ', err.message);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            console.error('로그아웃 오류 : ', err.message);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, loginWithEmail, loginWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// 커스텀 훅
export const useAuth = () => {
    return useContext(AuthContext);
};
