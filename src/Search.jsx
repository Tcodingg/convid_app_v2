import React, { useState } from 'react';

const Search = (props) => {
  return (
    <div>
      <input
        onChange={props.handleOnChange}
        onKeyDown={props.handleOnKeydown}
        placeholder='Enter Country...'
        type='text'
        value={props.inputVal}
      />
    </div>
  );
};

export default Search;
