import { v4 } from "uuid";

export const createDatabase = queryString => {
    const databaseName = getDatabaseName(queryString);
    return ({
        id: v4(),
        name: databaseName
    });
};

const getDatabaseName = queryString => {
    const regx = /create database (\b\w+\b)/i;
    const databaseName = queryString.match(regx)[1];
    return databaseName;
};

