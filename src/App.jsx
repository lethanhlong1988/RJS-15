import { useState, useRef } from "react";

import Modal from "./components/Modal";
import Places from "./components/Places";
import AvailablePlaces from "./components/AvailablePlaces";
import DeleteConfirmation from "./components/DeleteConfirmation";

import logoImg from "./assets/logo.png";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    console.log(place);
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
    console.log("stop!!!");
  }

  function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });
    console.log(userPlaces);
  }
  return (
    <>
      <Modal>
        {modalIsOpen && (
          <div>
            <DeleteConfirmation onCancel={handleStopRemovePlace} />
          </div>
        )}
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
          places={userPlaces}
          fallbackText="Select the places you would like to visit below."
          onSelectPlace={handleStartRemovePlace}
        />
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
