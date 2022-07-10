import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

import List from "./pages/list/List";

import Items from "./pages/items/items";
import Item from "./pages/items/item";

import Categories from "./pages/categories/categories";
import Category from "./pages/categories/category";

import SubCategories from "./pages/subcategories/subcategories";
import SubCategory from "./pages/subcategories/subcategory";

import Orders from "./pages/orders/orders";
import Order from "./pages/orders/order";

import Customers from "./pages/customers/customers";
import Customer from "./pages/customers/customer";

import Single from "./pages/single/Single";
import NewItem from "./pages/new/Item";
import NewCategory from "./pages/new/Category";
import NewSubCategory from "./pages/new/SubCategory";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemInputs, CatInputs , SubCatInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            <Route path="items">
              <Route index element={<Items />} />
              <Route path=":itemId" element={<Item />} />
              <Route
                path="new"
                element={<NewItem inputs={ItemInputs} title="Add New Item" />}
              />
            </Route>
            <Route path="categories">
              <Route index element={<Categories />} />
              <Route path=":catId" element={<Category />} />
              <Route
                path="new"
                element={<NewCategory inputs={CatInputs} title="Add New Category" />}
              />
            </Route>
            <Route path="subcategories">
              <Route index element={<SubCategories />} />
              <Route path=":subCatId" element={<SubCategory />} />
              <Route
                path="new"
                element={<NewSubCategory inputs={SubCatInputs} title="Add New Sub Category" />}
              />
            </Route>
            <Route path="orders">
              <Route index element={<Orders />} />
              <Route path=":ordId" element={<Order />} />
            </Route>
            <Route path="customers">
              <Route index element={<Customers />} />
              <Route path=":custId" element={<Customer />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
