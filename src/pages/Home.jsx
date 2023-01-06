import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

import {setCategoryId} from '../redux/slices/filterSlice'


export const Home = () => {
  const {searchValue} = React.useContext(SearchContext)

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const {categoryId, sort} = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const onChangeCategory = (id)=> { dispatch(setCategoryId(id))}

  React.useEffect(() => {
    setIsLoading(true);

    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue > 0 ? `&search=${searchValue}` : "";

    fetch(
      `https://6399e68f16b0fdad774d67dc.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => res.json())
      .then((arr) => {
        setItems(arr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);



  const pizzas = items.filter((obj) => {
    if (obj.title.toLowerCase().includes(searchValue.toLowerCase())){
      return true
    }

    return false
  })
  .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skelenos = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skelenos : pizzas}</div>
      <Pagination onChangePage={number => setCurrentPage(number)} currentPage={currentPage}/>
    </div>
  );
};
