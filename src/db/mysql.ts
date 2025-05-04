import mysql from "mysql2";
import { config } from "../config.js";
import { UserProfile } from "../types/index.js";

let connection: mysql.Connection | null = null;

const conMysql = (): void => {
  connection = mysql.createConnection(config.mysql);
};

conMysql();

const TABLE_USERS = config.bot.table_users;

export const getUserData = async (idUser: string): Promise<UserProfile[]> => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("No hay conexión a la base de datos"));
      return;
    }

    connection.query(
      "SELECT * FROM ?? where id = ?",
      [TABLE_USERS, idUser],
      (err, result) => {
        return err ? reject(err) : resolve(result as UserProfile[]);
      }
    );
  });
};

export const createUser = async (
  idUser: string,
  username: string
): Promise<mysql.ResultSetHeader> => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("No hay conexión a la base de datos"));
      return;
    }

    connection.query(
      "INSERT INTO ?? (id, username) VALUES (?, ?)",
      [TABLE_USERS, idUser, username],
      (err, results) => {
        return err ? reject(err) : resolve(results as mysql.ResultSetHeader);
      }
    );
  });
};

export const addXpUser = async (
  idUser: string,
  xpToAdd: number
): Promise<mysql.ResultSetHeader> => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("No hay conexión a la base de datos"));
      return;
    }

    connection.query(
      "UPDATE ?? SET xp = xp + ? WHERE id = ?",
      [TABLE_USERS, xpToAdd, idUser],
      (err, results) => {
        return err ? reject(err) : resolve(results as mysql.ResultSetHeader);
      }
    );
  });
};

export const updateRangeUser = async (
  idUser: string,
  newRango: number
): Promise<mysql.ResultSetHeader> => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error("No hay conexión a la base de datos"));
      return;
    }

    connection.query(
      "UPDATE ?? SET rango = ? WHERE id = ?",
      [TABLE_USERS, newRango, idUser],
      (err, results) => {
        return err ? reject(err) : resolve(results as mysql.ResultSetHeader);
      }
    );
  });
};
