import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { CourseEditor } from "./courseEditor";
import { RecordControlsCourse } from "./recordControlsCourse";

export function CourseView({
    course,
    deleteCourse,
    editCourse,
    resetCourse
}: {
    course: Course;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    resetCourse: (code: string, semesterId: string) => void;
}): JSX.Element {
    const preRecs = course.prereq.join(", ");
    const [editing, setEditing] = useState<boolean>(false);

    function changeEditing() {
        setEditing(!editing);
    }

    return editing ? (
        <>
            <CourseEditor
                changeEditing={changeEditing}
                course={course}
                editCourse={editCourse}
                deleteCourse={deleteCourse}
            ></CourseEditor>
        </>
    ) : (
        <>
            <Col>
                <h3>
                    {course.code} {" - "} {course.title}
                </h3>
                {course.credits} {" credits"}
                <br></br>
                {course.description}
                <br></br>
                {preRecs.length === 0 ? "" : "Prerequisites: " + preRecs}
                <Col>
                    <Row>
                        <RecordControlsCourse
                            changeEditing={changeEditing}
                        ></RecordControlsCourse>
                    </Row>
                    <Button
                        onClick={() =>
                            resetCourse(course.code, course.semesterId)
                        }
                        className="reset-course-btn"
                    >
                        Reset to Default
                    </Button>
                </Col>
            </Col>
            <div></div>
        </>
    );
}
