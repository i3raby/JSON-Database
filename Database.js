const fs = require('node:fs');

class Database {
    constructor() {
        this.startDatabase();
    }

    /**
     * Sets a value in the database.
     * @param { string } dbName 
     * @param { any} value 
     * @returns { object }
     */

    set(dbName, value) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        if(!value) throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        db[dbName] = value;
        return fs.writeFileSync('db.json', JSON.stringify(db, null, 4))
    }

    /**
     * Gets a value from the database.
     * @param { string } dbName 
     * @returns { object }
     */

    get(dbName) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!db[dbName]) throw new Error('');
        return typeof db[dbName] === 'object' ? JSON.stringify(db[dbName], null, 4) : db[dbName]; 
    }

    /**
     * Gets the type of a value in the database.
     * @param { string } dbName 
     * @returns { object }
     */

    typeof(dbName) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!db[dbName]) throw new Error('UI');
        if(Array.isArray(db[dbName])) return 'array';
        else return typeof db[dbName];
    }

    /**
     * Adds a number to a value in the database.
     * @param { string } dbName 
     * @param { number } amount 
     * @returns { object }
     */

    add(dbName, amount) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        if(typeof amount !== 'number') throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!db[dbName]) return this.set(dbName, amount);
        db[dbName] += amount;
        return fs.writeFileSync('db.json', JSON.stringify(db, null, 4));
    }

    /**
     * Subtracts a number from a value in the database.
     * @param { string } dbName 
     * @param { number } amount 
     * @returns { object }
     */

    subtract(dbName, amount) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        if(typeof amount !== 'number') throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!db[dbName]) throw new Error('');
        db[dbName] -= amount;
        return fs.writeFileSync('db.json', JSON.stringify(db, null, 4));
    }

    /**
     * Checks if a key exists in the database.
     * @param { string } dbName 
     * @returns { boolean }
     */

    has(dbName) {
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        return Boolean(db[dbName]);
    }

    /**
     * Creates a backup of the database.
     * @param { string } backupName 
     * @returns { object } 
     */

    backup(backupName) {
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if (fs.existsSync(backupName.replaceAll('.json', '') + '.json')) {
            console.error(`Error: The file "${backupName.replaceAll('.json', '') + '.json'}" already exists.`);
            return false;
        }
        return fs.writeFileSync(`${backupName.replaceAll('.json', '')}.json`, JSON.stringify(db, null, 4));
    }

    /**
     * Deletes a key from the database.
     * @param { string } dbName 
     * @returns { object }
     */

    delete(dbName) {
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!db[dbName]) throw new Error('UI');
        delete db[dbName];
        return fs.writeFileSync('db.json', JSON.stringify(db, null, 4));
    }

    /**
     * Pushes values to an array in the database.
     * @param { string } dbName 
     * @param { string | number[] } value 
     * @returns { string | number[] }
     */

    push(dbName, value) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        if(!Array.isArray(value)) throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(db[dbName]) db[dbName].push(...value);
        else this.set(dbName, value);
        return fs.writeFileSync('db.json', JSON.stringify(db, null, 4));
    }

    /**
     * Clears the entire database.
     * @returns { object }
     */

    clear() {
        return fs.writeFileSync('db.json', JSON.stringify({}));
    }

    /**
     * Removes a value from an array in the database.
     * @param { string } dbName 
     * @param { string | number[] } value 
     * @returns { string | number[] }
     */

    unpush(dbName, value) {
        if(typeof dbName !== 'string' || !dbName) throw new Error('');
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!Array.isArray(db[dbName])) throw new Error('');
        db[dbName] = db[dbName].filter((x) => x !== value);
        return fs.writeFileSync('db.json', JSON.stringify(db, null, 4));
    }

    /**
     * Fetches a value from the database.
     * @param { string } dbName 
     * @returns { object }
     */

    fetch(dbName) {
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        if(!db[dbName]) throw new Error('UI');
        return db[dbName];
    }

    /**
     * Filters keys that start with the provided string.
     * @param { string } dbName 
     * @returns { any[] }
     */
    
    startsWith(dbName) {
        return this.toArray().filter((x) => Object.keys(x)[0].startsWith(dbName));
    }

    /**
     * Filters keys that end with the provided string.
     * @param { string } dbName 
     * @returns { object }
     */
    
    endsWith(dbName) {
        return this.toArray().filter((x) => Object.keys(x)[0].endsWith(dbName));
    }

    /**
     * Filters keys that include the provided string.
     * @param { string } dbName 
     * @returns { object }
     */
    
    includes(dbName) {
        return this.toArray().filter((x) => Object.keys(x)[0].includes(dbName));
    }
    
    /**
     * Converts the entire database to a JSON object.
     * @returns { object }
     */

    toJSON() {
        return JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    }

    /**
     * Converts the database to an array of key-value pair objects.
     * @returns { any[] }
     */

    toArray() {
        const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
        const Db = Object.keys(db).map(key => ({ [key]: db[key] }));
        return Db;
    }

    /**
     * Initializes the database file if it does not exist.
     * @private
     */

    startDatabase() {
        if(!fs.existsSync('db.json')) fs.writeFileSync('db.json', '{}');
    }
}

module.exports = new Database();
