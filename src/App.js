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

import dessertsImg from './desserts.jpg';
import hotImg from './hot.jpg';
import coldImg from './cold.jpg';
import instaIcon from './instagram.png';

function App() {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [checkmarkVisibleKey, setCheckmarkVisibleKey] = useState(null);
  const [followsInstagram, setFollowsInstagram] = useState(false);

  const addBaklava = (name, unitPrice, qtyKey) => {
    const quantity = parseInt(quantities[qtyKey] || '1');
    if (isNaN(quantity) || quantity < 1) {
      alert('כמות לא תקינה');
      return;
    }
    setOrder([...order, { item: name, extras: [], price: unitPrice * quantity, quantity }]);
    setCheckmarkVisibleKey(qtyKey);
    setTimeout(() => setCheckmarkVisibleKey(null), 1000);
    setQuantities(prev => ({ ...prev, [qtyKey]: '' }));
  };

  const removeItem = (index) => {
    const newOrder = [...order];
    newOrder.splice(index, 1);
    setOrder(newOrder);
  };

  const handleSubmit = async () => {
    if (!name || !phone || !tableNumber || order.length === 0) {
      alert("אנא מלא שם, טלפון, מספר שולחן והוסף לפחות פריט אחד.");
      return;
    }
    const rawTotal = order.reduce((sum, item) => sum + item.price, 0);
    const total = (followsInstagram ? rawTotal * 0.95 : rawTotal).toFixed(2);
    const orderData = { name, phone, table: tableNumber, items: order, total };
    try {
      const response = await fetch('https://cafe-production.up.railway.app/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      if (response.ok) {
        alert("ההזמנה נשלחה בהצלחה!");
        setOrder([]);
        setName('');
        setPhone('');
        setTableNumber('');
        setFollowsInstagram(false);
      } else {
        alert("אירעה שגיאה בשליחת ההזמנה.");
      }
    } catch (error) {
      console.error("שגיאה בשליחה:", error);
    }
  };

  return (
    <div className="container">
      <h1>תפריט</h1>

      {!selectedCategory && (
        <div className="category-grid">
          <div className="category-box" onClick={() => setSelectedCategory('desserts')}>
            <h3 className="category-title">קינוחים</h3>
            <img src={dessertsImg} alt="קינוחים" />
          </div>
          <div className="category-box" onClick={() => setSelectedCategory('hot')}>
            <h3 className="category-title">שתיה חמה</h3>
            <img src={hotImg} alt="שתיה חמה" />
          </div>
          <div className="category-box" onClick={() => setSelectedCategory('cold')}>
            <h3 className="category-title">שתיה קרה</h3>
            <img src={coldImg} alt="שתיה קרה" />
          </div>
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
            {[{ img: baklava1, name: 'קולאג\' אגוזי המלך', price: 4, key: 'q1' },
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
        <h2>הזמנה נוכחית</h2>
        <div className="order-summary">
          <ul>
            {order.map((item, index) => (
              <li key={index}>
                {item.item} - ₪{item.price}
                <button className="remove-button" onClick={() => removeItem(index)}>מחק</button>
              </li>
            ))}
          </ul>
          <p>
            <strong>סה"כ:</strong> ₪
            {followsInstagram
              ? (order.reduce((sum, item) => sum + item.price, 0) * 0.95).toFixed(2)
              : order.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
            {followsInstagram && <span style={{ color: 'green' }}> (5% הנחה)</span>}
          </p>

          <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'flex-end' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'row-reverse',
              textAlign: 'right',
              gap: '8px',
              flexWrap: 'wrap',
              maxWidth: '100%'
            }}>
              <input
                type="checkbox"
                checked={followsInstagram}
                onChange={() => setFollowsInstagram(!followsInstagram)}
                style={{ marginTop: '4px' }}
              />
              <span>
                עקבתי אחרי <a href="https://www.instagram.com/yosef.sweets_conditory?utm_source=ig_web_button_share_sheet&igsh=MWQ2ODFnZzMxc3I1Zw==" target="_blank" rel="noopener noreferrer">
                  <img src={instaIcon} alt="Instagram" style={{ width: '22px', height: '22px', verticalAlign: 'middle' }} />
                </a> ומגיע לי 5% הנחה 🎉
              </span>
            </label>
          </div>

          <input type="text" placeholder="שם" value={name} onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="טלפון" value={phone} onChange={e => setPhone(e.target.value)} />
          <input type="text" placeholder="מספר שולחן או כתובת משלוח" value={tableNumber} onChange={e => setTableNumber(e.target.value)} />
          <button className="submit-button" onClick={handleSubmit}>שלח הזמנה</button>
        </div>
      </div>
    </div>
  );
}

export default App;
