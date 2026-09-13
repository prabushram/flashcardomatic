import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import DeckForm from "./DeckForm";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [error, setError] = useState(null);

  function handleChange(field, value) {
    setDeck((currentDeck) => ({ ...currentDeck, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      const createdDeck = await createDeck({ ...deck });
      navigate(`/decks/${createdDeck.id}`);
    } catch (submitError) {
      setError(submitError);
    }
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <main>
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Create Deck" }]} />
      <h2>Create Deck</h2>
      {error ? <p>{error.message}</p> : null}
      <DeckForm
        deck={deck}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </main>
  );
}

export default CreateDeck;