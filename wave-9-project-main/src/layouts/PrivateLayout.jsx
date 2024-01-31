import { Outlet } from 'react-router-dom';
import Navbar from '../components/private/Navbar';
import useScrollToTop from '../hooks/useScrollToTop';
import Header from '../components/private/Header';

const PrivateLayout = ({ heading }) => {
    useScrollToTop();
    return (
        <>
            <Navbar />
            <Header heading={heading} />
            <main className="ml-14">
                <Outlet />
            </main>
        </>
    );
};

export default PrivateLayout;
