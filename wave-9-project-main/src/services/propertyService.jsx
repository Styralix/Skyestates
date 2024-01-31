import { requestService } from './requester';

const baseURL = 'http://localhost:3000/properties';

const propertyServiceFactory = () => {
    const request = requestService();

    const getAll = async (query) => {
        // reuse this function and remove getAllForRent and getAllForSale
        const result = await request.get(`${baseURL}/${query}`);
        const properties = Object.values(result.data);
        return { properties, totalCount: result.totalCount };
    };
    // const getAllForRent = async () => {
    //     const result = await request.get(`${baseURL}/?status=for-rent`);
    //     const properties = Object.values(result.data);
    //     return properties;
    // };

    // const getAllForSale = async (query = '?status=for-sale') => {
    //     const result = await request.get(`${baseURL}/${query}`);
    //     const properties = Object.values(result.data);
    //     return { properties, totalCount: result.totalCount };
    // };

    const getOne = async (propertyId) => {
        const result = await request.get(`${baseURL}/${propertyId}`);
        return result.data;
    };

    const create = async (propertyData) => {
        const result = await request.post(`${baseURL}`, propertyData);
        return result;
    };

    const deleteProperty = async (propertyId) => {
        const result = request.delete(`${baseURL}/${propertyId}`);
    };

    const edit = async (propertyId, data, identifier) => {
        // request.put(`${baseURL}/${identifier}/${propertyId}`, data);
        request.put(`${baseURL}/${propertyId}`, data);
    };

    const like = async (propertyId) => {
        // const likedProperty = {
        //     propertyId,
        //     userId
        // }

        //    await request.put(`${baseURL}/${propertyId}/like`, likedProperty);
        const likeObj = {
            propertyId,
        };
        await request.put('http://localhost:3000/users/like', likeObj);
    };

    const getMostRecentProperties = async (endpoint) => {
        const result = await request.get(
            `${baseURL}/recents/?status=${endpoint}`
        );
        return result.data;
    };

    return {
        getAll,
        // getAllForRent,
        // getAllForSale,
        getOne,
        create,
        delete: deleteProperty,
        edit,
        like,
        getMostRecentProperties,
    };
};

export default propertyServiceFactory;
