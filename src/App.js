import React, { useState } from 'react';
import './App.css';

/* ---------- Baklava images ---------- */
import baklava          from './baklava.jpg';
import baklava1         from './baklava1.jpg';
import baklava2         from './baklava2.jpg';
import baklava3         from './baklava3.jpg';
import baklava4         from './baklava4.jpg';
import baklava5         from './baklava5.jpg';
import baklava6         from './baklava6.jpg';
import baklava7         from './baklava7.jpg';
import baklava8         from './baklava8.jpg';
import baklava9         from './baklava9.jpg';
import baklava10        from './baklava10.jpg';
import baklava11        from './baklava11.jpg';
import baklava12        from './baklava12.jpg';
import baklava13        from './baklava13.jpg';
import baklava14        from './baklava14.jpg';
import baklava15        from './baklava15.jpg';
import baklava16        from './baklava16.jpg';
import baklava17        from './baklava17.jpg';
import baklava18        from './baklava18.jpg';
import baklava19        from './baklava19.jpg';
import baklava20        from './baklava20.jpg';

/* ---------- Knafe images ------------ */
import knafe            from './knafe.jpg';
import knafe1           from './knafe1.jpg';
import knafe2           from './knafe2.jpg';
import knafe3           from './knafe3.jpg';
import knafe4           from './knafe4.jpg';
import knafe5           from './knafe5.jpg';
import knafe6           from './knafe6.jpg';
import knafe7           from './knafe7.jpg';
import knafe8           from './knafe8.jpg';
import knafe9           from './knafe9.jpg';
import knafe10          from './knafe10.jpg';
import knafe11          from './knafe11.jpg';

/* ---------- Hot-drink images -------- */
import hotCat           from './hot.jpg';   // category tile
import hot1             from './hot1.jpg';
import hot2             from './hot2.jpg';
import hot3             from './hot3.jpg';
import hot4             from './hot4.jpg';
import hot5             from './hot5.jpg';
import hot6             from './hot6.jpg';
import hot7             from './hot7.jpg';
import hot8             from './hot8.jpg';
import hot9             from './hot9.jpg';
import hot10            from './hot10.jpg';
import hot11            from './hot11.jpg';

/* ---------- Misc. category tiles ---- */
import dessertsImg      from './desserts.jpg';
import coldCatImg       from './cold.jpg';      // “מנות קרות” – images/items can be added later
import instaIcon        from './instagram.png';

/* ----------------------------------------------------------------- */
/*                               DATA                                */
/* ----------------------------------------------------------------- */

const baklavas = [
  { img: baklava1 , name:'קולאג\' אגוזי המלך', price:4  , key:'b1'  },
  { img: baklava2 , name:'בקלאווה פיסטוק טורקי', price:6  , key:'b2'  },
  { img: baklava3 , name:'בקלאווה פיסטוק',        price:5  , key:'b3'  },
  { img: baklava4 , name:'בקלאווה משולש פיסטוק',  price:5  , key:'b4'  },
  { img: baklava5 , name:'בקלאווה פקאן טורקי',    price:5  , key:'b5'  },
  { img: baklava6 , name:'אצבעות בקלאווה פקאן',   price:5  , key:'b6'  },
  { img: baklava7 , name:'אצבעות במילוי קרם וניל', price:15 , key:'b7' , portion:true },
  { img: baklava8 , name:'פטיר בצלחת',            price:20 , key:'b8' , portion:true },
  { img: baklava9 , name:'בקלאווה טורקית',        price:20 , key:'b9' , portion:true },
  { img: baklava10, name:'בקלאווה טורקית עם גלידה', price:32, key:'b10', portion:true },
  { img: baklava11, name:'אצבעות חלבי טורקי',     price:5  , key:'b11' },
  { img: baklava12, name:'בקלאווה בוטנים',        price:4  , key:'b12' },
  { img: baklava13, name:'בקלאווה קשיו',          price:3  , key:'b13' },
  { img: baklava14, name:'אגוזים עם קרם',         price:5  , key:'b14' },
  { img: baklava15, name:'בקלאווה פקאן טורקי',    price:5  , key:'b15' },
  { img: baklava16, name:'פקאן טורקי עם קרם וניל', price:5  , key:'b16' },
  { img: baklava17, name:'אצבעות קוקוס',          price:4  , key:'b17' },
  { img: baklava18, name:'פיסטוק עם קרם וניל',    price:5  , key:'b18' },
  { img: baklava19, name:'בקלאווה בהג׳ה',         price:18 , key:'b19', portion:true,
    desc:'בקלאווה פיסטוק חלבית ושוקולד ברוטב חלב' },
  { img: baklava20, name:'צלחת בקלאוות – קטן',    price:20 , key:'b20', portion:true, desc:'~200 גר׳' },
  { img: baklava20, name:'צלחת בקלאוות – בינוני', price:30 , key:'b21', portion:true, desc:'~300 גר׳' },
  { img: baklava20, name:'צלחת בקלאוות – גדול',   price:40 , key:'b22', portion:true, desc:'~400 גר׳' },
];

