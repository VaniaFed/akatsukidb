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
    const rx = /create\stable\s(\w+)\s\(([\w\s\d,()"']+)\)/i;
    const tableName = extractTableName(queryString, rx);
    const tableData = extractTableData(queryString, rx);
    const columns = convertColumns(tableData);

    return {
        name: tableName,
        structure: {
            columns
        }
    };
};

const extractTableName = (s, rx) => {
    return s.match(rx)[1];
};

const extractTableData = (queryString, rx) => {
    return queryString.match(rx)[2];
};

const convertColumns = (tableData) => {
    const columns = tableData.split(/,\s/i);
    return columns.map(item => {
        const [name, type] = item.split(/\s/i);
        return { name, type };
    });
};
