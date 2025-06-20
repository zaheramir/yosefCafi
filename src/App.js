import React, { useState } from 'react';
import './App.css';

import baklava from './baklava.jpg';
import baklava1 from './baklava1.jpg';
import baklava2 from './baklava2.jpg';
import baklava3 from './baklava3.jpg';
import baklava4 from './baklava4.jpg';
import baklava5 from './baklava5.jpg';
import baklava6 from './baklava6.jpg';
import baklava7 from './baklava7.jpg';
import baklava8 from './baklava8.jpg';
import baklava9 from './baklava9.jpg';
import baklava10 from './baklava10.jpg';

function App() {
  const [order, setOrder] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [checkmarkVisibleKey, setCheckmarkVisibleKey] = useState(null);

  const addBaklava = (name, unitPrice, qtyKey) => {
    const quantity = parseInt(quantities[qtyKey] || '1');
    if (isNaN(quantity) || quantity < 1) {
      alert('כמות לא תקינה');
      return;
    }
    setOrder([...order, { item: name, extras: [], price: unitPrice * quantity, quantity }]);
    setCheckmarkVisibleKey(qtyKey);
    setTimeout(() => setCheckmarkVisibleKey(null), 1000);
  };

  const removeItem = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  return (
    <div className="container">
      <h1>תפריט</h1>

      {!selectedCategory && (
        <div className="category-grid">
          <div className="category-box" onClick={() => setSelectedCategory('baklava')}>
            <h3 className="category-title">בקלאווה</h3>
            <img src={baklava} alt="בקלאווה" />
          </div>
        </div>
      )}

      {selectedCategory === 'baklava' && (
        <>
          <button className="back-button" onClick={() => setSelectedCategory(null)}>חזור</button>
          <div className="menu">
            {[
              { img: baklava1, name: 'קולאג\' אגוזי המלך', price: 4, key: 'q1' },
              { img: baklava2, name: 'בקלאווה פיסטוק טורקי', price: 6, key: 'q2' },
              { img: baklava3, name: 'בקלאווה פיסטוק', price: 5, key: 'q3' },
              { img: baklava4, name: 'בקלאווה משולש פיסטוק', price: 5, key: 'q4' },
              { img: baklava5, name: 'בקלאווה פקאן טורקי', price: 5, key: 'q5' },
              { img: baklava6, name: 'אצבעות בקלאווה פקאן', price: 5, key: 'q6' },
              { img: baklava7, name: 'אצבעות בקלאווה במילוי קרם וניל', price: 15, key: 'q7' },
              { img: baklava8, name: 'פטיר בצלחת', price: 20, key: 'q8' },
              { img: baklava9, name: 'בקלאווה טורקית', price: 20, key: 'q9' },
              { img: baklava10, name: 'בקלאווה טורקית עם גלידה', price: 32, key: 'q10' }
            ].map(({ img, name, price, key }) => (
              <div className="menu-item" key={key}>
                <img src={img} alt={name} />
                <p>{name} - ₪{price} {['q7','q8','q9','q10'].includes(key) ? '' : 'ליחידה'}</p>
                {!['q7','q8','q9','q10'].includes(key) && (
                  <input
                    type="number"
                    placeholder="כמות"
                    min="1"
                    value={quantities[key] || ''}
                    onChange={e => setQuantities({ ...quantities, [key]: e.target.value })}
                  />
                )}
                <div style={{ position: 'relative' }}>
                  <button className="add-button" onClick={() => addBaklava(name, price, key)}>+</button>
                  {checkmarkVisibleKey === key && <div className="checkmark-on-button">✓</div>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="order-section">
        <h2>הזמנה</h2>
        <ul>
          {order.map((item, index) => (
            <li key={index}>
              {item.item} - ₪{item.price} ({item.quantity} יח')
              <button className="remove-button" onClick={() => removeItem(index)}>מחק</button>
            </li>
          ))}
        </ul>
        <p><strong>סה"כ:</strong> ₪{order.reduce((sum, item) => sum + item.price, 0)}</p>
      </div>
    </div>
  );
}

export default App;
