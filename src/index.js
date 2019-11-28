import { determineAction, createDatabase, createTable, insert, getEntriesWithCertainFields } from './actions/index';

class DataBase {
    constructor() {
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
        const filterRx = /\s?where\s?/i;
        if (filterRx.test(queryString)) {
            const regx = /select\s([*\w,\s]+)\sfrom\s(\w+)\s?(where\s([\d\w\s><=+-]+))?/i;
            const tableName = queryString.match(regx)[2];
            const tableId = this._getTableByName(tableName).id;
            const filterCondition = queryString.match(regx)[4];
            const conditions = filterCondition.split(/\s?and\s?/i);
            const tableSelectedFieldsString = queryString.match(regx)[1];
            const inputFields = tableSelectedFieldsString.split(/\s?,\s?/);
            const filteredEntries = this._applyFilter(this._selectAllFields(tableId), conditions);
            return tableSelectedFieldsString === '*'
                ? filteredEntries
                : getEntriesWithCertainFields(filteredEntries, inputFields, tableId);
        } else {
            const regx = /select\s([*\w,\s]+)\sfrom\s(\w+)\s?/i;
            const tableSelectedFieldsString = queryString.match(regx)[1];
            const inputFields = tableSelectedFieldsString.split(/\s?,\s?/);
            const tableName = queryString.match(regx)[2];
            const tableId = this._getTableByName(tableName).id;
            return tableSelectedFieldsString === '*'
                ? this._selectAllFields(tableId)
                : getEntriesWithCertainFields(this.entries, inputFields, tableId);
        }
    }
    _applyFilter (entries, conditions) {
        let filteredEntries = [];
        conditions.forEach(condition => {
            filteredEntries = entries.filter(entry => {
                const columnsData = Object.entries(entry.columns);
                let shouldEntryBeIncluded = true;
                columnsData.forEach(columnData => {
                    const key = columnData[0];
                    if (condition.includes(key)) {
                        const conditionWithoutKey = condition.replace(key, '');
                        if (!eval(`${entry.columns[key]} ${conditionWithoutKey}`)) {
                            shouldEntryBeIncluded = false;
                        }
                    }
                });
                return shouldEntryBeIncluded;
            });
        });
        return filteredEntries;
    }
    _selectAllFields(tableId) {
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
db.query('INSERT INTO student (id, fullName,age) VALUES (2,"Petr Laconic", 19)');
db.query('INSERT INTO student (id, fullName,age) VALUES (3,"Ivan Fabiano", 20)');
//
// const students = db.query('SELECT age, id FROM student');
const students = db.query('SELECT id, age FROM student WHERE age >= 20');
console.log(students);

