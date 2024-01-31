import React, { useState, useEffect, useRef } from 'react';

const ImageUploaderEdit = ({ property, setProperty }) => {
    console.log('ImageUploaderEdit', property);
    const [imageURLs, setImageURLs] = useState([]);

    const inputRef = useRef(null);
    const MAX_LENGTH = 8;
    const imgPlaceholderArray = new Array(
        MAX_LENGTH - property.images.length
    ).fill(true);


    let blob = new Blob([property.images], { type: 'image/jpeg' });

    // Function to convert a URL image to a Blob
    async function urlToBlob(url) {
        // Fetch the image data
        const response = await fetch(url);

        console.log('URLTOBOBRESPONSE', response);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }



        // Convert the response body to a Blob
        const blob = await response.blob();

        return blob;
    }



    // Usage
    const imageUrl = 'https://example.com/image.jpg'; // Replace with your image URL
    urlToBlob(imageUrl)
        .then(blob => {
            // Now you have the image data as a Blob
            console.log(blob);
        })
        .catch(error => {
            console.error(error);
        });

    useEffect(() => {
        if (property.images.length > 0) {
            const newImageUrls = property.images.map((image) => ({
                name: image.name,
                // url: new Blob([image], { type: 'image/jpeg' })
                url: image,

            }));
            console.log('NEWIMAGEURLS', newImageUrls);
            setImageURLs(newImageUrls);
        }
    }, [property.images]);

    const handleClick = (image) => {
        setImageURLs((prevImageURLs) =>
            prevImageURLs.filter((img) => img !== image)
        );
        setProperty((prevProperty) => ({
            ...prevProperty,
            images: prevProperty.images.filter(
                (img) => img.name !== image.name
            ),
        }));
    };

    const onImageChange = (e) => {
        console.log('ETARGETFILES-000000', e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        console.log('URL-------', url);
        console.log('ONIMAGECHANGE----------------');
        console.log('ETARGER-FILE', e.target.files);
        console.log('PROPERTYIMAGES', property.images);
        if (
            property.images.length < MAX_LENGTH &&
            e.target.files.length < MAX_LENGTH
        ) {
            const newImages = [...property.images];
            [...e.target.files].forEach((file) => {
                if (
                    !newImages.includes(file) &&
                    newImages.length < MAX_LENGTH
                ) {
                    newImages.push(file);
                }
            });
            console.log('NEWIMAGES-----', newImages);
            setProperty((prevProperty) => ({
                ...prevProperty,
                images: newImages,
            }));
        }
    };

    return (
        <div>
            <div className=" text-center">
                <label htmlFor="images" className="font-bold text-lg">
                    Images:
                </label>
                <p>Please select up to 8 images</p>
                <input
                    type="file"
                    id="images"
                    max={1048576}
                    ref={inputRef}
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={onImageChange}
                />
            </div>
            <div
                className={`grid grid-cols-2 md:grid-cols-4 my-5 gap-5 justify-items-center m-auto`}
            >
                {imageURLs.map((img, idx) => (
                    <div className="relative" key={idx}>
                        <div
                            className="absolute top-1 right-1 bg-red-700 rounded-md p-1 inline-flex items-center justify-center text-4xl text-white hover:bg-red-600 hover:text-black"
                            onClick={() => handleClick(img)}
                        >
                            <svg
                                className="h-3 w-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <img
                            src={img.url}
                            alt="property-photo"
                            className={'bg-cover w-[120px] h-[120px]'}
                        />
                    </div>
                ))}
                {imgPlaceholderArray.map((_, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-center text-4xl w-[120px] h-[120px] border select-none cursor-pointer hover:border-indigo-600"
                        onClick={() =>
                            inputRef.current && inputRef.current.click()
                        }
                    >
                        +
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUploaderEdit;
