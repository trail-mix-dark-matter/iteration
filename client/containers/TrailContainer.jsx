/**
 * ************************************
 *
 * @module  TrailContainer.jsx
 * @author
 * @date
 * @description presentation component that displays the TrailDisplay and
 * CommentsDisplay
 * ************************************
 */
import React, { Component } from 'react';
import TrailDisplay from '../components/TrailDisplay.jsx';
import CommentsDisplay from '../components/CommentsDisplay.jsx';

//container component for individual TrailDisplay and CommentsDisplay
//maps through comments to pull desired values
class TrailContainer extends Component {
  render() {
    let comments = [];
    if (this.props.comments) {
      comments = this.props.comments.map((cur, idx) => {
        return (
          <CommentsDisplay
            key={idx}
            comment={cur.comment}
            author={cur.username}
            postComment={this.props.postComment}
            getTrail={this.props.getTrail}
          />
        );
      });
    }
    return (
      <div className='modalGuts' onKeyPress={e => {console.log('in trailcontainer...', e); if(e.key === 'Escape') this.props.noTrail()}}>
        <button onClick={e => this.props.noTrail()}>close</button>
        <TrailDisplay selectedTrail={this.props.selectedTrail} />
        <div className='comments'>{comments}</div>
        <div>
          <br />
          {/* input fields and button to add comments */}
          {/* <input type='textarea' name='comment' id='commentForm'></input> */}
          <textarea name='comment' id='commentForm' />
          <br />
          <br />
          <br />
          <br />
          <br />
          <button
            value='Submit'
            id={this.props.selectedTrail.id}
            onClick={e => {
              const comment = document.getElementById('commentForm').value;
              this.props.postComment(e.target.id, comment);
              document.getElementById('commentForm').value = '';
            }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default TrailContainer;
