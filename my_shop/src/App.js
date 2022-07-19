import './App.css';
import Header from './common/header/Header';
import Modal from 'react-modal'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Pages from './pages/Pages';
import Category from './pages/Category';
import SubCategory from './pages/SubCategory';
import Login from './pages/LoginPage';
import {CartProvider} from './common/context';
import Cart from './pages/Cart';
import OrderComplete from './pages/OrderComplete';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

Modal.setAppElement('#root')

function App() {
  return (
    <>
    <CartProvider>
    <Router>
    <Header/>
    <Routes>
      <Route path="/" exact element={<Pages />}></Route>
      <Route path="/categories/:id" exact element={<Category />}></Route>
      <Route path="/subcategories/:id" exact element={<SubCategory />}></Route>
      <Route path="/account" exact element={<Login />}></Route>
      <Route path="/cart" exact element={<Cart />}></Route>
      <Route path="/about" exact element={<AboutPage />}></Route>
      <Route path="/contact" exact element={<ContactPage />}></Route>
      <Route path="/completedOrder" exact element={<OrderComplete />}></Route>
    </Routes>
  </Router>  
  </CartProvider>
    </>
  );
}

export default App;
