import React from 'react';

const FoodItem = ({ food, cuisine, place, id, onClickDelete }) => (
  <p>
    Name: { food }<br />

    { cuisine && <p>Cuisine: { cuisine } </p> }

    { place && <p>Type of place: { place }</p>}

    <button onClick={() => onClickDelete(id)}>
      Remove
    </button>
  </p>
)
export default FoodItem;
