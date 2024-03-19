import { useState } from "react";

import Modal from "./components/Modal";
import Places from "./components/Places";
import AvailablePlaces from "./components/AvailablePlaces";

import logoImg from "./assets/logo.png";

function App() {
  const [userPlaces, setUserPlaces] = useState([]);
  function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlace) => {
      return [selectedPlace, ...prevPickedPlace];
    });
    console.log(userPlaces);
  }
  return (
    <>
      <Modal>
        <div>Modal</div>
      </Modal>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          places={[]}
          fallbackText="Select the places you would like to visit below."
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
