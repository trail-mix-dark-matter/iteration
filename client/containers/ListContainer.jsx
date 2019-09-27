/**
 * ************************************
 *
 * @module  ListContainer
 * @author
 * @date
 * @description stateful component that renders ListDisplay and TrainContainer
 * ************************************
 */
import React, { Component } from "react";
import ListDisplay from "../components/ListDisplay.jsx";

//container component that holds the list display of trails
//also maps through trailData array and sets props for desired values
class ListContainer extends Component {
    
    render() {
        console.log('this.props.favorites is:', this.props.favorites)
            const trails = this.props.trailData.map((trail, idx) => {

                let isFav = (this.props.favorites.includes(trail.id.toString())) 
                return (
                    <ListDisplay idx={idx} key={idx}
                    currentUsername={this.props.currentUsername}
                    image={trail.imgSqSmall}
                    name = {trail.name}
                    location = {trail.location}
                    length = {trail.length}
                    difficulty = {trail.difficulty}
                    isFav={isFav} 
                    id = {trail.id}
                    trailData = {this.props.trailData}
                    getTrail = {this.props.getTrail}
                    showKey={this.props.showKey}
                    updateFavorites={this.props.updateFavorites}
                    favorites={this.props.favorites}
                    stars={trail.stars}
                    />
                )
            });
            return (
                < div className="listDisplay" >
                    {trails}
                </div >
            )
};
};

export default ListContainer;