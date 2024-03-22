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
    async function fetchPlaces() {
      setIsFetching(true);

      try {
        const places = await fetchAvailablePlaces();
        // setAvailablePlaces(resdata.places);
      } catch (error) {
        setError({
          message:
            error.message || "Couldnot fetch places, please try again later.",
        });
        console.log(error);
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="Some error occurred!" message={error.message} />;
  }

  return (
    <div>
      <Places
        title="Available Places"
        places={availablePlaces}
        isLoading={isFetching}
        loadingText="Fetching place data ..."
        fallbackText="No places available"
        onSelectPlace={onSelectPlace}
      />
    </div>
  );
}
