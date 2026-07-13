import { Component, type ReactNode } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

// A render throw anywhere should show a brutalist recovery card, not a white
// screen — letting the user reload and keep the session instead of losing the
// page context on the next drag or form submit.
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
          <div className="panel-brut w-full max-w-md p-6 text-center">
            <div className="mx-auto flex w-fit items-center gap-2 border-2 border-brut-ink bg-brut-yellow px-3 py-1.5">
              <AlertTriangle size={16} strokeWidth={2.5} />
              <span className="text-xs font-extrabold uppercase tracking-wide text-brut-ink">
                Something broke
              </span>
            </div>
            <p className="mt-4 text-sm font-medium text-brut-ink/70">
              A part of the app threw an error and we had to stop rendering.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-brut mt-5"
            >
              <RotateCcw size={14} strokeWidth={2.5} />
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
