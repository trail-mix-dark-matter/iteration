/**
 * ************************************
 *
 * @module  TrailDisplay
 * @author
 * @date
 * @description presentation component that renders each trail data
 *
 * ************************************
 */
import React from "react";

const difficultyColors = {
    green: 'EASY',
    greenBlue: 'EASY/INTERMEDIATE',
    blue: 'INTERMEDIATE',
    blueBlack: 'INTERMEDIATE/DIFFICULT',
    black: 'DIFFICULT',
    blackBlack: 'EXTREMELY DIFFICULT'
}

//pulls specific data from trailContainer to display in overlay
const TrailDisplay = props => {
    return (
        <div >
        <h3> <strong>{props.selectedTrail && props.selectedTrail.name}</strong></h3><br/>
        <h4>{props.selectedTrail && props.selectedTrail.location}</h4>
        <div className="trailImgInfo" >
            <img src={props.selectedTrail && props.selectedTrail.imgMedium} class='trailImage'/>
            <div className="trailInfo">
                <p className="trailSummary">"{props.selectedTrail && props.selectedTrail.summary}"</p>
                <div className="trailDetails">
                    <p> Length: {props.selectedTrail && props.selectedTrail.length}  miles</p>
                    <p> Difficulty: {props.selectedTrail && difficultyColors[props.selectedTrail.difficulty]}</p>
                    <p> Trail Rating: {props.selectedTrail && props.selectedTrail.stars}  stars</p>
                    <p> Ascent: {props.selectedTrail && props.selectedTrail.ascent} ft <br></br>
                    Descent: {props.selectedTrail && props.selectedTrail.descent} ft</p>
                    <p> Conditions: {props.selectedTrail && props.selectedTrail.conditionStatus}</p>
                    <p className="updateDate">(As of {props.selectedTrail && (new Date(props.selectedTrail.conditionDate)).toString().slice(0, 16)})</p>
                </div>
            </div>
        </div>
        <br/><br/><br/>
    </div>
    );
};

export default TrailDisplay;