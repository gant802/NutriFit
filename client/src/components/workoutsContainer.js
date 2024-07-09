import React, { useEffect, useState } from "react";
import WorkoutNode from "./workoutNode";
import { useParams } from "react-router-dom";
import { UsePagination } from "./pagination";
import { isInteger } from "formik";

function WorkoutsContainer({ workouts }) {
    const [userWorkouts, setUserWorkouts] = useState([])
    const { id } = useParams()
    const [currentPage, setCurrentPage] = useState(1)

    const pageSize = 30
    const pagination = UsePagination({
        totalCount: workouts.length,
        pageSize,
        siblingCount: 1,
        currentPage
    })

    const workoutsSlice = workouts.slice(
        pageSize * (currentPage - 1),
        pageSize * currentPage
    )

    useEffect(() => {
        fetch(`/user_workouts/${id}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(data => setUserWorkouts(data))
                }
            }).catch(error => console.log(error))
    }, [])


    const workoutsListed = workoutsSlice.map(workout => {
        return <WorkoutNode userWorkouts={userWorkouts} setUserWorkouts={setUserWorkouts} key={workout.id} workout={workout} />
    })

    return (
        <div>
            <div id="workoutsListCont">
                {workoutsListed}
            </div>

            <div className="pagination">
            {pagination.map((pageNumber, index) => {
                    if (pageNumber === "...") {
                        return <span key={index}>...</span>;
                    }
                    return (
                        <button
                            className={pageNumber === currentPage ? "disabledButton" : "pageButton"}
                            key={index}
                            onClick={() => setCurrentPage(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
        </div>


    )
}

export default WorkoutsContainer