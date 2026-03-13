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

    async automationConfigGet(data) {
        const db = await getDbConnection();
        const sql = "SELECT * FROM AutomationConfig ";

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
    async automationProtocolsGet(params) {
        const db = await getDbConnection();
        const sql = "SELECT * FROM AutomationProtocols";

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


    async automationConfigUpdate(data) {
        const db = await getDbConnection();

        const sql = "UPDATE AutomationConfig SET DeviceID = ?, SCPNo = ?, Protocol = ?, Timeout = ?, Address = ?,  ErrorCycle = ?   WHERE ID = ?";

        const params = [data.DeviceID, data.SCPNo, data.Protocol, data.Timeout, data.Address, data.ErrorCycle, data.ID];

        return new Promise((resolve, reject) => {

            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err);
                    return reject("Update Error");
                }

                if (this.changes === 0) {
                    return reject("error.");
                }
                resolve({ success: true, message: "Update Success" });
            });
        });
    },




    async automationProtocolsUpdate(data) {
        const db = await getDbConnection();

        const sql = "UPDATE AutomationProtocols SET Protocol = ?, Name = ?  WHERE ID = ?";

        const params = [data.Protocol, data.Name, data.ID];

        return new Promise((resolve, reject) => {

            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err);
                    return reject("Update Error");
                }

                if (this.changes === 0) {
                    return reject("error.");
                }
                resolve({ success: true, message: "Update Success" });
            });
        });
    },

    async countryTypeDefGet(params) {

        const db = await getDbConnection();
        const sql = "SELECT * FROM CountryTypedef";

        return new Promise((resolve, reject) => {

            db.all(sql, (err, users) => {
                if (err) return reject("Veritabanı hatası");
                try {
                    resolve(users);
                } catch (error) {
                    return reject("veri yok");
                }


            });
        });

    },

    async countryTypeDefUpdate(data) {
        const db = await getDbConnection();

        const sql = "UPDATE CountryTypedef SET No = ?, Name = ?  WHERE ID = ?";

        const params = [data.No, data.Name, data.ID];

        return new Promise((resolve, reject) => {

            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err);
                    return reject("Update Error");
                }

                if (this.changes === 0) {
                    return reject("error.");
                }
                resolve({ success: true, message: "Update Success" });
            });
        });
    },


    async dispenserConfigGet() {

        const db = await getDbConnection();
        const sql = "SELECT * FROM DispenserConfig";

        return new Promise((resolve, reject) => {

            db.all(sql, (err, users) => {
                if (err) return reject("Veritabanı hatası");
                try {
                    resolve(users);
                } catch (error) {
                    return reject("veri yok");
                }


            });
        });
    },


    async dispenserConfigUpdate(data) {

        const db = await getDbConnection();
        const sql = "UPDATE DispenserConfig SET DeviceID = ?, SCPNo = ?, Address = ?, Protocol = ?, Timeout = ?,  ErrorCycle = ?   WHERE ID = ?";

        const params = [data.DeviceID, data.SCPNo, data.Address, data.Protocol, data.Timeout, data.ErrorCycle, data.ID];

        return new Promise((resolve, reject) => {

            db.run(sql, params, function (err) {
                if (err) {
                    console.error(err);
                    return reject("Update Error");
                }

                if (this.changes === 0) {
                    return reject("error.");
                }
                resolve({ success: true, message: "Update Success" });
            });
        });
    },




}

module.exports = models;




