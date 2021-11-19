import React from 'react';
import './course_filter.css'
import { CourseData } from './CourseData'

const CourseFilter = (props) => {
    return (
        <div class="course-filter">
            <div id="all"> All Courses </div>
            <ul class="course-list">
                {CourseData.map((val, key) => {
                    return (
                        <li key={key} class="course" onClick={() => { }}>
                            <div id="semester"> Fall 2021 </div>
                            <div id="id"> {val.courseID} </div>
                            <div id="name"> {val.courseName} </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}

export default CourseFilter;