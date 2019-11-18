import {v4} from "uuid";

export const createTable = queryString => {
    const tableName = getTableName(queryString);
    return {
        id: v4(),
        name: tableName
    };
};

const getTableName = queryString => {
    const regx = /create table (\b\w+\b)/i;
    const tableName = queryString.match(regx)[1];
    return tableName;
};

