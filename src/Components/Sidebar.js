import React from 'react';
import { NavLink } from 'react-router-dom';

class Sidebar extends React.Component {
  render() {
    let folder;
    if(this.props.match.params.noteId){
      const note = this.props.notes.find(note =>
        note.id === this.props.match.params.noteId 
      )
      folder = this.props.folders.find(folder =>
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
              {this.props.folders.map((folder, i) =>
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