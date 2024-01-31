import { useContext, createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import propertyServiceFactory from '../services/propertyService';
import { useUserContext } from './UserContext';

const PropertyContext = createContext();

export const PropertyContextProvider = ({ children, addSystemMsg }) => {
    // console.log('PropertyContext');

    const navigate = useNavigate();
    const propertyService = propertyServiceFactory();

    const [properties, setProperties] = useState([]);
    // const [propertiesForRent, setPropertiesForRent] = useState([]);
    // const [propertiesForSale, setPropertiesForSale] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    const { setUserData } = useUserContext();

    // useEffect(() => {
    //     // propertyService.getAllForRent()
    //     //     .then(result => {
    //     //         setPropertiesForRent(result)
    //     //     })
    //     const fetchData = async () => {
    //         try {
    //             const allProperties = await propertyService.getAll();
    //             const propertiesForRent = await propertyService.getAllForRent();
    //             const propertiesForSale = await propertyService.getAllForSale();

    //             setProperties(allProperties);
    //             setPropertiesForRent(propertiesForRent);
    //             setPropertiesForSale(propertiesForSale.properties);
    //             setTotalCount(propertiesForSale.totalCount);
    //         } catch (error) {
    //             console.log('Error fetching properties in PropertyContext');
    //         }
    //     };
    //     fetchData();
    // }, []);

    // const getAllProperties = () => {
    //     propertyService
    //         .getAll()
    //         .then((result) => {
    //             setProperties(result);
    //         })
    //         .catch((error) => {
    //             console.log('getAllPropertiesError', error);
    //         });
    // };

    const getAllPropertiesForRent = (query) => {
        const forRentQuery = '?status=for-rent&' + query;
        propertyService
            .getAll(forRentQuery)
            .then((result) => {
                setProperties(result.properties);
                setTotalCount(result.totalCount);
            })
            .catch((error) => {
                console.log('getAllPropertiesForRentError', error);
            });
    };

    const getAllPropertiesForSale = (query) => {
        const forSaleQuery = '?status=for-sale&' + query;
        propertyService
            .getAll(forSaleQuery)
            .then((result) => {
                setProperties(result.properties);
                setTotalCount(result.totalCount);
            })
            .catch((error) => {
                console.log('getAllPropertiesForSaleError', error);
            });
    };

    const onCreateSubmit = async (propertyData) => {
        const reponse = await propertyService.create(propertyData);
        const newProperty = reponse.data;
        setProperties((state) => [...state, newProperty]);

        setUserData((state) => {
            const updatedProperties = [...state.properties, newProperty._id];
            return {
                ...state,
                properties: updatedProperties,
            };
        });

        navigate(`/${newProperty.status}/${newProperty._id}`);
        addSystemMsg({
            text: 'Property created successfully.',
            type: 'success',
        });
    };

    // const onCreateForRentSubmit = async (data) => {
    //     const newProperty = await propertyService.create(data);
    //     setPropertiesForRent((state) => [...state, newProperty]);
    //     navigate('/for-rent');
    // };

    // const onCreateForSaleSubmit = async (data) => {
    //     const newProperty = await propertyService.create(data);
    //     setPropertiesForSale((state) => [...state], newProperty);
    //     navigate('/for-sale');
    // };

    const onPropertyEditSubmit = async (data) => {
        const result = await propertyService.edit(data._id, data);
        setProperties((state) =>
            state.map((x) => (x._id === data._id ? result : x))
        );

        navigate(`/${data.status}/${data._id}`);
        addSystemMsg({
            text: 'Property edited successfully.',
            type: 'success',
        });
    };

    // const onForRentPropertyEditSubmit = async (data) => {
    //     const result = await propertyService.edit(data._id, data);
    //     setPropertiesForRent((state) =>
    //         state.map((x) => (x._id === data._id ? result : x))
    //     );
    //     navigate(`/for-rent/${data._id}`);
    // };

    // const onForSalePropertyEditSubmit = async (data) => {
    //     const result = await propertyService.edit(data._id, data);
    //     setPropertiesForSale((state) =>
    //         state.map((x) => (x._id === data._id ? result : x))
    //     );
    //     navigate(`/for-sale/${data._id}`);
    // };

    // const getProperty = (propertyId) => {
    //     return properties.find((x) => x._id === propertyId);
    // };

    // const getPropertyForRent = (propertyId) => {
    //     return propertiesForRent.find((x) => x._id === propertyId);
    // };

    // const getPropertyForSale = (propertyId) => {
    //     return propertiesForSale.find((x) => x._id === propertyId);
    // };

    const deleteProperty = (propertyId) => {
        propertyService.delete(propertyId).then(() => {
            setProperties((state) => state.filter((x) => x._id !== propertyId));

            setUserData((state) => {
                const updatedProperties = state.properties.filter(
                    (property) => property !== propertyId
                );
                return {
                    ...state,
                    properties: updatedProperties,
                };
            });
        });

        navigate('/');
        addSystemMsg({
            text: 'Property deleted successfully.',
            type: 'success',
        });
    };

    // const deletePropertyForRent = (propertyId) => {
    //     setPropertiesForRent((state) =>
    //         state.filter((x) => x._id !== propertyId)
    //     );
    // };

    // const deletePropertyForSale = (propertyId) => {
    //     setPropertiesForSale((state) =>
    //         state.filter((x) => x._id !== propertyId)
    //     );
    // };

    const contextValues = {
        properties,
        // propertiesForRent,
        // propertiesForSale,
        setProperties,
        // setPropertiesForRent,
        // setPropertiesForSale,
        // getAllProperties,
        getAllPropertiesForRent,
        getAllPropertiesForSale,
        onCreateSubmit,
        // onCreateForRentSubmit,
        // onCreateForSaleSubmit,
        onPropertyEditSubmit,
        // onForRentPropertyEditSubmit,
        // onForSalePropertyEditSubmit,
        // getProperty,
        // getPropertyForRent,
        // getPropertyForSale,
        deleteProperty,
        // deletePropertyForRent,
        // deletePropertyForSale,
        totalCount,
    };

    return (
        <>
            <PropertyContext.Provider value={contextValues}>
                {children}
            </PropertyContext.Provider>
        </>
    );
};

export const usePropertyContext = () => {
    const context = useContext(PropertyContext);

    return context;
};
