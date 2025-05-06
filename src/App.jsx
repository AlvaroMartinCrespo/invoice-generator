import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CreateInvoice from './pages/CreateInvoice';
import History from './pages/History';
import Settings from './pages/Settings';
import { InvoiceProvider } from './contexts/InvoiceContext';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <InvoiceProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateInvoice />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </InvoiceProvider>
    </BrowserRouter>
  );
}

export default App;
