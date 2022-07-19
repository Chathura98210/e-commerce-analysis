const pool = require('../connection')
    // app.put('/itemviewed', items.updateViewed);
    // app.put('/itemaddedtocart', items.updateItemAddedToCart);

//=================================================Items=======================================================//

exports.getItems = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
            // subCategory category
        connection.query(`SELECT items.*, sub_categories.name AS subCategory , categories.name AS category FROM 
        items JOIN sub_categories JOIN 
        categories WHERE items.subCatId = sub_categories.id AND sub_categories.catId = categories.id;`, (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.getFeaturedItems = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
            // subCategory category
        connection.query(`SELECT items.*, sub_categories.name AS subCategory , categories.name AS category FROM 
        items JOIN sub_categories JOIN 
        categories WHERE items.subCatId = sub_categories.id AND sub_categories.catId = categories.id AND items.isFeatured = 1 LIMIT 3;`, (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};
exports.getItemsById = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`SELECT items.*, sub_categories.name AS subCategory , categories.name AS category FROM 
        items JOIN sub_categories JOIN 
        categories WHERE items.subCatId = sub_categories.id AND sub_categories.catId = categories.id AND items.id = ?`, [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.getItemsCat = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`SELECT items.*, sub_categories.name AS subCategory , categories.name AS category FROM 
        items JOIN sub_categories JOIN 
        categories WHERE items.subCatId = sub_categories.id AND sub_categories.catId = categories.id AND items.catId = ?`, [req.params.catId], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.getItemsSubCat = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query(`SELECT items.*, sub_categories.name AS subCategory , categories.name AS category FROM 
        items JOIN sub_categories JOIN 
        categories WHERE items.subCatId = sub_categories.id AND sub_categories.catId = categories.id AND items.subCatId = ?`, [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.updateItem = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, price, description, rating, catId, subCatId, imgUrl, stock } = req.body

        connection.query('UPDATE items SET name = ?, price = ?, description = ?, rating = ? , catId = ? , subCatId = ? , imgUrl = ? , stock = ?  WHERE id = ?', [name, price, description, rating, catId, subCatId, imgUrl, stock, id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Item with the name: ${name} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};


exports.addItem = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, price, description, rating, catId, subCatId, imgUrl, stock, isFeatured } = req.body

        connection.query('INSERT INTO items SET name = ?, price = ?, description = ?, rating = ? , catId = ? , subCatId = ? , imgUrl = ? , stock = ? , isFeatured =?', [name, price, description, rating, catId, subCatId, imgUrl, stock, isFeatured], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Item with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.updateViewed = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id } = req.body

        connection.query('INSERT INTO items_viewed SET itemId = ?', [id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Item with the id: ${id} has been viewed.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.getItemViews = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`SELECT COUNT(*) AS count,DATE_FORMAT(date,'%y-%m-%d') AS date FROM items_viewed WHERE itemId = ? AND date BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now() GROUP BY DATE(date) ORDER BY date DESC`, [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.updateATC = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id } = req.body

        connection.query('INSERT INTO items_added_to_cart SET itemId = ?', [id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Item with the id: ${id} has been viewed.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.getItemATC = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`SELECT COUNT(*) AS count,DATE_FORMAT(date,'%y-%m-%d') AS date FROM items_added_to_cart WHERE itemId = ? AND date BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now() GROUP BY DATE(date) ORDER BY date DESC`, [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.getItemStat = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        connection.query(`SELECT COUNT(*) AS count,DATE_FORMAT(date,'%y-%m-%d') AS date FROM items_added_to_cart WHERE itemId = ? AND date BETWEEN date_sub(now(),INTERVAL 1 WEEK) AND now() GROUP BY DATE(date) ORDER BY date DESC`, [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};
//=================================================Categories & Sub categories=======================================================//

exports.getCategories = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from categories', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.getSubCategories = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT sub_categories.*,categories.name AS catName FROM `sub_categories` JOIN categories WHERE sub_categories.catId = categories.id;', (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

exports.addCategory = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, img_url } = req.body

        connection.query('INSERT INTO categories SET name = ?, imgUrl = ?', [name, img_url], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Category with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })
    })
};

exports.addSubCategory = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { name, catid, imgUrl } = req.body

        connection.query('INSERT INTO sub_categories SET name = ?,catid = ?, imgUrl = ?', [name, catid, imgUrl], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Sub Category with the name: ${name} has been added.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.updateCategory = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, imgUrl } = req.body

        connection.query('UPDATE categories SET name = ?, imgUrl = ? , stock = ?  WHERE id = ?', [name, imgUrl, id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Category with the name: ${name} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.updateSubCategory = async(req, res, next) => {

    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const { id, name, catid, imgUrl } = req.body

        connection.query('UPDATE sub_categories SET name = ?,catid = ?, imgUrl = ?  WHERE id = ?', [name, catid, imgUrl, id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(`Sub Category with the name: ${name} has been updated.`)
            } else {
                console.log(err)
            }

        })

        console.log(req.body)
    })
};

exports.getCategoryById = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from categories WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};


exports.getSubCategoryById = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from sub_categories WHERE id = ?', [req.params.id], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};
exports.getSubCategoriesBCatId = async(req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from sub_categories WHERE catId = ?', [req.params.catId], (err, rows) => {
            connection.release() // return the connection to pool

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }

        })
    })
};

// // Delete a item
// app.delete('/:id', (req, res) => {

//     pool.getConnection((err, connection) => {
//         if (err) throw err
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('DELETE from items WHERE id = ?', [req.params.id], (err, rows) => {
//             connection.release() // return the connection to pool

//             if (!err) {
//                 res.send(`Item with the Record ID: ${[req.params.id]} has been removed.`)
//             } else {
//                 console.log(err)
//             }

//         })
//     })
// })