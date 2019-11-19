import { determineAction, createDatabase, createTable, insert } from './actions/index';

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
                const { tableName, fields, values } = insert(queryString);
                this._updateTable(tableName, fields, values);
                break;
            }
            case 'create database': {
                const newDatabase = createDatabase(queryString);
                this._addDatabase(newDatabase);
                break;
            }
            case 'create table': {
                const databaseId = this.database.current;
                const newTable = createTable(queryString, databaseId);
                this._addTable(newTable);
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
    _updateTable(tableName, fields, values) {
        const tableId = this._getTableByName(tableName).id;
        fields.forEach((field, i) => {
            this.entries.push({
                tableId,
                field,
                value: values[i]
            });
        });
    }
    _setCurrentDatabase(queryString) {
        const databaseName = this._getUseDatabaseName(queryString);
        this.database.current = this.database.list.find(database =>
            database.name === databaseName
        ).id;
    }
    _getUseDatabaseName(queryString) {
        const regx = /use (\b\w+\b)/i;
        const databaseName = queryString.match(regx)[1];
        return databaseName;
    }
    _select(queryString) {
        const regx = /select\s([*\w,\s]+)\sfrom (\w+)/i;
        const tableSelectionFields = queryString.match(regx)[1];
        const tableName = queryString.match(regx)[2];
        return this._getFieldsFromTable(tableSelectionFields, tableName)
    }
    _getFieldsFromTable (tableSelectionFields, tableName) {
        const tableId = this._getTableByName(tableName).id;

        if (tableSelectionFields === '*') {
            return this.entries.filter(entry => entry.tableId === tableId)
        } else {
            // TODO: if we have certain fields to get
            // so we should work on it just here...
        }
    }
    _getTableByName(tableName) {
        return this.tables.find(table => table.name === tableName);
    }
}

const db = new DataBase();
db.query('CREATE DATABASE school');
db.query('USE school');
//
db.query('CREATE TABLE student (id int, full_name varchar(255), age int)');
db.query('INSERT INTO student (id, fullName,age) VALUES (1,"Jack Frescko", 60)');
db.query('INSERT INTO student (id, fullName,age) VALUES (2,"Ivan Fedyakov", 19)');
db.query('CREATE TABLE teacher (id int, full_name varchar(255), age int)');
db.query('INSERT INTO teacher (id, fullName,age) VALUES (1,"Ivan Ferraro", 19)');

const teachers = db.query('SELECT * FROM teacher');
console.log(teachers);
const students = db.query('SELECT * FROM student');
console.log(students);
// db.query('SELECT fullName, age FROM student');
// db.query('SELECT * FROM student');
// db.query('SELECT * FROM teacher WHERE age > 18');

