import { Component, type ReactNode, type ErrorInfo } from 'react';
import { Button } from './library';
import { AlertCircleIcon } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * ErrorBoundary component to catch and handle React errors gracefully
 * Prevents entire app from crashing when a component throws an error
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error Info:', errorInfo);
    
    // Store error info in state
    this.setState({
      errorInfo,
    });
  }

  handleReset = () => {
    // Reset error state
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  handleReload = () => {
    // Full page reload
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI using design system tokens
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
          <div className="max-w-md w-full space-y-6 text-center">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircleIcon className="size-8 text-destructive" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h2 className="text-foreground">Something went wrong</h2>
              <p className="text-muted-foreground">
                An unexpected error occurred. You can try resetting the component or reloading the page.
              </p>
            </div>

            {/* Error Details (Development Mode) */}
            {import.meta.env.DEV && this.state.error && (
              <div className="text-left">
                <details className="p-4 bg-muted rounded-lg border border-border">
                  <summary className="cursor-pointer text-sm font-label text-foreground">
                    Error Details
                  </summary>
                  <div className="mt-3 space-y-2">
                    <div className="text-xs text-destructive font-mono break-all">
                      {this.state.error.name}: {this.state.error.message}
                    </div>
                    {this.state.error.stack && (
                      <pre className="text-xs text-muted-foreground overflow-auto max-h-48 font-mono">
                        {this.state.error.stack}
                      </pre>
                    )}
                  </div>
                </details>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button 
                onClick={this.handleReset}
                variant="default"
                className="min-w-[140px]"
              >
                Try Again
              </Button>
              <Button 
                onClick={this.handleReload}
                variant="outline"
                className="min-w-[140px]"
              >
                Reload Page
              </Button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-muted-foreground">
              If this problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}
