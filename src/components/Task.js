// src/components/TaskApp.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasks, addNewTask, editTask, removeTask } from '../Store/CreateSlice'

const TaskApp = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.tasks);
    const taskStatus = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchAllTasks());
        }
    }, [taskStatus, dispatch]);

    const handleAddTask = (task) => {
        dispatch(addNewTask(task));
    };

    const handleEditTask = (id, task) => {
        dispatch(editTask({ id, task }));
    };

    const handleDeleteTask = (id) => {
        dispatch(removeTask(id));
    };

    return (
        <div>
            <h1>Task Manager</h1>
            {taskStatus === 'loading' && <div>Loading...</div>}
            {taskStatus === 'succeeded' && Array.isArray(tasks) && (
                <ul>
                    {tasks.map((task) => (
                        <li key={task._id}>
                            {task.task}
                            <button onClick={() => handleEditTask(task._id, 'New Task Name')}>Edit</button>
                            <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            {taskStatus === 'failed' && <div>{error}</div>}
            <button onClick={() => handleAddTask('New Task')}>Add Task</button>
        </div>
    );
};

export default TaskApp;
