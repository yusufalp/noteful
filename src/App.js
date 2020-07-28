import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import FolderPage from './Components/FolderPage';
import NotePage from './Components/NotePage';
import STORE from './Components/STORE';
import './App.css';

class App extends React.Component {
  state = {
    folders: STORE.folders,
    notes: STORE.notes
  }
  render() {
    return (
      <div className="App">
        <header className='header'>
          <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>Noteful</Link>
        </header>
        <aside>
          <Switch>
            <Route path='/notes/:noteId'
              render={routerProps => (
                <Sidebar
                  notes={this.state.notes}
                  folders={this.state.folders}
                  history={routerProps.history}
                  match={routerProps.match} />
              )}
            />
            <Route path='/'
              render={routerProps => (
                <Sidebar
                  notes={this.state.notes}
                  folders={this.state.folders}
                  history={routerProps.history}
                  match={routerProps.match} />
              )}
            />
          </Switch>
        </aside>
        <main>
          <Route exact path='/'
            render={routerProps => (
              <FolderPage notes={this.state.notes} match={routerProps.match} />
            )}
          />
          <Route
            path='/folders/:folderId'
            render={routerProps => (
              <FolderPage notes={this.state.notes} match={routerProps.match} />
            )}
          />
          <Route
            path='/notes/:noteId'
            render={routerProps => (
              <NotePage notes={this.state.notes} match={routerProps.match} />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
