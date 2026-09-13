import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDecks() {
      try {
        const loadedDecks = await listDecks(controller.signal);

        if (!controller.signal.aborted) {
          setDecks(loadedDecks);
          setIsLoading(false);
        }
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError);
          setIsLoading(false);
        }
      }
    }

    loadDecks();

    return () => controller.abort();
  }, []);

  async function handleDelete(deck) {
    const shouldDelete = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );

    if (!shouldDelete) {
      return;
    }

    await deleteDeck(deck.id);
    setDecks((currentDecks) =>
      currentDecks.filter((currentDeck) => currentDeck.id !== deck.id)
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <main>
      <h2>Home</h2>
      <p>
        <Link className="btn btn-primary" to="/decks/new">
          Create Deck
        </Link>
      </p>
      {decks.map((deck) => {
        const cardCount = Array.isArray(deck.cards) ? deck.cards.length : 0;

        return (
          <article key={deck.id}>
            <h3>{deck.name}</h3>
            <p>{deck.description}</p>
            <p>
              {cardCount} {cardCount === 1 ? "card" : "cards"}
            </p>
            <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
              View
            </Link>{" "}
            <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
              Study
            </Link>{" "}
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => handleDelete(deck)}
            >
              Delete
            </button>
          </article>
        );
      })}
    </main>
  );
}

export default Home;