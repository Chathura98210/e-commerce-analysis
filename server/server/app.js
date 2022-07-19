const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer')
const items = require('./handlers/items');
const users = require('./handlers/users');
const auth = require('./handlers/auth');
const orders = require('./handlers/orders')
const images = require('./handlers/images');
const cors = require('cors');
const path = require('path')


const app = express();
const port = process.env.PORT || 5000
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


var storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
});

const upload = multer({ storage: storage });

app.post("/uploadfile", upload.single('file'), (req, res, next) => {
    console.log(req.file.originalname + " file successfully uploaded !!");
    res.sendStatus(200);
});

app.get('/images/:path', images.getImage);
//====================================================Items============================================================//
// Get all items
app.get('/items', items.getItems);
// Get featured items
app.get('/featuredItems', items.getFeaturedItems);
// Get item by id
app.get('/items/:id', items.getItemsById);
// Get all items in a category
app.get('/ItemsInCat/:catId', items.getItemsCat);
// Get all items in a sub category
app.get('/ItemsInSubCat/:id', items.getItemsSubCat);
// update item
app.put('/updateItem', items.updateItem);
//add item
app.post('/addItem', items.addItem);
//update item view
app.post('/itemviewed', items.updateViewed);
//get item views
app.get('/itemviewed/:id', items.getItemViews);
//update item view
app.post('/itemaddtocart', items.updateATC);
//get item views
app.get('/itemaddtocart/:id', items.getItemATC);
//get single item stat
app.get('/itemstat/:id', items.getItemStat);
//==========================================Categories & Sub categories==============================================//
// Get all categories
app.get('/categories', items.getCategories);
//add category
app.post('/addCategory', items.addCategory);
//update category
app.put('/updateCat', items.updateCategory);
// Get all sub categories
app.get('/subcategories', items.getSubCategories);
//add subcategory
app.post('/addSubCategory', items.addSubCategory);
//update item view
app.put('/updateSubCat', items.updateSubCategory);
//get category by id
app.get('/getCategory/:id', items.getCategoryById);
//get sub category by id
app.get('/getSubCategory/:id', items.getSubCategoryById);
//get sub categories by category id
app.get('/getSubCategories/:catId', items.getSubCategoriesBCatId);
//=================================================Customers=======================================================//
//get users
app.get('/getUsers', users.getUsers);
//get user by id
app.get('/getUsers/:id', users.getUsersById);
//add user
app.post('/addUser', users.addUser);
//update user
app.put('/updateUser/:id', users.updateUser);
//get order count for a user
app.get('/orderCount/:userId', users.getOrderCount);

//===================================================Auth=========================================================//
//customer login
app.post('/customerLogin', auth.customerLogin);
//customer login
app.post('/customerRegister', auth.customerRegister);

//===================================================Order=========================================================//
//customer login
app.post('/addOrder', orders.addOrder);

// Listen on enviroment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))