import React from "react";

function RoomsFilter({ selectedRooms, onRoomsChange }) {
  return (
    <div>
      <label>Filtrar por número de ambientes:</label>
      <select value={selectedRooms} onChange={onRoomsChange}>
        <option value="">Cualquier cantidad</option>
        <option value="1">1 ambiente</option>
        <option value="2">2 ambientes</option>
        <option value="3">3 ambientes</option>
        <option value="4">4 ambientes</option>
        <option value="5">5 ambientes o más</option>
      </select>
    </div>
  );
}

export default RoomsFilter;
