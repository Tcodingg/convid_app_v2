import React, { useState } from 'react';

const Search = (props) => {
  return (
    <input
      onKeyDown={props.searchInput}
      placeholder='Enter Country...'
      type='text'
    />
  );
};

export default Search;
