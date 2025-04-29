import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import ModelForm from '../../components/ModelForm';
import * as Yup from 'yup';
import { useUnicorns } from './context/UnicornContext';
import { createUnicorn, updateUnicorn } from './services/UnicornService';
import { useAlert } from '../../context/AlertContext';

const UnicornFormView = () => {
  const { getUnicornById, getUnicorns } = useUnicorns();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const isEditMode = Boolean(id);

  const [unicorn, setUnicorn] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      getUnicornById(id)
        .then((data) => setUnicorn(data))
        .catch((error) => {
          console.error('Error obteniendo unicornio:', error);
          showAlert('Error obteniendo unicornio.', 'error');
        });
    }
  }, [id, isEditMode]);

  const initialValues = unicorn ? {
    name: unicorn.name || '',
    color: unicorn.color || '',
    age: unicorn.age || '',
    power: unicorn.power || ''
  } : {
    name: '', 
    color: '',
    age: '', 
    power: ''
  };

  if (!unicorn && isEditMode) {
    return <p>Cargando...</p>; 
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es obligatorio'),
    color: Yup.string().required('El color es obligatorio'),
    age: Yup.number()
      .required('La edad es obligatoria')
      .positive('La edad debe ser un número positivo')
      .integer('La edad debe ser un número entero'),
    power: Yup.string().required('El poder es obligatorio')
  });

  const unicornFields = [
    { name: 'name', label: 'Nombre' },
    { name: 'color', label: 'Color' },
    { name: 'age', label: 'Edad', type: 'number' },
    { name: 'power', label: 'Poder' }
  ];

  const handleSubmit = async (unicorn) => {
    try {
      if (isEditMode) {
        await updateUnicorn(id, unicorn);
        showAlert('Unicornio actualizado correctamente.', 'success');
      } else {
        await createUnicorn(unicorn);
        showAlert('Unicornio creado correctamente.', 'success');
      }

      await getUnicorns();
      navigate('/unicorns');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      showAlert('Error al enviar el formulario.', 'error');
    }
  }

  return (
    <div>
      <div className='flex align-items-center'>
        <Button icon="pi pi-arrow-left" className='mr-3' onClick={() => navigate('/unicorns')}/>
        <h1>{isEditMode ? 'Editar Producto' : 'Crear Producto'}</h1>
      </div>
      <ModelForm 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        fields={unicornFields}
      />
    </div>
  );
};

export default UnicornFormView;
