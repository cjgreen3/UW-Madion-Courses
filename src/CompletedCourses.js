import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { AiOutlineSearch } from "react-icons/ai";



class CompletedCourses extends React.Component {
  constructor(props){
    super(props);
    this.rating = React.createRef();

   

  }

getCourseRatings(){

  let ratingOptions = [];
  ratingOptions.push(<option key={"No rating"}>No rating</option>);
  ratingOptions.push(<option style={{backgroundColor: "red"}} key={"1"}>1 - Hated this class</option>);
  ratingOptions.push(<option style={{backgroundColor: "#ebab34"}} key={"2"}>2 - Disliked this class</option>);
  ratingOptions.push(<option style={{backgroundColor: "#ebe534"}} key={"3"}>3 - Neutral</option>);
  ratingOptions.push(<option style={{backgroundColor: "#c3eb34"}} key={"4"}>4 - Liked this class</option>);
  ratingOptions.push(<option style={{backgroundColor: "#89eb34"}} key={"5"}>5 - Loved this class</option>);


  return ratingOptions;
}
getCourseInfo(){
  for(let i = 0; i < this.props.dataObj.length;i++){

    if(this.props.dataObj[i][0].number===this.props.data){

      return this.props.dataObj[i][0].name + " | Credits " + this.props.dataObj[i][0].credits;
    }
  }

}
  
 

  render() {
    return (
      <>
        
      <Card style={{ width: '40rem' }}>
      <Card.Title>{this.props.data} |        {this.getCourseInfo()} 

      </Card.Title>
      <Card.Body>
      <Form.Control
        as="select"
        ref={this.rating}
        onChange={()=>this.props.handleRating(this.props.data, this.rating.current.value)}>
        {this.getCourseRatings()}

      </Form.Control>

      </Card.Body>

      </Card>
      </>

  

        
    )
  }
}

export default CompletedCourses;
