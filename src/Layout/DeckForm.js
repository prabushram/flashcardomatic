import React from "react";

function DeckForm({ deck, onChange, onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="deck-name">Name</label>
        <input
          className="form-control"
          id="deck-name"
          name="name"
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Deck Name"
          type="text"
          value={deck.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="deck-description">Description</label>
        <textarea
          className="form-control"
          id="deck-description"
          name="description"
          onChange={(event) => onChange("description", event.target.value)}
          placeholder="Brief description of the deck"
          rows="4"
          value={deck.description}
        />
      </div>
      <button className="btn btn-secondary" type="button" onClick={onCancel}>
        Cancel
      </button>{" "}
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;