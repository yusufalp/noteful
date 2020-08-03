import React from 'react';

const NotesContext = React.createContext({
  folders: [],
  notes: [],
  getData: () => { }
})

export default NotesContext;