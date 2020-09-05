import React from 'react';
import './App.css';
import { Route, Link, Switch, withRouter } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import FolderPage from './Components/FolderPage';
import NotePage from './Components/NotePage';
import NotesContext from './Components/NotesContext';
import AddFolder from './Components/AddFolder';
import AddNote from './Components/AddNote';
import NotesError from './Components/NotesError';
import EditNote from './Components/EditNote';
import config from './config';

class App extends React.Component {
  state = {
    folders: [],
    notes: []
  }
  deleteNote = (noteId, history) => {
    const url = config.API_ENDPOINT
    console.log(url);
    fetch(`${url}/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.componentDidMount()
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }
  deleteFolder = (folderId, history) => {
    const url = config.API_ENDPOINT
    fetch(`${url}/api/folders/${folderId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.componentDidMount()
        this.props.history.push('/')
      })
      .catch(err => console.log(err))
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const url = config.API_ENDPOINT
    fetch(`${url}/api/folders`)
      .then(res => res.json())
      .then(folders => {
        this.setState({
          folders: folders
        })
        return fetch(`${url}/api/notes`)
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
      deleteFolder: this.deleteFolder,
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
              <Route path='/edit-note/:noteId' component={EditNote} />
            </NotesError>
          </main>
        </div>
      </NotesContext.Provider>
    );
  }
}

export default withRouter(App)