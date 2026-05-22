import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/shell/AppShell';
import HomePage from './pages/HomePage';
import ExplorerPage from './pages/ExplorerPage';
import BuilderPage from './pages/BuilderPage';
import SystemsPage from './pages/SystemsPage';
import SystemDetailPage from './pages/SystemDetailPage';

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explorer" element={<ExplorerPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/systems" element={<SystemsPage />} />
          <Route path="/systems/:id" element={<SystemDetailPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}
