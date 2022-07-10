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

Modal.setAppElement('#root')

function App() {
  return (
    <>
    <Router>
    <Header/>
    <Routes>
      <Route path="/" exact element={<Pages />}></Route>
      <Route path="/categories/:id" exact element={<Category />}></Route>
      <Route path="/subcategories/:id" exact element={<SubCategory />}></Route>
      <Route path="/account" exact element={<Login />}></Route>
    </Routes>
  </Router>  
    </>
  );
}

export default App;
