import React from 'react';
import { NavLink } from 'react-router-dom';
import NotesContext from './NotesContext';

class Sidebar extends React.Component {
  static contextType = NotesContext;
  render() {
    let folder;
    if(this.props.match.params.noteId){
      const note = this.context.notes.find(note =>
        note.id === this.props.match.params.noteId 
      )
      folder = this.context.folders.find(folder =>
        folder.id === note.folderId
      )
    }
    return (
      <div className='sidenav'>
        {this.props.match.params.noteId ?
          (
            <>
              <button className='goBack' type='button' onClick={e => this.props.history.goBack()}>Go Back</button>
              <h2>{folder.name}</h2>
            </>
          ) :
          (
            <>
              {this.context.folders.map((folder, i) =>
                <NavLink key={i} id={folder.id} to={`/folders/${folder.id}`} >{folder.name}</NavLink>
              )}
              <button className='addfolder' type='button'>Add Folder</button>
            </>
          )}
      </div>
    )
  }
}

export default Sidebar;