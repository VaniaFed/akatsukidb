import { v4 } from "uuid";

export const createDatabase = queryString => {
    const databaseName = extractDatabaseName(queryString);
    return ({
        id: v4(),
        name: databaseName
    });
};

const extractDatabaseName = queryString => {
    const rx = /create database (\b\w+\b)/i;
    return queryString.match(rx)[1];
};

