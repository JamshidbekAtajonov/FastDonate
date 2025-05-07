import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
function RootLayout() {
  return (
    <>
      <Navbar />
      <main className="mt-[150px]">
        <Outlet />
      </main>
      <Footer/>
    </>
  );
}

export default RootLayout;
