import { Route, HashRouter as Router, Routes } from "react-router-dom";

import { Footer, Navbar } from "./components";
import { About, Contact, Home, Projects } from "./pages";
import Meta from "./components/Meta";

const App = () => {
  return (
    <Router>
      <Meta />
      <main className='bg-slate-300/20'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
};

export default App;
