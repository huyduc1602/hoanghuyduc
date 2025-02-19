import { HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects, NotFound, OAuth2Callback, TermsOfService } from "./pages";
import Meta from "./components/Meta";

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <Meta />
        <main className='bg-slate-300/20'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/oauth2callback' element={<OAuth2Callback />} />
            <Route path='/terms-of-service' element={<TermsOfService />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </main>
      </Router>
    </HelmetProvider>
  );
};

export default App;
