import React from 'react';
import './App.css';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { BiStar } from "react-icons/bi";



class RecommendedCourses extends React.Component {
  constructor(props){
    super(props);   
  }


 

  render() {
    return (
      <>
      <Card style={{ width: '60rem' }}>
      <Card.Title>{this.props.data.number}
      </Card.Title>
      <Card.Subtitle>{this.props.data.name} | Credits {" "} {this.props.data.credits} |
      Overall Rating: <BiStar/><BiStar/><BiStar/><BiStar/> (431)</Card.Subtitle>
      <Card.Body>
      This course is recommended because you rated a course with one or more interest areas in {" "}
         {this.props.data.keywords.join(", ")} high!
      </Card.Body>

      </Card>
      </>

  

        
    )
  }
}

export default RecommendedCourses;
