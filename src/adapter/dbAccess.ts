import loki from 'lokijs';

const dbFile = process.env.DB || 'data/database.json';
const db = new loki(dbFile, {
    autoload: true,
    autosave: true,
    autosaveInterval: 4000
});

const save = (collection: string, data: any): number => {
    let count = 0;
    let result = 0;
    try {
        const mydata = db.getCollection(collection);
        count = mydata.count();
        console.info(`Data in ${dbFile}: ${count}`);
        mydata.on('insert', (row) => { row.id = row.$loki; });
        result = mydata.insert(data);
        db.saveDatabase();
    }
    catch (e) {
        if (count == 0) {
            const mydata = db.addCollection(collection);
            mydata.on('insert', (row) => { row.id = row.$loki; });
            result = db.getCollection(collection).insert(data);
        }
        else {
            console.error(e.message, count, result);
            throw e;
        }
    }

    return result;
}

export { db, save };
