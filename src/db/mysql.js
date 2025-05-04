import mysql from "mysql2";
import { config } from "../config.js";

let connection = null;

const conMysql = () => {
  connection = mysql.createConnection(config.mysql);
};

conMysql();

const TABLE_USERS = config.bot.table_users;

export const getUserData = async (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM ?? where id = ?",
      [TABLE_USERS, idUser],
      (err, result) => {
        return err ? reject(err) : resolve(result);
      }
    );
  });
};

export const createUser = async (idUser, username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO ?? (id, username) VALUES (?, ?)",
      [TABLE_USERS, idUser, username],
      (err, results) => {
        return err ? reject(err) : resolve(results);
      }
    );
  });
};

export const addXpUser = async (idUser, xpToAdd) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE ?? SET xp = xp + ? WHERE id = ?",
      [TABLE_USERS, xpToAdd, idUser],
      (err, results) => {
        return err ? reject(err) : resolve(results);
      }
    );
  });
};

export const updateRangeUser = async (idUser, newRango) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE ?? SET rango = ? WHERE id = ?",
      [TABLE_USERS, newRango, idUser],
      (err, results) => {
        return err ? reject(err) : resolve(results);
      }
    );
  });
};
