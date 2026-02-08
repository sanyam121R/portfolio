import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar/>
      <main>
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </>
  )
};

export default Layout;