import { Component, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "./ui/button";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full items-center justify-center bg-brut-paper p-6">
          <div className="border-[3px] border-brut-ink bg-card p-6 w-full max-w-md text-center">
            <div className="mx-auto flex w-fit items-center gap-2 border-[3px] border-brut-ink bg-primary px-3 py-1.5">
              <AlertTriangle size={16} strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-foreground">
                Something broke
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              A part of the app threw an error and we had to stop rendering.
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-5"
            >
              <RotateCcw size={14} strokeWidth={2.5} />
              Reload
            </Button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
