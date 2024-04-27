import { RowDataPacket } from "mysql2";
import { pool } from "../main";
import { User } from "../models/user";

interface IUserResult extends RowDataPacket {
    id: number
    email: string
    password: string
}

export const getUserByEmailAndPwd = async (email: string, pwd: string): Promise<User> => {
    const [rows] = await pool.query<IUserResult[]>(
        `select * from Users where email = ? and password = ?;
        `
        , [email, pwd]);
    return rows[0];
}

export const getUserByEmail = async (email: string): Promise<User> => {
    const [rows] = await pool.query<IUserResult[]>(
        `select * from Users where email = ?;
        `
        , [email]);
    return rows[0];
}

export const createUser = async (email: string, pwd: string) => {
    const [rows] = await pool.query(
        `insert into Users (email, password) values(?,?);
        `
        , [email, pwd]);
}