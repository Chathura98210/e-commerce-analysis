// INSERT INTO `users` (`id`, `name`, `username`, `password`, `rec_1`, `rec_2`, `rec_3`, `rec_4`, `rec_5`, `recent_1`, `recent_2`, `recent_3`, `recent_4`, `recent_5`) VALUES (NULL, 'test', 'testuser', 'password', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

exports.addUser = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, username, password } = req.body

        connection.query('INSERT INTO users SET name = ?, username = ?, password = ?', [name, username, password], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`User with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.updateUser = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, username, password } = req.body

        connection.query('UPDATE items SET name = ?, username = ?, password = ? WHERE id = ?', [name, username, password, id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`User with the name: ${name} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.getUsers = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from users', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};


exports.getUsersById = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from items WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};