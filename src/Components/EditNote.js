import React from 'react';
import NotesContext from './NotesContext';

class EditNote extends React.Component {
  static contextType = NotesContext;
  state = {
    id: this.context.id,
    name: this.context.name,
    content: this.context.content
  }
  componentDidMount() {
    const note = this.context.notes.find(note =>
      note.id === parseInt(this.props.match.params.noteId)
    )
    this.setState({
      id: note.id,
      name: note.name,
      content: note.content
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const note = {
      name: this.state.name,
      content: this.state.content,
    }
    fetch('http://localhost:8000/api/notes/' + this.state.id, {
      method: 'PATCH',
      body: JSON.stringify(note),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        this.props.history.push('/')
      })
      .catch(error => {
        this.setState({ error })
      })
  }
  handleClickCancel = () => {
    this.props.history.push('/')
  }
  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  handleContentChange(e) {
    this.setState({
      content: e.target.value
    })
  }
  render() {
    return (
      <section className='EditNote' >
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
              value={this.state.name}
              onChange={e => this.handleNameChange(e)}
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
              value={this.state.content}
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

export default EditNote;
