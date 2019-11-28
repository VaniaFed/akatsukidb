export const insert = queryString => {
    const rx = /insert\sinto\s(\w+)\s\(([\w,\s\d]+)\)\svalues\s\(([\d\w\s",]+)\)/i;

    const tableName = extractTableName(queryString, rx);
    const fields = extractFields(queryString, rx);
    const values = extractValues(queryString, rx);

    const columns = getConvertedColumns(fields, values);
    return {
        tableName,
        columns
    };
};

const extractTableName = (s, rx) => {
    return s.match(rx)[1];
};

const extractFields = (s, rx) => {
    const fieldsString = s.match(rx)[2];
    return fieldsString.split(/\s*,\s*/i);
};

const extractValues = (s, rx) => {
    const valuesString = s.match(rx)[3];
    return valuesString.split(/\s*,\s*/i);
};

const getConvertedColumns = (fields, values) => {
    const columns = {};
    fields.forEach((field, i) => {
        columns[field] = values[i];
    });
    return columns;
};

