import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";
import { createCard, readDeck } from "../utils/api";

function AddCard() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ front: "", back: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, controller.signal);

        if (!controller.signal.aborted) {
          setDeck(loadedDeck);
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
    setCard((currentCard) => ({ ...currentCard, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      await createCard(deckId, { front: card.front, back: card.back });
      setCard({ front: "", back: "" });
    } catch (submitError) {
      setError(submitError);
    }
  }

  function handleDone() {
    navigate(`/decks/${deckId}`);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error && !deck) {
    return <p>{error.message}</p>;
  }

  if (!deck) {
    return <p>Deck not found.</p>;
  }

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: deck.name, to: `/decks/${deck.id}` },
          { label: "Add Card" },
        ]}
      />
      <h2>{deck.name}: Add Card</h2>
      {error ? <p>{error.message}</p> : null}
      <CardForm
        card={card}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleDone}
      />
    </main>
  );
}

export default AddCard;