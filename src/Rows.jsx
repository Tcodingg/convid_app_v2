import React from 'react';

export default function Rows(props) {
  return (
    <tr className='tblData'>
      <td>{props.province}</td>
      <td>{props.recovered}</td>
      <td>{props.deaths}</td>
    </tr>
  );
}
