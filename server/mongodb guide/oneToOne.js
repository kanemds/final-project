// reference: https://www.bezkoder.com/mongoose-one-to-one-relationship-example/

// In models/Customer.js
const mongoose = require("mongoose");
const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: String,
    age: Number,
    gender: String
  })
);
module.exports = Customer;

// In models/Identifier.js
const mongoose = require("mongoose");
const Identifier = mongoose.model(
  "Identifier",
  new mongoose.Schema({
    cardCode: String,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer"
    }
  })
);
module.exports = Identifier;


// In server.js
const Customer = require("./models/Customer");
const Identifier = require("./models/Identifier");

// create customer function
const createCustomer = function(name, age, gender) {
  const customer = new Customer({
    name,
    age,
    gender
  });
  return customer.save();
};

// create identifier function
const createIdentifier = function(cardCode, customer) {
  const identifier = new Identifier({
    cardCode,
    customer
  });
  return identifier.save();
};



createCustomer("bezkoder", 29, "male")
  .then(customer => {
    console.log("> Created new Customer\n", customer);
    
    const customerId = customer._id.toString();
    // making card code from the first 10 digits of customerId
    return createIdentifier(customerId.substring(0, 10).toUpperCase(), customerId);
  })
  .then(identifier => {
    console.log("> Created new Identifier\n", identifier);
  })
  .catch(err => console.log(err));


 // console.log result
  > Created new Customer
 { _id: 5da135bd61a1dd3e9c2a6e81,
  name: 'bezkoder',
  age: 29,
  gender: 'male',
  __v: 0 }
> Created new Identifier
 { _id: 5da135bf61a1dd3e9c2a6e82,    
  cardCode: '5DA135BD61',
  customer: 5da135bd61a1dd3e9c2a6e81,
  __v: 0 }