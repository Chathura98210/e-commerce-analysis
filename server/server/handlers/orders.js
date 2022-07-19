// INSERT INTO `users` (`id`, `name`, `username`, `password`, `rec_1`, `rec_2`, `rec_3`, `rec_4`, `rec_5`, `recent_1`, `recent_2`, `recent_3`, `recent_4`, `recent_5`) VALUES (NULL, 'test', 'testuser', 'password', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
const pool = require('../connection')
exports.addOrder = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, address, contact, items } = req.body;



        const getItemsQuery = (orderId) => {
            let itemslist = ``;
            for (let i = 0; i < items.length; i++) {
                if (i == items.length - 1) {
                    itemslist = itemslist + `(${orderId},${items[i].id},1)`
                } else {
                    itemslist = itemslist + `(${orderId},${items[i].id},1),`
                }

            }
            let items_query = `INSERT INTO item_order(orderId, itemId, amount) VALUES` + itemslist + `;`;

            return items_query;
        }

        connection.query('INSERT INTO orders SET name = ?, address = ?, contact = ?;', [name, address, contact], (err, rows) => {


            if (!err) {
                connection.query('SELECT LAST_INSERT_ID() as id from orders;', (errp, rowsp) => { // return the connection to pool
                    connection.query(getItemsQuery(rowsp[0].id), (errpp, rowspp) => {
                        connection.release() // return the connection to pool
                        res.send(`order added.`)
                    })
                })

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