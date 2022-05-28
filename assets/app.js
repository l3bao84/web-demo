// Open form login and register
const openRegister = document.querySelector('.header__navbar-item-user-register')
const openLogin = document.querySelector('.header__navbar-item-user-login')
const openModalRe = document.querySelector('.modal-register')
const openModalLo = document.querySelector('.modal-login')

openRegister.addEventListener('click', () => {
    openModalRe.classList.add('open')
})

openLogin.addEventListener('click', () => {
    openModalLo.classList.add('open')
})


//Close form login and register
const closeModalRe = document.querySelector('.modal-register')
const closeModalLo = document.querySelector('.modal-login')

closeModalRe.addEventListener('click', () => {
    openModalRe.classList.remove('open')
})

closeModalLo.addEventListener('click', () => {
    openModalLo.classList.remove('open')
})

//Stop propagation
const closeModalJSRe = document.querySelector('.modal__body')
closeModalJSRe.addEventListener('click', (event) => {
    event.stopPropagation()
})

const closeModalJSLo = document.querySelector('.modal__body-lo')
closeModalJSLo.addEventListener('click', (event) => {
    event.stopPropagation()
})


//Transform
const transformRegister = document.querySelector('.transform-register')
const transformLogin = document.querySelector('.transform-login')

transformRegister.addEventListener('click', () => {
    openModalLo.classList.remove('open')
    openModalRe.classList.add('open')
})

transformLogin.addEventListener('click', () => {
    openModalRe.classList.remove('open')
    openModalLo.classList.add('open')
})

//Find products
const products = document.querySelector('.products')
const filter = document.getElementById('filter')
const listItems = []

getData()

filter.addEventListener('input', (e) => filterData(e.target.value))

async function getData() {
	const res = await fetch('http://localhost:3000/product')

	const results = await res.json()

	// Clear products
	products.innerHTML = ''

	results.forEach((product) => {
		const div = document.createElement('div')
		div.setAttribute('class', 'product')
		listItems.push(div)

		div.innerHTML = `
			<img src="${product.image}" alt="">
			<div class="product-detail">
				<h4>${product.title.slice(0, 100)}</h4>
				<p>${product.price}k</p>
			</div>
        `

		products.appendChild(div)
	})
}

function filterData(search) {
	listItems.forEach((item) => {
		if (item.innerText.toLowerCase().includes(search.toLowerCase())) {
			item.classList.remove('hide')
		} else {
			item.classList.add('hide')
		}
	})
}