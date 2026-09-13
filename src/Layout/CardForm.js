import React from "react";

function CardForm({
  card,
  onChange,
  onSubmit,
  onCancel,
  cancelLabel = "Done",
  submitLabel = "Save",
}) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          className="form-control"
          id="card-front"
          name="front"
          onChange={(event) => onChange("front", event.target.value)}
          placeholder="Front side of card"
          rows="4"
          value={card.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
          className="form-control"
          id="card-back"
          name="back"
          onChange={(event) => onChange("back", event.target.value)}
          placeholder="Back side of card"
          rows="4"
          value={card.back}
        />
      </div>
      <button className="btn btn-secondary" type="button" onClick={onCancel}>
        {cancelLabel}
      </button>{" "}
      <button className="btn btn-primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default CardForm;