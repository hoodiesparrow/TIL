let shoppingCart = []
let shoppingCartTotal = 0

function addItem({ name, price, cart }) {
  let newCart = cart.slice() // 인자를 통해 받고 객체를 복사 - Copy On Write, cart를 직접 수정한다면 같은 전역변수가 수정됨.
  newCart.push({ name, price })
  return newCart
}

function addItemToCart({ name, price }) {
  shoppingCart = addItem({ name, price, cart: shoppingCart }) // 암묵적 입출력 제거
  calcCartTotal()
}

function calcTotal(cart) {
  let total = 0
  for (let i = 0; i < cart.length; i += 1) {
    const item = cart[i]
    total += item.price
  }
  return total
}

function calcCartTotal() {
  shoppingCartTotal = calcTotal(shoppingCart)
  setCartTotalDom()
  updateShippingIcons()
  updateTaxDom()
}

function updateShippingIcons() {
  const buyBtns = getBuyBtnsDom()
  for (let i = 0; i < buyBtns.length; i += 1) {
    const btn = buyBtns[i]
    const item = button.item
    if (item.price + shoppingCartTotal >= 20) {
      btn.showFreeShippingIcon()
    } else {
      btn.hideFreeShippingIcon()
    }
  }
}

function updateTaxDom() {
  setTaxDom(shoppingCartTotal * 0.1)
}