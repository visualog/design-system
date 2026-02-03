import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { version } from '../../package.json';
import AntiGravityBackground from './ui/AntiGravityBackground';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [infoMessage, setInfoMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login, sendPasswordResetEmail } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setInfoMessage(null);

        try {
            await login(email, password);
            navigate('/', { replace: true });
        } catch (err: any) {
            console.error(err);
            setError(err.message || '이메일 또는 비밀번호가 올바르지 않습니다.');
            setIsLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setError('비밀번호를 재설정할 이메일을 먼저 입력해 주세요.');
            return;
        }

        if (!email.toLowerCase().endsWith('@fasoo.com')) {
            setError('@fasoo.com 계정만 처리 가능합니다.');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await sendPasswordResetEmail(email);
            setInfoMessage('비밀번호 재설정 이메일이 발송되었습니다. 메일함을 확인해 주세요.');
            setIsLoading(false);
        } catch (err: any) {
            console.error(err);
            setError('비밀번호 재설정 이메일 발송에 실패했습니다.');
            setIsLoading(false);
        }
    };

    const [focusTarget, setFocusTarget] = useState<'none' | 'user' | 'key'>('none');

    // ... (existing handlers)

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
                <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Interactive Particle Background */}
            <AntiGravityBackground focusTarget={focusTarget} />

            <div className="w-full max-w-sm z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-card border border-border shadow-xl rounded-2xl p-8 backdrop-blur-sm bg-card/80">
                    <div className="flex flex-col items-center gap-2 mb-8 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2 text-primary">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Welcome to MDS</h1>
                        <p className="text-xs text-muted-foreground mt-1">
                            MIS Design System에 접속하세요.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <form onSubmit={handleLogin} className="flex flex-col gap-4">
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider ml-1">이메일</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="userId"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onFocus={() => setFocusTarget('user')}
                                            onBlur={() => setFocusTarget('none')}
                                            className="w-full pl-4 pr-28 py-3 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                            placeholder="사번 또는 아이디"
                                            required
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground/60 font-medium pointer-events-none">
                                            @fasoo.com
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-1.5 flex flex-col">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">비밀번호</label>
                                    </div>
                                    <input
                                        type="password"
                                        name="userPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusTarget('key')}
                                        onBlur={() => setFocusTarget('none')}
                                        className={`w-full px-4 py-3 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200
                                            ${error ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'}
                                        `}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                {error && (
                                    <div className="flex items-center gap-2 text-xs text-destructive animate-in slide-in-from-left-1 duration-200">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{error}</span>
                                    </div>
                                )}
                                {infoMessage && (
                                    <div className="flex items-center gap-2 text-xs text-blue-500 animate-in slide-in-from-left-1 duration-200">
                                        <AlertCircle className="w-3 h-3" />
                                        <span>{infoMessage}</span>
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !password}
                                className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        <span>로그인</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>

                            <div className="flex justify-center">
                                <button
                                    type="button"
                                    onClick={handleResetPassword}
                                    className="text-[11px] text-muted-foreground hover:text-primary transition-colors font-medium"
                                >
                                    비밀번호 재설정
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-muted-foreground/60 font-mono">
                        v{version} • Internal Use Only
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
