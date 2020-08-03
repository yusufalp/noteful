import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

class Note extends React.Component {
  render() {
    return (
      <div id={this.props.note.id} className='notes'>
        <div className='group'>
          <div className='item-3'>
            <h2>
              <Link
                to={'/notes/' + this.props.note.id}
                style={{ color: 'inherit', textDecoration: 'inherit' }}>{this.props.note.name}</Link>
            </h2>
            <p>Date modified on {moment(this.props.note.modified).format('MM-DD-YYYY')}</p>
          </div>
          <div className='item'>
            <button
              onClick={e => this.props.value.deleteNote(this.props.note.id, this.props.history)}
              type='button'>Delete Note</button>
          </div>
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  note: PropTypes.object,
  value: PropTypes.object,
  history: PropTypes.any
}

export default Note;