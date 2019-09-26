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
import Modal from 'react-modal';

//container component for individual TrailDisplay and CommentsDisplay
//maps through comments to pull desired values
Modal.setAppElement('#content');
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

    if(this.props.selectedTrail) {
      return (
        <Modal 
          className='Modal'
          isOpen={this.props.displayTrailModal} 
          onRequestClose={this.props.noTrail} 
          overlayClassName='Overlay'
        >
        <div className="trailInfoAndComments">
        <TrailDisplay selectedTrail={this.props.selectedTrail} />
          <div className='comments'>{comments}</div>
            <br />
            {/* input fields and button to add comments */}
            {/* <input type='textarea' name='comment' id='commentForm'></input> */}
            <textarea name='comment' id='commentForm' />
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
        </Modal>
        // <div className='modalGuts' onKeyPress={e => {console.log('in trailcontainer...', e); if(e.key === 'Escape') this.props.noTrail()}}>
        //   <button onClick={e => this.props.noTrail()}>close</button>
          
        // </div>
      );
    } 
    return null;
  }
}

export default TrailContainer;
