import express, { Request, Response } from 'express';
import { createTask, deleteTask, filterTaskByStatus, getAllTasks, getTask, searchTaskByTitle, updateTask } from '../repositories/tasksRepository';
import { Task } from '../models/task';
import { auth } from '../middleware/authMiddleware';

const taskRouter = express.Router();

taskRouter.get('/api/tasks', auth, async (req, res) => {
    try {
        let userId = req.body.token.userId;
        let tasks = await getAllTasks(userId);
        res.send(tasks);
    } catch (error) {
        console.log("something went wrong when fetching tasks => ", error);
        res.send("Failed to fetch tasks");
    }
})

taskRouter.get('/api/tasks/:id', auth, async (req, res) => {
    try {
        let taskId = req.params.id;
        let task = await getTask(Number(taskId));
        res.send(task);
    } catch (error) {
        console.log("something went wrong when fetching tasks");
        res.send("Failed to fetch tasks");
    }
})

taskRouter.get('/api/tasks/filter/:status', auth, async (req, res) => {
    try {
        let taskStatus: boolean = req.params.status == "1" ? true : false;
        let userId = req.body.token.userId;
        let tasks = await filterTaskByStatus(taskStatus, userId);
        res.send(tasks);
    } catch (error) {
        console.log("something went wrong when filtering tasks");
        res.send("Failed to filter tasks");
    }
})

taskRouter.get('/api/tasks/search/:searchTerm', auth, async (req, res) => {
    try {
        let searchTerm = req.params.searchTerm;
        let userId = req.body.token.userId; // TODO
        let tasks = await searchTaskByTitle(searchTerm, userId);
        res.send(tasks);
    } catch (error) {
        console.log("something went wrong when searching tasks");
        res.send("Failed to search tasks");
    }
})

taskRouter.post('/api/tasks/create', auth, async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        await createTask(task);
        res.send({ data: "tasks created succesfully" });
    } catch (error) {
        console.log("something went wrong when creating note");
        res.send("Failed to create note");
    }
})

taskRouter.post('/api/tasks/update', auth, async (req: Request, res: Response) => {
    try {
        const task: Task = req.body;
        await updateTask(task);
        res.send({ data: "tasks updated succesfully" });
    } catch (error) {
        console.log("something went wrong when creating note");
        res.send("Failed to update note");
    }
})

taskRouter.delete('/api/tasks', auth, async (req: Request, res: Response) => {
    try {
        const taskId: number = req.body.taskId;
        await deleteTask(taskId);
        res.send({ data: "task deleted succesfully" });
    } catch (error) {
        console.log("something went wrong when deleting tasks");
        res.send("Failed to delete note");
    }
})

export default taskRouter;