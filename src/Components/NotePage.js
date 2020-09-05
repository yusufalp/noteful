import React from 'react';
import moment from 'moment';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function NotePage(props) {
  return (
    <NotesContext.Consumer>
      {value => {
        const note = value.notes.find(note =>
          note.id === parseInt(props.match.params.noteId)
        )
        return (
          <div>
            <div className='group noteCard'>
              <div className='item-3'>
                <h2>{note.name}</h2>
                <p>Date modified on {moment(note.modified).format('MM-DD-YYYY')}</p>
              </div>
              <div className='item'>
                <div className='item edit-button'>
                  <Link to={`/edit-note/` + note.id}>
                    Edit Note
                  </Link>
                </div>
                <button
                  onClick={e => value.deleteNote(note.id, props.history)}
                  type='button'>Delete Note</button>
              </div>
            </div>
            <p className='noteContent'>{note.content}</p>
          </div>
        )
      }}
    </NotesContext.Consumer>
  )
}

NotePage.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any
}

