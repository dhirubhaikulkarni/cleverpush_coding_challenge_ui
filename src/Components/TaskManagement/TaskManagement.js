import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TaskDialog from './TaskDialog';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmationDialog';
import CheckIcon from '@mui/icons-material/Check';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { deleteTask } from '../Store/taskmanagementSlice';
import Snackbar from '@mui/material/Snackbar';


const statusIcons = {
  "Yet To Start": <AddIcon />,
  "Pending": <EditIcon />,
  "Successfully Resolved": <CheckCircleOutlineIcon />,
  "Ready For Test": <KeyboardArrowRightIcon />,
  "Test Success": <CheckIcon />,
  "Ready For Deployment": <ArrowForwardIcon />
};


export default function TaskManagement1() {
  debugger;
  const taskRef = useRef();
  const Data = useSelector((state) => state.task.data);
  const Status = useSelector((state) => state.task.status);
  const Priority = useSelector((state) => state.task.proprity);
  const [Task, setTask] = React.useState(Data)
  const [removeID, setRemoveID] = React.useState(0);
  const [open, setOpen] = React.useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    setTask(Data)
  }, [Data]);

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, SnackBarOpen } = state;

  const moveTask = (id, status) => {
    setTask(Task.map(task => {
      if (task.id === id) {
        return { ...task, status };
      }
      return task;
    }));
  };

  const onDragStart = (event, id) => {
    event.dataTransfer.setData('id', id);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, status) => {
    debugger;
    const id = event.dataTransfer.getData('id');
    moveTask(parseInt(id), status);
  };

  const isColumnEmpty = status => {
    return Status.filter(task => task.id === status).length === 0;
  };

  const deleteRecord = (id) => {
    debugger;
    setOpen(true);
    setRemoveID(id)

  };

  const handleClose = (newValue) => {
    debugger;
    setOpen(false);
    dispatch(deleteTask(removeID))
  };



  return (
    <>
      <div className="flex flex-row-reverse m-4">
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => taskRef.current.handleClickOpen({})}
        >
          Add Task
        </Button>
      </div>
      
      <Grid container spacing={1}>
        {Status.map((x) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={x.id}>
            <Box display="flex" flexDirection="column" height="650px">
              <Box
                className="text-center m-1 p-2"
                borderRadius={1}
                bgcolor={x.color}
              >
                <Box borderRadius={1} display="flex" alignItems="center">
                  {statusIcons[x.status]}{" "}
                  {/* Assuming statusIcons is an object with JSX icon elements */}
                  <span>{x.status}</span>
                </Box>
              </Box>
              <Box
                className="p-2 m-1"
                borderRadius={1}
                onDragOver={(event) => onDragOver(event)}
                onDrop={(event) => onDrop(event, x.id)}
                flexGrow={1}
                overflow="auto"
                bgcolor={"#d3e3e9"}
              >
                {Task.filter((task) => task.status === x.id).map((task) => (
                  <Card
                    borderColor={x.color}
                    draggable={!isColumnEmpty(task.status)}
                    onDragStart={(event) => onDragStart(event, task.id)}
                    key={task.id}
                    style={{ marginBottom: 8, borderRadius: 5 }}
                  >
                    <CardContent>
                      <div className="flex flex-cols justify-between">
                        <Typography gutterBottom variant="h6" component="div">
                          {task.Task}
                        </Typography>
                        <div className="flex">
                          <EditIcon
                            style={{ fontSize: "20px" }}
                            onClick={() =>
                              taskRef.current.handleClickOpen(task)
                            }
                          />
                          <DeleteIcon
                            style={{ fontSize: "20px" }}
                            onClick={() => deleteRecord(task.id)}
                          />
                        </div>
                      </div>
                      <Typography variant="body2" color="text.secondary">
                        {task.AssignName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.PriorityType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {task.Description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
      <TaskDialog ref={taskRef} />
      <ConfirmationDialog
        id="ringtone-menu"
        keepMounted
        open={open}
        text={"Are you sure you want to delete this record?"}
        onClose={handleClose}
        value={removeID}
      ></ConfirmationDialog>
    </>
  );
};


