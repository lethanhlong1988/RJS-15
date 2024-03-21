import { useState, useEffect } from "react";

import Places from "./Places";
import Error from "./Error";
import { sortPlacesByDistance } from "../loc";
import { fetchAvailablePlaces } from "../http";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    // fetch("http://localhost:3000/places")
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((resdata) => {
    //     setAvailablePlaces(resdata.places);
    //     console.log(availablePlaces);
    //   });

    async function fetchPlaces() {
      setIsFetching(true);

      try {
        // const response = await fetch("http://localhost:3000/places");
        // const resdata = await response.json();

        // if (!response.ok) {
        //   throw new Error("Failed to fetch places!!!");
        // }
        // setAvailablePlaces(resdata.places);

        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longtitute,
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Could not fetch places, please try again later.",
        });
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred" message={error.message} />;
  }

  return (
    <div>
      <Places
        title="Available Places"
        places={availablePlaces}
        isLoading={isFetching}
        loadingText="Fetching place data..."
        fallbackText="No places available"
        onSelectPlace={onSelectPlace}
      />
    </div>
  );
}
