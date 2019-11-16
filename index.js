class DataBase {
    query(queryString) {
        const actionType = this._determineAction(queryString);
        console.log(actionType);
    }

    _determineAction(queryString) {
        const selectRegx = /select/i;
        const insertRegx = /insert/i;
        const createDatabaseRegx = /create database/i;
        const createTableRegx = /create table/i;
        const useDatabaseRegx = /use/i;
        if (selectRegx.test(queryString)) {
            return 'select';
        } else if(insertRegx.test(queryString)) {
            return 'insert';
        } else if (createDatabaseRegx) {
            return 'create database';
        } else if (createTableRegx) {
            return 'create table';
        } else if (useDatabaseRegx) {
            return 'use database';
        }
        throw new Error('This action does\'nt exist');
    }
    createDatabase(databaseName) {}
    createTable(tableName) {}
    use(databaseName) {}

    select() {}
    insert() {}
}

const db = new DataBase();
db.query('CREATE DATABASE student');