import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import CourseArea from "./CourseArea";
import CompletedCoursesArea from "./CompletedCoursesArea";
import RecommendedCoursesArea from "./RecommendedCoursesArea";


import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
      filteredCourses: [],
      subjects: [],
      keywords: [], 
      cartCourses: {},
      completedCourses: [],
      completedCourseObj: [], 
      recommendedCourses: [], //suggested 
      highRatedCourses: [], //courses that have been taken
      
    };
  }

  componentDidMount() {
    this.loadInitialState();
  }

  async loadInitialState() {
    let courseURL = "http://cs571.cs.wisc.edu:53706/api/react/classes";
    let courseData = await (await fetch(courseURL)).json();

    let completedCourseURL = "http://cs571.cs.wisc.edu:53706/api/react/students/5022025924/classes/completed";
    let completedCourseData = await(await fetch(completedCourseURL)).json();
    let completedCourseDataObj = this.convertCompletedCoursesToObj(completedCourseData, courseData);

    this.setState({
      allCourses: courseData,
      filteredCourses: courseData,
      subjects: this.getSubjects(courseData),
      keywords: this.getKeywords(courseData),
      completedCourses: completedCourseData,
      completedCourseObj : completedCourseDataObj

    });
  }
  convertCompletedCoursesToObj(completedCourses, allCourses){
    let completedCourseObjData = [];
    for(const courseName of completedCourses.data){
      const course = allCourses.filter(
        (courseObj) => courseName === courseObj.number);
      completedCourseObjData.push(course);
    }
    return  completedCourseObjData;


  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for (let i = 0; i < data.length; i++) {
      if (subjects.indexOf(data[i].subject) === -1)
        subjects.push(data[i].subject);
    }

    return subjects;
  }
  getKeywords(data){
    let keywords = [];
    keywords.push("All");
    
    for (const course of data) {
      for(const keyword of course.keywords){
      
        if(!keywords.includes(keyword)){
          keywords.push(keyword);
        }
      }

    }  
     
    return keywords;

  }

  setCourses(courses) {
    this.setState({ filteredCourses: courses });
  }



  addCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses)); 
    let courseIndex = this.state.allCourses.findIndex((x) => {
      return x.number === data.course;
    });
    // console.log(data.course);
    // const c = this.state.allCourses.filter(
    //   (courseObj) => data.course === courseObj.number);
    
    for(const course of this.state.allCourses){
      if(course.number === data.course){
        var c = course;
      }
    }

    for(var requisites of c.requisites){
      for(let i = 0; i< requisites.length; i++){
        if(!this.state.completedCourses.data.includes(requisites[i])){
          alert(requisites[i] + " is a requisite to take this course.  In order to enroll in " + data.course + ", you need to take this requisite");
          //getRequisiteTree();
        }
      }
    
    }


    if (courseIndex === -1) {
      return;
    }

    if ("subsection" in data) {
      if (data.course in this.state.cartCourses) {
        if (data.section in this.state.cartCourses[data.course]) {
          
          newCartCourses[data.course][data.section].push(data.subsection);
        } else {
          newCartCourses[data.course][data.section] = [];
          newCartCourses[data.course][data.section].push(data.subsection);
        }
      } else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        newCartCourses[data.course][data.section].push(data.subsection);
      }
    } else if ("section" in data) {
      if (data.course in this.state.cartCourses) {
        newCartCourses[data.course][data.section] = [];

        for (
          let i = 0;
          i <
          this.state.allCourses[courseIndex].sections[data.section].subsections
            .length;
          i++
        ) {
          newCartCourses[data.course][data.section].push(
            this.state.allCourses[courseIndex].sections[data.section]
              .subsections[i]
          );
        }
      } else {
        newCartCourses[data.course] = {};
        newCartCourses[data.course][data.section] = [];
        for (
          let i = 0;
          i <
          this.state.allCourses[courseIndex].sections[data.section].subsections
            .length;
          i++
        ) {
          for(var requisite in data.course.requisites ){
            console.log(requisite);
          }
          newCartCourses[data.course][data.section].push(
            this.state.allCourses[courseIndex].sections[data.section]
              .subsections[i]
          );
        }
      }
    } else {
      newCartCourses[data.course] = {};

      for (
        let i = 0;
        i < this.state.allCourses[courseIndex].sections.length;
        i++
      ) {
        newCartCourses[data.course][i] = [];

        for (
          let c = 0;
          c < this.state.allCourses[courseIndex].sections[i].subsections.length;
          c++
        ) {
        
          newCartCourses[data.course][i].push(
            this.state.allCourses[courseIndex].sections[i].subsections[c]
          );
        }
      }
    }
    this.setState({ cartCourses: newCartCourses });
  }

  removeCartCourse(data) {
    let newCartCourses = JSON.parse(JSON.stringify(this.state.cartCourses));

    if ("subsection" in data) {
      newCartCourses[data.course][data.section].forEach((_subsection) => {
        if (_subsection.number === data.subsection.number) {
          newCartCourses[data.course][data.section].splice(
            newCartCourses[data.course][data.section].indexOf(_subsection),
            1
          );
        }
      });
      if (newCartCourses[data.course][data.section].length === 0) {
        delete newCartCourses[data.course][data.section];
      }
      if (Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    } else if ("section" in data) {
      delete newCartCourses[data.course][data.section];
      if (Object.keys(newCartCourses[data.course]).length === 0) {
        delete newCartCourses[data.course];
      }
    } else {
      delete newCartCourses[data.course];
    }
    this.setState({ cartCourses: newCartCourses });
  }

  getCartData() {
    let cartData = [];

    for (const courseKey of Object.keys(this.state.cartCourses)) {
      let course = this.state.allCourses.find((x) => {
        return x.number === courseKey;
      });

      cartData.push(course);
    }
    return cartData;
  }



  handleRating(course, rating){
    console.log(course + " "+ rating);

    if(parseInt(rating)>=4){
      const ratedCourse = this.state.allCourses.filter(
      (courseObj) => course === courseObj.number);
      this.addRecommendedCourses(ratedCourse[0]);

    }else{
      const ratedCourse = this.state.allCourses.filter(
        (courseObj) => course === courseObj.number);
        this.removeRecommendedCourses(ratedCourse[0]);
    }

  }
  addRecommendedCourses(courseRated){
    let temp = [...this.state.recommendedCourses];


    for(var course of this.state.allCourses){
      for(var courseKeyword of course.keywords){
        for(var keywordRated of courseRated.keywords ){
          if(courseKeyword === keywordRated  && !this.state.completedCourses.data.includes(course.number)){
            if(!temp.includes(course)){
              temp.push(course);

            }
          }
        }
      }
    
    }
    this.setState({ recommendedCourses: temp });

  }
  removeRecommendedCourses(courseRated){
    let temp = [...this.state.recommendedCourses];
    console.log(temp);
    let newTemp = [];
    console.log("Recommended Length: " + temp.length);
    for(var course of temp){
      var matched = false;
      for(var courseKeyword of course.keywords){
        for(var keywordRated of courseRated.keywords ){
          if(courseKeyword === keywordRated){
            matched = true;

          }
        }
       
      }
      if(!matched){
        newTemp.push(course);
      }
    
    }
    this.setState({ recommendedCourses: newTemp });


  }
  getRequisiteTree(){

  }
  
  

  render() {
    return (
      <>
        <Tabs
          defaultActiveKey="search"
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            backgroundColor: "white",
          }}
        >
          <Tab eventKey="search" title="Search "  style={{ paddingTop: "5vh" }}>
            <Sidebar
              setCourses={(courses) => this.setCourses(courses)}
              courses={this.state.allCourses}
              subjects={this.state.subjects}
              keywords = {this.state.keywords}
            />
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.state.filteredCourses}
                cartMode={false}
                addCartCourse={(data) => this.addCartCourse(data)}
                removeCartCourse={(data) => this.removeCartCourse(data)}
                cartCourses={this.state.cartCourses}
              />
            </div>
          </Tab>
          <Tab eventKey="cart" title="Cart" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "20vw" }}>
              <CourseArea
                data={this.getCartData()}
                cartMode={true}
                addCartCourse={(data) => this.addCartCourse(data)}
                removeCartCourse={(data) => this.removeCartCourse(data)}
                cartCourses={this.state.cartCourses}
              />
            </div>
          </Tab>
          <Tab eventKey="completedCourses" title="Completed Courses" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "20vw" }}>
              <CompletedCoursesArea
                data={this.state.completedCourses}
                dataObj= {this.state.completedCourseObj}
                cartMode={false}
                handleRating = {(course, rating) => this.handleRating(course, rating)} 

              />
            </div>
          </Tab>
          <Tab eventKey="recommendedCourses" title="Recommended Courses" style={{ paddingTop: "5vh" }}>
            <div style={{ marginLeft: "20vw" }}>
              <RecommendedCoursesArea
                data = {this.state.recommendedCourses}
                // courses={this.state.allCourses}
                // coursesRated={this.state.highRatedCourses}
                // coursesTaken={this.state.completedCourses}
                handleRating = {(course, rating) => this.handleRating(course, rating)} 
              />
            </div>
          </Tab>
          <Tab eventKey="Help" title="Help" style={{ paddingTop: "5vh" }}>
            <div>
              <ul>
                <li>
                  <h3>Search and Filter: </h3>
                  <ul>
                  <li>This Area allows users to search for classes based on keywords</li>
                  <li>Select subject areas to search for classes</li>
                  <li>Select subject areas to search for classes based of the subject area of each course</li>
                  <li>Select interest areas to search for classes based of keywords of the classes</li>
                  <li>Enter a number range from mininum credits to maximun credits in the</li>
                  </ul>
                </li>
                <li>
                  <h3>Cart: </h3>
                  <ul>
                  <li>This Area allows users add and remove courses to and from a cart</li>
                  <li>Courses, Sections and Subsections can be added</li>
                  <li>When selecting the course, all sections and included </li>
                  <li>When selecting a section, all subsections are included and the asscioated course</li>
                  <li>When selecting a subsection, the asscioated course and section is added to cart</li>
                  <li>The above rules also are in place when removing from cart</li>


                  </ul>
                </li>
                <li>
                  <h3>Completed Courses: </h3>
                  <ul>
                  <li>This Area allows users to rate previoulsy taken classes </li>
                  <li>The rating is on a scale from 1-5 with the description for rating listed </li>

            
                  </ul>
                </li>
                <li>
                  <h3>Recommended Courses: </h3>
                  <ul>
                  <li>This area is created for you based on your ratings of the completed courses</li>
                  </ul>
                </li>
              </ul>
            </div>
          </Tab>
          
        </Tabs>
      </>
    );
  }
}

export default App;
