import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import FolderPage from './Components/FolderPage';
import NotePage from './Components/NotePage';
import NotesContext from './Components/NotesContext';
import AddFolder from './Components/AddFolder';
import AddNote from './Components/AddNote';
import NotesError from './Components/NotesError';

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }
  deleteNote = (noteId, history) => {
    fetch(`http://localhost:9090/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.componentDidMount()
        history.push('/')
      })
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
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
      deleteNote: this.deleteNote,
      getData: this.getData
    }
    return (
      <NotesContext.Provider value={value}>
        <div className="App">
          <header className='header center-text'>
            <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit' }}>Noteful</Link>
          </header>
          <aside>
            <Switch>
              <Route path='/notes/:noteId' component={Sidebar} />
              <Route path='/' component={Sidebar} />
            </Switch>
          </aside>
          <main>
            <NotesError>
              <Route exact path='/' component={FolderPage} />
              <Route path='/folders/:folderId' component={FolderPage} />
              <Route path='/notes/:noteId' component={NotePage} />
              <Route path='/add-folder' component={AddFolder} />
              <Route path='/add-note' component={AddNote} />
            </NotesError>
          </main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default App;
