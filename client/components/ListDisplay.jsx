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
    return (
        // <div className="trail-image">
        //     <img src={props.trailData.imgSqSmall}></img>
        // </div>
        <div className="list-items"> 
            <div className='difficulty'>
                <p id={props.id} onClick={() => props.showKey()}>
                {props.trailData.length > 0 && props.difficulty}
                </p>
            </div>
            <div className="trail-name">
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
    );
};

export default ListDisplay;