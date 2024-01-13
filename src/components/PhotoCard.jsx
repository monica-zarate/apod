import { useEffect, useState } from "react";

export default function PhotoCard() {

    const [isLoading, setIsLoading] = useState(true);
    const [photoDetails, setPhotoDetails] = useState({});

    const API_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = import.meta.env.VITE_API_KEY;
    let today = new Date().toISOString().slice(0, 10);

    useEffect(() => {
        const getTodaysPhoto = async () => {
            try {
                const response = await fetch(`${API_URL}?api_key=${API_KEY}&date=${today}&thumbs=true`);
                const data = await response.json();
                setPhotoDetails(data);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        };

        getTodaysPhoto();
    }, []);

    return (
        <div className="bg-white rounded-md p-4 sm:p-6 lg:p-8">
            {isLoading && <div>Loading... </div>}
            <h2 className="text-black">{photoDetails.title}</h2>
            <img src={photoDetails.url} alt={photoDetails.title} className="w-full h-auto"/>
            <p className="text-black">{photoDetails.explanation}</p>
        </div>
    )
}