import React from 'react';
import './App.css';
import CompletedCourses from "./CompletedCourses";


class CompletedCoursesArea extends React.Component {
  
  getCourses() {
    let completedCourses = [];
    if (typeof(this.props.data.data) != "undefined"){ 
      for(const course of Object.values(this.props.data.data)) { 
    
      completedCourses.push (
        <CompletedCourses  
        data={course} 
        dataObj = {this.props.dataObj}

        handleRating = {(course, rating) => this.props.handleRating(course,rating)} 

        />
      )
      
    }
  }
   
  
    return completedCourses;
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}


        
      </div>
    )
  }
}

export default CompletedCoursesArea;
