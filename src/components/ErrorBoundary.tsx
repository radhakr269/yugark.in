import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
          <div className="max-w-md w-full p-8 rounded-2xl bg-[#0A0A0A] border border-[#D4B06A]/30 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#D4B06A]/10 border border-[#D4B06A]/30 flex items-center justify-center text-[#D4B06A]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-white">Something went wrong</h2>
              <p className="text-xs text-neutral-400">
                An unexpected UI rendering error occurred. Please refresh or return to the homepage.
              </p>
            </div>

            <button
              onClick={() => window.location.assign('/')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4B06A] to-[#C9A35E] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Return to Homepage</span>
            </button>
          </div>
        </div>
      );
    }

    return (this as unknown as { props: Props }).props.children;
  }
}
