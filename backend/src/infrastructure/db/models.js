const createConnection = require('./../db/../../config/database');

let db = null;
async function getDb() {
    if (!db) {
        db = await createConnection();
    }
    return db;
}



let models = {
    async dynamicModel(input) {
     
        const _db = await getDb();
        return new Promise((resolve, reject) => {
            _db.serialize(() => {

                _db.run("BEGIN TRANSACTION");

                if (input.truncateBeforeInsert) {
                    _db.run(`DELETE FROM ${input.tableName}`, (err) => {
                        if (err) {
                            _db.run("ROLLBACK");
                            return reject(err);
                        }
                    });
                }

                if (input.resetIdentity) {
                    _db.run(`UPDATE sqlite_sequence SET seq = 0 WHERE name = '${input.tableName}'`);
                }

                const { tableName, data } = input;

                if (!data || data.length === 0) return;


                const columns = Object.keys(data[0]);
                const columnNames = columns.join(', ');


                const placeholders = columns.map(() => '?').join(', ');

                const sql = `INSERT INTO ${tableName} (${columnNames}) VALUES (${placeholders})`;

                const stmt = _db.prepare(sql);


                for (const row of data) {
                    const params = columns.map(col => row[col]);
                    stmt.run(params, (err) => {
                        if (err) {
                            _db.run("ROLLBACK");
                            return reject(err);
                        }
                    });
                }

                stmt.finalize();
                _db.run("COMMIT", (commitErr) => {
                    if (commitErr) {
                        _db.run("ROLLBACK");
                        return reject(commitErr);
                    }
                    resolve(true);
                });






            });
        })
    }





}

module.exports = models;




