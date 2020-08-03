import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from './NotesContext';
import Note from './Note';
import PropTypes from 'prop-types';

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
              <Note key={i} note={note} value={value} />
            ))}
            <Link to={'/add-note'} className='addnote_button'>Add Note</Link>
          </article>
        )
      }
      }
    </NotesContext.Consumer>
  )
}


FolderPage.propTypes = {
  match: PropTypes.any
}
