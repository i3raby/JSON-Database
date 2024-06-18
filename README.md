# Simple JSON Database
A lightweight and easy-to-use JSON-based database management system implemented in Node.js. This project provides a simple way to manage key-value pairs, including nested objects and arrays, in a JSON file. Ideal for small projects, prototyping, and learning purposes.

## Features

- **CRUD Operations →** Create, read, update, and delete data effortlessly.
- **Data Types →** Supports various data types including strings, numbers, arrays, and objects.
- **Backup Functionality →** Backup the entire database to a separate JSON file.
- **Filtering →** Retrieve data based on key patterns (startsWith, endsWith, includes).
- **Array Operations →** Push and unpush elements from arrays stored in the database.
- **Data Type Checking →** Get the type of stored data (typeof).
- **Clearing Data →** Clear the entire database with a single command.
- **Initialization →** Automatically initializes the database file if it does not exist.

## Installation

1. Ensure you have [Node.js](https://nodejs.org/en/download/package-manager) installed.
2. Clone the repository

```
git clone https://github.com/i3raby/JSON-Database.git
```

3. Navigate to the project directory:

```
cd JSON-Database
```

4. Run the project (For save a data)

```
node index.js
```

## Usage

```js
const db = require('./Database');

// Setting a value
db.set('username', 'i3raby');

// Getting a value
console.log(db.get('username')); // Output: i3raby

// Adding to a value
db.add('userBalance', 100);

// Subtracting from a value
db.subtract('userBalance', 50);

// Checking if a key exists
console.log(db.has('username')); // Output: true

// Deleting a key
db.delete('username');

// Backing up the database
db.backup('backup.json');

// Fetching a value
console.log(db.fetch('userBalance')); // Output: 50

// Filtering keys that start with a specific string
console.log(db.startsWith('user')); // Output: [ { userBalance: 50 } ]

// Converting the database to JSON
console.log(db.toJSON()); // Output: { userBalance: 50 }

// Clearing the database
db.clear();

// Converting the database to Array
console.log(db.toArray()); // Output: [ { userBalance: 50 } ]
```
