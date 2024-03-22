import { useState, useEffect } from "react";

import Places from "./Places";
import Error from "./Error";
import { sortPlacesByDistance } from "../loc";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/places")
      .then((response) => {
        return response.json();
      })
      .then((resdata) => {
        setAvailablePlaces(resdata.places);
        console.log(availablePlaces);
      });
  }, []);

  return (
    <div>
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="No places available"
        onSelectPlace={onSelectPlace}
      />
    </div>
  );
}
