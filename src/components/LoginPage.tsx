import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { version } from '../../package.json';

const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        // Provide a small artificial delay for better UX
        setTimeout(() => {
            const success = login(password);
            if (success) {
                navigate('/', { replace: true });
            } else {
                setError(true);
                setIsLoading(false);
            }
        }, 600);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0))]" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-500/5 blur-3xl animate-pulse" />
                <div className="absolute -bottom-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-indigo-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="w-full max-w-sm z-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-card border border-border shadow-xl rounded-2xl p-8 backdrop-blur-sm bg-card/80">
                    <div className="flex flex-col items-center gap-2 mb-8 text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-2 text-primary">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight">Access Required</h1>
                        <p className="text-sm text-muted-foreground">
                            Please enter the access code to view the <br />
                            <span className="font-medium text-foreground">MIS Design System</span>
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (error) setError(false);
                                    }}
                                    className={`w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200
                    ${error ? 'border-destructive focus:border-destructive' : 'border-input focus:border-primary'}
                  `}
                                    placeholder="Enter access code"
                                    autoFocus
                                />
                            </div>
                            {error && (
                                <div className="flex items-center gap-2 text-xs text-destructive animate-in slide-in-from-left-1 duration-200">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Invalid access code. Please try again.</span>
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group relative overflow-hidden"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <span>Enter System</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
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
