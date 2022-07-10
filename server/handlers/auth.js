//=================================================customer login======================================================//

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


exports.customerLogin = async(req, res, next) => {

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