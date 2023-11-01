import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Deck = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then((response) => {
        setDeckId(response.data.deck_id);
        setRemaining(response.data.remaining);
      })
      .catch((error) => console.error(error));
  }, []);

  const drawCard = () => {
    if (remaining > 0) {
      axios
        .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then((response) => {
          const drawnCard = response.data.cards[0];
          setCards([...cards, drawnCard]);
          setRemaining(response.data.remaining);
        })
        .catch((error) => console.error(error));
    } else {
      alert("Error: no cards remaining!");
    }
  };

  const shuffleDeck = () => {
    setIsShuffling(true);
    setCards([]);
    axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
    .then((response) => {
      setDeckId(response.data.deck_id);
      setRemaining(response.data.remaining);
        setIsShuffling(false);
      })
      .catch((error) => {
        console.error(error);
        setIsShuffling(false);
      });
  };


  return (
    <div>
      <h1>Deck of Cards</h1>
      <button onClick={drawCard}>Draw a Card</button>
      <button onClick={shuffleDeck} disabled={isShuffling}>
        Shuffle Deck
      </button>
      {isShuffling && <p>Shuffling deck...</p>}
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default Deck;
