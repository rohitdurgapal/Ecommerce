import './App.css';
import Nav from './components/Nav';
import SignUp from './components/SignUp';
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
            <Route exact path="/" element={<h1>Product</h1>} />
            <Route exact path="/add" element={<h1>Add Product</h1>} />
            <Route exact path="/update" element={<h1>Update Product</h1>} />
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
