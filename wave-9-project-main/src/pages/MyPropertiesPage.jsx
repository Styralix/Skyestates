import { useEffect } from 'react';
import SimpleCard from '../components/my-properties/SimpleCard';
import SimpleDetails from '../components/my-properties/SimpleDetails';
import { useMyProperties } from '../hooks/useMyProperties';
import { useUserContext } from '../contexts/UserContext';

function MyProperties(arrayKey) {

    const { fetchUserData } = useUserContext();

    const { handleOnClick, onSearchHandler, filteredProperties, selectedProperty, } = useMyProperties(arrayKey);

    return (
        <div className="flex">
            <div className="basis-[40%] border-r min-h-screen">
                <div className="px-4 pt-4 pb-10 border-b">
                    <h2 className="text-lg font-bold">
                        Propeties{' '}
                        <span className="text-white text-base font-normal bg-indigo-400 py-1 px-2 rounded-md">
                            {filteredProperties.length}
                        </span>
                    </h2>
                    {/* search-bar */}
                    <div className="mt-4 flex relative items-center">
                        <i className="fas fa-search absolute left-2 text-indigo-400"></i>

                        <input
                            onChange={onSearchHandler}
                            type="text"
                            placeholder="Search by location..."
                            className="w-full pl-8 pr-2 py-2 bg-indigo-50 border outline-none rounded-md"
                        />
                    </div>
                </div>
                {/* single property card */}
                {filteredProperties.map((property) => (
                    <SimpleCard
                        property={property}
                        selectedProperty={selectedProperty}
                        key={property._id}
                        handleOnClick={handleOnClick}
                    />
                ))}
            </div>
            <div className="flex-1">
                <SimpleDetails property={selectedProperty} />
            </div>
        </div>
    );
}

export default MyProperties;
