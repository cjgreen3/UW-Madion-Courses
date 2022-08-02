import React from 'react';
import './App.css';
import RecommendedCourses from "./RecommendedCourses";


class RecommendedCoursesArea extends React.Component {
  
  getCourses() {

    // courses={this.state.allCourses}
    // coursesRated={this.state.highRatedCourses}
    // coursesTaken={this.state.completedCourseObj}
    // handleRating = {(course, rating) => this.handleRating(course, rating)} 
    // />

  // iterate through all courses
	// iterate through rated coureses
	// 	keywordRated of ratedCourse.keywords
	// 		keywordCourse of course.keywords
	// 			if keywordRated === keywordCourse && !course.number.includes(couresTaken)
	// 				recommendedCourses.push (<RecommendedCourses data={course} />)


    
   let recommendedCourses = [];
 
     

          for(const course of Object.values(this.props.data)){
            console.log(course.number)
                      recommendedCourses.push ( <RecommendedCourses data={course} />)
          }
      
        
      



     
  
   
  
    return recommendedCourses;
  }

  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}


        
      </div>
    )
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
}

export default RecommendedCoursesArea;
