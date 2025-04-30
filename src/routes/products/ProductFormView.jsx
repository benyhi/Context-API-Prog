import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useAlert } from '../../context/AlertContext'; 
import ModelForm from '../../components/ModelForm';
import * as Yup from 'yup';
import { createProduct, updateProduct, getProductById } from './services/ProductService';

const ProductFormView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const isEditMode = Boolean(id);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProductById(id);
          setProduct(fetchedProduct);
        } catch (error) {
          console.error('Error al obtener el producto:', error);
          showAlert('Error al cargar el producto.', 'error');
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  if (!product && isEditMode) {
    return <p>Cargando...</p>;
  }

  const initialValues = product ? {
    nombre: product.nombre || '',
    precio: product.precio || '',
    stock: product.stock || ''
  } : {
    nombre: '',
    precio: '',
    stock: ''
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().required('El nombre es obligatorio'),
    precio: Yup.number().positive('El precio debe ser un número positivo'),
    stock: Yup.number()
      .required('La cantidad es obligatoria')
      .positive('El stock debe ser un número positivo')
      .integer('El stock debe ser un número entero')
  });

  const productFields = [
    { name: 'nombre', label: 'Nombre' },
    { name: 'precio', label: 'Precio', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' }
  ];

  const handleSubmit = async (productData) => {
    try {
      if (isEditMode) {
        await updateProduct(id, productData);
        showAlert('Producto actualizado correctamente.', 'success');
        console.log('Producto actualizado:', productData);
      } else {
        await createProduct(productData);
        showAlert('Producto creado correctamente.', 'success');
        console.log('Producto creado:', productData);
      }

      navigate('/products');

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      showAlert('Hubo un error al guardar el producto.', 'error');
    }
  }

  return (
    <div>
      <div className='flex align-items-center'>
        <Button icon="pi pi-arrow-left" className='mr-3' onClick={() => navigate('/products')}/>
        <h1>{isEditMode ? 'Editar Producto' : 'Crear Producto'}</h1>
      </div>

      <ModelForm 
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        fields={productFields}
      />
    </div>
  );
}

export default ProductFormView;
