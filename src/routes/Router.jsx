import { BrowserRouter, Routes, Route } from 'react-router-dom';    
import { AlertProvider } from '../context/AlertContext.jsx';
import Navbar from '../layout/NavBar.jsx';
import Home from '../layout/Home.jsx';
import UnicornsRoutes from './unicorns/index.jsx';
import ProductsRoutes from './products/index.jsx';


const Router = () => (
  <AlertProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/unicorns/*' element={<UnicornsRoutes/>}/>
        <Route path='/products/*' element={<ProductsRoutes/>}/>
      </Routes>
    </BrowserRouter>
  </AlertProvider>
);

export default Router;
