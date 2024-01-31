import { Link } from 'react-router-dom';

function Header({ heading }) {
    return (
        <header className="ml-14 p-4 border-b flex items-center justify-between">
            <h1 className="text-2xl capitalize font-bold mr-auto">{heading}</h1>
            <Link to={'/'} className="text-2xl font-bold">
                Skyline <span className="text-indigo-400">Estate</span>
            </Link>
            {/* <Link
                to={'/private/create'}
                className="p-2 bg-indigo-400 hover:bg-indigo-500 active:scale-95 transition-all text-white rounded-md"
            >
                &#43; Add a property
            </Link>
            <div className="ml-5 py-2 px-4 border border-slate-400 rounded-md">
                Profile
            </div> */}
        </header>
    );
}

export default Header;
