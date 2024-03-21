import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketIo from 'socket.io-client';
import { AddTaskThroughSocket, DeleteTaskThroughSocket, EditTaskThroughSocket } from '../Store/taskmanagementSlice';

function SocketIoInitialization(props) {
    const dispatch = useDispatch();
    const socket = SocketIo(`https://cleverpush-coding-challenge-api.vercel.app`, { transports: ["websocket", "polling"] });
    let tipID = props.tipID;
    if (tipID) {
        socket.auth = { tipID };
        socket.emit('join', tipID);
        socket.connect();
    }


    // Listen for 'task' event
    socket.on('AddTask', async data => {
        debugger;
        console.log("Task Done", data);
        dispatch(AddTaskThroughSocket(data))
        // Handle the received data here
    });
    // Listen for 'task' event
    socket.on('EditTask', async data => {
        debugger;
        console.log("Task Done", data);
        dispatch(EditTaskThroughSocket(data))
        // Handle the received data here
    });
    // Listen for 'task' event
    socket.on('DeleteTask', async data => {
        debugger;
        console.log("Task Done", data);
        dispatch(DeleteTaskThroughSocket(data))
        // Handle the received data here
    });

    return <></>;
}

export default SocketIoInitialization;
