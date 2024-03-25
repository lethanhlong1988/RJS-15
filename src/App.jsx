import { useState, useRef, useCallback, useEffect } from "react";

import Modal from "./components/Modal";
import Places from "./components/Places";
import AvailablePlaces from "./components/AvailablePlaces";
import DeleteConfirmation from "./components/DeleteConfirmation";
import Error from "./components/Error";

import logoImg from "./assets/logo.png";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";

function App() {
  console.log("App");
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      // Tien hanh Fetching ...
      const places = await fetchUserPlaces();
      setUserPlaces(places);
      try {
        fetchUserPlaces();
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch places!",
        });
      }
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    console.log("stop!!!");
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    // await updateUserPlaces([selectedPlace, ...userPlaces]);

    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    // try {
    //   await updateUserPlaces(selectedPlace, ...userPlaces);
    // } catch (error) {
    //   setUserPlaces(userPlaces);
    //   setErrorUpdatingPlaces({
    //     message: error.message || "Failed to update places.",
    //   });
    // }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id),
    );

    // try {
    //   await updateUserPlaces(
    //     userPlaces.filter((place) => place.id !== selectedPlace.current.id),
    //   );
    // } catch (error) {
    //   setUserPlaces(userPlaces);
    //   setErrorUpdatingPlaces({
    //     message: error.message || "Failed to delete place.",
    //   });
    // }

    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occured!"
            message="Failed to update places.!"
            onConfirm={handleError}
          />
        )}
      </Modal>

      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        {modalIsOpen && (
          <div>
            <DeleteConfirmation
              onCancel={handleStopRemovePlace}
              onConfirm={handleRemovePlace}
            />
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
        {error && <Error title="An error occured!" message={error.message} />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            fallbackText="Select the places you would like to visit below."
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
