import { determineAction, createDatabase, createTable, insert } from './actions/index';

class DataBase {
    constructor () {
        this.database = {
            current: null,
            list: []
        };
        this.tables = [];
    }

    query(queryString) {
        const action = determineAction(queryString);
        this._perform(action, queryString);
    }

    _perform(action, queryString) {
        switch (action) {
            case 'select': {
                this._select(queryString);
                break;
            }
            case 'insert': {
                const { tableName, fields, values } = insert(queryString);
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
                console.log(newTable);
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
    _select() {}
}

const db = new DataBase();
db.query('CREATE DATABASE school');
db.query('USE school');
//
db.query('CREATE TABLE teacher (id int, full_name varchar(255), age int)');
db.query('INSERT INTO student (id, fullName,age) VALUES (1,"Ivan Ferraro", 19)');
// db.query('SELECT * FROM student');
// db.query('SELECT fullName, age FROM student');
// db.query('SELECT * FROM student WHERE age > 18');
