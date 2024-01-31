import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import Card from '../MostRecentForRent/Card';
import Pagination from './Pagination';
import { usePropertyContext } from '../../contexts/PropertyContext';
import { useAuthContext } from '../../contexts/AuthContext';
import useService from '../../hooks/useService';
import userServiceFactory from '../../services/userService';
import propertyServiceFactory from '../../services/propertyService';
import { useUserContext } from '../../contexts/UserContext';
import useLikeHandler from '../../hooks/useLikeHandler';

let propertiesExample = {
    propertyId: '1',
    title: 'Cozy Apartment in Sofia',
    description:
        'A beautiful and cozy apartment located in the heart of Sofia.',
    type: 'Apartment',
    location: {
        address: '123 Main Street',
        city: 'Sofia',
        state: 'Sofia City',
        zipcode: '1000',
    },
    price: '200000',
    area: '80',
    bedrooms: '2',
    bathrooms: '1',
    images: [
        'https://source.unsplash.com/800x600/?apartment',
        'https://source.unsplash.com/800x600/?interior',
        'https://source.unsplash.com/800x600/?living-room',
    ],
    features: [
        'Balcony',
        'Central Heating',
        'Parking',
        'Wooden Floors',
        'Security System',
    ],
    userId: 'user1',
    status: 'for sale',
    listingCreation: '2023-07-01T10:00:00Z',
    listingExpiration: '2023-09-30T23:59:59Z',
};

