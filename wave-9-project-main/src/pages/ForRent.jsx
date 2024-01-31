import { useEffect } from 'react';
import NewCatalog from '../components/catalog/NewCatalog';
import Pagination from '../components/catalog/Pagination';
import SearchBar from '../components/catalog/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { usePropertyContext } from '../contexts/PropertyContext';

function ForRent() {
    const { properties, getAllPropertiesForRent, totalCount } =
        usePropertyContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.toString();
    const currentPage = Number(searchParams.get('page')) || 1;

    const setCurrentPage = (data) => {
        setSearchParams((prev) => {
            prev.set('page', data.toString());
            return prev;
        });
    };

    useEffect(() => {
        getAllPropertiesForRent(query);
    }, [query]);

    return (
        <div className="bg-indigo-50 border">
            <div className="container mx-auto">
                <h1 className="text-5xl capitalize text-left pt-12 mb-10 font-bold text-black">
                    Search Properties To Rent
                </h1>
                <SearchBar onSearchHandler={setSearchParams} />
                <NewCatalog properties={properties} />
            </div>
            {properties.length > 0 && (
                <Pagination
                    totalCards={totalCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </div>
    );
}

export default ForRent;
