import axios from "axios";
import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";
import Cards from "../commons/Cards";

function Content() {
  const [properties, setProperties] = useState([]);
  const [estado, setEstado] = useState(false);
  const search = useInput("");

  //escucha los cambios del user en Card
  function modFavs() {
    setEstado(!estado);
  }

  //get all properties
  useEffect(() => {
    axios
      .get("/api/properties/all")
      .then((all) => setProperties(all.data))
      .catch((err) => console.log(err));
  }, [estado]);

  return (
    <div>
      <div className="search-input">
        <input type="text" {...search}></input>
      </div>

      {properties.length > 0 ? (
        <div className="todo-tarjetas-prop">
          {properties.map((property) => (
            <Cards property={property} modFavs={modFavs} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Content;
