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
      name: '',
      content: ''
    }
  }
  addNote = (event) => {
    event.preventDefault();

    const name = this.state.name;
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
      .catch(err => console.log(err))
  }
  updateNoteName(value) {
    this.setState({ name: value.trim() })
  }
  updateContent(value) {
    this.setState({ content: value.trim() })
  }
  validateNoteName() {
    return this.state.name ? '' : 'Title is required';
  }
  validateContent() {
    return this.state.content ? '' : 'Content is required';
  }
  render() {
    return (
      <form className='add-folder' onSubmit={this.addNote}>
        <h2>Add a new note</h2>
        <div className='form-group'>
          <label htmlFor='name'>Title</label>
          <input type='text' name='name' id='name' onChange={e => this.updateNoteName(e.target.value)} />
          <ValidationError message={this.validateNoteName()} />
          <label htmlFor='name'>Folder</label>
          <FolderList />
          <label htmlFor='name'>Content</label>
          <textarea type='text' name='content' id='content' onChange={e => this.updateContent(e.target.value)} />
          <ValidationError message={this.validateContent()} />
          <button type='submit' disabled={!(this.state.name && this.state.content)}>Add note</button>
        </div>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: PropTypes.any
}

export default AddNote;