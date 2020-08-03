import React from 'react';
import NotesContext from './NotesContext';

class FolderList extends React.Component {
  static contextType = NotesContext;
  render() {
    return (
      <>
        <select>
        {this.context.folders.map((folder, i) => 
          <option key={i}>{folder.name}</option>
        )}
        </select>
      </>
    )
  }
}

export default FolderList;