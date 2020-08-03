import React from 'react';
import NotesContext from './NotesContext';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
  static contextType = NotesContext;
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
  }
  render() {
    return (
      <form className='add-folder' onSubmit={this.addFolder}>
        <h2>Add a new folder</h2>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' />
          <button type='submit'>Add folder</button>
        </div>
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.any
}

export default AddFolder;