/* src/App.js */
import React, { useState } from 'react';
import './App.css';

/* ───────────– baklava images –─────────── */
import baklava       from './baklava.jpg';
import baklava1      from './baklava1.jpg';
import baklava2      from './baklava2.jpg';
import baklava3      from './baklava3.jpg';
import baklava4      from './baklava4.jpg';
import baklava5      from './baklava5.jpg';
import baklava6      from './baklava6.jpg';
import baklava7      from './baklava7.jpg';
import baklava8      from './baklava8.jpg';
import baklava9      from './baklava9.jpg';
import baklava10     from './baklava10.jpg';
import baklava11     from './baklava11.jpg';
import baklava12     from './baklava12.jpg';
import baklava13     from './baklava13.jpg';
import baklava14     from './baklava14.jpg';
import baklava15     from './baklava15.jpg';
import baklava16     from './baklava16.jpg';
import baklava17     from './baklava17.jpg';
import baklava18     from './baklava18.jpg';
import baklava19     from './baklava19.jpg';
import baklava20     from './baklava20.jpg';

/* ───────────– knafe images –───────────── */
import knafeThumb    from './knafe.jpg';
import knafe1        from './knafe1.jpg';
import knafe2        from './knafe2.jpg';
import knafe3        from './knafe3.jpg';
import knafe4        from './knafe4.jpg';
import knafe5        from './knafe5.jpg';
import knafe6        from './knafe6.jpg';
import knafe7        from './knafe7.jpg';
import knafe8        from './knafe8.jpg';
import knafe9        from './knafe9.jpg';
import knafe10       from './knafe10.jpg';
import knafe11       from './knafe11.jpg';

/* ───────────– cold-dessert images –────── */
import coldThumb     from './cold.jpg';   // category thumbnail
import cold1         from './cold1.jpg';
import cold2         from './cold2.jpg';
import cold3         from './cold3.jpg';
import cold4         from './cold4.jpg';
import cold5         from './cold5.jpg';
import cold6         from './cold6.jpg';
import cold7         from './cold7.jpg';
import cold8         from './cold8.jpg';
import cold9         from './cold9.jpg';
import cold10        from './cold10.jpg';
import cold11        from './cold11.jpg';

/* ───────────– misc thumbnails –────────── */
import dessertsThumb from './desserts.jpg';
import hotThumb      from './hot.jpg';
import drinksThumb   from './cold.jpg';   // thumbnail for cold drinks
import instaIcon     from './instagram.png';

/* ========================================================= */

