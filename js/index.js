let sectionProducts = document.querySelector(".cards")
let cartShop = document.querySelector(".information-carshop ul")
let cart = document.querySelector(".cart-itens")
let cartShopping = []


/* Listar produtos */ 

function listProducts (produto, section) {

    section.innerHTML = ""

    for(let i = 0; i < produto.length; i++) {

        let product  = produto[i]

        let cardProduct = createProductCard(product)

        section.appendChild(cardProduct)

    }
}

listProducts(data, sectionProducts)

/* Criar card de produtos */ 

function createProductCard (produto) {

    let titleCard = produto.nameItem
    let descriptionCard = produto.description
    let priceCard = `R$ ${produto.value},00`
    let tagCard = produto.tag
    let buttCard = produto.addCart
    let id = produto.id

    let ulCards = document.querySelector(".cards")
    let liCard = document.createElement("li")
    let divImg = document.createElement("div")
    let img = document.createElement("img")
    let divCardsInformation = document.createElement("div")
    let spanHashtag = document.createElement("span")
    let h4CardTitle = document.createElement("h4")
    let pDescription = document.createElement("p")
    let spanCardPrice = document.createElement("span")
    let buttonCard = document.createElement("button")

    if(id != undefined){

        buttonCard.id =  id
    }

    liCard.classList.add("card-product")
    divImg.classList.add("card-img")
    divCardsInformation.classList.add("card-information")
    spanHashtag.classList.add("card-hashtag")
    h4CardTitle.classList.add("card-title")
    pDescription.classList.add("card-description")
    spanCardPrice.classList.add("card-price")
    buttonCard.classList.add("card-button")

    img.src = produto.img
    spanHashtag.innerText = tagCard
    h4CardTitle.innerText = titleCard
    pDescription.innerText = descriptionCard
    spanCardPrice.innerText = priceCard
    buttonCard.innerText = buttCard

    divImg.append(img)
    divCardsInformation.append(spanHashtag, h4CardTitle, pDescription, spanCardPrice, buttonCard)
    liCard.append(divImg, divCardsInformation)
    ulCards.append(liCard)

    return liCard
}


/* Interceptar evento do carrinho  */ 
sectionProducts.addEventListener("click", interceptProduct)


function interceptProduct (event) {

    let btnBuy = event.target

    if(btnBuy.tagName == "BUTTON") {
        
        let idProduct = btnBuy.id

        let product = data.find(function(product) {

            if(product.id == idProduct) {
                return product
            }
        })

        addCart(product)

    }
}

/* Adicionar produto no carrinho  */ 

function addCart (product) {

    if(product !== undefined) {
        cartShopping.push(product)
        
        listProducts(cartShopping, cartShop)
        createCarrinhoTotal(cartShopping)
    }

}

function soma(soma) {

    let total = 0;

    for (let i = 0; i < soma.length; i++) {
      total += soma[i].value;
    }
  
    let totalBR = total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  
    return `${totalBR}`;
  }


function createCarrinhoTotal (cart) {

    let span1 = document.querySelector(".quantidade")
    let span2 = document.querySelector(".total")

    span1.innerText = cart.length
    span2.innerText = soma(cart)

}




function removeProductCart (event) {

    let btnRemove = event.target

    if(btnRemove.tagName == 'BUTTON') {

        let id = btnRemove.id
        let index = cartShopping.findIndex(produto => produto.id == id)

        cartShopping.splice(index, 1)

        createCarrinhoTotal(cartShopping)
        listProducts(cartShopping, cartShop)

    }

}

cartShop.addEventListener("click", removeProductCart)