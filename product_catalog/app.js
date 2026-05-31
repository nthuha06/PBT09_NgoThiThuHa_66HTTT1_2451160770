const products = [

    {
        id:1,
        name:"iPhone 16",
        price:25990000,
        category:"phone",
        image:"https://placehold.co/300x200",
        rating:4.8,
        inStock:true
    },

    {
        id:2,
        name:"Samsung S25",
        price:21990000,
        category:"phone",
        image:"https://placehold.co/300x200",
        rating:4.5,
        inStock:true
    },

    {
        id:3,
        name:"MacBook Pro",
        price:45990000,
        category:"laptop",
        image:"https://placehold.co/300x200",
        rating:5,
        inStock:true
    },

    {
        id:4,
        name:"Dell XPS",
        price:35990000,
        category:"laptop",
        image:"https://placehold.co/300x200",
        rating:4.6,
        inStock:true
    },

    {
        id:5,
        name:"AirPods Pro",
        price:5990000,
        category:"accessory",
        image:"https://placehold.co/300x200",
        rating:4.7,
        inStock:true
    },

    {
        id:6,
        name:"Apple Watch",
        price:10990000,
        category:"accessory",
        image:"https://placehold.co/300x200",
        rating:4.4,
        inStock:true
    },

    {
        id:7,
        name:"iPad Air",
        price:17990000,
        category:"tablet",
        image:"https://placehold.co/300x200",
        rating:4.8,
        inStock:true
    },

    {
        id:8,
        name:"Galaxy Tab",
        price:14990000,
        category:"tablet",
        image:"https://placehold.co/300x200",
        rating:4.3,
        inStock:true
    }

];





const app = document.querySelector("#app");

let filteredProducts = [...products];

let cartCount = 0;

renderLayout();

renderProducts(filteredProducts);





function renderLayout(){

    app.innerHTML = `

        <div class="cart">
            Cart: <span id="cartCount">0</span>
        </div>

        <div class="container">

            <div class="top-bar">

                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search product..."
                >

                <select id="sortSelect">

                    <option value="">
                        Sort
                    </option>

                    <option value="priceAsc">
                        Price Low → High
                    </option>

                    <option value="priceDesc">
                        Price High → Low
                    </option>

                    <option value="name">
                        Name A-Z
                    </option>

                    <option value="rating">
                        Highest Rating
                    </option>

                </select>

                <button id="darkModeBtn">
                    Dark Mode
                </button>

            </div>

            <div class="filters">

                <button data-category="all">
                    All
                </button>

                <button data-category="phone">
                    Phone
                </button>

                <button data-category="laptop">
                    Laptop
                </button>

                <button data-category="tablet">
                    Tablet
                </button>

                <button data-category="accessory">
                    Accessory
                </button>

            </div>

            <div class="products" id="productContainer"></div>

        </div>

    `;





    document.querySelector("#searchInput")
        .addEventListener("input", searchProducts);





    document.querySelector("#sortSelect")
        .addEventListener("change", sortProducts);





    document.querySelectorAll(".filters button")
        .forEach(button => {

            button.addEventListener("click", () => {

                filterByCategory(
                    button.dataset.category
                );

            });

        });





    document.querySelector("#darkModeBtn")
        .addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

        });

}





function renderProducts(productArray){

    const container =
        document.querySelector("#productContainer");

    container.innerHTML = "";





    productArray.forEach(product => {

        const card = document.createElement("div");

        card.classList.add("card");





        card.innerHTML = `

            <img src="${product.image}">

            <h3>${product.name}</h3>

            <p class="price">
                ${product.price.toLocaleString()} VND
            </p>

            <p>
                Rating: ${product.rating}
            </p>

            <button class="add-cart">
                Add To Cart
            </button>

        `;





        card.addEventListener("click", (e) => {

            if(e.target.classList.contains("add-cart")){

                e.stopPropagation();

                addToCart();

                return;
            }

            openModal(product);

        });





        container.appendChild(card);

    });

}





function searchProducts(e){

    const keyword =
        e.target.value.toLowerCase();





    filteredProducts = products.filter(product => {

        return product.name
            .toLowerCase()
            .includes(keyword);

    });





    renderProducts(filteredProducts);

}





function filterByCategory(category){

    if(category === "all"){

        filteredProducts = [...products];

    }

    else{

        filteredProducts = products.filter(product => {

            return product.category === category;

        });

    }





    renderProducts(filteredProducts);

}





function sortProducts(e){

    const value = e.target.value;





    if(value === "priceAsc"){

        filteredProducts.sort((a,b) => {

            return a.price - b.price;

        });

    }





    else if(value === "priceDesc"){

        filteredProducts.sort((a,b) => {

            return b.price - a.price;

        });

    }





    else if(value === "name"){

        filteredProducts.sort((a,b) => {

            return a.name.localeCompare(b.name);

        });

    }





    else if(value === "rating"){

        filteredProducts.sort((a,b) => {

            return b.rating - a.rating;

        });

    }





    renderProducts(filteredProducts);

}





function addToCart(){

    cartCount++;

    document.querySelector("#cartCount")
        .textContent = cartCount;

}





function openModal(product){

    const modal = document.createElement("div");

    modal.classList.add("modal");





    modal.innerHTML = `

        <div class="modal-content">

            <h2>${product.name}</h2>

            <img
                src="${product.image}"
                width="100%"
            >

            <p>
                Price:
                ${product.price.toLocaleString()} VND
            </p>

            <p>
                Rating:
                ${product.rating}
            </p>

            <p>
                Category:
                ${product.category}
            </p>

            <button id="closeModal">
                Close
            </button>

        </div>

    `;





    document.body.appendChild(modal);





    document.querySelector("#closeModal")
        .addEventListener("click", () => {

            modal.remove();

        });

}