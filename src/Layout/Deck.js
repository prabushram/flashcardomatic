import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { deleteCard, deleteDeck, readDeck } from "../utils/api";

function Deck() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
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

  async function handleDeleteDeck() {
    const shouldDelete = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (shouldDelete) {
      await deleteDeck(deck.id);
      navigate("/");
    }
  }

  async function handleDeleteCard(card) {
    const shouldDelete = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it."
    );

    if (!shouldDelete) {
      return;
    }

    await deleteCard(card.id);
    setDeck((currentDeck) => ({
      ...currentDeck,
      cards: currentDeck.cards.filter(
        (currentCard) => currentCard.id !== card.id
      ),
    }));
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !deck) {
    return <p>{error ? error.message : "Deck not found."}</p>;
  }

  const cards = Array.isArray(deck.cards) ? deck.cards : [];

  return (
    <main>
      <Breadcrumb items={[{ label: "Home", to: "/" }, { label: deck.name }]} />
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <p>
        <Link className="btn btn-secondary" to={`/decks/${deck.id}/edit`}>
          Edit
        </Link>{" "}
        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
          Study
        </Link>{" "}
        <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
          Add Cards
        </Link>{" "}
        <button
          className="btn btn-danger"
          type="button"
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </p>
      <h3>Cards</h3>
      {cards.map((card) => (
        <article key={card.id}>
          <p>{card.front}</p>
          <p>{card.back}</p>
          <Link
            className="btn btn-secondary"
            to={`/decks/${deck.id}/cards/${card.id}/edit`}
          >
            Edit
          </Link>{" "}
          <button
            className="btn btn-danger"
            type="button"
            onClick={() => handleDeleteCard(card)}
          >
            Delete
          </button>
        </article>
      ))}
    </main>
  );
}

export default Deck;