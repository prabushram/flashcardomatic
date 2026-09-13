import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Routes } from "react-router-dom";

function RoutePlaceholder({ title }) {
  return (
    <main>
      <h2>{title}</h2>
    </main>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<RoutePlaceholder title="Home" />} />
          <Route path="/decks/new" element={<RoutePlaceholder title="Create Deck" />} />
          <Route path="/decks/:deckId/study" element={<RoutePlaceholder title="Study" />} />
          <Route path="/decks/:deckId/edit" element={<RoutePlaceholder title="Edit Deck" />} />
          <Route
            path="/decks/:deckId/cards/new"
            element={<RoutePlaceholder title="Add Card" />}
          />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<RoutePlaceholder title="Edit Card" />}
          />
          <Route path="/decks/:deckId" element={<RoutePlaceholder title="Deck" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
