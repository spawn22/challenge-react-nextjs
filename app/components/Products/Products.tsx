"use client";
import { data } from "@/app/services";
import { TProducts } from "@/app/types";
import { FilteredOptions, useProductFiltered } from "@/app/hooks";
interface ProductsProps {
  SideBar: React.ComponentType<{
    categories: string[];
    onFilterChange: (options: FilteredOptions) => void;
  }>;
}

function Products({ SideBar }: ProductsProps) {
  const { filteredData, categories, updateFilter } = useProductFiltered(data);

  const updateFilters = (options: FilteredOptions) => {
    updateFilter(options);
  };

  return (
    <div className="flex justify-center flex-wrap max-w-screen-2xl mx-full py-8 px-4">
      <h3 className="text-4xl font-bold text-yellow-500 flex justify-center items-center mb-5">Welcome to the Shop</h3>
      <SideBar categories={categories} onFilterChange={updateFilters} />
      {filteredData.map((products: TProducts) => (
        <div
          key={products.id}
          className="bg-white shadow-md rounded-md overflow-hidden w-full md:w-1/3 lg:w-1/4 xl:wl-1/4 mb-8 mx-4"
        >
          <img
            src={products.image}
            alt={products.title}
            className="w-full h-[350px] object-cover"
          />
          <div className="p-6">
            <h3 className="text-gray-900 font-bold text-lg mb-2">
              {products.title}
            </h3>
            <p className="text-gray-700 text-base mb-2">
              {products.description}
            </p>
            <div className="flex justify-between ">
              <span
                className={`${
                  products.stock > 0 ? "text-green-600" : "text-red-600"
                } font-bold`}
              >{`${products.stock > 0 ? "In stock" : "Out of stock"}`}</span>
              <p
                className={`${
                  products.condition === "new"
                    ? "text-green-600"
                    : "text-red-600"
                } text-ellipsis text-left mt-auto font-semibold`}
              >
                Condition: {products.condition}
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <p className="font-semibold text-gray-500 text-right mt-auto ">
                Category: {products.category}
              </p>
              <p className="text-xl font-bold font-mono text-black  text-left mt-auto ">
                ${Number(products.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
      {filteredData.length === 0 && (
        <div className="text-center mt-[2rem] text-xl font-semibold">
          No hay resultados
        </div>
      )}
    </div>
  );
}

export default Products;
