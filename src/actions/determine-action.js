export const determineAction = queryString => {
    if (isActionSelect(queryString)) {
        return 'select';
    } else if(isActionInsert((queryString))) {
        return 'insert';
    } else if (isActionCreateDatabase(queryString)) {
        return 'create database';
    } else if (isActionCreateTable(queryString)) {
        return 'create table';
    } else if (isActionUseDatabase(queryString)) {
        return 'use database';
    }
    throw new Error('This action does\'nt exist');
};

const isActionSelect = queryString => {
    const test = /select/i;
    if (test.test(queryString)) {
        return true;
    }
};
const isActionInsert = queryString => {
    const test = /insert/i;
    if (test.test(queryString)) {
        return true;
    }
};
const isActionCreateDatabase = queryString => {
    const test = /create database/i;
    if (test.test(queryString)) {
        return true;
    }
};
const isActionCreateTable = queryString => {
    const test = /create table/i;
    if (test.test(queryString)) {
        return true;
    }
};
const isActionUseDatabase = queryString => {
    const test = /use/i;
    if (test.test(queryString)) {
        return true;
    }
};

