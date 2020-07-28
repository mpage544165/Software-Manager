import React from 'react';

export default function home(props) {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center flex-column align-items-center div-1">
                <h1 className="text-center">Manage Projects and Sprints</h1>
                <div>
                    <img className="mx-5 my-3" src="/calendar.PNG" alt="calendar" width="500px"/>
                    <span>Todo: add description Todo: add description Todo: add description</span>
                </div>
                <div>
                    <button className="btn btn-success btn-lg m-2">Sign Up</button>
                    <button className="btn btn-success btn-lg m-2">Login</button>
                </div>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center div-2">
                <h1 className="text-center">Stay on Track</h1>
            </div>
            <div className="d-flex justify-content-center flex-column align-items-center div-1">
                <h1 className="text-center">Track Project Progress</h1>
            </div>
        </div>
    );
}