function Catalog({ heading, type }) {

    const navigate = useNavigate();
    const propertyService = propertyServiceFactory();

    const [currentPage, setCurrentPage] = useState(1);
    // const [userData, setUserData] = useState();

    const [filteredRentResults, setFilteredRentResults] = useState([]);
    const [filteredSaleResults, setFilteredSaleResults] = useState([]);

    const userService = useService(userServiceFactory);

    const { userId } = useAuthContext();
    const { propertiesForRent, propertiesForSale, setPropertiesForRent, setPropertiesForSale, getAllPropertiesForRent, getAllPropertiesForSale, } = usePropertyContext();

    const { userData } = useUserContext();

    const { onLikeHandler } = useLikeHandler();

    // const fetchUserData = async () => {
    //     try {
    //         const user = await userService.getUser(userId);
    //         setUserData(user);
    //     } catch (error) {
    //         throw new Error('Error fetching user data')
    //     }
    // }

    // useEffect(() => {
    //     if (userId) {
    //         fetchUserData();
    //     }
    // }, [userId]);

    // const onLikeHandler = async (e, propertyId) => {
    //     e.stopPropagation();
    //     if (!userId) {
    //         navigate('/login');
    //     }
    //     try {
    //         await propertyService.like(propertyId);
    //         await fetchUserData();
    //     } catch (error) {
    //         throw new Error('Error in liking property')
    //     }
    // }

    const isPropertyInFavorites = (propertyId) => {
        return userData?.favorites?.includes(propertyId);
    }

    useEffect(() => {
        if (type === 'forRent') {
            getAllPropertiesForRent();
            setPropertiesForSale([]);
            setFilteredRentResults([]);
        } else if (type === 'forSale') {
            getAllPropertiesForSale();
            setPropertiesForRent([]);
        }
    }, [type]);

    let path = location.pathname;


    // TODO - fix error with dispaying wrong properties upon refresh of the page
    // useEffect(() => {
    //     console.log('PATH USE EFFECT', path);
    //     if (path.includes('for-rent')) {
    //         getAllPropertiesForRent();
    //         setPropertiesForSale([]);
    //         setFilteredRentResults([]);
    //     } else if (path.includes('for-sale')) {
    //         console.log('YESSS');
    //         getAllPropertiesForSale();
    //         setPropertiesForRent([]);
    //         console.log('SALE', propertiesForSale);
    //         console.log('RENT', propertiesForRent);
    //         console.log('filtered RENT', filteredRentResults);
    //         console.log('filtered Sale', filteredSaleResults);
    //     }
    // }, [path]);

    // const onSearchHandler = (data) => {
    //     if (path.includes('for-rent')) {
    //         console.log('PATH-FOR RENT');
    //         const filteredPropertiesForRent = propertiesForRent.filter(property => {
    //             //TODO - create filtration for the individual search parameters
    //             return (property.location.city === data.location &&
    //                 property.bedrooms === Number(data.bedrooms) &&
    //                 property.price <= Number(data.price) &&
    //                 property.type.toLowerCase() === data.type.toLowerCase()
    //             )
    //         })
    //         setPropertiesForRent(filteredPropertiesForRent);

    const onSearchHandler = (data) => {
        if (path.includes('for-rent')) {
            console.log('For-rent-DATA', data);
            console.log('PATH-FOR RENT');
            const filteredPropertiesForRent = propertiesForRent.filter(property => {
                //TODO - create filtration for the individual search parameters
                let receivedData = true;
                if (data.location !== '' && data.location && property.location.city !== data.location) {
                    receivedData = false;
                }
                if (data.bedrooms !== '' && Number(data.bedrooms) >= 0 && Number(property.bedrooms) !== Number(data.bedrooms)) {
                    receivedData = false;
                }

                if (data.price !== '' && Number(data.price) > 0 && Number(property.price) > Number(data.price)) {
                    receivedData = false;
                }
                if (data.type !== '' && data.type && property.type.toLowerCase() !== data.type.toLowerCase()) {
                    receivedData = false;
                }
                console.log('RECEIVEDDATA', receivedData);
                return receivedData;
            })
            setFilteredRentResults(filteredPropertiesForRent)
            // setPropertiesForRent(filteredPropertiesForRent)

        } else if (path.includes('for-sale')) {
            const filteredPropertiesForSale = propertiesForSale.filter(property => {
                //TODO - create filtration for the individual search parameters
                let receivedData = true;
                if (data.location !== '' && data.location && property.location.city !== data.location) {
                    receivedData = false;
                }
                if (data.bedrooms !== '' && Number(data.bedrooms) >= 0 && Number(property.bedrooms) !== Number(data.bedrooms)) {
                    receivedData = false;
                }

                if (data.price !== '' && Number(data.price) > 0 && Number(property.price) > Number(data.price)) {
                    receivedData = false;
                }
                if (data.type !== '' && data.type && property.type.toLowerCase() !== data.type.toLowerCase()) {
                    receivedData = false;
                }
                return receivedData;
            })
            console.log('filteredPropertiesForSale', filteredPropertiesForSale);
            setFilteredSaleResults(filteredPropertiesForSale);
        }
    }




    return (
        <div className="bg-indigo-50 border">
            <div className="container mx-auto">
                <h1 className="text-5xl capitalize text-left pt-12 mb-10 font-bold text-black">
                    {heading}
                </h1>
                <SearchBar onSearchHandler={onSearchHandler} />
                {/* TODO - check if mapping over the arrays displays the Cards properly */}
                {/* {path.includes('for-rent') && propertiesForRent.length > 0 && propertiesForRent.map(propertyForRent => < Card property={propertyForRent} />)}
                {path.includes('for-sale') && propertiesForSale.length > 0 && propertiesForSale.map(propertyForSale => < Card property={propertyForSale} />)}
                {path.includes('for-rent') && propertiesForRent.length === 0 && <p className='text-center text-gray-700 text-3xl'>There are no properties listed as of now. Please come back later.</p>}
                {path.includes('for-sale') && propertiesForSale.length === 0 && <p>There are no properties listed as of now. Please come back later.</p>} */}
                <div className="container mx-auto grid gap-y-10 grid-cols-3 gap-x-10 justify-items-center mb-10 rounded-md grid-rows-3">


                    {filteredRentResults?.length === 0 && propertiesForRent.length > 0 && propertiesForRent.map(property => (<Card key={property._id} property={property} onLikeHandler={onLikeHandler} specialClass={isPropertyInFavorites(property._id) ? 'favorite' : ''} />))}
                    {filteredSaleResults?.length === 0 && propertiesForSale.length > 0 && propertiesForSale.map(property => (<Card key={property._id} property={property} onLikeHandler={onLikeHandler} specialClass={isPropertyInFavorites(property._id) ? 'favorite' : ''} />))}


                    {filteredRentResults?.length > 0 && filteredRentResults.map(property => (<Card key={property._id} property={property} specialClass={isPropertyInFavorites(property._id) ? 'favorite' : ''} />))}
                    {filteredSaleResults?.length > 0 && filteredSaleResults.map(property => (<Card key={property._id} property={property} specialClass={isPropertyInFavorites(property._id) ? 'favorite' : ''} />))}
                    {/* <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} />
                    <Card property={propertiesExample} /> */}
                </div>
            </div>
            <Pagination
                totalCards={90}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
}

export default Catalog;
