import Modal from "./components/Modal";
import Places from "./components/Places";
import AvailablePlaces from "./components/AvailablePlaces";

import logoImg from "./assets/logo.png";

function App() {
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
        <AvailablePlaces />
      </main>
    </>
  );
}

export default App;
