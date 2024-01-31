import { Link } from 'react-router-dom';
import Tenant from './Tenant';

function SimpleDetails({ property }) {
    const location = `${property?.location?.address}, ${property?.location?.city}`;
    const listedOn = new Date(property?.listingCreation).toLocaleDateString();
    const img = property?.images[0];

    if (!property) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div style={{ backgroundImage: `url(${img})` }} className={`bg-cover bg-center w-full h-2/5`}></div >
            < div className="p-5" >
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold">{property.title}</h2>
                    <Link to={`/${property.status}/${property._id}`} className="py-2 px-4 bg-indigo-400 text-white rounded-md transition-all hover:bg-indigo-500 active:scale-95">
                        See more &rarr;
                    </Link>
                </div>
                <p className="text-slate-500">{location}</p>
                <div className="flex justify-evenly border-2 mt-5 rounded-md">
                    <div className="p-4">
                        <p className="capitalize text-slate-500 font-semibold">
                            Price
                        </p>
                        <p className="font-bold">
                            <i className="fas fa-dollar-sign text-indigo-400"></i>{' '}
                            {property.price}
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="capitalize text-slate-500 font-semibold">
                            Bedrooms
                        </p>
                        <p className="font-bold">
                            <i className="fas fa-bed text-indigo-400"></i>{' '}
                            {property.bedrooms}
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="capitalize text-slate-500 font-semibold">
                            Bathrooms
                        </p>
                        <p className="font-bold">
                            <i className="fas fa-bath text-indigo-400"></i>{' '}
                            {property.bathrooms}
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="capitalize text-slate-500 font-semibold">
                            Area
                        </p>
                        <p className="font-bold">
                            <i className="fas fa-ruler-combined pr-2 text-indigo-400"></i>{' '}
                            {property.area} sq m
                        </p>
                    </div>
                    <div className="p-4">
                        <p className="capitalize text-slate-500 font-semibold">
                            Listed on
                        </p>
                        <p className="font-bold">
                            <i className="fas fa-calendar-alt text-indigo-400"></i>{' '}
                            {listedOn}
                        </p>
                    </div>
                </div>
                <div className="flex mt-5">
                    <div className="flex-1 mr-5">
                        <p className="font-semibold text-2xl mb-3">
                            Description
                        </p>
                        <p className="text-slate-500 leading-relaxed">
                            {property.description}
                        </p>
                        <p className="font-semibold text-2xl mb-3 mt-4">
                            Features
                        </p>
                        {property.features.map((feature, i) => (
                            <span
                                key={i}
                                className="p-2 rounded-md mr-2 mb-2 font-semibold inline-block bg-indigo-50 text-indigo-400"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                    <div className="flex-shrink-0 basis-72">
                        <Tenant />
                    </div>
                </div>
            </div >
        </>
    );
}

export default SimpleDetails;
