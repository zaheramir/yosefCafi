import React, { useState } from 'react';
import './App.css';

/* ------------ baklava images ------------ */
import baklava from './baklava.jpg';
import baklava1  from './baklava1.jpg';
import baklava2  from './baklava2.jpg';
import baklava3  from './baklava3.jpg';
import baklava4  from './baklava4.jpg';
import baklava5  from './baklava5.jpg';
import baklava6  from './baklava6.jpg';
import baklava7  from './baklava7.jpg';
import baklava8  from './baklava8.jpg';
import baklava9  from './baklava9.jpg';
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

/* ------------ knafe images -------------- */
import knafe      from './knafe.jpg';
import knafe1     from './knafe1.jpg';
import knafe2     from './knafe2.jpg';
import knafe3     from './knafe3.jpg';
import knafe4     from './knafe4.jpg';
import knafe5     from './knafe5.jpg';
import knafe6     from './knafe6.jpg';
import knafe7     from './knafe7.jpg';
import knafe8     from './knafe8.jpg';
import knafe9     from './knafe9.jpg';
import knafe10    from './knafe10.jpg';
import knafe11    from './knafe11.jpg';

import dessertsImg from './desserts.jpg';
import hotImg      from './hot.jpg';
import coldImg     from './cold.jpg';
import instaIcon   from './instagram.png';

function App() {
  /* ---------- menu state ---------- */
  const [order , setOrder]  = useState([]);
  const [name  , setName]   = useState('');
  const [phone , setPhone]  = useState('');
  const [table , setTable]  = useState('');
  const [selectedCategory, setSel] = useState(null);

  const [qty   , setQty]    = useState({});
  const [check , setCheck]  = useState(null);
  const [follow, setFollow] = useState(false);

  /* ---------- track state ---------- */
  const [mode , setMode]   = useState('menu'); // 'menu' | 'track'
  const [tPhone, setTPhone]= useState('');
  const [tOrder, setTOrder]= useState('');
  const [tStatus,setStatus]= useState(null);
  const [tErr  , setTErr]  = useState(null);

  /* ---------- helpers ---------- */
  const addItem = (name, price, key) => {
    const q = parseInt(qty[key] || '1', 10);
    if (isNaN(q) || q < 1) { alert('כמות לא תקינה'); return; }
    setOrder([...order, { item:name, extras:[], price:price*q, quantity:q }]);
    setCheck(key);
    setTimeout(()=>setCheck(null), 1000);
    setQty(p=>({...p,[key]:''}));
  };
  const removeItem = i => setOrder(order.filter((_,idx)=>idx!==i));

  /* ---------- arrays of products ---------- */
  const baklavas = [
    { img: baklava1 , name:'קולאג\' אגוזי המלך', price:4 , key:'b1' },
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
    { img: baklava20, name:'צלחת משקל בקלאוות – קטן', price:20, key:'b20', portion:true, desc:'~200 גרם' },
    { img: baklava20, name:'צלחת משקל בקלאוות – בינוני', price:30, key:'b21', portion:true, desc:'~300 גרם' },
    { img: baklava20, name:'צלחת משקל בקלאוות – גדול', price:40, key:'b22', portion:true, desc:'~400 גרם' },
  ];

  const knafes = [
    { img:knafe1 , name:'כנאפה שטוחה – מנה אישית', price:20, key:'k1', portion:true },
    { img:knafe2 , name:'כנאפה שטוחה – בצלחת',     price:15, key:'k2', portion:true },
    { img:knafe3 , name:'מברומה',                   price:15, key:'k3', portion:true },
    { img:knafe4 , name:'כנאפה נאבלסיה – אישית',   price:20, key:'k4', portion:true },
    { img:knafe5 , name:'כנאפה שאמיה',             price:25, key:'k5', portion:true,
      desc:'בצק קדאיף במילוי גבינה ואגוזים' },
    { img:knafe6 , name:'כנאפה ענתאביה',           price:25, key:'k6', portion:true,
      desc:'בצק קדאיף במילוי סחלב ופיסטוק' },
    { img:knafe7 , name:'כנאפה קקאו – אישית',      price:20, key:'k7', portion:true },
    { img:knafe8 , name:'כנאפה קרה',               price:35, key:'k8', portion:true,
      desc:'שתי שכבות קדאיף, גלידה טורקית ושוקולד' },
    { img:knafe9 , name:'כנאפה נועמנים – אישית',   price:30, key:'k9', portion:true },
    { img:knafe10, name:'כנאפה ביתי – מגש קטן',    price:70, key:'k10', portion:true,
      desc:'6-8 יחידות, להכנה במקום / עצמית' },
    { img:knafe11, name:'כנאפה ביתי – מגש גדול',   price:90, key:'k11', portion:true,
      desc:'10-12 יחידות, להכנה במקום / עצמית' },
  ];

  /* ---------- generic render helper ---------- */
  const renderMenu = list => (
    <div className="menu">
      {list.map(({ img,name,price,key,portion,desc })=>(
        <div className="menu-item" key={key}>
          <img src={img} alt={name}/>
          <p>{name} - ₪{price}{portion?'':' ליחידה'}</p>
          {desc && <span className="item-desc">{desc}</span>}

          {!portion && (
            <input type="number" min="1" placeholder="כמות"
                   value={qty[key]||''}
                   onChange={e=>setQty({...qty,[key]:e.target.value})}/>
          )}

          <div style={{position:'relative'}}>
            <button className="add-button" onClick={()=>addItem(name,price,key)}>+</button>
            {check===key && <div className="checkmark-on-button">✓</div>}
          </div>
        </div>
      ))}
    </div>
  );

  /* =================== UI =================== */
  if (mode==='track'){ /* ... identical to earlier track view ... */ }

  return (
    <div className="container">
      <h1>תפריט</h1>

      <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
        <button className="fancy-btn" onClick={()=>setMode('track')}>
          בדיקת הזמנה קיימת
        </button>
      </div>

      {!selectedCategory && (
        <div className="category-grid">
          <div className="category-box" onClick={()=>setSel('desserts')}>
            <h3 className="category-title">קינוחים</h3><img src={dessertsImg} alt="קינוחים"/>
          </div>
          <div className="category-box" onClick={()=>setSel('hot')}>
            <h3 className="category-title">שתיה חמה</h3><img src={hotImg} alt="שתיה חמה"/>
          </div>
          <div className="category-box" onClick={()=>setSel('cold')}>
            <h3 className="category-title">שתיה קרה</h3><img src={coldImg} alt="שתיה קרה"/>
          </div>
          <div className="category-box" onClick={()=>setSel('baklava')}>
            <h3 className="category-title">בקלאווה</h3><img src={baklava} alt="בקלאווה"/>
          </div>
          <div className="category-box" onClick={()=>setSel('knafe')}>
            <h3 className="category-title">כנאפה</h3><img src={knafe} alt="כנאפה"/>
          </div>
        </div>
      )}

      {selectedCategory==='baklava' && (
        <>
          <button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>
          {renderMenu(baklavas)}
        </>
      )}

      {selectedCategory==='knafe' && (
        <>
          <button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>
          {renderMenu(knafes)}
        </>
      )}

      {/* ---------- order summary (unchanged) ---------- */}
      {/* ... keep exactly the same order summary / Instagram / submit section you had ... */}
    </div>
  );
}

export default App;
