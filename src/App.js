import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import FolderPage from './Components/FolderPage';
import NotePage from './Components/NotePage';
import './App.css';
import NotesContext from './Components/NotesContext';

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }
  deleteNote = (noteId, history) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE'
    })
    .then( () => {
      this.componentDidMount()
      history.push('/')
    })
  }
  componentDidMount() {
    fetch('http://localhost:9090/folders')
      .then(res => res.json())
      .then(folders => {
        this.setState({
          folders: folders
        })
        return fetch('http://localhost:9090/notes')
      })
      .then(res => res.json())
      .then(notes => {
        this.setState({
          notes: notes
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    const value = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote
    }
    return (
      <NotesContext.Provider value={value}>
        <div className="App">
          <header className='header'>
            <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>Noteful</Link>
          </header>
          <aside>
            <Switch>
              <Route path='/notes/:noteId' component={Sidebar} />
              <Route path='/' component={Sidebar} />
            </Switch>
          </aside>
          <main>
            <Route exact path='/' component={FolderPage} />
            <Route path='/folders/:folderId' component={FolderPage} />
            <Route path='/notes/:noteId' component={NotePage} />
          </main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;
