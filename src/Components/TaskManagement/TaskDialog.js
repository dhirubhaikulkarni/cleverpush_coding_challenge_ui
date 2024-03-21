import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../Store/taskmanagementSlice";


const TaskDialog = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const Status = useSelector((state) => state.task.status);
    const Priority = useSelector((state) => state.task.proprity);
    const Assign = useSelector((state) => state.task.assign);
    const [open, setOpen] = React.useState(false);
    const [taskdata, setData] = React.useState([]);
    const { control, setValue, formState, handleSubmit, reset, trigger, setError } = useForm({
        mode: 'onChange',
    });
    const handleClickOpen1 = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setValue("task", "")
        setValue("description", "")
        setStatusValue("")
        setPriorityValue("")
        setAssignValue("")
        setOpen(false);
    };
    const formRef = useRef(null);
    useImperativeHandle(ref, () => ({
        handleClickOpen(Data) {
            
            setData(Data)
            setTaskData(Data)
            handleClickOpen1();
        },
    }));

    const [statusValue, setStatusValue] = React.useState('');
    const handleStatusChange = (event) => {
        setStatusValue(event.target.value)
    }
    const [priorityValue, setPriorityValue] = React.useState('');
    const handlePriorityChange = (event) => {
        setPriorityValue(event.target.value)
    }
    const [assignValue, setAssignValue] = React.useState('');
    const handleAssignChange = (event) => {
        
        setAssignValue(event.target.value)
    }

    const setTaskData = (data) => {
        if (Object.keys(data).length !== 0) {
            setValue("task", data.Task)
            setValue("description", data.Description)
            setStatusValue(data.status)
            setPriorityValue(data.Priority)
            setAssignValue(data.AssignedTo)
        } else {
            setValue("task", "")
            setValue("description", "")
            setStatusValue("")
            setPriorityValue("")
            setAssignValue("")
        }
    }
    function onSubmit(model) {
        
        let uniqueId = taskdata.id === undefined ? Date.now().toString(36) + Math.random().toString(36).substring(2) : taskdata.id;
        let PriorityType = priorityValue !== "" ? Priority.filter(x => x.Priority === priorityValue)[0].PriorityType : ""
        let AssignName = assignValue !== "" ? Assign.filter(x => x.id === assignValue)[0].AssignName : ""
        let data = {
            "id": uniqueId,
            "status": statusValue,
            "Task": model.task === undefined ? "" : model.task,
            "AssignedTo": assignValue,
            "AssignName": AssignName,
            "Priority": priorityValue,
            "PriorityType": PriorityType,
            "Description": model.description === undefined ? "" : model.description,
            "tipID": "Test",

        }
        if (data.Task == "" || data.Task == undefined) {
            alert("Please Enter Task Name")
        }
        else {
            if(taskdata.id == undefined){

                dispatch(addTask(data))
            }else{
                dispatch(editTask(data))
            }
            handleClose()
        }
    }


    return (
        <Dialog
            fullWidth={true}
            maxWidth='xs'
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >

            <DialogTitle id="responsive-dialog-title">{'Add Task'}</DialogTitle>
            <DialogContent dividers>
                <form
                    ref={formRef}
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Controller
                                
                                type="text"
                                name="task"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Task"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Controller
                                type="text"
                                name="description"

                                control={control}
                                fullWidth
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Task Description"
                                        type="text"
                                        variant="outlined"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl className="mt-8 w-full" >
                                <InputLabel id="demo-simple-select-label">{"Status"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={statusValue}
                                    color="action"
                                    label={"Status"}
                                    onChange={handleStatusChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    required
                                >

                                    {Status.map((element) => (
                                        <MenuItem key={element.id} value={element.id}>{element.status}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl className="mt-8 w-full" >
                                <InputLabel id="demo-simple-select-label">{"Assign To"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={assignValue}
                                    color="action"
                                    label={"Assign To"}
                                    onChange={handleAssignChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    required
                                >

                                    {Assign.map((element) => (
                                        <MenuItem key={element.AssignName} value={element.id}>{element.AssignName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <FormControl className="mt-8 w-full" >
                                <InputLabel id="demo-simple-select-label">{"Status"}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={priorityValue}
                                    color="action"
                                    label={"Priority"}
                                    onChange={handlePriorityChange}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    required
                                >

                                    {Priority.map((element) => (
                                        <MenuItem key={element.Priority} value={element.Priority}>{element.PriorityType}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <div className='flex flex-row-reverse' >
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: '16px' }}>
                            <Button type="submit" color="primary" autoFocus variant="contained" style={{ marginRight: '8px' }}>
                                {"SAVE"}
                            </Button>
                            <Button autoFocus onClick={handleClose} color="primary" variant="contained">
                                {"CANCEL"}
                            </Button>
                        </Grid>
                    </div>
                </form>
            </DialogContent>

        </Dialog>

    );
});

export default TaskDialog;
