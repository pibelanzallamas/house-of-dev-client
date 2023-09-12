import Navbar from "../components/Navbar";
import Content from "./Content";

function Home() {
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
