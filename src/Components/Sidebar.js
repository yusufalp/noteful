import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';

class Sidebar extends React.Component {
  static contextType = NotesContext;
  render() {
    let folder;
    if (this.props.match.params.noteId) {
      const note = this.context.notes.find(note =>
        note.id === parseInt(this.props.match.params.noteId)
      )
      folder = this.context.folders.find(folder =>
        folder.id === parseInt(note.folderId)
      )
    }
    return (
      <div className='sidenav'>
        {this.props.match.params.noteId ?
          (
            <>
              <button className='goBack' type='button' onClick={e => this.props.history.goBack()}>Go Back</button>
              <h2 className='center-text'>{folder.name}</h2>
            </>
          ) :
          (
            <>
              {this.context.folders.map((folder, i) =>
                <NavLink key={i} id={folder.id} to={`/folders/${folder.id}`} >{folder.name}</NavLink>
              )}
              <Link to={'/add-folder'} className='addfolder_button'>Add Folder</Link>
            </>
          )}
      </div>
    )
  }
}

Sidebar.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any
}

export default Sidebar;