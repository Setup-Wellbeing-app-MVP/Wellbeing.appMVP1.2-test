import DEVGateway from './pages/DEVGateway';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <DEVGateway />
    </ErrorBoundary>
  );
}
