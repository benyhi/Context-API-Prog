import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

  return (
    <div>
        <h1 className="text-center">Bienvenido al CRUD de Unicornios</h1>
        <div className="mt-5 text-center">
          <p>Trabajo practico sobre Context API, usa el navbar para navegar entre rutas.</p>
        </div>
    </div>
  );
}

export default Home;