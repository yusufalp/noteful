import React from 'react';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';
import ValidationError from './ValidationError';

class AddFolder extends React.Component {
  static contextType = NotesContext;
  constructor(props){
    super(props);
    this.state = {
      name: ''
    }
  }
  addFolder = (event) => {
    event.preventDefault();
    const name = event.target.name.value;

    fetch(`http://localhost:9090/folders/`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    })
      .then(() => {
        this.context.getData()
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }  
  updateFolderName(value) {
    this.setState({ name: value.trim() })
  }
  validateFolderName() {
    return this.state.name ? '' : 'Folder name is required';
  }
  render() {
    return (
      <form className='add-folder' onSubmit={this.addFolder}>
        <h2>Add a new folder</h2>
        <div className='form-group'>
          <label htmlFor='name'>Folder Name</label>
          <input type='text' name='name' id='name' onChange={e => this.updateFolderName(e.target.value)}/>
          <ValidationError message={this.validateFolderName()} />
          <button type='submit' disabled={!this.state.name}>Add folder</button>
        </div>
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.any
}

export default AddFolder;