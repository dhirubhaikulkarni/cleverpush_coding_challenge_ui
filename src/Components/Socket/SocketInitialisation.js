import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SocketIo from 'socket.io-client';
import { AddTaskThroughSocket, DeleteTaskThroughSocket, EditDragAndDropTask, EditTaskThroughSocket } from '../Store/taskmanagementSlice';

function SocketIoInitialization(props) {
    const dispatch = useDispatch();
    const socket = SocketIo(`http://localhost:4000`, { transports: ["websocket", "polling"] });
    let tipID = props.tipID;
    if (tipID) {
        socket.auth = { tipID };
        socket.emit('join', tipID);
        socket.connect();
    }


    // Listen for 'task' event
    socket.on('AddTask', async data => {
        
        dispatch(AddTaskThroughSocket(data))
    });
    // Listen for 'task' event
    socket.on('EditTask', async data => {
        
        dispatch(EditTaskThroughSocket(data))
    });
    // Listen for drag and drop 'task' event
    socket.on('editDarg', async data => {
        
        dispatch(EditDragAndDropTask(data))
    });
    // Listen for 'task' event
    socket.on('DeleteTask', async data => {
        
        dispatch(DeleteTaskThroughSocket(data))
    });

    return <></>;
}

export default SocketIoInitialization;
