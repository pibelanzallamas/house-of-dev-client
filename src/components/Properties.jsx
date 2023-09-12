import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { alerts } from "../utils/alerts";
import Navbar from "./Navbar";

function Properties() {
  const [properties, setProperies] = useState([]);
  const [modProp, setModProp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/properties/all")
      .then((all) => setProperies(all.data))
      .catch((err) => console.log(err));
  }, [modProp]);

  function handleMod(propId) {
    navigate(`/properties/mod/${propId}`);
  }

  function hanldeDel(propId) {
    axios.delete(`/api/properties/${propId}`).then(() => {
      setModProp(!modProp);
      alerts("Ok!", "Propiedad eliminada! 👍", "danger");
    });
  }

  return (
    <div>
      <Navbar />

      <div>
        <h2 style={{ color: "blue" }}>Propiedades</h2>
      </div>
      {properties.length > 0 ? (
        <div className="property-list">
          {properties.map((property) => (
            <div className="property-details" key={property.id}>
              <img src={property.images} alt={property.name} />
              <Link to={`/properties/${property.id}`}>
                <h2 style={{ color: "blue" }}>{property.name}</h2>
              </Link>
              <button
                onClick={() => {
                  handleMod(property.id);
                }}
              >
                Modificar!
              </button>
              <button
                onClick={() => {
                  hanldeDel(property.id);
                }}
              >
                Eliminar!
              </button>
              <p>Dirección: {property.address}</p>
              <p>País: {property.country}</p>
              <p>Ciudad: {property.city}</p>
              <p>Barrio: {property.neighborhood}</p>
              <p>Cantidad de Baños: {property.bathrooms}</p>
              <p>Cantidad de Cuartos: {property.rooms}</p>
              <p>
                Categoría:{" "}
                {property.categories[0].toUpperCase() +
                  property.categories.slice(1).toLowerCase()}
              </p>
              <p>Precio: {property.price}</p>
              <p>{property.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Properties;
