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
import baklava11 from './baklava11.jpg';
import baklava12 from './baklava12.jpg';
import baklava13 from './baklava13.jpg';
import baklava14 from './baklava14.jpg';
import baklava15 from './baklava15.jpg';
import baklava16 from './baklava16.jpg';
import baklava17 from './baklava17.jpg';
import baklava18 from './baklava18.jpg';
import baklava19 from './baklava19.jpg';
import baklava20 from './baklava20.jpg';

import dessertsImg from './desserts.jpg';
import hotImg from './hot.jpg';
import coldImg from './cold.jpg';
import instaIcon from './instagram.png';

function App() {
  // ---------- menu state ----------
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [checkmarkVisibleKey, setCheckmarkVisibleKey] = useState(null);
  const [followsInstagram, setFollowsInstagram] = useState(false);

  // ---------- track state ----------
  const [mode, setMode] = useState('menu');        // 'menu' | 'track'
  const [trackPhone, setTrackPhone] = useState('');
  const [trackOrder, setTrackOrder] = useState('');
  const [trackStatus, setTrackStatus] = useState(null);
  const [trackErr , setTrackErr ] = useState(null);

  // ---------- helpers ----------
  const addBaklava = (name, unitPrice, qtyKey) => {
    const quantity = parseInt(quantities[qtyKey] || '1', 10);
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

  // ---------- submit order ----------
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
        const data = await response.json();
        const orderId = data.order_id;

        // reset menu state
        setOrder([]); setName(''); setPhone(''); setTableNumber(''); setFollowsInstagram(false); setSelectedCategory(null);

        // switch to track mode with auto-filled fields
        setTrackPhone(phone);
        setTrackOrder(orderId.toString());
        setMode('track');
        fetchStatus(phone, orderId);   // immediate status fetch
      } else {
        alert("אירעה שגיאה בשליחת ההזמנה.");
      }
    } catch (error) {
      console.error("שגיאה בשליחה:", error);
    }
  };

  // ---------- fetch status helper ----------
  const fetchStatus = async (ph, ord) => {
    if (!ph) { setTrackErr('יש להזין טלפון'); return; }
    try {
      const params = new URLSearchParams({ phone: ph });
      if (ord) params.append('order', ord);
      const res = await fetch(`https://cafe-production.up.railway.app/order-status?${params}`);
      if (res.ok) {
        const data = await res.json();
        setTrackStatus(data.status);
        setTrackErr(null);
      } else {
        setTrackStatus(null);
        setTrackErr('לא נמצאה הזמנה');
      }
    } catch (e) {
      console.error(e);
      setTrackStatus(null);
      setTrackErr('שגיאת שרת');
    }
  };

  // ---------- UI: track mode ----------
  if (mode === 'track') {
    return (
      <div className="container">
        <h1>מעקב הזמנה</h1>

        <input
          type="text"
          placeholder="מס’ טלפון"
          value={trackPhone}
          onChange={e => setTrackPhone(e.target.value)}
        />
        <button className="submit-button" onClick={() => fetchStatus(trackPhone, trackOrder)}>
          בדוק
        </button>

        {trackStatus && (
          <p style={{fontSize:'1.2rem', marginTop:'1rem'}}>
            סטטוס: <b>{trackStatus === 'completed' ? 'מוכן ✅' : 'בהכנה 🍰'}</b>
          </p>
        )}
        {trackErr && <p style={{color:'red'}}>{trackErr}</p>}

        <hr/>
        <button className="fancy-btn" onClick={() => { setMode('menu'); setTrackStatus(null); setTrackErr(null); }}>
          הזמן עוד
        </button>
      </div>
    );
  }

  // ---------- UI: menu mode ----------
  return (
    <div className="container">
      <h1>תפריט</h1>

      {/* כפתור מעבר למסך מעקב */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
      <button className="fancy-btn" onClick={() => setMode('track')}>
        בדיקת הזמנה קיימת
      </button>
      </div>

      {!selectedCategory && (
        <div className="category-grid">
          {/* קטגוריות כבעבר */}
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

      {/* ... שאר קוד התפריט (בקלאווה, הזמנה נוכחית וכו') נשאר ללא שינוי ... */}

      {selectedCategory === 'baklava' && (
        <>
          <button className="fancy-btn" onClick={() => setSelectedCategory(null)}>חזור</button>
          <div className="menu">
            {/* מערך הבקלאוות ... */}
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
                        /* ----------- NEW ITEMS ----------- */
              { img: baklava11, name:'אצבעות חלבי טורקי',            price:5 , key:'q11'},
              { img: baklava12, name:'בקלאווה בוטנים',              price:4 , key:'q12'},
              { img: baklava13, name:'בקלאווה קשיו',                price:3 , key:'q13'},
              { img: baklava14, name:'אגוזים עם קרם',               price:5 , key:'q14'},
              { img: baklava15, name:'בקלאווה פקאן טורקי',          price:5 , key:'q15'},
              { img: baklava16, name:'פקאן טורקי עם קרם וניל',       price:5 , key:'q16'},
              { img: baklava17, name:'אצבעות קוקוס',                price:4 , key:'q17'},
              { img: baklava18, name:'פיסטוק עם קרם וניל',          price:5 , key:'q18'},
              { img: baklava19, name:'בקלאווה בהג׳ה (פיסטוק חלבי + שוקולד ברוטב חלב)', price:18, key:'q19'},
              { img: baklava20, name:'צלחת משקל בקלאוות – קטן',      price:20, key:'q20'}
         
            ].map(({ img, name, price, key }) => (
              <div className="menu-item" key={key}>
                <img src={img} alt={name} />
                <p>{name} - ₪{price} {['q7','q8','q9','q10'].includes(key) ? '' : 'ליחידה'}</p>
                {!['q7','q8','q9','q10'].includes(key) && (
                  <input
                    type="number" min="1" placeholder="כמות"
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

      {/* הזמנה נוכחית וכו' – כבקוד שלך, ללא שינוי */}
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
              ? (order.reduce((s, it) => s + it.price, 0) * 0.95).toFixed(2)
              : order.reduce((s, it) => s + it.price, 0).toFixed(2)}
            {followsInstagram && <span style={{ color: 'green' }}> (5% הנחה)</span>}
          </p>

          {/* אינסטגרם וצ׳קים – אותו דבר */}
          <div style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}>
          <label style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row-reverse',
            gap: '10px',
            fontSize: '1.1rem'
          }}>
            <input
              type="checkbox"
              checked={followsInstagram}
              onChange={() => setFollowsInstagram(!followsInstagram)}
              style={{ width: 20, height: 20 }}
            />
            <span>
              עקבתי אחרי&nbsp;
              <a href="https://www.instagram.com/yosef.sweets_conditory" target="_blank" rel="noopener noreferrer">
                <img src={instaIcon} alt="Instagram" style={{ width: 22, height: 22, verticalAlign: 'middle' }} />
              </a>
              &nbsp;ומגיע לי 5% הנחה 🎉
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