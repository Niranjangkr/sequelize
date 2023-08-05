require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sequelize-learn', 'root', process.env.PASSWORD, {
    dialect: 'mysql'
});

const Customer = sequelize.define('customer', {
    CustomerName: {
        type: Sequelize.DataTypes.STRING
    }
}, {
    timestamps: false
});

const Product = sequelize.define('product', {
    productName: { 
        type: Sequelize.DataTypes.STRING
    }
}, {
    timestamps: false
});

const CustomerProduct = sequelize.define('customerproduct', {
    customerporductId: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    timestamps: false
});

// Customer.belongsToMany(Product, { through: 'customerproduct'}); // { through: 'customerproduct'} we use this on both tables to make  the join table but we can make it separately without using this also 
// Product.belongsToMany(Customer, { through: 'customerproduct'});

// we dont need to define onDelete and onUpdate to cascade here as its by default CASCADE;
Customer.belongsToMany(Product, {
    through: CustomerProduct
});
Product.belongsToMany(Customer, {
    through: CustomerProduct
});

let customer, product;
sequelize.sync( {alter: true }).then(() => {
    return Customer.destroy({where: { CustomerName: 'Nianjan'}});
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error);
});