function App() {
  /* ─── ordering state ─── */
  const [order,  setOrder]   = useState([]);
  const [name,   setName]    = useState('');
  const [phone,  setPhone]   = useState('');
  const [table,  setTable]   = useState('');
  const [selectedCategory, setSel] = useState(null);

  const [qty,    setQty]     = useState({});
  const [tick,   setTick]    = useState(null);
  const [follow, setFollow]  = useState(false);

  /* ─── tracking state ─── */
  const [mode, setMode]   = useState('menu');  // 'menu' | 'track'
  const [tPhone,  setTPhone]  = useState('');
  const [tOrder,  setTOrder]  = useState('');
  const [tStatus, setStatus]  = useState(null);
  const [tErr,    setTErr]    = useState(null);

  /* ───────────────────────────────────────── helpers ───────────────────────────────────────── */
  const addItem = (itemName, price, key) => {
    const amount = parseInt(qty[key] || '1', 10);
    if (isNaN(amount) || amount < 1) { alert('כמות לא תקינה'); return; }
    setOrder(prev => [...prev, { item: itemName, extras: [], price: price * amount, quantity: amount }]);
    setTick(key);
    setTimeout(() => setTick(null), 900);
    setQty(p => ({ ...p, [key]: '' }));
  };

  const removeItem = idx => setOrder(order.filter((_, i) => i !== idx));

  const rawTotal = order.reduce((s, it) => s + it.price, 0);
  const total    = follow ? (rawTotal * 0.95).toFixed(2) : rawTotal.toFixed(2);

  /* ───────────────────────────────────────── products ───────────────────────────────────────── */
  const baklavas = [
    { img: baklava1 , name:'קולאג׳ אגוזי המלך', price:4 , key:'b1' },
    { img: baklava2 , name:'בקלאווה פיסטוק טורקי', price:6 , key:'b2' },
    { img: baklava3 , name:'בקלאווה פיסטוק', price:5 , key:'b3' },
    { img: baklava4 , name:'בקלאווה משולש פיסטוק', price:5 , key:'b4' },
    { img: baklava5 , name:'בקלאווה פקאן טורקי', price:5 , key:'b5' },
    { img: baklava6 , name:'אצבעות בקלאווה פקאן', price:5 , key:'b6' },
    { img: baklava7 , name:'אצבעות במילוי קרם וניל', price:15, key:'b7', portion:true },
    { img: baklava8 , name:'פטיר בצלחת', price:20, key:'b8', portion:true },
    { img: baklava9 , name:'בקלאווה טורקית', price:20, key:'b9', portion:true },
    { img: baklava10, name:'בקלאווה טורקית עם גלידה', price:32, key:'b10', portion:true },
    { img: baklava11, name:'אצבעות חלבי טורקי', price:5 , key:'b11' },
    { img: baklava12, name:'בקלאווה בוטנים', price:4 , key:'b12' },
    { img: baklava13, name:'בקלאווה קשיו', price:3 , key:'b13' },
    { img: baklava14, name:'אגוזים עם קרם', price:5 , key:'b14' },
    { img: baklava15, name:'בקלאווה פקאן טורקי', price:5 , key:'b15' },
    { img: baklava16, name:'פקאן טורקי עם קרם וניל', price:5 , key:'b16' },
    { img: baklava17, name:'אצבעות קוקוס', price:4 , key:'b17' },
    { img: baklava18, name:'פיסטוק עם קרם וניל', price:5 , key:'b18' },
    { img: baklava19, name:'בקלאווה בהג׳ה', price:18, key:'b19', portion:true,
      desc:'בקלאווה פיסטוק חלבית ושוקולד ברוטב חלב' },
    { img: baklava20, name:'צלחת משקל בקלאוות – קטן',  price:20, key:'b20', portion:true, desc:'~200 גרם' },
    { img: baklava20, name:'צלחת משקל בקלאוות – בינוני',price:30, key:'b21', portion:true, desc:'~300 גרם' },
    { img: baklava20, name:'צלחת משקל בקלאוות – גדול',  price:40, key:'b22', portion:true, desc:'~400 גרם' },
  ];

  const knafes = [
    { img:knafe1 ,  name:'כנאפה שטוחה – אישית',  price:20, key:'k1', portion:true },
    { img:knafe2 ,  name:'כנאפה שטוחה – בצלחת', price:15, key:'k2', portion:true },
    { img:knafe3 ,  name:'מברומה',               price:15, key:'k3', portion:true },
    { img:knafe4 ,  name:'כנאפה נאבלסיה – אישית',price:20, key:'k4', portion:true },
    { img:knafe5 ,  name:'כנאפה שאמיה',          price:25, key:'k5', portion:true,
      desc:'בצק קדאיף במילוי גבינה ואגוזים' },
    { img:knafe6 ,  name:'כנאפה ענתאביה',        price:25, key:'k6', portion:true,
      desc:'בצק קדאיף במילוי סחלב ופיסטוק' },
    { img:knafe7 ,  name:'כנאפה קקאו – אישית',   price:20, key:'k7', portion:true },
    { img:knafe8 ,  name:'כנאפה קרה',            price:35, key:'k8', portion:true,
      desc:'שתי שכבות קדאיף, גלידה טורקית ושוקולד' },
    { img:knafe9 ,  name:'כנאפה נועמנים – אישית',price:30, key:'k9', portion:true },
    { img:knafe10,  name:'כנאפה ביתי – מגש קטן', price:70, key:'k10', portion:true,
      desc:'6-8 יחידות להכנה במקום / עצמית' },
    { img:knafe11,  name:'כנאפה ביתי – מגש גדול',price:90, key:'k11', portion:true,
      desc:'10-12 יחידות להכנה במקום / עצמית' },
  ];

  const coldDesserts = [
    { img:cold1 ,  name:'טרליצ׳י – צלחת',  price:12, key:'c1',
      opts:['קרמל','פיסטוק','תות'] },
    { img:cold2 ,  name:'טרליצ׳י – אישית', price:20, key:'c2',
      opts:['קרמל','פיסטוק','תות'] },
    { img:cold3 ,  name:'ליליות בירות',    price:20, key:'c3',
      desc:'סולת מבושלת בחלב + פיסטוק, מי ורדים' },
    { img:cold4 ,  name:'עש אלסראיא',       price:25, key:'c4',
      desc:'קדאיף | סחלב | שמנת + אגוזי פקאן' },
    { img:cold5 ,  name:'פחזניות (3 יח\')', price:15, key:'c5' },
    { img:cold6 ,  name:'כנאפה קרה',        price:35, key:'c6',
      desc:'קדאיף במילוי גלידה טורקית ושוקולד' },
    { img:cold7 ,  name:'טירמיסו – אישית',  price:25, key:'c7',
      desc:'קרם חלבי אוורירי ובישקויטים ספוגי קפה' },
    { img:cold8 ,  name:'גלידה טורקית וניל',price:20, key:'c8',
      desc:'ריבוע אישי' },
    { img:cold9 ,  name:'קרם ברולה – אישית',price:25, key:'c9' },
    { img:cold10,  name:'סולטאג׳',           price:15, key:'c10',
      desc:'מלבי בתוספת אורז' },
    { img:cold11,  name:'עוגת גבינה אפויה – אישית', price:25, key:'c11' },
    { img:cold11,  name:'גליליות קרם וניל (2 יח\')', price:10, key:'c12',
      desc:'רול וופל במילוי שמנת מתוקה' },
  ];

  /* ───────────────────────────── render helper ───────────────────────────── */
  const renderMenu = list => (
    <div className="menu">
      {list.map(({ img, name, price, key, portion, desc, opts }) => (
        <div className="menu-item" key={key}>
          <img src={img} alt={name} />
          <p>{name} – ₪{price}{portion ? '' : ' ליחידה'}</p>
          {desc && <span className="item-desc">{desc}</span>}

          {opts && (
            <select
              className="flavour-select"
              value={qty[`${key}-opt`] || ''}
              onChange={e => setQty({ ...qty, [`${key}-opt`]: e.target.value })}
            >
              <option value="" disabled>טעם</option>
              {opts.map(o => <option key={o}>{o}</option>)}
            </select>
          )}

          {!portion && (
            <input
              type="number"
              min="1"
              placeholder="כמות"
              value={qty[key] || ''}
              onChange={e => setQty({ ...qty, [key]: e.target.value })}
            />
          )}

          <div style={{ position: 'relative' }}>
            <button className="add-button" onClick={() => addItem(name, price, key)}>+</button>
            {tick === key && <div className="checkmark-on-button">✓</div>}
          </div>
        </div>
      ))}
    </div>
  );

  /* ───────────────────────────── submit order ───────────────────────────── */
  const handleSubmit = async () => {
    if (!name || !phone || !table || order.length === 0) {
      alert('אנא מלא שם, טלפון, מספר שולחן והוסף לפחות פריט אחד.');
      return;
    }
    const payload = {
      name,
      phone,
      table,
      items: order,
      total,
    };

    try {
      const res = await fetch('https://cafe-production.up.railway.app/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setOrder([]); setName(''); setPhone(''); setTable('');
        setFollow(false); setSel(null);
        setTPhone(phone); setTOrder(String(data.order_id));
        setMode('track');
        fetchStatus(phone, data.order_id);
      } else { alert('שגיאה בשליחת ההזמנה.'); }
    } catch (e) { console.error(e); alert('שגיאה בשליחת ההזמנה.'); }
  };

  /* ───────────────────────────── fetch-status (tracking) ─────────────────── */
  const fetchStatus = async (ph, ord) => {
    if (!ph) { setTErr('יש להזין טלפון'); return; }
    try {
      const params = new URLSearchParams({ phone: ph });
      if (ord) params.append('order', ord);
      const res = await fetch(`https://cafe-production.up.railway.app/order-status?${params}`);
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status); setTErr(null);
      } else { setStatus(null); setTErr('לא נמצאה הזמנה'); }
    } catch (e) { console.error(e); setStatus(null); setTErr('שגיאת שרת'); }
  };

  /* ───────────────────────────── track view ──────────────────────────────── */
  if (mode === 'track') {
    return (
      <div className="container">
        <h1>מעקב הזמנה</h1>

        <input
          type="text"
          placeholder="מס’ טלפון"
          value={tPhone}
          onChange={e => setTPhone(e.target.value)}
        />
        <button className="submit-button" onClick={() => fetchStatus(tPhone, tOrder)}>
          בדוק
        </button>

        {tStatus && (
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
            סטטוס: <b>{tStatus === 'completed' ? 'מוכן ✅' : 'בהכנה 🍰'}</b>
          </p>
        )}
        {tErr && <p style={{ color: 'red' }}>{tErr}</p>}

        <hr />
        <button className="fancy-btn" onClick={() => { setMode('menu'); setStatus(null); setTErr(null); }}>
          ☕ להזמין שוב
        </button>
      </div>
    );
  }

  /* ───────────────────────────── main menu view ──────────────────────────── */
  return (
    <div className="container">
      <h1>תפריט</h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
        <button className="fancy-btn" onClick={() => setMode('track')}>
          בדיקת הזמנה קיימת
        </button>
      </div>

      {!selectedCategory && (
        <div className="category-grid">
          <div className="category-box" onClick={() => setSel('baklava')}>
            <h3 className="category-title">בקלאווה</h3><img src={baklava} alt="בקלאווה" />
          </div>
          <div className="category-box" onClick={() => setSel('knafe')}>
            <h3 className="category-title">כנאפה</h3><img src={knafeThumb} alt="כנאפה" />
          </div>
          <div className="category-box" onClick={() => setSel('coldDessert')}>
            <h3 className="category-title">מנות קרות</h3><img src={coldThumb} alt="מנות קרות" />
          </div>
          {/* optional future categories: dessertsThumb, hotThumb, drinksThumb */}
        </div>
      )}

      {selectedCategory === 'baklava'   && (<><button className="fancy-btn" onClick={() => setSel(null)}>חזור</button>{renderMenu(baklavas)}</>)}
      {selectedCategory === 'knafe'     && (<><button className="fancy-btn" onClick={() => setSel(null)}>חזור</button>{renderMenu(knafes)}</>)}
      {selectedCategory === 'coldDessert' && (<><button className="fancy-btn" onClick={() => setSel(null)}>חזור</button>{renderMenu(coldDesserts)}</>)}

      {/* ─────────────────────── order-summary box ─────────────────────── */}
      <div className="order-section">
        <h2>הזמנה נוכחית</h2>
        <div className="order-summary">
          <ul>
            {order.map((it, idx) => (
              <li key={idx}>
                {it.item} – ₪{it.price}
                <button className="remove-button" onClick={() => removeItem(idx)}>מחק</button>
              </li>
            ))}
          </ul>

          <p>
            <strong>סה״כ:</strong> ₪{total}
            {follow && <span style={{ color: 'green' }}> (5% הנחה)</span>}
          </p>

          <label className="insta-row">
            <input
              type="checkbox"
              checked={follow}
              onChange={() => setFollow(!follow)}
            />
            <span>
              עקבתי אחרי&nbsp;
              <a href="https://www.instagram.com/yosef.sweets_conditory" target="_blank" rel="noopener noreferrer">
                <img src={instaIcon} alt="Instagram" style={{ width: 22, height: 22, verticalAlign: 'middle' }} />
              </a>
              &nbsp;ומגיע לי 5% הנחה 🎉
            </span>
          </label>

          <input type="text" placeholder="שם"        value={name}  onChange={e => setName(e.target.value)} />
          <input type="text" placeholder="טלפון"      value={phone} onChange={e => setPhone(e.target.value)} />
          <input type="text" placeholder="מס׳ שולחן / כתובת" value={table} onChange={e => setTable(e.target.value)} />
          <button className="submit-button" onClick={handleSubmit}>שלח הזמנה</button>
        </div>
      </div>
    </div>
  );
}

export default App;
