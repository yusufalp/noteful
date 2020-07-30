import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import NotesContext from './NotesContext';

export default function FolderPage(props) {
  return (
    <NotesContext.Consumer>
      {value => {
        const notes = value.notes.filter(note =>
          note.folderId === props.match.params.folderId || !props.match.params.folderId
        )
        return (
          <article>
            {notes.map((note, i) => (
              <div key={i} id={note.id} className='notes'>
                <div className='group'>
                  <div className='item-3'>
                    <h2>
                      <Link to={'/notes/' + note.id} style={{ color: 'inherit', textDecoration: 'inherit' }}>{note.name}</Link>
                    </h2>
                    <p>Date modified on {moment(note.modified).format('MM-DD-YYYY')}</p>
                  </div>
                  <div className='item'>
                    <button onClick={e => value.deleteNote(note.id, props.history)} type='button'>Delete Note</button>
                  </div>
                </div>
              </div>
            ))}
          </article>
        )
      }
      }
    </NotesContext.Consumer>
  )
}
