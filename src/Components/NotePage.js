import React from 'react';
import moment from 'moment';

export default function NotePage(props) {
  const note = props.notes.find(note =>
    note.id === props.match.params.noteId 
  )
  return(
    <div>
      <div className='group noteCard'>
        <div className='item-3'>
          <h2>{note.name}</h2>
          <p>Date modified on {moment(note.modified).format('MM-DD-YYYY')}</p>
        </div>
        <div className='item'>
          <button type='button'>Delete Note</button>
        </div>
      </div>
      <p className='noteContent'>{note.content}</p> 
    </div>
  )
}

