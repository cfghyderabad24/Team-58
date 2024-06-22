
import { Outlet } from "react-router-dom";
import NavBar from "./compnents/NavBar";
//import Footer from "./components/footer/Footer";

function RootLayout() {
  return (
    <div>
      <NavBar />
      <div style={{ minHeight: "70vh" }}>
        <div className="container">
          {" "}
          <Outlet />
        </div>
      </div>
      {/* <div style={{ marginTop: "100px" }}>
        <Footer />
      </div> */}
    </div>
  );
}

export default RootLayout;
