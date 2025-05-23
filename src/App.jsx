import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Meta, Layout } from "@/components";
import { About, Contact, Home, Projects, NotFound, OAuth2Callback, TermsOfService } from "@/pages";
import ChatPage from './pages/ChatPage';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Meta />
        <LanguageProvider>
          <ThemeProvider>
            <Layout>
              <div className="scroll-smooth">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/projects' element={<Projects />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/oauth2callback' element={<OAuth2Callback />} />
                  <Route path='/terms-of-service' element={<TermsOfService />} />
                  <Route path='/chat' element={<ChatPage />} />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div>
            </Layout>
          </ThemeProvider>
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  );
};

export default App;
