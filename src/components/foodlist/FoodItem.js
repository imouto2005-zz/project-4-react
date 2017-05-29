import React from 'react';

const FoodItem = ({ food, cuisine, place, id, onClickDelete }) => (
  <p>
    { food }<br />
    { cuisine }<br />
    { place }

    <button onClick={() => onClickDelete(id)}>
      Remove
    </button>
  </p>
);


export default FoodItem;
