export async function fetchAvailablePlaces() {
  console.log("fetching");
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("Failed to fetch places!");
  }
  const resdata = await response.json();
}
