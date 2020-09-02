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
          note.folderId === parseInt(props.match.params.folderId) || !parseInt(props.match.params.folderId)
        )
        let deleteFolderButton = '';
        for (let key in props.match.params) {
          if (key) {
            deleteFolderButton = <button className="delete-folder-button"
              onClick={e => value.deleteFolder(props.match.params.folderId, props.history)}
              type='button'>Delete Folder</button>
          }
        }
        return (
          <article>
            {notes.map((note, i) => (
              <Note key={i} note={note} value={value} />
            ))}
            <Link to={'/add-note'} className='addnote_button'>Add Note</Link>
            {deleteFolderButton}
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
