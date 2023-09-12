import React from "react";

function LocationFilter({
  selectedLocationType,
  onLocationTypeChange,
  searchQuery,
  onSearchChange,
}) {
  return (
    <div>
      <label>Filtrar por ubicación:</label>
      <select value={selectedLocationType} onChange={onLocationTypeChange}>
        <option value="neighborhood">Barrio</option>
        <option value="city">Ciudad</option>
        <option value="country">País</option>
      </select>
      <input
        type="text"
        placeholder={`Buscar por ${selectedLocationType}`}
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
}

export default LocationFilter;
