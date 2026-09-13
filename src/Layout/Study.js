import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { readDeck } from "../utils/api";

function Study() {
  const { deckId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, controller.signal);

        if (!controller.signal.aborted) {
          setDeck(loadedDeck);
          setCurrentCardIndex(0);
          setIsFlipped(false);
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

  function handleNext() {
    const cards = Array.isArray(deck.cards) ? deck.cards : [];
    const isLastCard = currentCardIndex === cards.length - 1;

    if (!isLastCard) {
      setCurrentCardIndex((index) => index + 1);
      setIsFlipped(false);
      return;
    }

    const shouldRestart = window.confirm(
      "Restart cards?\n\nClick 'cancel' to return to the home page."
    );

    if (shouldRestart) {
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } else {
      navigate("/");
    }
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
      <Breadcrumb
        items={[
          { label: "Home", to: "/" },
          { label: deck.name, to: `/decks/${deck.id}` },
          { label: "Study" },
        ]}
      />
      <h2>Study: {deck.name}</h2>
      {cards.length <= 2 ? (
        <section>
          <h3>Not enough cards.</h3>
          <p>
            You need at least 3 cards to study. There are {cards.length} cards in
            this deck.
          </p>
          <Link className="btn btn-primary" to={`/decks/${deck.id}/cards/new`}>
            Add Cards
          </Link>
        </section>
      ) : (
        <section>
          <h3>
            Card {currentCardIndex + 1} of {cards.length}
          </h3>
          <p>
            {isFlipped
              ? cards[currentCardIndex].back
              : cards[currentCardIndex].front}
          </p>
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setIsFlipped((flipped) => !flipped)}
          >
            Flip
          </button>{" "}
          {isFlipped ? (
            <button className="btn btn-primary" type="button" onClick={handleNext}>
              Next
            </button>
          ) : null}
        </section>
      )}
    </main>
  );
}

export default Study;