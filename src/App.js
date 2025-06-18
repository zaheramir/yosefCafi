import React, { useState } from 'react';
import './App.css';

import baklavaImg from './baklava.jpg';
import tirlitsiImg from './tresleches.jpg';
import kanafeImg from './kanafe.jpg';

import dessertsImg from './desserts.jpg';
import hotImg from './hot.jpg';
import coldImg from './cold.jpg';
import orangeJuiceImg from './orangejuice.jpg';


function App() {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [showExtraPopup, setShowExtraPopup] = useState(null);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addItem = (itemName, basePrice, extraOptions = [], extraPriceMap = {}, requiredSingle = false) => {
    if (extraOptions.length === 0) {
      const newItem = { item: itemName, extras: [], price: basePrice };
      setOrder([...order, newItem]);
    } else {
      setShowExtraPopup({ itemName, basePrice, extraOptions, extraPriceMap, requiredSingle });
      setSelectedExtras([]);
    }
  };

  const confirmExtras = () => {
    if (showExtraPopup.requiredSingle && selectedExtras.length !== 1) {
      alert("יש לבחור בדיוק אפשרות אחת");
      return;
    }

    const extraPrice = selectedExtras.reduce((sum, extra) => {
      return sum + (showExtraPopup.extraPriceMap[extra] || 0);
    }, 0);

    const newItem = {
      item: showExtraPopup.itemName,
      extras: selectedExtras,
      price: showExtraPopup.basePrice + extraPrice
    };

    setOrder([...order, newItem]);
    setShowExtraPopup(null);
    setSelectedExtras([]);
  };

  const toggleExtra = (extra) => {
    if (showExtraPopup.requiredSingle) {
      setSelectedExtras([extra]);
    } else {
      if (selectedExtras.includes(extra)) {
        setSelectedExtras(selectedExtras.filter(e => e !== extra));
      } else {
        setSelectedExtras([...selectedExtras, extra]);
      }
    }
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

    const total = order.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    const orderData = {
      name,
      phone,
      table: tableNumber,
      items: order,
      total
    };

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
        </div>
      )}

      {selectedCategory && (
        <button className="back-button" onClick={() => setSelectedCategory(null)}>חזור לתפריט ראשי</button>
      )}

      {selectedCategory === 'desserts' && (
        <div className="menu">
          <div className="menu-item">
            <img src={baklavaImg} alt="Baklava" />
            <p>משולש בקלאווה טורקית - ₪20</p>
            <button className="add-button" onClick={() =>
              addItem("משולש בקלאווה טורקית", 20, ["גלידה"], { "גלידה": 12 })
            }>+</button>
          </div>

          <div className="menu-item">
            <img src={tirlitsiImg} alt="Tirlitsi" />
            <p>טירליצ'י אישית - ₪20</p>
            <button className="add-button" onClick={() =>
              addItem("טירליצ'י אישית", 20, ["תות", "קרמל", "פיסטוק"], {}, true)
            }>+</button>
          </div>

          <div className="menu-item">
            <img src={kanafeImg} alt="Kanafe" />
            <p>כנאפה אישית - ₪20</p>
            <button className="add-button" onClick={() =>
              addItem("כנאפה אישית", 20, ["גלידה"], { "גלידה": 5 })
            }>+</button>
          </div>
        </div>
      )}

      {selectedCategory === 'cold' && (
        <div className="menu">
          <div className="menu-item">
            <img src={orangeJuiceImg} alt="תפוזים שחוט" />
            <p>תפוזים שחוט - ₪15</p>
            <button className="add-button" onClick={() =>
              addItem("תפוזים שחוט", 15, ["עם קרח", "בלי קרח"], {}, true)
            }>+</button>
          </div>
        </div>
      )}

      {selectedCategory && selectedCategory !== 'desserts' && selectedCategory !== 'cold' && selectedCategory !== 'hot' && (
        <div className="menu">
          <p>אין פריטים כרגע בקטגוריה זו.</p>
        </div>
      )}

      {showExtraPopup && (
        <div className="pasta-options">
          <h3>בחר תוספות ל{showExtraPopup.itemName}:</h3>
          <div className="checkbox-group">
            {showExtraPopup.extraOptions.map((extra) => (
              <label className="checkbox-item" key={extra}>
                <input
                  type={showExtraPopup.requiredSingle ? "radio" : "checkbox"}
                  checked={selectedExtras.includes(extra)}
                  onChange={() => toggleExtra(extra)}
                />
                {extra} {showExtraPopup.extraPriceMap[extra] ? `(+₪${showExtraPopup.extraPriceMap[extra]})` : ''}
              </label>
            ))}
          </div>
          <button className="submit-button" onClick={confirmExtras}>אישור</button>
          <button className="remove-button" onClick={() => setShowExtraPopup(null)}>ביטול</button>
        </div>
      )}

      <div className="order-section">
        <h2>הזמנה נוכחית</h2>
        <div className="order-summary">
          <ul>
            {order.map((item, index) => (
              <li key={index}>
                {item.item} {item.extras.length > 0 ? `עם ${item.extras.join(', ')}` : 'ללא תוספות'} - ₪{item.price}
                <button className="remove-button" onClick={() => removeItem(index)}>מחק</button>
              </li>
            ))}
          </ul>
          <p><strong>סה"כ:</strong> ₪{order.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
          <input
            type="text"
            placeholder="שם"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="טלפון"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="מספר שולחן"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
          />
          <button className="submit-button" onClick={handleSubmit}>שלח הזמנה</button>
        </div>
      </div>
    </div>
  );
}

export default App;
