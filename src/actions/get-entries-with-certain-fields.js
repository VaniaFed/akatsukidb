export const getEntriesWithCertainFields = (tableEntries, inputFields, tableId) => {
    return tableEntries.map(entry => {
        const columns = {};
        inputFields.forEach(field => {
            if (field in entry.columns) {
                columns[field] = entry.columns[field];
            }
        });
        return { tableId, columns };
    });
};
