import './style.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomCursor from './Components/CustomCursor/CustomCursor';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Skills from './Components/Skills/Skills';
import Experience from './Components/Experience/Experience';
import Projects from './Components/Projects/Projects';
import Layout from './Components/Layout';

function App() {
  return (
    <>
      <div className='App' style={{position:"relative"}}>
        <CustomCursor />
        {/* <Navbar /> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Route>
            </Routes>
        </BrowserRouter>
        {/* <Home /> */}
        {/* <Skills /> */}
        {/* <Experience /> */}
        {/* <Projects /> */}
      </div>
    </>
  );
}

export default App;
