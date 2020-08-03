import React from 'react';
import NotesContext from './NotesContext';
import moment from 'moment';
import PropTypes from 'prop-types';
import FolderList from './FolderList';
import ValidationError from './ValidationError';

class AddNote extends React.Component {
  static contextType = NotesContext;
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
  }
  addNote = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const content = event.target.content.value;

    const folderName = event.target.folderName.value;
    const matchFolder = this.context.folders.find(folder => folder.name === folderName);
    const folderId = matchFolder.id

    const modified = moment(new Date().toLocaleDateString(), "MM-DD-YYYY");

    fetch(`http://localhost:9090/notes/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        content,
        folderId,
        modified
      })
    })
      .then(() => {
        this.context.getData()
        this.props.history.push('/')
      })
  }
  updateNoteName(value) {
    this.setState({ name: value })
  }
  validateNoteName() {
    return this.state.name ? '' : 'Name is required';
  }
  render() {
    return (
      <form className='add-folder' onSubmit={this.addNote}>
        <h2>Add a new note</h2>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' onChange={e => this.updateNoteName(e.target.value)} />
          <ValidationError message={this.validateNoteName()} />
          <label htmlFor='name'>Folder</label>
          <FolderList />
          <label htmlFor='name'>Content</label>
          <textarea type='text' name='content' id='content' />
          <button type='submit' disabled={!this.state.name}>Add note</button>
        </div>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.any
}

export default AddNote;