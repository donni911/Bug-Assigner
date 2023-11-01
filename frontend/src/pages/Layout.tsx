import Navbar from "../components/UI/Navbar";
import PageWrapper from "../components/UI/PageWrapper";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </>
  );
}

export default Layout;
