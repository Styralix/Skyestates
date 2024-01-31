import { Navigate, useParams } from "react-router";
import { usePropertyContext } from "../contexts/PropertyContext";
import { useAuthContext } from "../contexts/AuthContext";


const PropertyOwner = ({ children }) => {

    //we can use this for the edit page so a user that is not an owner cannot access the edit page

    const { propertyId } = useParams();
    const { getProperty } = usePropertyContext();
    const { userId } = useAuthContext();

    const currentProperty = getProperty(propertyId);

    if (currentProperty && currentProperty._ownerId !== userId) {
        return <Navigate to={`/properties/${propertyId}`} replace />
    }
    return children;
}

export default PropertyOwner;