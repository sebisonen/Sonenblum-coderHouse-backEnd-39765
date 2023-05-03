const socket = io();

socket.on('products', data =>{
    // Seccion del documento a rellenar
        const productsCatalogue = document.getElementById("productsCatalogue")
    // Vacío el HTML rellenado con handlebars 
        productsCatalogue.innerHTML=""
    // Paso a cargar en real time lo anterior, mas lo que agregué
    data.forEach((product)=>{
        productsCatalogue.innerHTML+=`
        <div id=${product.id} class="container">
            <div class="details">
                <div class="content">
                    <h2>${product.title}<br>
                    </h2>
                    <p>
                        ${product.description}
                    </p>
                    <h3>$${product.price}</h3>
                    <button>Buy Now</button>
                </div>
            </div>
        </div>
        `
  })
})