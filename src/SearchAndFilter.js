class SearchAndFilter {
  searchAndFilter(courses, search, subject, keyword, minimumCredits, maximumCredits) {
    if (subject !== "" && search !== null) {
      let coursesAfterSearch = [];

      for (const course of courses) {
        for (const keyword of course.keywords) {
          if (keyword.includes(search)) {
            coursesAfterSearch.push(course);
            break;
          }
        }
      }
      courses = coursesAfterSearch;
    }

    if (subject !== "All") {
      let coursesAfterSubject = [];

      for (const course of courses) {
        if (course.subject === subject) coursesAfterSubject.push(course);
      }
      courses = coursesAfterSubject;
    }
    if (keyword !== "All") {
      let coursesAfterKeyword = [];

      for (const course of courses) {
        for (const word of course.keywords)
        if (word === keyword) {
          if(!coursesAfterKeyword.includes(course)){         
             coursesAfterKeyword.push(course);
          }

        }
      }
      courses = coursesAfterKeyword;
    }
    if(parseInt(maximumCredits) > 5 || parseInt(minimumCredits) > 5){
      alert("There are no courses above 5 Credits at the University Wisconsin Madison. Please try a numbers from 1-5")
    }
    if (minimumCredits !== "") {
      let coursesAfterMinimumCredits = [];
      

      for (const course of courses) {
        if (course.credits >= parseInt(minimumCredits))
          coursesAfterMinimumCredits.push(course);
      }
      courses = coursesAfterMinimumCredits;
    }

    if (maximumCredits !== "") {
      let coursesAfterMaximumCredits = [];

      for (const course of courses) {
        if (course.credits <= parseInt(maximumCredits))
          coursesAfterMaximumCredits.push(course);
      }
      courses = coursesAfterMaximumCredits;
    }

    return courses;
  }
}

export default SearchAndFilter;
