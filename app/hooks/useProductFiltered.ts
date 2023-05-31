import { useState, useMemo } from "react";
import { TProducts } from "../types";

export type FilteredOptions = {
  categories: string[];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  condition?: "new" | "used";
};

export function useProductFiltered(
  data: TProducts[],
  
) {
 
  const [options, setOptions] = useState<FilteredOptions>({
    categories: [],
    minPrice: undefined,
    maxPrice: undefined,
    condition: undefined,
  });
  const categories: string[] = useMemo(() => {
    return Object.keys(
      data.reduce((acc: { [key: string]: boolean }, product: TProducts) => {
        acc[product.category] = true;
        return acc;
      }, {})
    );
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((product) => {
      let includeProduct = true;

      if (
        options.categories?.length > 0 &&
        !options.categories.includes(product.category)
      ) {
        includeProduct = false;
      }

      if (
        (options.minPrice !== undefined && options.minPrice > product.price) ||
        (options.maxPrice !== undefined && options.maxPrice < product.price)
      ) {
        includeProduct = false;
      }

      if (
        options.condition !== undefined &&
        product.condition !== options.condition
      ) {
        includeProduct = false;
      }
      return includeProduct;
    });
  }, [data, options]);

  function updateFilter(newOptions: FilteredOptions) {
    setOptions(newOptions);
  }

  return { filteredData, updateFilter, categories };
}
