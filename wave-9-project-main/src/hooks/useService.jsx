import { useContext } from "react";
import { AuthContext, useAuthContext } from "../contexts/AuthContext";

const useService = (serviceFactory) => {
    const { token } = useAuthContext();

    const service = serviceFactory(token);

    return service;
}

export default useService;