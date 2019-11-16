class DataBase {
    query(queryString) {
        const actionType = this._determineAction(queryString);
        console.log(actionType);
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

    createDatabase(databaseName) {}
    createTable(tableName) {}
    use(databaseName) {}

    select() {}
    insert() {}
}

const db = new DataBase();
db.query('SELECT * FROM student');