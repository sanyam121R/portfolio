import './style.scss';
import CustomCursor from './Components/CustomCursor/CustomCursor';
import Home from './Components/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Skills from './Components/Skills/Skills';
import Experience from './Components/Experience/Experience';
import Projects from './Components/Projects/Projects';

function App() {
  return (
    <>
      <div className='App' style={{position:"relative"}}>
        <CustomCursor />
        <Navbar />
        {/* <Home /> */}
        <Skills />
        {/* <Experience /> */}
        {/* <Projects /> */}
      </div>
    </>
  );
}

export default App;
