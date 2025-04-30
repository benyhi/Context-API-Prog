import Table from '../../components/Table';
import { useUnicorns } from './context/UnicornContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useAlert } from '../../context/AlertContext';
import AlertMessage from '../../components/AlertMessage';

const UnicornTableView = () => {
    const { unicorns, getUnicorns, deleteUnicorn, generateUnicornPDF } = useUnicorns();
    const { alert, showAlert } = useAlert(); 
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            await deleteUnicorn(id);
            await getUnicorns();
            showAlert('Unicornio eliminado correctamente.', 'success');
        } catch (error) {
            console.error('Error al eliminar:', error);
            showAlert('Error al eliminar el unicornio.', 'error');
        }
    };

    const handleEdit = (unicorn) => {
        navigate(`/unicorns/edit/${unicorn._id}`);
    };

    return (
        <div>
            {alert && <AlertMessage type={alert.type} message={alert.message} />}
            <Button label='Crear nuevo' className='my-3' onClick={()=>navigate('create')}/>
            <Table 
                title={"Tabla de Unicornios"}
                data={unicorns}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
        </div>
    );
};

export default UnicornTableView;
