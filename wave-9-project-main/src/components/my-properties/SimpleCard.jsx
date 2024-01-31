

function SimpleCard({ property, handleOnClick, selectedProperty }) {


    const { images, title, area, location, status } = property;
    const address = `${location.address}, ${location.city}`;

    if (!property) {
        return <p>Loading...</p>
    }

    return (
        <div
            onClick={() => handleOnClick(property)}
            className={`flex p-4 border-b items-center w-full cursor-pointer hover:bg-indigo-50 ${property === selectedProperty && 'bg-indigo-50'
                } transition-all`}
        >
            <img src={images[0]} alt={title} className="w-20 rounded-md" />

            <div className="flex-grow ml-4">
                <p className="font-semibold">{title}</p>
                <p className="text-slate-500 capitalize">{address}</p>
            </div>
            <div>
                <p className="flex-shrink-0 uppercase bg-green-100 px-2 text-green-600 font-semibold rounded-full">
                    {status}
                </p>
                <p className="text-right text-slate-500">{area} sq m</p>
            </div>
        </div>
    );
}

export default SimpleCard;
