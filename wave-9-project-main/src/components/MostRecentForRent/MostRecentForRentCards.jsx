import { useEffect } from "react";
import propertyServiceFactory from "../../services/propertyService.jsx";
import Card from "./Card.jsx";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useUserContext } from "../../contexts/UserContext.jsx";
import { isPropertyInFavorites } from "../../utils/isPropertyInFavorites.js";
import useLikeHandler from "../../hooks/useLikeHandler.jsx";

const MostRecentForRentCards = ({ section, endpoint }) => {

    const propertyService = propertyServiceFactory();
    const { userData } = useUserContext();
    const { onLikeHandler } = useLikeHandler();


    const [mostRecentForRent, setMostRecentForRent] = useState();
    const [mostRecentForSale, setMostRecentForSale] = useState();

    useEffect(() => {
        const getThreeRecentProperties = async () => {
            if (endpoint === 'for-rent') {
                try {
                    const rentProperties = await propertyService.getMostRecentProperties(endpoint);
                    setMostRecentForRent(rentProperties);
                } catch (error) {
                    console.log('getMostRecentForRentError', error)
                }

            } else if (endpoint === 'for-sale') {
                try {
                    const saleProperties = await propertyService.getMostRecentProperties(endpoint);
                    setMostRecentForSale(saleProperties);
                } catch (error) {
                    console.log('getMostRecentForSaleError', error)
                }
            }
        }
        getThreeRecentProperties();

    }, [])

    // TODO: check if there are properties. if there are not -> display "No properties available"
    return (
        <div className="mx-auto container pt-10 pb-10">
            <div className="flex flex-row justify-between pb-7">
                <div className="text-left">
                    <h1 className="flex text-3xl font-bold pb-3">{section.title ? (section.title) : "Based on your location"}</h1>
                    <p className="font-light pt-2">{section.description ? (section.description) : "Some of our picked properties near your location."}</p>
                </div>

                <div>
                    <Link to={`/${endpoint}`}
                        className="relative top-4 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-lg transition-all">
                        {section.buttonText ? (section.buttonText) : "Browse more properties"}
                    </Link>
                </div>
            </div>

            <div className="flex flex-wrap gap-10 justify-between pt-3">
                {/* Cards - TODO - get most recent 3 properties*/}
                {mostRecentForRent?.length > 0 && mostRecentForRent.map(property => (<Card key={property._id} property={property} onLikeHandler={onLikeHandler} specialClass={isPropertyInFavorites(property._id, userData) ? 'favorite' : ''} />))}
                {mostRecentForSale?.length > 0 && mostRecentForSale.map(property => (<Card key={property._id} property={property} onLikeHandler={onLikeHandler} specialClass={isPropertyInFavorites(property._id, userData) ? 'favorite' : ''} />))}
                {/* <Card property={propertiesExample} /> */}
                {/*  Cards End  */}

            </div>
        </div>
    );
};

export default MostRecentForRentCards;