import React from 'react';
import NotesContext from './NotesContext';

class EditNote extends React.Component {


  // state = {
  //   id: this.props.location.state.id,
  //   name: this.props.location.state.name,
  //   modified: this.props.location.state.modified,
  //   folderId: this.props.location.state.folderId,
  //   content: this.props.location.state.content
  // }
  handleSubmit = e => {
    // e.preventDefault()
    // const { name, modified, folderId, content } = e.target
    // const note = {
    //   // name: name.value,
    //   // modified: modified.value,
    //   // folderId: folderId.value,
    //   // content: content.value,
    // }
    // fetch('http://localhost:8000/api/notes/' + this.state.id, {
    //   method: 'PATCH',
    //   body: JSON.stringify(note),
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     if (!res.ok) {
    //       return res.json().then(error => {
    //         throw error
    //       })
    //     }
    //     return res.json()
    //   })
    //   .then(() => {
    //     this.props.history.push('/')
    //   })
    //   .catch(error => {
    //     this.setState({ error })
    //   })
  };
  handleNameChange() {

  }
  handleModifiedChange() {

  }
  handleFolderIdChange() {

  }
  handleContentChange() {

  }
  render() {
    return (
      <NotesContext.Consumer>
        {value => {
          const note = value.notes.find(note =>
            note.id === parseInt(this.props.match.params.noteId)
          )
          return (
            <section section className='EditNote' >
              <h2>Edit Note</h2>
              <form
                className='edit-note-form'
                onSubmit={this.handleSubmit}
              >
                <div>
                  <label htmlFor='name'>
                    Name
            </label>
                  <input
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Penguins'
                    value={note.name}
                    onChange={e => this.handleNameChange(e)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor='modified'>
                    Modified Date
            </label>
                  <input
                    type='date'
                    name='modified'
                    id='modified'
                    value={note.modified}
                    onChange={e => this.handleModifiedChange(e)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor='folderId'>
                    Folder
            </label>
                  <input
                    type='number'
                    name='folderId'
                    id='folderId'
                    value={note.folderId}
                    onChange={e => this.handleFolderIdChange(e)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor='content'>
                    Content
            </label>
                  <input
                    type='text'
                    name='content'
                    id='content'
                    value={note.content}
                    onChange={e => this.handleContentChange(e)}
                    required
                  />
                </div>
                <div className='edit-note-buttons'>
                  <button type='button' onClick={this.handleClickCancel}>
                    Cancel
            </button>
                  {' '}
                  <button type='submit'>
                    Update
            </button>
                </div>
              </form>
            </section>
          )
        }
        }
      </NotesContext.Consumer>
    )
  }
}

export default EditNote;
