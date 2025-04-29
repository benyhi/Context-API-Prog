import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Productos',
            icon: 'pi pi-box',
            command: () => navigate('/products')
        },
        {
            label: 'Unicornios',
            icon: 'pi pi-star',
            command: () => navigate('/unicorns')
        }
    ];

    const start = (
        <img
            alt="logo"
            src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
            height="40"
            className="mr-2"
        />
    );

    return (
        <div className="card">
            <Menubar model={items} start={start} />
        </div>
    );
};

export default Navbar;
