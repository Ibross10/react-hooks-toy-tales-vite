import React from "react";

function ToyCard({ toy, onLikeToy, onDeleteToy }) {
  function handleLike() {
    const updatedToy = { ...toy, likes: toy.likes + 1 };

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedToy.likes }),
    })
      .then((response) => response.json())
      .then((data) => onLikeToy(data))
      .catch((error) => console.error("Error liking toy:", error));
  }

  function handleDonate() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteToy(toy.id))
      .catch((error) => console.error("Error donating toy:", error));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDonate}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
