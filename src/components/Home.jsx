import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userState";
import Navbar from "../components/Navbar";
import Content from "./Content";

function Home() {
  const dispatch = useDispatch();

  //me
  useEffect(() => {
    axios
      .post("/api/users/me")
      .then((cok) => dispatch(setUser(cok.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">HOUSE OF DEV INMOBILIARIA</h2>
        </div>

        <div className="home-imagen">
          <img src="/homeFondo.png"></img>
        </div>

        <hr />

        <Content />
      </div>
    </div>
  );
}

export default Home;
