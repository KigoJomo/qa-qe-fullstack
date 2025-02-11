const productsContainer = document.querySelector(".products-container")

async function getData(){
  try{
    const response = await fetch('http://localhost:3000');
    const products = await response.json()

    for(const product of products.products){
      console.log(product)
      const item = document.createElement("div");
      item.innerHTML = `
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>${product.price}</p>
        <p>${product.category}</p>
        <p>${product.stock}</p>
      `
      productsContainer.appendChild(item)
    };
  } catch(error){
    console.log('There was an error fetching prodcts:', error)
  }
}