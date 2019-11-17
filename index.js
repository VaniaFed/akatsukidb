class DataBase {
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
        console.log(databaseName);
    }
    _createTable(queryString) {
        const regx = /create table (\b\w+\b)/i;
        const tableName = queryString.match(regx)[1];
        console.log(tableName);
    }
    _useDatabase(queryString) {
        const regx = /use (\b\w+\b)/i;
        const databaseName = queryString.match(regx)[1];
        console.log(databaseName);
    }
    _select() {}
    _insert() {}
}

const db = new DataBase();
db.query('CREATE DATABASE school');
db.query('USE school');
db.query('CREATE TABLE student');
