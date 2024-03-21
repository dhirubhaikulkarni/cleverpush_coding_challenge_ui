import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
let Data = [
  {
    "id": 1,
    "status": 1,
    "Task": "Task 1",
    "AssignedTo": 1,
    "AssignName": "Dhirubhai Kulkarni",
    "Priority": 1,
    "PriorityType": "Low",
    "Description": "",
  },
  {
    "id": 2,
    "status": 5,
    "Task": "Task 2",
    "AssignedTo": 2,
    "AssignName": "Mangesh Kanawade",
    "Priority": 3,
    "PriorityType": "High",
    "Description": "",
  },
  {
    "id": 3,
    "status": 4,
    "Task": "Task 3",
    "AssignedTo": 3,
    "AssignName": "Sunil Pawar",
    "Priority": 2,
    "PriorityType": "Medium",
    "Description": "",
  },
  {
    "id": 4,
    "status": 2,
    "Task": "Task 4",
    "AssignedTo": 3,
    "AssignName": "Sunil Pawar",
    "Priority": 3,
    "PriorityType": "High",
    "Description": "",
  },
  {
    "id": 5,
    "status": 3,
    "Task": "Task 5",
    "AssignedTo": 4,
    "AssignName": "Suhas Pawar",
    "Priority": 2,
    "PriorityType": "Medium",
    "Description": "",
  },
  {
    "id": 6,
    "status": 3,
    "Task": "Task 6",
    "AssignedTo": 5,
    "AssignName": "Mohit Patel",
    "Priority": 1,
    "PriorityType": "Low",
    "Description": "",
  }
]

let Priority = [
  {

    "Priority": 1,
    "PriorityType": "Low",
  },
  {

    "Priority": 2,
    "PriorityType": "Medium",
  },
  {

    "Priority": 3,
    "PriorityType": "High",
  },

]
let Status = [
  {
    "id": 1,
    "status": "Yet To Start",
    "color": "#89afe7",
  },
  {
    "id": 2,
    "status": "Pending",
    "color": "#7dc6a4",
  },
  {
    "id": 3,
    "status": "Successfully Resolved",
    "color": "#e7d8a9",
  },
  {
    "id": 4,
    "status": "Ready For Test",
    "color": "#e99cc2",
  },
  {
    "id": 5,
    "status": "Test Success",
    "color": "#90e7c2",
  },
  {
    "id": 6,
    "status": "Ready For Deployment",
    "color": "#e4a4aa",
  }


]

let Assign = [
  {
    "id": 1,
    "AssignName": "Dhirubhai Kulkarni"
  },
  {
    "id": 2,
    "AssignName": "Mangesh Kanawade"
  },
  {
    "id": 3,
    "AssignName": "Sunil Pawar"
  },
  {
    "id": 4,
    "AssignName": "Suhas Pawar"
  },
  {
    "id": 5,
    "AssignName": "Mohit Patel"
  },
  {
    "id": 6,
    "AssignName": "Viraj Jadhav"
  }


]

export const addTask = (data) => async dispatch => {
  await axios.post(`http://localhost:4000/addTask`, data)
    .then(response => {
      alert("Successfully Added the record")
      console.log(response)
    })

};
export const editTask = (data) => async dispatch => {
  await axios.post(`http://localhost:4000/editTask`, data)
    .then(response => {
      alert("Successfully Edited the record")
      console.log(response)
    })

};
export const deleteTask = (id) => async dispatch => {
  await axios.delete(`http://localhost:4000/deleteTask/Test/${id}`)
    .then(response => {
      alert("Successfully Deleted the record")
      console.log(response)
    })

};

export const AddTaskThroughSocket = (data) => async dispatch => {
  dispatch(addTaskThroughSocket(data));
}

export const EditTaskThroughSocket = (data) => async dispatch => {
  dispatch(editTaskThroughSocket(data));
}


export const DeleteTaskThroughSocket = (data) => async dispatch => {
  dispatch(deleteTaskThroughSocket(data));
}


const initialState = {
  data: Data,
  status: Status,
  proprity: Priority,
  assign: Assign

};

const taskmanagementSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTaskThroughSocket: (state, action) => {
      debugger;
      let filteredData = state.data.filter(x => x.id === action.payload.data.id)
      if (filteredData.length === 0) {
        state.data.unshift(action.payload.data)
      }

    },
    editTaskThroughSocket: (state, action) => {
      debugger;
      let indexToReplace = state.data.findIndex(record => record.id === action.payload.data.id);
      // If the record with the specified callId exists, replace it with the new data
      if (indexToReplace !== -1) {
        state.data[indexToReplace] = action.payload.data;
      }

    },
    deleteTaskThroughSocket: (state, action) => {
      debugger;
      let indexToRemove = state.data.findIndex(record => record.id == action.payload.data);
				if (indexToRemove >= 0) {
					state.data.splice(indexToRemove, 1)

				}

    },
  }
});

export const {
  addTaskThroughSocket,
  editTaskThroughSocket,
  deleteTaskThroughSocket
} = taskmanagementSlice.actions;

export default taskmanagementSlice.reducer;

