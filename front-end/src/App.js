import './App.css';
import Nav from './components/Nav';
import SignUp from './components/SignUp';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import ProtectedRoutes from './components/ProtectedRoutes';
import Login from './components/Login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route exact path="/" element={<ProductList />} />
            <Route exact path="/add" element={<AddProduct />} />
            <Route exact path="/update/:id" element={<UpdateProduct />} />
            <Route exact path="/logout" element={<h1>Logout</h1>} />
            <Route exact path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
