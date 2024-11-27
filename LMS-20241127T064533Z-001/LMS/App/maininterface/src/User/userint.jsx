import "./userInt.css";
import { useLocation } from "react-router-dom";
import Header from "./Header/userheader";
import Search from "../Search/search.jsx";
import Footer from "./Footer/userfooter.jsx";

function User() {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  return (
    <>
      <Header name={data.userName} />
      <Search logged={true} />
      <Footer />
    </>
  );
}

export default User;