const knafes = [
  { img:knafe1 , name:'כנאפה שטוחה – אישית',          price:20, key:'k1', portion:true },
  { img:knafe2 , name:'כנאפה שטוחה – בצלחת',          price:15, key:'k2', portion:true },
  { img:knafe3 , name:'מברומה',                        price:15, key:'k3', portion:true },
  { img:knafe4 , name:'כנאפה נאבלסיה – אישית',        price:20, key:'k4', portion:true },
  { img:knafe5 , name:'כנאפה שאמיה',                  price:25, key:'k5', portion:true,
    desc:'בצק קדאיף במילוי גבינה ואגוזים' },
  { img:knafe6 , name:'כנאפה ענתאביה',                price:25, key:'k6', portion:true,
    desc:'בצק קדאיף במילוי סחלב ופיסטוק' },
  { img:knafe7 , name:'כנאפה קקאו – אישית',           price:20, key:'k7', portion:true },
  { img:knafe8 , name:'כנאפה קרה',                    price:35, key:'k8', portion:true,
    desc:'שתי שכבות קדאיף, גלידה טורקית ושוקולד' },
  { img:knafe9 , name:'כנאפה נועמנים – אישית',        price:30, key:'k9', portion:true },
  { img:knafe10, name:'כנאפה ביתי – מגש קטן',         price:70, key:'k10',portion:true,
    desc:'6-8 יחידות להכנה במקום / עצמית' },
  { img:knafe11, name:'כנאפה ביתי – מגש גדול',        price:90, key:'k11',portion:true,
    desc:'10-12 יחידות להכנה במקום / עצמית' },
];

const hotDrinks = [
  { img:hot1 ,  name:'תה טורקי',           price: 6, key:'h1',  portion:true },
  { img:hot2 ,  name:'תה בטעמים',         price: 6, key:'h2',  portion:true },
  { img:hot3 ,  name:'קפה הפוך',          price:10, key:'h3',  portion:true },
  { img:hot4 ,  name:'הפוך גדול',         price:15, key:'h4',  portion:true },
  { img:hot5 ,  name:'אספרסו',            price: 8, key:'h5',  portion:true },
  { img:hot6 ,  name:'אספרסו כפול',       price:12, key:'h6',  portion:true },
  { img:hot7 ,  name:'מקיאטו',            price: 9, key:'h7',  portion:true },
  { img:hot8 ,  name:'אמריקנו',           price:10, key:'h8',  portion:true },
  { img:hot9 ,  name:'שוקו חם',           price:10, key:'h9',  portion:true },
  { img:hot10,  name:'נס קפה',            price:10, key:'h10', portion:true },
  { img:hot11,  name:'קפה קר',            price:15, key:'h11', portion:true },
];

/* ---------- Placeholder for cold dishes (so the button works) -------- */
const coldDishes = [];   // add items later if needed

