import { RowDataPacket } from "mysql2";
import { pool } from "../main";
import { Task } from "../models/task";

interface ITaskResult extends RowDataPacket {
    id: number;
    title: string;
    description: string;
    ownerId: number;
    status: boolean;
    dueDate: string;
}

export const getAllTasks = async (ownerId: number) => {
    const [rows] = await pool.query("select * from Tasks where ownerId = ?", [ownerId]);
    return rows;
}

export const getTask = async (Id: number): Promise<Task> => {
    const [rows] = await pool.query<ITaskResult[]>(
        `select * from Tasks where Id = ?
        `
        , [Id]);
    return rows[0];
}

export const filterTaskByStatus = async (status: boolean, ownerId: number) => {
    const [rows] = await pool.query(
        `select * from Tasks where status = ? and ownerId = ?
        `
        , [status, ownerId]);
    return rows;
}

export const searchTaskByTitle = async (searchTerm: string, ownerId: number) => {
    const [rows] = await pool.query(
        `select * from Tasks where title LIKE ? and ownerId = ? 
        `
        , [`%${searchTerm}%`, ownerId]);
    return rows;
}

export const createTask = async (task: Task) => {
    const [rows] = await pool.query(
        `insert into Tasks (title, description, ownerId, dueDate, status) 
        values (?, ?, ?, ?, FALSE)`
        , [task.title, task.description, task.ownerId, task.dueDate])
}

export const updateTask = async (task: Task) => {
    console.log("task updating => ", task);
    const [rows] = await pool.query(
        `update Tasks set title = ?, description = ?, status = ?, dueDate = ? where id = ?`
        , [task.title, task.description, task.status, task.dueDate, task.id])
}

export const deleteTask = async (id: number) => {
    const [rows] = await pool.query(
        `delete from Tasks where id = ? 
        `
        , [id]);
}