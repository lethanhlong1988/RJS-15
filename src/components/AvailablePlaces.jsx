import { useState, useEffect } from "react";

import Places from "./Places";

export default function AvailablePlaces() {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {}, []);
  fetch("http://localhost:3000/places")
    .then((response) => {
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => {
      console.error("Error!!!", error);
    });
  console.log(response);
  return (
    <div>
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText="No places available"
      />
    </div>
  );
}
