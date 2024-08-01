
//=================buttons=========================
const OrderID = document.querySelector('.Order_ID');

const BuragerBtn = document.getElementById('Burgers-btn');
const SubmarinesBtn = document.getElementById('Submarines-btn');
const FriesBtn = document.getElementById('Fries-btn');
const PastaBtn = document.getElementById('Pasta-btn');
const ChickenBtn = document.getElementById('Chicken-btn');
const Beavaragebtn = document.getElementById('Beavarage-btn');

const containerproduct = document.querySelector('.js-products-pos-section');

let productListArray = JSON.parse(localStorage.getItem('ProductList')) || [];


function showProduct(startIndex, endIndex) {
    let Producthtml = '';
    for (let index = startIndex; index < endIndex; index++) {
        if (productListArray[index]) {
            const element = productListArray[index];
            Producthtml += `
                <div class="container-card">
                    <div class="card m-3" style="width: 12rem;">
                        <img src="${element.image}" class="card-img-top" alt="">
                        <div class="card-body">
                            <p class="card-text">${element.itemName}</p>
                            <p class="card-text">Price &nbsp;&nbsp;&nbsp;&nbsp;Rs.${element.price}</p>
                            <button class="Add-Order-btn" data-index="${index}">ADD</button>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    containerproduct.innerHTML = Producthtml;
}

window.addEventListener('load',()=>{
    showProduct(0, 10);

    
}) 


//=================show products
BuragerBtn.addEventListener('click', () => {
    showProduct(0, 14);
    BuragerBtn.disabled = true;
    SubmarinesBtn.disabled = false;
    FriesBtn.disabled = false;
    PastaBtn.disabled = false;
    ChickenBtn.disabled = false;
    Beavaragebtn.disabled = false;
});

SubmarinesBtn.addEventListener('click', () => {
    showProduct(14, 23);
    BuragerBtn.disabled = false;
    SubmarinesBtn.disabled = true;
    FriesBtn.disabled = false;
    PastaBtn.disabled = false;
    ChickenBtn.disabled = false;
    Beavaragebtn.disabled = false;
});

FriesBtn.addEventListener('click', () => {
    showProduct(23, 29);
    BuragerBtn.disabled = false;
    SubmarinesBtn.disabled = false;
    FriesBtn.disabled = true;
    PastaBtn.disabled = false;
    ChickenBtn.disabled = false;
    Beavaragebtn.disabled = false;
});

PastaBtn.addEventListener('click', () => {
    showProduct(29, 36);
    BuragerBtn.disabled = false;
    SubmarinesBtn.disabled = false;
    FriesBtn.disabled = false;
    PastaBtn.disabled = true;
    ChickenBtn.disabled = false;
    Beavaragebtn.disabled = false;
});

ChickenBtn.addEventListener('click', () => {
    showProduct(36, 42);
    BuragerBtn.disabled = false;
    SubmarinesBtn.disabled = false;
    FriesBtn.disabled = false;
    PastaBtn.disabled = false;
    ChickenBtn.disabled = true;
    Beavaragebtn.disabled = false;
});

Beavaragebtn.addEventListener('click', () => {
    showProduct(42, 46);
    BuragerBtn.disabled = false;
    SubmarinesBtn.disabled = false;
    FriesBtn.disabled = false;
    PastaBtn.disabled = false;
    ChickenBtn.disabled = false;
    Beavaragebtn.disabled = true;
});




function Addproduct(event) {
    const button = event.target;
    const itemId = button.getAttribute('data-index');
    const product = productListArray[itemId];

    if (product) {
        Cart.push({ ...product, qty: 1 });
        console.log('Product added:', product);
        setLocalstorage();
        updateTable();
    }
}

containerproduct.addEventListener('click', event => {
    if (event.target.classList.contains('Add-Order-btn')) {
        Addproduct(event);
    }
});










//================local Storage cart==========================
let Cart = JSON.parse(localStorage.getItem('CartList')) || [];

function setLocalstorage() {
    localStorage.setItem('CartList', JSON.stringify(Cart));
}

const tableBody = document.querySelector('.T-body');

function updateTable() {
    let tableHtml = `
    <thead>
        <tr>
            <th></th>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Price</th>
        </tr>
    </thead>
    `;

    Cart.forEach((element, index) => {

        tableHtml += `
                <tr data-index=${index}>
                    <td><img src="asset/icons-cancel.png" alt="" class="remove-icon"> &nbsp;&nbsp;</td>
                    <td class="d-flex flex-column">
                            ${element.itemName}
                          <input type="text" style="width: 180px;" class="additional-items" placeholder="Add more things">
                    </td>
                    <td> <input type="number" min="1" style="width: 40px;" class="Count-product" value="${element.qty}"></td>
                    <td>Rs.${(element.price * element.qty).toFixed(2)}</td>
                </tr>
            `
    });

    tableBody.innerHTML = tableHtml;


    document.querySelectorAll('.Count-product').forEach(input => {
        input.addEventListener('input', updateCart);
    });


    document.querySelectorAll('.remove-icon').forEach(button => {
        button.addEventListener('click', Delete);
    });
}

function updateCart(event) {
    const input = event.target;
    const rowIndex = input.closest('tr').getAttribute('data-index');
    const quantity = parseInt(input.value, 10);

    if (Cart[rowIndex]) {
        Cart[rowIndex].qty = quantity;
        setLocalstorage();
        updateTable();
    }
}

function Delete(event) {
    const button = event.target;
    const index = button.closest('tr').getAttribute('data-index');

    Cart.splice(index, 1);
    setLocalstorage();
    updateTable();
}

//=======================calculate total===========================
function calculateTotals() {
    let Total = 0;
    let Discount = 0;
    let SubTotal = 0;

    Cart.forEach((product) => {
        Total += product.price * product.qty;
        if (product.Discount != 0) {
            Discount += (product.price * product.qty * (product.Discount / 100));
        }
    });

    SubTotal = Total - Discount;

    const discounthtml = document.getElementById('discount-amount');
    const Totalhtml = document.getElementById('Total-amount');
    const SubTotalhtml = document.getElementById('SubTotal-amount');

    discounthtml.innerText = Discount.toFixed(2);
    Totalhtml.innerText = Total.toFixed(2);
    SubTotalhtml.innerText = SubTotal.toFixed(2);
}

updateTable();
calculateTotals();

//=================make Order=========================

// Function to get and increment the order ID
function getNextOrderId() {
    let orderIdCounter = parseInt(localStorage.getItem('OrderIdCounter'), 10) || 0;
    orderIdCounter++;
    localStorage.setItem('OrderIdCounter', orderIdCounter);
    return `OR${orderIdCounter.toString().padStart(4, '0')}`;
}
const printOrderID = document.querySelector('.Order-disply-ID');

printOrderID.innerHTML = getNextOrderId();


const printBillBtn = document.querySelector('.print-the-bill');

function printBill() {

    const order = {

        OrderID: getNextOrderId(),
        date:date(),
        time:Time(),
        items: Cart.map(item => ({
            itemName: item.itemName,
            qty: item.qty,
            price: item.price,
            totalPrice: (item.price * item.qty).toFixed(2)
        })),
        total: calculateTotal().toFixed(2),
        discount: calculateDiscount().toFixed(2),
        subtotal: calculateSubtotal().toFixed(2)
    };

    if (order) {
        alert('empty')
        return;
    }

    const orders = JSON.parse(localStorage.getItem('Orders')) || [];
    orders.push(order);
    localStorage.setItem('Orders', JSON.stringify(orders));

    Cart = [];
    setLocalstorage();
    updateTable();
    calculateTotals();

    console.log('Order saved:', order);
}

function calculateTotal() {
    return Cart.reduce((total, item) => total + (item.price * item.qty), 0);
}
function calculateDiscount() {
    return Cart.reduce((discount, item) => discount + (item.price * item.qty * (item.Discount || 0) / 100), 0);
}
function calculateSubtotal() {
    return calculateTotal() - calculateDiscount();
}

function date() {
    const currentDate = new Date().toJSON().slice(0, 10);;
    return currentDate;
}


function Time() {
    const currentTime = new Date();

    return currentTime.getHours()+`:`+currentTime.getMinutes()+`:`+currentTime.getSeconds();

}

printBillBtn.addEventListener('click',()=>{
    
    printBill();
});