const user = {
  id: 'USER-123456',
  name: {
    first: 'Alice',
    last: 'Liddell',
  },
  email: 'alice@example.com',
  address: {
    shipping: {
      street: '123 Rabbit Hole',
      city: 'Wonderland',
      state: 'Fantasy',
      postalCode: '12345',
      country: 'WL',
    },
    billing: {
      street: '456 Mad Hatter Lane',
      city: 'Tea Party',
      state: 'Fantasy',
      postalCode: '67890',
      country: 'WL',
    },
  },
  payment: {
    total: '100.00',
    currency: 'USD',
    details: {
      subtotal: '75.00',
      tax: '15.00',
      shipping: '10.00',
    },
    transactions: [
      { id: 'TXN-123', amount: '50.00', description: 'Magic Potion' },
      { id: 'TXN-456', amount: '50.00', description: 'Enchanted  Sword' },
    ],
  },
};

const personalInfo = document.getElementById("personal-info");
const shippingInfo = document.getElementById("shipping-address");
const billingInfo = document.getElementById("billing-address");
const transactionInfo = document.getElementById("transactions")

function injectData(){
  const { id, name: {first, last}, email} = user;

  const userInfo = document.createElement("div");

  userInfo.innerHTML = `
    <h3>Personal Info</h3>
    <p>User Id: ${id} </p>
    <p>First Name: ${first} </p>
    <p>Last Name: ${last} </p>
    <p>Email: ${email} </p>
  `

  personalInfo.append(userInfo);

  const { address: {shipping: { street, city, state, postalCode, country }} } = user;

  shippingInfo.innerHTML = `
    <hr />
    <h3>Shipping Address</h3>
    <p>Street: ${street}</p>
    <p>City: ${city}</p>
    <p>State: ${state}</p>
    <p>Postal Code: ${postalCode}</p>
    <p>Country: ${country}</p>
  `

  const { address: {billing: { street: street1, city: city1, state: state1, postalCode: postalCode1, country: country1  }} } = user;

  billingInfo.innerHTML = `
    <hr />
    <h3>Billing Address</h3>
    <p>Street: ${street1}</p>
    <p>City: ${city1}</p>
    <p>State: ${state1}</p>
    <p>Postal Code: ${postalCode1}</p>
    <p>Country: ${country1}</p>
  `

  const { payment: { transactions } } = user

  // an unordered list that will hold the transactions
  const list = document.createElement("ul")

  // lopp through each transaction using .map()
  transactions.map(transaction => {
    // destructure the transaction to get id, amount and desc
    const { id, amount, description } = transaction;

    // create a list element (<li>) for the transaction
    const transactionDtls = document.createElement("li")
    // add the details to the list element using template literals
    transactionDtls.innerHTML = `
      <p>Id: ${id}</p>
      <p>Amount: ${amount}</p>
      <p>Description: ${description}</p>
    `
    // append the transaction/list item to the unordered list
    list.append(transactionDtls)
  })

  // append the list to the transactions section
  transactionInfo.appendChild(list)
}

injectData();