import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import CardForm from "./CardForm";
import { readCard, readDeck, updateCard } from "../utils/api";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState({ id: cardId, front: "", back: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      try {
        const [loadedDeck, loadedCard] = await Promise.all([
          readDeck(deckId, controller.signal),
          readCard(cardId, controller.signal),
        ]);

        if (!controller.signal.aborted) {
          setDeck(loadedDeck);
          setCard({
            id: loadedCard.id,
            front: loadedCard.front || "",
            back: loadedCard.back || "",
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

    loadData();

    return () => controller.abort();
  }, [deckId, cardId]);

  function handleChange(field, value) {
    setCard((currentCard) => ({ ...currentCard, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);

    try {
      await updateCard({
        id: card.id,
        front: card.front,
        back: card.back,
        deckId: Number(deckId),
      });
      navigate(`/decks/${deckId}`);
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

  if (error || !deck) {
    return <p>{error ? error.message : "Deck not found."}</p>;
  }

  return (
    <main>
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: deck.name, to: `/decks/${deck.id}` },
          { label: `Edit Card ${card.id}` },
        ]}
      />
      <h2>Edit Card</h2>
      {error ? <p>{error.message}</p> : null}
      <CardForm
        card={card}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        cancelLabel="Cancel"
      />
    </main>
  );
}

export default EditCard;