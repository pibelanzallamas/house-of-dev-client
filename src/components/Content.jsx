import axios from "axios";
import { useEffect, useState } from "react";
import Cards from "../commons/Cards";
import CategoryFilter from "./CategoryFilter";
import LocationFilter from "./LocationFilter";
import RoomsFilter from "./RoomsFilter";
import useInput from "../hooks/useInput";

function Content() {
  const [properties, setProperties] = useState([]);
  const [estado, setEstado] = useState(false);
  // const [filter, setFilter] = useInput("");
  // const [search, setSearch] = useInput("");
  // const [selectedCategory, setSelectedCategory] = useState("all");
  // const [selectedLocationType, setSelectedLocationType] =
  //   useState("neighborhood");
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedRooms, setSelectedRooms] = useState("");
  // const categories = ["ph", "local", "terreno", "casa", "departamento"];

  //escucha los cambios del user en Card
  function modFavs() {
    setEstado(!estado);
  }

  //obtiene las propiedades
  useEffect(() => {
    axios
      .get("/api/properties/all")
      .then((all) => setProperties(all.data))
      .catch((err) => console.log(err));
  }, [estado]);

  // const filteredProperties = properties.filter((property) => {
  //   const categoryFilter =
  //     selectedCategory === "all" || property.categories === selectedCategory;
  //   const locationValue = property[selectedLocationType];
  //   const locationFilter = locationValue && locationValue.includes(searchQuery);
  //   const roomsFilter = selectedRooms ? property.rooms === selectedRooms : true;
  //   return categoryFilter && locationFilter && roomsFilter;
  // });

  // const handleCategoryChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // };

  // const handleLocationTypeChange = (event) => {
  //   setSelectedLocationType(event.target.value);
  // };

  // const handleSearchChange = (event) => {
  //   setSearchQuery(event.target.value);
  // };

  // const handleRoomsChange = (event) => {
  //   setSelectedRooms(event.target.value);
  // };

  return (
    <div>
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />
        <LocationFilter
          selectedLocationType={selectedLocationType}
          onLocationTypeChange={handleLocationTypeChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <RoomsFilter
          selectedRooms={selectedRooms}
          onRoomsChange={handleRoomsChange}
        />
      </div> */}
      {/* <div className="property-list">
        {filteredProperties.map((property, id) =>
          property ? (
            // property.categories === selectCategories &&
            // property.disponibility === selectDisponibility ? (
            <div key={id} className="property-cards-container">
              <Cards property={property} />
            </div>
          ) : (
            <></>
          )
        )}
      </div> */}

      {/* <div className="filtros">
        <select {...filter} id={"filter"}>
          <option disabled>Seleccione</option>
          <option value={"categoria"}> Categoria</option>
          <option value={"ubicación"}> Ubicación</option>
        </select>
        <input
          type="text"
          {...search}
          id={"bathrooms"}
          placeholder="Ingrese datos"
        ></input>
      </div> */}

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
