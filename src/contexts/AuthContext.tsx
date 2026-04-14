import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail as firebaseSendPasswordResetEmail,
    signOut,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    sendPasswordResetEmail: (email: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthLoadingScreen: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">페이지를 준비하고 있습니다.</p>
                <p className="text-xs text-muted-foreground">인증 상태를 확인하는 중입니다.</p>
            </div>
        </div>
    </div>
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadingTimeoutId = window.setTimeout(() => {
            console.warn('Auth initialization timed out. Rendering app without confirmed auth state.');
            setLoading(false);
        }, 4000);

        if (!auth) {
            window.clearTimeout(loadingTimeoutId);
            setLoading(false);
            return;
        }

        // Subscribe to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                window.clearTimeout(loadingTimeoutId);
                setUser(user);
                setLoading(false);
            },
            (error) => {
                window.clearTimeout(loadingTimeoutId);
                console.error("Auth init error:", error);
                setLoading(false);
            }
        );

        return () => {
            window.clearTimeout(loadingTimeoutId);
            unsubscribe();
        };
    }, []);

    const login = async (email: string, password: string) => {
        if (!auth) throw new Error("Firebase Auth is not configured.");

        // Auto-append domain if missing
        const fullEmail = email.includes('@') ? email : `${email}@fasoo.com`;

        // Domain restriction for @fasoo.com
        if (!fullEmail.toLowerCase().endsWith('@fasoo.com')) {
            throw new Error("@fasoo.com 계정만 로그인 가능합니다.");
        }

        try {
            await signInWithEmailAndPassword(auth, fullEmail.toLowerCase(), password);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        if (!auth) throw new Error("Firebase Auth is not configured.");
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Domain restriction for Google login
            if (user.email && !user.email.toLowerCase().endsWith('@fasoo.com')) {
                await signOut(auth); // Sign out unauthorized user
                throw new Error("@fasoo.com 계정만 로그인 가능합니다.");
            }
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    };

    const sendPasswordResetEmail = async (email: string) => {
        if (!auth) throw new Error("Firebase Auth is not configured.");

        // Auto-append domain if missing
        const fullEmail = email.includes('@') ? email : `${email}@fasoo.com`;

        if (!fullEmail.toLowerCase().endsWith('@fasoo.com')) {
            throw new Error("@fasoo.com 계정만 처리 가능합니다.");
        }

        try {
            await firebaseSendPasswordResetEmail(auth, fullEmail.toLowerCase());
        } catch (error) {
            console.error('Password reset error:', error);
            throw error;
        }
    };

    const logout = async () => {
        if (!auth) return;
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            login,
            loginWithGoogle,
            sendPasswordResetEmail,
            logout,
            loading
        }}>
            {loading ? <AuthLoadingScreen /> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
