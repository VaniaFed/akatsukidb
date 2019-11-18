export const insert = queryString => {
    const regx = /insert\sinto\s(\w+)\s\(([\w,\s\d]+)\)\svalues\s\(([\d\w\s",]+)\)/i;

    const tableName = queryString.match(regx)[1];

    const fieldsString = queryString.match(regx)[2];
    const fields = fieldsString.split(/,\s*/i);

    const valuesString = queryString.match(regx)[3];
    const values = valuesString.split(/,\s*/i);
    return {
        tableName,
        fields,
        values
    };
};