/* ----------------------------------------------------------------- */
/*                             COMPONENT                             */
/* ----------------------------------------------------------------- */

function App() {
  /* ------------- state ------------- */
  const [order , setOrder]  = useState([]);
  const [name  , setName]   = useState('');
  const [phone , setPhone]  = useState('');
  const [table , setTable]  = useState('');

  const [selectedCategory, setSel] = useState(null);
  const [qty ,  setQty]    = useState({});
  const [tick, setTick]    = useState(null);
  const [follow, setFollow] = useState(false);

  /* ----- track-order view state ---- */
  const [mode , setMode]    = useState('menu');
  const [trackPhone, setTrackPhone] = useState('');
  const [trackStatus, setTrackStatus] = useState(null);
  const [trackErr , setTrackErr ] = useState(null);

  /* ------------- helpers ------------- */
  const addItem = (product) => {
    const q = parseInt(qty[product.key] || '1', 10);
    if (isNaN(q) || q < 1) { alert('כמות לא תקינה'); return; }
    setOrder([...order, { item: product.name, price: product.price * q }]);
    setTick(product.key);
    setTimeout(()=>setTick(null), 700);
    setQty(p=>({...p,[product.key]:''}));
  };

  const removeItem = idx => setOrder(order.filter((_,i)=>i!==idx));

  const totalPrice = () => (
    (order.reduce((s,i)=>s+i.price,0) * (follow ? 0.95 : 1)).toFixed(2)
  );

  /* ------------- render menu list ------------- */
  const renderMenu = (list) => (
    <div className="menu">
      {list.map(item => (
        <div className="menu-item" key={item.key}>
          <img src={item.img} alt={item.name}/>
          <p>{item.name} - ₪{item.price}{item.portion ? '' : ' ליחידה'}</p>
          {item.desc && <span className="item-desc">{item.desc}</span>}

          {!item.portion && (
            <input
              type="number" min="1" placeholder="כמות"
              value={qty[item.key]||''}
              onChange={e=>setQty({...qty,[item.key]:e.target.value})}
            />
          )}

          <div style={{position:'relative'}}>
            <button className="add-button" onClick={()=>addItem(item)}>+</button>
            {tick===item.key && <div className="checkmark-on-button">✓</div>}
          </div>
        </div>
      ))}
    </div>
  );

  /* ---------------- track view ---------------- */
  if (mode === 'track') {
    const fetchStatus = async () => {
      if (!trackPhone.trim()) { setTrackErr('יש להזין טלפון'); return; }
      try {
        const params = new URLSearchParams({ phone: trackPhone });
        const res = await fetch(`https://cafe-production.up.railway.app/order-status?${params}`);
        if (res.ok) {
          const data = await res.json();
          setTrackStatus(data.status);
          setTrackErr(null);
        } else {
          setTrackStatus(null);
          setTrackErr('לא נמצאה הזמנה');
        }
      } catch {
        setTrackStatus(null);
        setTrackErr('שגיאת שרת');
      }
    };

    return (
      <div className="container">
        <h1>מעקב הזמנה</h1>

        <input
          type="text"
          placeholder="מס’ טלפון"
          value={trackPhone}
          onChange={e=>setTrackPhone(e.target.value)}
        />
        <button className="submit-button" onClick={fetchStatus}>בדוק</button>

        {trackStatus &&
          <p style={{fontSize:'1.2rem',marginTop:'1rem'}}>
            סטטוס:&nbsp;
            <b>{trackStatus==='completed' ? 'מוכן ✅' : 'בהכנה 🍰'}</b>
          </p>}
        {trackErr && <p style={{color:'red'}}>{trackErr}</p>}

        <hr/>
        <button className="fancy-btn" onClick={()=>{ setMode('menu'); setTrackStatus(null); setTrackErr(null); }}>
          ☕ להזמין שוב
        </button>
      </div>
    );
  }

  /* ---------------- menu view ---------------- */
  return (
    <div className="container">
      <h1>תפריט</h1>

      <div style={{display:'flex',justifyContent:'center',marginBottom:'1rem'}}>
        <button className="fancy-btn" onClick={()=>setMode('track')}>
          בדיקת הזמנה קיימת
        </button>
      </div>

      {/* ------------- category grid ------------- */}
      {!selectedCategory && (
        <div className="category-grid">
          <div className="category-box" onClick={()=>setSel('desserts')}>
            <h3 className="category-title">קינוחים</h3>
            <img src={dessertsImg} alt="קינוחים"/>
          </div>

          <div className="category-box" onClick={()=>setSel('hotDrinks')}>
            <h3 className="category-title">משקאות חמים</h3>
            <img src={hotCat} alt="חמים"/>
          </div>

          <div className="category-box" onClick={()=>setSel('cold')}>
            <h3 className="category-title">מנות קרות</h3>
            <img src={coldCatImg} alt="קרות"/>
          </div>

          <div className="category-box" onClick={()=>setSel('baklava')}>
            <h3 className="category-title">בקלאווה</h3>
            <img src={baklava} alt="בקלאווה"/>
          </div>

          <div className="category-box" onClick={()=>setSel('knafe')}>
            <h3 className="category-title">כנאפה</h3>
            <img src={knafe} alt="כנאפה"/>
          </div>
        </div>
      )}

      {selectedCategory==='baklava'  && (<><button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>{renderMenu(baklavas)}</>)}
      {selectedCategory==='knafe'    && (<><button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>{renderMenu(knafes)}</>)}
      {selectedCategory==='hotDrinks'&& (<><button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>{renderMenu(hotDrinks)}</>)}
      {selectedCategory==='cold'     && (<><button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>{coldDishes.length ? renderMenu(coldDishes) : <p style={{textAlign:'center'}}>בקרוב…</p>}</>)}

      {/* ------------- order summary ------------- */}
      <div className="order-section">
        <h2>הזמנה נוכחית</h2>

        <div className="order-summary">
          <ul>
            {order.map((it,idx)=>(
              <li key={idx}>
                {it.item} - ₪{it.price}
                <button className="remove-button" onClick={()=>removeItem(idx)}>מחק</button>
              </li>
            ))}
          </ul>

          <p>
            <strong>סה״כ:</strong> ₪{totalPrice()}
            {follow && <span style={{color:'green'}}> (5% הנחה)</span>}
          </p>

          <div style={{margin:'10px 0',display:'flex',justifyContent:'center'}}>
            <label style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'1.1rem'}}>
              <input
                type="checkbox" checked={follow}
                onChange={()=>setFollow(!follow)} style={{width:20,height:20}}
              />
              <span>
                עקבתי אחרי&nbsp;
                <a href="https://www.instagram.com/yosef.sweets_conditory" target="_blank" rel="noopener noreferrer">
                  <img src={instaIcon} alt="Instagram"
                       style={{width:22,height:22,verticalAlign:'middle'}}/>
                </a>
                &nbsp;ומגיע לי 5% הנחה 🎉
              </span>
            </label>
          </div>

          <input type="text" placeholder="שם"        value={name}  onChange={e=>setName(e.target.value)}/>
          <input type="text" placeholder="טלפון"      value={phone} onChange={e=>setPhone(e.target.value)}/>
          <input type="text" placeholder="שולחן / כתובת" value={table} onChange={e=>setTable(e.target.value)}/>

          <button className="submit-button" onClick={async ()=>{
            if (!name || !phone || !table || order.length===0){
              alert('אנא מלא שם, טלפון, שולחן והוסף פריטים'); return;
            }
            const total = totalPrice();
            try{
              const res = await fetch('https://cafe-production.up.railway.app/submit-order',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify({ name, phone, table, items:order, total })
              });
              if (res.ok){
                alert('הזמנה נשלחה!');
                setOrder([]); setName(''); setPhone(''); setTable(''); setFollow(false); setSel(null);
              } else alert('שגיאה בשליחה');
            }catch{ alert('שגיאת רשת'); }
          }}>
            שלח הזמנה
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
