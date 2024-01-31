import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Home/Footer';
import useScrollToTop from '../hooks/useScrollToTop';

const HomeLayout = () => {
    useScrollToTop();
    return (
        <div className="text-center">
            <Navbar />
            <main className="mt-[60px] dark:bg-slate-800 dark:text-white transition-all">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default HomeLayout;
