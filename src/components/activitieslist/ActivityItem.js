import React from 'react';

const ActivityItem = ({ activity, id, onClickDelete }) => (
  <p>
    { activity }
    {' '}
    <button
      onClick={() => onClickDelete(id)}
    >
      Remove
    </button>
  </p>
);


export default ActivityItem;
