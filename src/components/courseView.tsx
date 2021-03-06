import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { CourseEditor } from "./courseEditor";
import { RecordControlsCourse } from "./recordControlsCourse";

export function CourseView({
    course,
    deleteCourse,
    editCourse,
    resetCourse,
    checkPreReq
}: {
    course: Course;
    deleteCourse: (code: string, semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    resetCourse: (code: string, semesterId: string) => void;
    checkPreReq: (reqList: string[], courseNeed: Course) => boolean;
}): JSX.Element {
    const preRecs = course.prereq.join(", ");
    const requirements = course.requirements.join(", ");
    const [editing, setEditing] = useState<boolean>(false);
    function changeEditing() {
        setEditing(!editing);
    }

    const message = checkPreReq(course.prereq, course) ? "✅" : "❌";

    function showDes() {
        const show = document.getElementById(
            course.code + course.semesterId + "description"
        );
        if (show === null) {
            return;
        } else if (show.style.display === "none") {
            show.style.display = "block";
        } else {
            show.style.display = "none";
        }
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
            <Col id={course.semesterId}>
                <h3>
                    {course.code} {" - "} {course.title}
                </h3>
                {course.credits} {" credits"}{" "}
                <Button className="description-btn" onClick={showDes}>
                    &#10549;
                </Button>
                <br></br>
                <div id={course.code + course.semesterId + "description"}>
                    <p>
                        {course.description}
                        <br></br>
                        {}
                        {preRecs.length === 0
                            ? ""
                            : "Prerequisites: " + preRecs + " Met? " + message}
                        <br></br>
                        {requirements.length === 0
                            ? ""
                            : "Degree Requirements: " + requirements}
                    </p>
                    <Col md={{ span: 5, offset: 3 }}>
                        <Row>
                            <RecordControlsCourse
                                changeEditing={changeEditing}
                            ></RecordControlsCourse>
                            <Button
                                onClick={() =>
                                    resetCourse(course.code, course.semesterId)
                                }
                                className="reset-course-btn"
                                data-testid="reset-btn"
                            >
                                &#8634; Reset
                            </Button>
                        </Row>
                    </Col>
                </div>
            </Col>
            <div></div>
        </>
    );
}
