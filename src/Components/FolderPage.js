import React from 'react';
import { Link } from 'react-router-dom';
import NotesContext from './NotesContext';
import Note from './Note';
import PropTypes from 'prop-types';

class FolderPage extends React.Component {
  static contextType = NotesContext;
  componentDidMount() {
    this.context.getData()
  }
  render() {
    const notes = this.context.notes.filter(note =>
      note.folderId === parseInt(this.props.match.params.folderId) || !parseInt(this.props.match.params.folderId)
    )
    let deleteFolderButton = '';
    for (let key in this.props.match.params) {
      if (key) {
        deleteFolderButton = <button className="delete-folder-button"
          onClick={e => this.context.deleteFolder(this.props.match.params.folderId, this.props.history)}
          type='button'>Delete Folder</button>
      }
    }
    return (
      <article>
        {notes.map((note, i) => (
          <Note key={i} note={note} />
        ))}
        <Link to={'/add-note'} className='addnote_button'>Add Note</Link>
        {deleteFolderButton}
      </article>
    )
  }
}


FolderPage.propTypes = {
  match: PropTypes.any
}

export default FolderPage;