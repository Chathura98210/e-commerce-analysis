//=================================================customer login======================================================//
const pool = require('../connection')
exports.addCustomer = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { username, password } = req.body

        connection.query('SELECT password,username,address FROM users where username = ?', [username], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                if (rows[0].password == password) {
                    res.send(rows[0]);
                } else {
                    res.send(`0`);
                }
            } else {
                console.log(err);
            }

        })

        console.log(req.body);
    })
};


exports.customerRegister = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { username, password, address } = req.body
        connection.query('SELECT username FROM users where username = ?', [username], (err, rows) => {

            if (!err) {
                if (rows[0]) {
                    res.send('username already exist');
                } else {
                    connection.query(`INSERT INTO users SET username = ?, password = ?, address= ?`, [username, password, address], (err, rows) => {
                        connection.release() // return the connection to pool

                        if (!err) {
                            res.send(`user added`)
                        } else {
                            console.log(err)
                        }

                    })
                }
            } else {
                console.log(err);
            }

        })

        console.log(req.body);
    })
};

exports.customerLogin = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { username, password } = req.body

        connection.query('SELECT password,username,address FROM users where username = ?', [username], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                if (rows[0]) {
                    if (rows[0].password == password) {
                        res.send(rows[0]);
                    } else {
                        res.send('wrong password');
                    }

                } else {
                    res.send('no user');
                }
            } else {
                res.send('error');
                console.log(err);
            }

        })

        console.log(req.body);
    })
};