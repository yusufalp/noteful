import React from 'react';

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => { },
  deleteFolder: () => { },
  getData: () => { }
})

export default NotesContext;