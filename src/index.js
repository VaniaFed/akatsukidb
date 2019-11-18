import { v4 } from 'uuid';

class DataBase {
    constructor () {
        this.databases = {
            current: null,
            list: []
        };
        this.tables = [];
    }

    query(queryString) {
        const action = this._determineAction(queryString);
        this._perform(action, queryString);
    }

    _determineAction(queryString) {
        if (this._isActionSelect(queryString)) {
            return 'select';
        } else if(this._isActionInsert((queryString))) {
            return 'insert';
        } else if (this._isActionCreateDatabase(queryString)) {
            return 'create database';
        } else if (this._isActionCreateTable(queryString)) {
            return 'create table';
        } else if (this._isActionUseDatabase(queryString)) {
            return 'use database';
        }
        throw new Error('This action does\'nt exist');
    }

    _perform(action, queryString) {
        switch (action) {
            case 'select': {
                this._select(queryString);
                break;
            }
            case 'insert': {
                this._insert(queryString);
                break;
            }
            case 'create database': {
                this._createDatabase(queryString);
                break;
            }
            case 'create table': {
                this._createTable(queryString);
                break;
            }
            case 'use database': {
                this._useDatabase(queryString);
                break;
            }
            default: {
                break;
            }
        }
    }

    _isActionSelect(queryString) {
        const test = /select/i;
        if (test.test(queryString)) {
            return true;
        }
    }
    _isActionInsert(queryString) {
        const test = /insert/i;
        if (test.test(queryString)) {
            return true;
        }
    }
    _isActionCreateDatabase(queryString) {
        const test = /create database/i;
        if (test.test(queryString)) {
            return true;
        }
    }
    _isActionCreateTable(queryString) {
        const test = /create table/i;
        if (test.test(queryString)) {
            return true;
        }
    }
    _isActionUseDatabase(queryString) {
        const test = /use/i;
        if (test.test(queryString)) {
            return true;
        }
    }

    _createDatabase(queryString) {
        const regx = /create database (\b\w+\b)/i;
        const databaseName = queryString.match(regx)[1];
        this._setDatabase(databaseName);
    }
    _createTable(queryString) {
        const regx = /create table (\b\w+\b)/i;
        const tableName = queryString.match(regx)[1];
        this._setTable(tableName);
    }
    _useDatabase(queryString) {
        const regx = /use (\b\w+\b)/i;
        const databaseName = queryString.match(regx)[1];
        this.databases.current = this.databases.list.find(database =>
            database.name === databaseName
        ).id;
    }
    _insert(queryString) {
        const regx = /insert\sinto\s(\w+)\s\(([\w,\s\d]+)\)\svalues\s\(([\d\w\s",]+)\)/i;

        const tableName = queryString.match(regx)[1];
        console.log(tableName);

        const fieldsString = queryString.match(regx)[2];
        const fields = fieldsString.split(/,\s*/i);
        console.log(fields);

        const valuesString = queryString.match(regx)[3];
        const values = valuesString.split(/,\s*/i);
        console.log(values);
    }
    _select() {}

    _setDatabase(databaseName) {
        const newDatabase = {
            id: v4(),
            name: databaseName
        };
        this.databases.list = [...this.databases.list, newDatabase];
    }
    _setTable(tableName) {
        const newTable = {
            id: v4(),
            name: tableName
        };
        this.tables = [...this.tables, newTable];
    }
}

const db = new DataBase();
db.query('CREATE DATABASE school');
db.query('USE school');

// db.query('CREATE TABLE student (id int, full_name varchar(255), age int)');
// db.query('INSERT INTO student (id, fullName,age) VALUES (1,"Ivan Ferraro", 19)');
// db.query('SELECT * FROM student');
// db.query('SELECT fullName, age FROM student');
// db.query('SELECT * FROM student WHERE age > 18');
