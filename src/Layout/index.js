import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import Study from "./Study";
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
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
