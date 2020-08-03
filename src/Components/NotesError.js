import React from 'react';

class NotesError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  render() {
    if(this.state.hasError){
      return (
        <h2>There is an error</h2>
      )
    }
    return this.props.children
  }
}

export default NotesError;