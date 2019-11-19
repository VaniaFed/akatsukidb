import { v4 } from "uuid";

export const createTable = (queryString, databaseId) => {
    const { name, structure } = getTableData(queryString);
    return {
        id: v4(),
        name,
        structure,
        databaseId,
    };
};

const getTableData = queryString => {
    console.log('get table data');
    const regx = /create\stable\s(\w+)\s\(([\w\s\d,()"']+)\)/i;
    const tableName = queryString.match(regx)[1];
    const tableDataString =  queryString.match(regx)[2];
    const tableData = tableDataString.split(/,\s/i).map(item => {
        const column = item.split(/\s/i);
        const name = column[0],
              type = column[1];
        return ({
            name,
            type
        });
    });
    return ({
        name: tableName,
        structure: {
            columns: tableData
        }
    });
};

