let shoppingCart = []
let shoppingCartTotal = 0

function addItemToCard({ name, price }) {
  shoppingCart.push({
    name,
    price,
  })
  calcCartTotal()
}

function calcCartTotal() {
  shoppingCartTotal = 0
  for (let i = 0; i < shoppingCart.length; i += 1) {
    const item = shoppingCart[i]
    shoppingCartTotal += item.price
  }
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