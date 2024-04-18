import React from 'react'

function CartProduct({item}) {

    const deleteProduct = async(e)=>{
        const newCart = []
        const cart = JSON.parse(localStorage.getItem("cart"))
        for (let i=0; i<cart.length; i++){
          if (cart[i].id != item.id){
            newCart.push(cart[i])
          }else{
            console.log('found')
          }
        }
        localStorage.setItem("cart", JSON.stringify(newCart))
      }

  return (
    <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />
              <p>{item.name}</p>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={deleteProduct}>Delete From Cart</button>
            </div>
  )
}

export default CartProduct