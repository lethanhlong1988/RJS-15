export default function Places({ title, places,fallbackText }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {places.length === 0 && 
      <p>{fallbackText}</p>
      }

    </section>
  );
}
