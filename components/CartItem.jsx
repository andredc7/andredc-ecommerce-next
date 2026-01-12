'use client';

import { updateCartItemQuantity, removeFromCart } from '../lib/cart';

export default function CartItem({ item, onUpdate }) {
  const handleQuantityChange = (newQty) => {
    if (newQty <= 0) {
      removeFromCart(item.id);
    } else {
      updateCartItemQuantity(item.id, newQty);
    }
    onUpdate();
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    onUpdate();
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />
      <div style={{flex: 1}}>
        <h3>{item.name}</h3>
        <p className="price">Rp {item.price.toLocaleString()}</p>
        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px'}}>
          <button
            onClick={() => handleQuantityChange(item.qty - 1)}
            style={{width: '30px', height: '30px', border: 'none', background: '#eee', borderRadius: '4px', cursor: 'pointer'}}
          >
            –
          </button>
          <span>{item.qty}</span>
          <button
            onClick={() => handleQuantityChange(item.qty + 1)}
            style={{width: '30px', height: '30px', border: 'none', background: '#eee', borderRadius: '4px', cursor: 'pointer'}}
          >
            +
          </button>
          <button
            onClick={handleRemove}
            style={{marginLeft: 'auto', background: '#dc3545', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer'}}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}