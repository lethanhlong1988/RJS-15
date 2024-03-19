export default function DeleteConfirmation({ onCancel, onConfirm }) {
  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to delete this place?</p>
      <div id="confirmation-actions">
        <button className="button-text" onClick={onCancel}>
          No
        </button>
        <button className="button">Yes</button>
      </div>
    </div>
  );
}
