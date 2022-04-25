import React, { useState } from "react";
import { Button, Container, Col } from "react-bootstrap";
import { Course } from "../interfaces/course";
import { Plan } from "../interfaces/plan";
import { Semester } from "../interfaces/semester";
import { CourseView } from "./courseView";
import { InsertCourse } from "./insertCourse";
import { RecordControlsSemester } from "./recordControlsSemester";
import { SemestorEditor } from "./semesterEditor";
//import { SemesterViewer } from "./semesterViewer";

export function SemesterView({
    plan,
    semester,
    deleteSemester,
    deleteCourse,
    editCourse,
    editSemester,
    deleteAllCourses,
    resetCourse
}: {
    plan: Plan;
    semester: Semester;
    deleteSemester: (id: string) => void;
    deleteCourse: (code: string, semesterId: string) => void;
    deleteAllCourses: (semesterId: string) => void;
    editCourse: (code: string, newCourse: Course, semesterId: string) => void;
    editSemester: (id: string, newSemester: Semester) => void;
    resetCourse: (code: string, semesterId: string) => void;
}): JSX.Element {
    const [visible, setVisible] = useState<boolean>(false); //whether or not the adding semester view is visible
    const [editing, setEditing] = useState<boolean>(false);
    //true means the addition screen is open
    function flipVisibility(): void {
        setVisible(!visible);
    }

    function changeEditing(): void {
        setEditing(!editing);
    }

    const newsemester = {
        ...semester,
        totalCredits: semester.courses.reduce(
            (currentCredits: number, course: Course) =>
                currentCredits + Number(course.credits),
            0
        )
    };

    return editing ? (
        <>
            <SemestorEditor
                changeEditing={changeEditing}
                semester={semester}
                editSemester={editSemester}
                plan={plan}
            ></SemestorEditor>
        </>
    ) : (
        <Container className="semester-view">
            <div>
                <h3>
                    {newsemester.season + " - " + newsemester.year}
                    <br></br>
                </h3>
                {newsemester.totalCredits} {" credits"}
                {"                       "}
                {newsemester.courses.map((course: Course) => (
                    <div key={course.code}>
                        <CourseView
                            course={course}
                            deleteCourse={deleteCourse}
                            editCourse={editCourse}
                            resetCourse={resetCourse}
                        ></CourseView>
                    </div>
                ))}
            </div>
            <div>
                {visible && (
                    <InsertCourse
                        semester={newsemester}
                        flipVisibility={flipVisibility}
                        //editPlan={editPlan}
                        editCourse={editCourse}
                        editSemester={editSemester}
                    ></InsertCourse>
                )}
                <Col>
                    <Button
                        onClick={flipVisibility}
                        variant="success"
                        className="insert-course-btn"
                    >
                        Insert Course
                    </Button>
                    <Button
                        onClick={() => deleteAllCourses(String(semester.id))}
                        variant="danger"
                        className="delete-allcourse-btn"
                    >
                        Delete All Courses
                    </Button>
                    <RecordControlsSemester
                        changeEditing={changeEditing}
                    ></RecordControlsSemester>
                    <Button
                        onClick={() => deleteSemester(newsemester.id)}
                        variant="danger"
                        className="delete-sem-btn"
                    >
                        Delete Semester
                    </Button>
                </Col>
            </div>
        </Container>
    );
}
