const menu = document.getElementById("menu")
const cartBtn = document.getElementById("cart-btn")
const cartModal = document.getElementById("cart-modal")
const cartItemContainer = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModalBtn = document.getElementById("close-modal-btn")
const cartCounter = document.getElementById("cart-count")
const addressInput = document.getElementById("address")
const addressWarn = document.getElementById("address-warn")

let cart = []


// abrir o modal do carrinho
cartBtn.addEventListener("click", function(){
    updateCartModal()
    cartModal.style.display = "flex"
})


//fechar o modal quando clica fora
cartModal.addEventListener("click", function(event){
    if(event.target === cartModal) {
        cartModal.style.display = "none"
    }
})

// fechar o modal no botão
closeModalBtn.addEventListener("click", function(){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn")

    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))

        // adicionar no carrinho
        addToCart(name, price)
    }

})

// function para adicionar no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if(existingItem){
        //Se o item já existe, aumenta apenas a quantidade
        existingItem.quantity += 1
        return
    } else {
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}

// atualiza o carrinho
function updateCartModal(){
    cartItemContainer.innerHTML = ""
    let total = 0
    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.classList.add("flex", "justify-between", "mb-4", "mt-4", "flex-col")
        cartItemElement.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-medium">${item.name}</p>
                    <p>Qtd: ${item.quantity}x</p>
                    <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>
                <button 
                    class="remove-from-cart-btn focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    data-name="${item.name}"
                >
                    <i class="fa-solid fa-trash-can"></i>
                </button>                   

            </div>
        `
        total += item.price * item.quantity

        cartItemContainer.appendChild(cartItemElement)
    
    })

    cartTotal.textContent = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    cartCounter.innerHTML = cart.length
}

// função para remover item do carrinho

cartItemContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")){
        const name = event.target.getAttribute("data-name")

        removeItemCart(name)
    }
})

async function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)

    if(index !== -1){
        const item = cart[index]

        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value
    if(inputValue !== ""){
        addressInput.classList.remove("border-red-600")
        addressWarn.classList.add("hidden")
    }
})


checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0) return
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-600")
        return
    }
})
