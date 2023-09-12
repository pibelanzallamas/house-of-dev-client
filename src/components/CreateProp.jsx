import axios from "axios";
import useInput from "../hooks/useInput";
import "animate.css/animate.min.css";
import { alerts } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Properties() {
  const name = useInput("");
  const address = useInput("");
  const country = useInput("");
  const city = useInput("");
  const neighborhood = useInput("");
  const description = useInput("");
  const categories = useInput("");
  const bathrooms = useInput("");
  const rooms = useInput("");
  const disponibility = useInput("");
  const images = useInput("");
  const price = useInput("");
  const navigate = useNavigate();

  function handleRegister(e) {
    e.preventDefault();

    axios
      .post("/api/properties/register", {
        name: name.value,
        address: address.value,
        country: country.value,
        city: city.value,
        neighborhood: neighborhood.value,
        description: description.value,
        categories: categories.value,
        bathrooms: bathrooms.value,
        rooms: rooms.value,
        disponibility: disponibility.value,
        images: images.value,
        price: price.value,
      })
      .then((prop) => {
        console.log(prop);
        if (prop.data[1]) {
          alerts("Vamos!", "La propiedad se creó con exito 🏠", "success");
          navigate("/");
        } else if (!prop.data[1]) {
          alerts("Pará!", "La propiedad ya existe 🤠", "warning");
        } else {
          alerts("Ey!", "Ingrese datos validos 😡", "warning");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">AGREGAR PROPIEDAD</h2>
        </div>

        <div className="property-card">
          <div className="user-datos" style={{ height: "742px" }}>
            <form onSubmit={handleRegister} style={{ "margin-top": "20px" }}>
              <div className="inputName">
                <label> Nombre </label>
                <br></br>
                <input {...name} type="text" required maxLength={15}></input>
              </div>

              <div className="inputEmail">
                <label> Dirección </label>
                <br></br>
                <input {...address} type="text" required maxLength={25}></input>
              </div>

              <div className="inputTel">
                <label> Barrio </label>
                <br></br>
                <input
                  {...neighborhood}
                  type="text"
                  required
                  maxLength={25}
                ></input>
              </div>

              <div className="inputTel">
                <label> Ciudad </label>
                <br></br>
                <input {...city} type="text" required maxLength={25}></input>
              </div>

              <div className="inputTel">
                <label> País </label>
                <br></br>
                <input {...country} type="text" required maxLength={15}></input>
              </div>

              <div className="inputTel">
                <label> Baños </label>
                <br></br>
                <input
                  {...bathrooms}
                  type="number"
                  required
                  min={1}
                  max={20}
                ></input>
              </div>

              <div className="inputTel">
                <label> Habitaciones </label>
                <br></br>
                <input
                  {...rooms}
                  type="number"
                  required
                  min={1}
                  max={30}
                ></input>
              </div>

              <div className="inputTel">
                <label> Description </label>
                <br></br>
                <input
                  {...description}
                  type="text"
                  required
                  minLength={20}
                  maxLength={100}
                ></input>
              </div>

              <div className="inputTel">
                <label> Disponibilidad </label>
                <br></br>
                <input {...disponibility}></input>
              </div>

              <div>
                <label> Categoría </label>
                <br></br>
                <input {...categories}></input>
              </div>

              <div className="inputTel">
                <label> Precio </label>
                <br></br>
                <input
                  {...price}
                  type="number"
                  min={50000}
                  max={40000000}
                  required
                ></input>
              </div>

              <div className="inputTel">
                <label> Imagen </label>
                <br></br>
                <input {...images} type="url" required></input>
              </div>

              <button
                className="boton-editar"
                style={{ left: "86%", top: "93%" }}
              >
                GUARDAR
              </button>
            </form>
          </div>
          <hr></hr>
        </div>
      </div>
    </>
  );
}

export default Properties;
