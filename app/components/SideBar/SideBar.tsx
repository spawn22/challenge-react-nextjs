"use client";
import { useState } from "react";
import { FilteredOptions } from "@/app/hooks";
import { useEffect } from "react";
type TProps = {
  categories: string[];
  onFilterChange: (options: FilteredOptions) => void;
};

function SideBar({ categories, onFilterChange }: TProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredOptions, setFilteredOptions] = useState<FilteredOptions>({
    categories: [],
    maxPrice: undefined,
    minPrice: undefined,
    condition: undefined,
  });
  console.log(filteredOptions);

  function handleCategorySelection(categoryId: string) {
    const newSelectedCategory =
      categoryId === ""
        ? []
        : selectedCategories.includes(categoryId)
        ? selectedCategories.filter((c) => c !== categoryId)
        : [...selectedCategories, categoryId];

    setSelectedCategories(newSelectedCategory);
    setFilteredOptions({
      ...filteredOptions,
      categories: newSelectedCategory,
    });
  }

  useEffect(() => {
    onFilterChange(filteredOptions);
  }, [filteredOptions]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const newValue =
      name === "minPrice" || name === "maxPrice" ? parseFloat(value) : value;

    setFilteredOptions((prevFilters) => {
      const newFilter = {
        ...prevFilters,
        [name]: newValue === "" ? undefined : newValue,
      };
      onFilterChange(newFilter);
      return newFilter;
    });
  }

  return (
    <aside className="w-full flex justify-center items-center px-4 py-6  h-full ">
      <ul className="flex flex-wrap gap-x-2 gap-y-1 items-center justify-center ">
        {categories.map((category) => (
          <li key={category} className="mb-3">
            <button
              onClick={() => handleCategorySelection(category)}
              className={`py-[0.5rem] px-[1rem] rounded-md border border-gray-${
                selectedCategories.includes(category) ? "400" : "300"
              } hover:border-gray-${
                selectedCategories.includes(category) ? "500" : "400"
              } ${
                selectedCategories.includes(category) &&
                `bg-gradient-to-r from-yellow-300 to-red-${
                  category.length * 50
                }`
              } transition-colors duration-150`}
            >
              {category}
            </button>
          </li>
        ))}
        <div className="flex flex-wrap gap-x-2 gap-y-1 justify-around items-center  ">

        
        <label htmlFor="min-price" className="flex justify-center items-center">Min Price:</label>
        <input
          type="number"
          name="minPrice"
          id="min-price"
          className="text-black flex justify-center items-center font-semibold"
          onChange={handleInputChange}
        />

        {/* Agregar filtro por precio máximo */}
        <label htmlFor="max-price" className="flex justify-center items-center">Max Price:</label>
        <input
          type="number"
          name="maxPrice"
          id="max-price"
          className="text-black  font-semibold "
          onChange={handleInputChange}
        />

        {/* Agregar filtro por condición (nuevo o usado) */}
        <div className="flex justify-between gap-5 items-center ">
          <span>Condition: </span>

          {/* Nuevo */}
          <label htmlFor="condition-new">
            New
            <input
              type="radio"
              name="condition"
              value="new"
              id="condition-new"
              
              checked={filteredOptions.condition === "new"}
              onChange={(e) => handleInputChange(e)}
            />
          </label>

          {/* Usado */}
          <label htmlFor="condition-used">
            Used
            <input
              type="radio"
              name="condition"
              value="used"
              id="condition-used"
              checked={filteredOptions.condition === "used"}
              onChange={(e) => handleInputChange(e)}
            />
          </label>
          </div>
        </div>
      </ul>
    </aside>
  );
}

export default SideBar;
