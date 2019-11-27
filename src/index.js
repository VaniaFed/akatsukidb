import { determineAction, createDatabase, createTable, insert, getEntriesWithCertainFields } from './actions/index';

class DataBase {
    constructor () {
        this.database = {
            current: null,
            list: []
        };
        this.tables = [];
        this.entries = [];
    }

    query(queryString) {
        const action = determineAction(queryString);
        return this._perform(action, queryString);
    }

    _perform(action, queryString) {
        switch (action) {
            case 'select': {
                return this._select(queryString);
            }
            case 'insert': {
                const { tableName, columns } = insert(queryString);
                this._updateTable(tableName, columns);
                break;
            }
            case 'create database': {
                const database = createDatabase(queryString);
                this._addDatabase(database);
                break;
            }
            case 'create table': {
                const databaseId = this.database.current;
                const table = createTable(queryString, databaseId);
                this._addTable(table);
                break;
            }
            case 'use database': {
                this._setCurrentDatabase(queryString);
                break;
            }
            default: {
                break;
            }
        }
    }

    _addDatabase(database) {
        this.database.list = [...this.database.list, database];
    }
    _addTable(table) {
        this.tables = [...this.tables, table];
    }
    _updateTable(tableName, columns) {
        const tableId = this._getTableByName(tableName).id;
        this.entries.push({
            tableId,
            columns
        });
    }
    _setCurrentDatabase(queryString) {
        const name = this._getUseDatabaseName(queryString);
        this.database.current = this.database.list.find(database =>
            database.name === name
        ).id;
    }
    _getUseDatabaseName(queryString) {
        const regx = /use (\b\w+\b)/i;
        return queryString.match(regx)[1];
    }
    _select(queryString) {
        const regx = /select\s([*\w,\s]+)\sfrom\s(\w+)/i;
        const tableSelectedFields = queryString.match(regx)[1];
        const tableName = queryString.match(regx)[2];
        return this._pullFieldsFromTable(tableSelectedFields, tableName);
    }
    _pullFieldsFromTable (selectedFieldsString, tableName) {
        const tableId = this._getTableByName(tableName).id;

        if (selectedFieldsString === '*') {
            return this._selectAllFields(tableId);
        } else {
            const fields = selectedFieldsString.split(/\s?,\s?/);
            return getEntriesWithCertainFields(this.entries, fields, tableId);
        }
    }
    _selectAllFields (tableId) {
        return this.entries.filter(entry => entry.tableId === tableId);
    }
    _getTableByName(tableName) {
        return this.tables.find(table => table.name === tableName);
    }
}

const db = new DataBase();
db.query('CREATE DATABASE school');
db.query('USE school');

// db.query('CREATE TABLE teacher (id int, full_name varchar(255), age int)');
// db.query('INSERT INTO teacher (id, fullName,age) VALUES (1,"Ivan Ferraro", 19)');
// const teachers = db.query('SELECT * FROM teacher');
// console.log(teachers);

db.query('CREATE TABLE student (id int, full_name varchar(255), age int)');
db.query('INSERT INTO student (id, fullName,age) VALUES (1,"Jack Fresco", 60)');
db.query('INSERT INTO student (id, fullName,age) VALUES (2,"Ivan Fabiano", 19)');
//
// const students = db.query('SELECT age, id FROM student');
const students = db.query('SELECT age FROM student');
console.log(students);
// db.query('SELECT * FROM teacher WHERE age > 18');

