import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar/>
      <main style={{ paddingTop: "76px" }}>
        <Outlet />
      </main>
      {!isHomePage && <Footer />}
    </>
  )
};

export default Layout;