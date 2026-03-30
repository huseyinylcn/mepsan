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



    async dynamicGetModel(data) {
        const db = await getDbConnection();
        const sql = `SELECT  rowid AS rowid_key, * FROM ${data.tableName} `;

        return new Promise((resolve, reject) => {

            db.all(sql, (err, users) => {
                if (err) return reject("Veritabanı hatası");
                try {
                    resolve(users);
                } catch (error) {
                    return reject("Kullanıcı yok");
                }


            });
        });
    },




async dynamicUpdateModel(data) {
    const db = await getDbConnection();

    // 1. Tablo ismini temizle (SQL Injection önlemi)
    const safeTableName = data.tableName.replace(/[^a-zA-Z0-9_]/g, '');

    // 2. Güncellenecek alanları (content) ve rowid_key'i ayır
    const { rowid_key, ...updateFields } = data.content;

    if (!rowid_key) {
        return Promise.reject("Güncelleme için rowid_key gereklidir.");
    }

    // 3. Dinamik SET bloğunu oluştur
    // Örn: "column1 = ?, column2 = ?"
    const columns = Object.keys(updateFields);
    const setClause = columns.map(col => `${col} = ?`).join(', ');

    // 4. Parametre dizisini oluştur (Values + RowID)
    // Önce güncellenecek değerler, en sona WHERE için rowid_key
    const params = [...Object.values(updateFields), rowid_key];

    // Final Sorgu: UPDATE tablo SET col1=?, col2=? WHERE rowid = ?
    const sql = `UPDATE ${safeTableName} SET ${setClause} WHERE rowid = ?`;

    return new Promise((resolve, reject) => {
        db.run(sql, params, function (err) {
            if (err) {
                console.error("SQL Hatası:", err);
                return reject("Update Error: " + err.message);
            }

            if (this.changes === 0) {
                return reject("Güncellenecek satır bulunamadı veya veri aynı.");
            }

            resolve({ 
                success: true, 
                message: "Update Success", 
                changes: this.changes 
            });
        });
    });
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
        const sql = "SELECT ID,Password FROM Users WHERE Name = ?";

        return new Promise((resolve, reject) => {

            db.get(sql, [data.Name], async (err, user) => {
                if (err) return reject("Veritabanı hatası");

                if (!user) return reject("Kullanıcı veya şifre hatalı");

                const isMatch = await bcrypt.compare(data.Password, user.Password);

                if (isMatch) {
                    delete user.Password;
                    resolve(user);
                } else {
                    reject("Kullanıcı veya şifre hatalı");
                }
            });
        });
    },

    async usersGetAll(data) {
        const db = await getDbConnection();
        const sql = "SELECT * FROM Users";

        return new Promise((resolve, reject) => {

            db.all(sql, (err, users) => {
                if (err) return reject("Veritabanı hatası");

                const sanitizedUsers = users.map(user => {
                    const { Password, ...userWithoutPassword } = user;
                    return userWithoutPassword;
                });

                resolve(sanitizedUsers);
            });
        });
    },



    async userUpdate(data) {
        const db = await getDbConnection();

        const sql = "UPDATE Users SET Name = ?, Surname = ?, Language = ?, Type = ?, Phone = ? WHERE ID = ?";
        const params = [data.Name, data.Surname, data.Language, data.Type, data.Phone, data.ID];

        return new Promise((resolve, reject) => {

            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err);
                    return reject("Güncelleme sırasında bir hata oluştu.");
                }


                if (this.changes === 0) {
                    return reject("Kullanıcı bulunamadı.");
                }

                resolve({ success: true, message: "Kullanıcı başarıyla güncellendi." });
            });
        });
    },


    async userDelete(data) {
        const db = await getDbConnection();
        const sql = "delete from Users WHERE ID = ?";
        const params = [data.ID];

        return new Promise((resolve, reject) => {

            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err);
                    return reject("Güncelleme sırasında bir hata oluştu.");
                }


                if (this.changes === 0) {
                    return reject("Kullanıcı bulunamadı.");
                }

                resolve({ success: true, message: "Kullanıcı başarıyla Silindi." });
            });
        });
    },

    async me(data) {
        const db = await getDbConnection();
        const sql = "SELECT * FROM Users where ID = ?";
        const params = [data.ID];

        return new Promise((resolve, reject) => {

            db.all(sql, params, (err, users) => {
                if (err) return reject("Veritabanı hatası");
                try {
                    delete users[0].Password;

                    resolve(users[0]);
                } catch (error) {
                    return reject("Kullanıcı yok");
                }


            });
        });
    },








}

module.exports = models;




