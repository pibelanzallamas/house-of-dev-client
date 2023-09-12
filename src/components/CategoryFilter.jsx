import React from "react";

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div>
      <label>Filtrar por categoría: </label>
      <select value={selectedCategory} onChange={onSelectCategory}>
        <option value="all">Todas</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
