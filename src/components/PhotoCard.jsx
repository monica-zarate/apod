import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMeteor } from '@fortawesome/free-solid-svg-icons';

export default function PhotoCard({selectedDate}) {

    const [isLoading, setIsLoading] = useState(true);
    const [photoDetails, setPhotoDetails] = useState({});

    const API_URL = "https://api.nasa.gov/planetary/apod";
    const API_KEY = import.meta.env.VITE_API_KEY;
    // Get today's date
    let today = new Date();
    let todayFormatted = today.toISOString().slice(0, 10);

    // Get yesterday's date
    let yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    let yesterdayFormatted = yesterday.toISOString().slice(0, 10);

    useEffect(() => {
        setIsLoading(true);
        const getTodaysPhoto = async (date) => {
            try {
                const response = await fetch(`${API_URL}?api_key=${API_KEY}&date=${date}&thumbs=true`);
                const data = await response.json();
                if (data.code && data.code === 404) {
                    // If the response code is 404, fetch again using yesterday's date
                    const responseYesterday = await fetch(`${API_URL}?api_key=${API_KEY}&date=${yesterdayFormatted}&thumbs=true`);
                    const dataYesterday = await responseYesterday.json();
                    setPhotoDetails(dataYesterday);
                } else {
                    // Otherwise, set the photo details using the current response
                    setPhotoDetails(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        getTodaysPhoto(selectedDate !== todayFormatted ? selectedDate : todayFormatted);
    }, [selectedDate]);

    return (
        <div className="bg-white w-full min-h-screen max-w-4xl rounded-md shadow-md">
            {isLoading && <div className="h-full flex flex-col items-center pt-16 lg:pt-32 animate-pulse">
                <FontAwesomeIcon icon={faMeteor} className="h-16 w-auto text-orange-400 mb-4"/>
                <p className="text-teal-600 font-bold">Loading...</p>
            </div>}
            {!isLoading && <div className="p-4 sm:p-6 lg:p-8">
                <p className="text-teal-800 text-bold mb-2">{photoDetails.date}</p>
                <h2 className="text-orange-400 text-2xl mb-4">{photoDetails.title}</h2>
                <img src={photoDetails.media_type === "video" ? photoDetails.thumbnail_url : photoDetails.url} alt={photoDetails.title} className="max-h-screen w-auto mx-auto mb-8"/>
                <p className="text-teal-800 leading-loose">{photoDetails.explanation}</p>
            </div>}
        </div>
    )
}