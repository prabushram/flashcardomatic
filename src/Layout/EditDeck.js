import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import DeckForm from "./DeckForm";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, controller.signal);

        if (!controller.signal.aborted) {
          setDeck({
            id: loadedDeck.id,
            name: loadedDeck.name || "",
            description: loadedDeck.description || "",
          });
          setIsLoading(false);
        }
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError);
          setIsLoading(false);
        }
      }
    }

    loadDeck();

    return () => controller.abort();
  }, [deckId]);

  function handleChange(field, value) {
    setDeck((currentDeck) => ({ ...currentDeck, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      await updateDeck({
        id: deck.id,
        name: deck.name,
        description: deck.description,
      });
      navigate(`/decks/${deck.id}`);
    } catch (submitError) {
      setError(submitError);
    }
  }

  function handleCancel() {
    navigate(`/decks/${deckId}`);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !deck.id) {
    return <p>{error ? error.message : "Deck not found."}</p>;
  }

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: deck.name, to: `/decks/${deck.id}` },
          { label: "Edit Deck" },
        ]}
      />
      <h2>Edit Deck</h2>
      <p>{error ? error.message : null}</p>
      <DeckForm
        deck={deck}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </main>
  );
}

export default EditDeck;