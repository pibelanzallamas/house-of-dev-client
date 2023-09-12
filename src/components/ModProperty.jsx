import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { alerts } from "../utils/alerts";
import Navbar from "./Navbar";

function ModProperty() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [description, setDescription] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [rooms, setRooms] = useState("");
  const [images, setImages] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [disponibility, setDisponibility] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/properties/${id}`);
        setName(response.data.name);
        setAddress(response.data.address);
        setCountry(response.data.country);
        setCity(response.data.city);
        setNeighborhood(response.data.neighborhood);
        setDescription(response.data.description);
        setBathrooms(response.data.bathrooms);
        setRooms(response.data.rooms);
        setImages(response.data.images);
        setPrice(response.data.price);
        setCategories(response.data.categories);
        setDisponibility(response.data.disponibility);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  function handleModification(e) {
    e.preventDefault();
    axios
      .put(`/api/properties/mod/${id}`, {
        name,
        address,
        country,
        city,
        neighborhood,
        description,
        bathrooms,
        rooms,
        images,
        price,
        categories,
        disponibility,
      })
      .then((mod) => {
        if (mod.data[0] === 1) {
          alerts("Ok!", "La propiedad ha sido modificada 👍", "success");
          navigate("/properties");
        } else {
          alerts("Ohoh!", "Ingrese datos validos 😵", "warning");
        }
      })
      .catch((err) => {
        alerts("Auch!", "Ocurrio un error 🤧", "danger");
      });
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <div className="home-titulo">
          <h2 className="linea1">{name}</h2>
        </div>

        <div className="register-box">
          <p>Modificar propiedad</p>
          <form onSubmit={handleModification} id={"modProp"}>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              maxLength={25}
              required
            ></input>
            <label for={"address"}>Dirección</label>
            <input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              maxLength={25}
              required
            ></input>
            <label for={"country"}>País</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              maxLength={15}
              required
            ></input>
            <label for={"city"}>Ciudad</label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              id={"city"}
              type="text"
              maxLength={15}
              required
            ></input>
            <label for={"neighborhood"}>Barrio</label>
            <input
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              id={"neighborhood"}
              type="text"
              maxLength={15}
              required
            ></input>
            <label for={"description"}>Descripción</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id={"description"}
              type="text"
              maxLength={250}
              required
            ></input>
            <label for={"categories"}>Categoría</label>
            <select
              value={categories}
              onChange={(e) => setCategories(e.target.value)}
              id={"categories"}
              required
            >
              <option> Seleccione </option>
              <option value="casa">Casa</option>
              <option value="departamento">Departamento</option>
              <option value="local">Local</option>
              <option value="ph">PH</option>
              <option value="terreno">Terreno</option>
            </select>
            <label for={"bathrooms"}>Baños</label>
            <input
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              id={"bathrooms"}
              type="number"
              min={1}
              max={20}
              required
            ></input>
            <label for={"rooms"}>Habitaciones</label>
            <input
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              id={"rooms"}
              type="number"
              min={1}
              max={50}
              required
            ></input>
            <label for={"disponibility"}>Disponibilidad</label>
            <select
              value={disponibility}
              onChange={(e) => setDisponibility(e.target.value)}
              id={"disponibility"}
              required
            >
              <option> Seleccione </option>
              <option value="alquiler">Alquiler</option>
              <option value="venta">Venta</option>
            </select>
            <label for={"images"}>Imágenes</label>
            <input
              value={images}
              onChange={(e) => setImages(e.target.value)}
              id={"images"}
              type="url"
              required
            ></input>
            <label for={"price"}>Precio</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id={"price"}
              type="number"
              min={10000}
              max={40000000}
              required
            ></input>
            <button>Guardar</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModProperty;
