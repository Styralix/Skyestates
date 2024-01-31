import { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { authServiceFactory } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);
//TODO - check if we should leave it () or (null) above

export const AuthContextProvider = ({ children, addSystemMsg }) => {
    // console.log('AuthContext');
    const navigate = useNavigate();

    const [auth, setAuth] = useLocalStorage('auth', {});
    const authService = authServiceFactory();

    const onRegisterSubmit = async (registerValues) => {
        // const { confirmPassword, ...registerData } = registerValues;
        if (registerValues.confirmPassword !== registerValues.password) {
            console.log('Error in onRegisterSubmit');
            throw new Error();
        }

        try {
            const result = await authService.register(registerValues);
            setAuth(result);
            navigate('/login');
            addSystemMsg({ text: 'Signed up successfully.', type: 'success' });
        } catch (error) {
            addSystemMsg({ text: error.error, type: 'error' });
        }
    };

    const onLoginSubmit = async (loginData) => {
        try {
            const result = await authService.login(loginData);
            setAuth(result.loginData);
            addSystemMsg({ text: 'login successfully.', type: 'success' });
            navigate('/');
        } catch (error) {
            console.log(error);
            addSystemMsg({ text: 'bad credentials.', type: 'error' });
            console.log('catch - onLoginSubmit');
        }
    };

    const onLogout = async () => {
        // await authService.logout();
        setAuth({});
        navigate('/');
        addSystemMsg({ text: 'Logged out successfully.', type: 'success' });
    };

    const contextValues = {
        onRegisterSubmit,
        onLoginSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.userEmail,
        isAuthenticated: !!auth.accessToken,
    };

    return (
        <>
            <AuthContext.Provider value={contextValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};
