import { PencilIcon,EyeIcon,TrashIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { DarkMode } from '../../context/DarkMode';
import { alert, confirAlert } from '../../utils/alerts';
import { helpAxios } from '../../services/helpAxios';
import { endPoints } from '../../services/endPoints/endPoints';
import Loading from '../../components/Loading';
import { converterPrice } from '../../utils/ converter';

// eslint-disable-next-line react/prop-types
const TableDataProducts = ({ setIsOpenModalDetailProduct, setEditDataProduct, loadDataQuotation, setIsOpenModalAddProduct, setTitle, dataProducts, loadDataProducts, loading, error}) => {

    //Delete Product//
    const handleDeleteProduct = (id) => {
        const config = {
            url: endPoints.products.deleteProduct(id),
            method: 'DELETE',
            title: 'La cotización ha sido eliminada', 
            icon: 'success',
            loadData: loadDataProducts
        }
        confirAlert('Eliminar producto','Está seguro de eliminar el producto?', 'warning', 'Eliminar', helpAxios, config);
    };

    //Update Product//
    const handleEditProduct = (product) => {
        setEditDataProduct(product);
        setIsOpenModalAddProduct(true); 
        loadDataQuotation(product?.id);
        setTitle('Editar Producto');
    };

    //Details Product//
    const handleDetailsProduct = (product) => {
        setEditDataProduct(product);
        setIsOpenModalDetailProduct(true); 
        loadDataQuotation(product.id);
    };
 
    const {darkMode} = useContext(DarkMode);
    
    return (
        <div className="flex flex-col overflow-x-auto w-full">
            <div className="sm:-mx-4 lg:-mx-4">
                <div className="inline-block min-w-full sm:px-2 lg:px-2">
                    <div className="overflow-x-auto">
                        {
                            loading 
                                ? <Loading />

                                : 
                                <table className="w-full text-center text-s font-light pb-4 mb-4" >
                                    <thead>
                                        <tr className='bg-btn-style text-text-ligth'>
                                            <th className='px-4 py-2 font-medium'>Código</th>
                                            <th className='px-2 py-2 font-medium'>Nombre</th>
                                            <th className='px-2 py-2 font-medium'>Categoría</th>
                                            <th className='px-2 py-2 font-medium'>Modelo</th>
                                            <th className='px-2 py-2 font-medium'>Transmisión</th>
                                            <th className='px-2 py-2 font-medium'>Precio</th>
                                            <th className='px-2 py-2 font-medium'>% Ganancia</th>
                                            <th className='px-2 py-2 font-medium'>Stock</th>
                                            <th className='px-2 py-2 font-medium'>Acciones</th>
                                        </tr>
                                    </thead>

                                    <tbody className={
                                        `${darkMode 
                                            ? 'bg-background-dark_medium text-text-ligth' 
                                            : 'bg-background-ligth text-text-dark'
                                        }`
                                    }>
                                        {   
                                            dataProducts?.length === 0 
                                                ? <tr className='border-b text-center w-full'>
                                                    <td 
                                                        colSpan="10" 
                                                        className='px-4 py-2 text-center'>
                                                        No hay datos</td>
                                                </tr> 
                                                : (dataProducts?.map)(product => (
                                                    <tr 
                                                        key={product.id} 
                                                        className='border-b w-full'>
                                                        <td className='px-4 py-4'>{product.code}</td>
                                                        <td className='py-2'>{product.name}</td>
                                                        <td className='py-2'>{product.category.name}</td>
                                                        {
                                                            product.mark_model === '' 
                                                                ? <td className=' py-2'>--</td> 
                                                                : <td className='px-2 py-2'>
                                                                    {product.mark_model?.name} ({product.mark_model?.mark?.name})
                                                                </td>
                                                        }
                                                            
                                                        {
                                                            product.transmission === ''     
                                                                ? <td className='px-2 py-2'>--</td> 
                                                                : <td className='px-2 py-2'>
                                                                    {product.transmission}
                                                                </td>
                                                        }
                                                        <td className='py-2'>$ {converterPrice(product.price)}</td>
                                                        <td className=' py-2'>{product.profit}</td>
                                                        <td className=' py-2'>{product.stock}</td>
                                                        <td className='flex py-2 gap-1 justify-center items-center pr-2 pt-4'>
                                                            <button 
                                                                className='bg-btn-yellow text-text-ligth p-1 rounded-lg hover:bg-btn-yellowHover'
                                                                onClick={() => handleEditProduct(product)}>
                                                                <PencilIcon className='h4 w-4'/>
                                                            </button>

                                                            <button 
                                                                className='bg-btn-red text-text-ligth p-1 rounded-lg hover:bg-btn-redHover'
                                                                onClick={ () => handleDeleteProduct (product.id)}>
                                                                <TrashIcon className='h4 w-4'/>
                                                            </button>

                                                            <button 
                                                                className='bg-btn-blue text-text-ligth p-1 rounded-lg hover:bg-btn-blueHover'
                                                                onClick={ () => handleDetailsProduct (product)}>
                                                                <EyeIcon className='h4 w-4'/>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                        }                              
                                    </tbody>
                                </table>
                        }
                          
                        {
                            error !== null 
                                ? alert('Error de conexión', 'error')
                                : null
                        }
                    </div>
                </div>
            </div>
                
        </div>
    );
};

export default TableDataProducts;
