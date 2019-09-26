/**
 * ************************************
 *
 * @module  ListDisplay
 * @author
 * @date
 * @description presentation component that display the trail list
 *
 *
 * ************************************
 */

import React from "react";
import Styles from "../styles.css"

//display component for limited trail info, name clicks through to trail display and difficulty clicks through to difficulty key
const ListDisplay = props => {
    const difficultyColors = {
        green: 'EASY',
        greenBlue: 'EASY/INTERMEDIATE',
        blue: 'INTERMEDIATE',
        blueBlack: 'INTERMEDIATE/DIFFICULT',
        black: 'DIFFICULT',
        blackBlack: 'EXTREMELY DIFFICULT'
    }

    return (
        <div className="list-items"> 
            <div className="trail-image">
            <img src={props.image}/>
            </div>
            <div className="trail-info">
            <div className='difficulty'>
                <p id={props.id} className={props.difficulty} onClick={() => props.showKey()}>
                {props.trailData.length > 0 && difficultyColors[props.difficulty]}
                </p>
            </div>
            <div className="trail-name">
                <p className = "favIcon" id={props.id} onClick={()=> props.addFavorite(username, id)}>&#9734;</p>
                <p id={props.id} onClick={(e) => props.getTrail(e.target.id)}>
                 {props.trailData.length > 0 && props.name}
                </p>
            </div>

            <div className="miles-location">
                <p id={props.id} className='length'>
                {props.trailData.length > 0 && props.length} mi • 
                </p>
                <p className="location"> 
                {props.trailData.length > 0 && props.location}
                </p>
            </div>
            </div>
        </div>
    );
};

export default ListDisplay;