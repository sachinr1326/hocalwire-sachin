import React, { useEffect, useState } from "react";
import {
  get_all_categories,
  get_product_by_categories_sort,
  get_product_sort,
} from "../../services/ApiService";
import "./Categories.css";

const Categories = ({ setProducts, setLoading }) => {
  const [categories, setCategories] = useState();
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("asc");
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal
    get_all_categories(signal).then((res) => {
      if (res.status) {
        setCategories(res.response.data);
      }
    });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const controller = new AbortController();
  const signal = controller.signal
    setLoading(true);
    if (category !== "All") {
      get_product_by_categories_sort(category, sort,signal).then((res) => {
        if (res.status) {
          setProducts(res.response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } else {
      get_product_sort(sort,signal).then((res) => {
        if (res.status) {
          setProducts(res.response.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }

    return () => controller.abort();

  }, [category, sort]);
  const handleCat = (e) => {
    setCategory(e.target.value);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };

  return (

    <div className="cat-container">
      <select class="form-select" onChange={handleSort}>
        <option value="desc" selected={sort === "desc" ? true : false}>
          Sort by: desc
        </option>
        <option value="asc" selected={sort === "asc" ? true : false}>
          Sort by:asc
        </option>
      </select>
      {categories && categories.length > 0 && (
        <select class="form-select" onChange={handleCat}>
          <option value="All" selected={category === "All" ? true : false}>
            Categories:All
          </option>
          {categories.map((res, index) => (
            <option
              key={index}
              value={res}
              selected={category === res ? true : false}
            >
              Category: {res}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Categories;
