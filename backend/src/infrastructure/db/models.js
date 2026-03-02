const { getDbConnection } = require('./../../config/database');
const bcrypt = require('bcrypt');


let models = {

    async dynamicModel(input) {

        const _db = await getDbConnection();
        return new Promise((resolve, reject) => {

            const { tableName, data } = input;

            _db.serialize(() => {

                _db.run("BEGIN TRANSACTION");


                _db.run(`DELETE FROM ${tableName}`, (err) => {
                    if (err) {
                        _db.run("ROLLBACK");
                        return reject(err);
                    }
                });



                _db.run(`UPDATE sqlite_sequence SET seq = 0 WHERE name = '${tableName}'`);




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
    },


    async signup(data) {
        const _db = await getDbConnection();

            data.Password = await bcrypt.hash(data.Password, 10);
        const sql = `INSERT INTO Users (Name, Surname, Password, Language, Type, Phone) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [data.Name, data.Surname, data.Password, data.Language, data.Type, data.Phone];

        return new Promise((resolve, reject) => {
            _db.run(sql, params, function (err) {
                if (err) {
                    console.error("Kayıt hatası:", err.message);
                    reject(err);
                } else {

                    resolve({ success: true, id: this.lastID });
                }
            });
        });
    },


    async login(data) {
        const db = await getDbConnection();
        const sql = "SELECT * FROM Users WHERE Name = ?";

        return new Promise((resolve, reject) => {

            db.get(sql, [data.Name], async (err, user) => {
                if (err) return reject("Veritabanı hatası");

                // BURAYA return EKLİYORUZ
                if (!user) return reject("Kullanıcı veya şifre hatalı");

                // Artık kod buraya sadece user varsa gelir
                const isMatch = await bcrypt.compare(data.Password, user.Password);

                if (isMatch) {
                    delete user.Password;
                    resolve(user);
                } else {
                    reject("Kullanıcı veya şifre hatalı");
                }
            });
        });
    }

}

module.exports = models;




