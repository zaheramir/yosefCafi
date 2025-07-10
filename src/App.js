import React, { useState } from 'react';
import './App.css';

/* ------------ baklava images ------------ */
import baklava      from './baklava.jpg';
import baklava1     from './baklava1.jpg';
import baklava2     from './baklava2.jpg';
import baklava3     from './baklava3.jpg';
import baklava4     from './baklava4.jpg';
import baklava5     from './baklava5.jpg';
import baklava6     from './baklava6.jpg';
import baklava7     from './baklava7.jpg';
import baklava8     from './baklava8.jpg';
import baklava9     from './baklava9.jpg';
import baklava10    from './baklava10.jpg';
import baklava11    from './baklava11.jpg';
import baklava12    from './baklava12.jpg';
import baklava13    from './baklava13.jpg';
import baklava14    from './baklava14.jpg';
import baklava15    from './baklava15.jpg';
import baklava16    from './baklava16.jpg';
import baklava17    from './baklava17.jpg';
import baklava18    from './baklava18.jpg';
import baklava19    from './baklava19.jpg';
import baklava20    from './baklava20.jpg';

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

/* ------------ hot-drink images ---------- */
import hotCat   from './hot.jpg';
import hot1     from './hot1.jpg';
import hot2     from './hot2.jpg';
import hot3     from './hot3.jpg';
import hot4     from './hot4.jpg';
import hot5     from './hot5.jpg';
import hot6     from './hot6.jpg';
import hot7     from './hot7.jpg';
import hot8     from './hot8.jpg';
import hot9     from './hot9.jpg';
import hot10    from './hot10.jpg';
import hot11    from './hot11.jpg';

/* ------------ cold-drink images --------- */
import drinkCat from './drink.jpg';
import drink1   from './drink1.jpg';
import drink2   from './drink2.jpg';
import drink3   from './drink3.jpg';
import drink4   from './drink4.jpg';

/* ------------ cold-dish images ---------- */
import coldCat  from './cold.jpg';
import cold1    from './cold1.jpg';
import cold2    from './cold2.jpg';
import cold3    from './cold3.jpg';
import cold4    from './cold4.jpg';
import cold5    from './cold5.jpg';
import cold6    from './cold6.jpg';
import cold7    from './cold7.jpg';
import cold8    from './cold8.jpg';
import cold9    from './cold9.jpg';
import cold10   from './cold10.jpg';
import cold11   from './cold11.jpg';
import cold12   from './cold12.jpg';

/* ------------ misc ------------ */
import instaIcon from './instagram.png';

function App() {
  /* ---------- state ---------- */
  const [order, setOrder]          = useState([]);
  const [name , setName]           = useState('');
  const [phone, setPhone]          = useState('');
  const [table, setTable]          = useState('');
  const [selectedCategory, setSel] = useState(null);

  const [qty,   setQty]            = useState({});
  const [flv,   setFlv]            = useState({});   // flavour selection
  const [check, setCheck]          = useState(null);
  const [follow,setFollow]         = useState(false);

  const [trackPhone , setTrackPhone]  = useState('');
  const [trackStatus, setTrackStatus] = useState(null);
  const [trackErr   , setTrackErr]    = useState(null);
  const [mode, setMode]               = useState('menu'); // 'menu' | 'track'

  /* ---------- data ---------- */
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
    { img: baklava20, name:'צלחת משקל בקלאוות – קטן',    price:20, key:'b20', portion:true, desc:'~200 גרם' },
    { img: baklava20, name:'צלחת משקל בקלאוות – בינוני', price:30, key:'b21', portion:true, desc:'~300 גרם' },
    { img: baklava20, name:'צלחת משקל בקלאוות – גדול',    price:40, key:'b22', portion:true, desc:'~400 גרם' },
  ];

  const knafes = [
    { img:knafe1 , name:'כנאפה שטוחה – אישית',    price:20, key:'k1', portion:true },
    { img:knafe2 , name:'כנאפה שטוחה – בצלחת',    price:15, key:'k2', portion:true },
    { img:knafe3 , name:'מברומה',                  price:15, key:'k3', portion:true },
    { img:knafe4 , name:'כנאפה נאבלסיה – אישית',  price:20, key:'k4', portion:true },
    { img:knafe5 , name:'כנאפה שאמיה',            price:25, key:'k5', portion:true,
      desc:'בצק קדאיף במילוי גבינה ואגוזים' },
    { img:knafe6 , name:'כנאפה ענתאביה',          price:25, key:'k6', portion:true,
      desc:'בצק קדאיף במילוי סחלב ופיסטוק' },
    { img:knafe7 , name:'כנאפה קקאו – אישית',     price:20, key:'k7', portion:true },
    { img:knafe8 , name:'כנאפה קרה',              price:35, key:'k8', portion:true,
      desc:'שתי שכבות קדאיף, גלידה טורקית ושוקולד' },
    { img:knafe9 , name:'כנאפה נועמנים – אישית',  price:30, key:'k9', portion:true },
    { img:knafe10, name:'כנאפה ביתי – מגש קטן',   price:70, key:'k10', portion:true,
      desc:'6-8 יחידות' },
    { img:knafe11, name:'כנאפה ביתי – מגש גדול',  price:90, key:'k11', portion:true,
      desc:'10-12 יחידות' },
  ];

  const hotDrinks = [
    { img:hot1 , name:'תה טורקי',        price:6 , key:'h1', portion:true },
    { img:hot2 , name:'תה בטעמים',       price:6 , key:'h2', portion:true },
    { img:hot3 , name:'קפה הפוך',        price:10, key:'h3', portion:true },
    { img:hot4 , name:'הפוך גדול',       price:15, key:'h4', portion:true },
    { img:hot5 , name:'אספרסו',          price:8 , key:'h5', portion:true },
    { img:hot6 , name:'אספרסו כפול',     price:12, key:'h6', portion:true },
    { img:hot7 , name:'מקיאטו',          price:9 , key:'h7', portion:true },
    { img:hot8 , name:'אמריקנו',         price:10, key:'h8', portion:true },
    { img:hot9 , name:'שוקו חם',         price:10, key:'h9', portion:true },
    { img:hot10, name:'נס קפה',          price:10, key:'h10', portion:true },
    { img:hot11, name:'קפה קר',          price:15, key:'h11', portion:true },
  ];

  const coldDrinks = [
    { img:drink1, name:'שתיה קלה',         price:7 , key:'c1', portion:true },
    { img:drink2, name:'מיץ תפוזים סחוט',  price:15, key:'c2', portion:true },
    { img:drink3, name:'תמר הנדי',         price:12, key:'c3', portion:true },
    { img:drink4, name:'קפה קר',           price:15, key:'c4', portion:true },
  ];

  const coldDishes = [
    { img:cold1 , name:'טרליצ׳י – צלחת', price:12, key:'cd1', portion:true,
      desc:'טעמים: קרמל / פיסטוק / תות', flavours:['קרמל','פיסטוק','תות'] },
    { img:cold2 , name:'טרליצ׳י – אישית', price:20, key:'cd2', portion:true,
      desc:'טעמים: קרמל / פיסטוק / תות', flavours:['קרמל','פיסטוק','תות'] },
    { img:cold3 , name:'ליליות בירות',      price:20, key:'cd3', portion:true,
      desc:'שכבת סולת בחלב, שמנת מתוקה ופיסטוק + סירופ מי ורדים' },
    { img:cold4 , name:'עש אלסראיא',        price:25, key:'cd4', portion:true,
      desc:'3 שכבות קדאיף, סחלב, שמנת מתוקה והאגוזים' },
    { img:cold5 , name:'פחזניות (3 יחידות)', price:15, key:'cd5', portion:true },
    { img:cold6 , name:'כנאפה קרה',         price:35, key:'cd6', portion:true,
      desc:'שתי שכבות קדאיף במילוי גלידה טורקית ושוקולד' },
    { img:cold7 , name:'עוגת טירמיסו',      price:25, key:'cd7', portion:true,
      desc:'קרם חלבי אוורירי ובישקויטים ספוגי-קפה' },
    { img:cold8 , name:'גלידה טורקית וניל', price:20, key:'cd8', portion:true,
      desc:'ריבוע אישי' },
    { img:cold9 , name:'קרם ברולה',         price:25, key:'cd9', portion:true },
    { img:cold10, name:'סולטאג׳',           price:15, key:'cd10', portion:true,
      desc:'מלבי בתוספת אורז' },
    { img:cold11, name:'עוגת גבינה אפויה',  price:25, key:'cd11', portion:true },
    { img:cold12, name:'גליליות קרם וניל',  price:10, key:'cd12', portion:true,
      desc:'2 יחידות רול וופל ממולא שמנת' },
  ];

  /* ---------- helpers ---------- */
  const addItem = (baseName, price, key) => {
    const q = parseInt(qty[key] || '1', 10);
    if (isNaN(q) || q < 1) { alert('כמות לא תקינה'); return; }

    // flavour validation (when flavours exist)
    const flavour = flv[key] || null;
    const itemName = flavour ? `${baseName} — ${flavour}` : baseName;
    if (coldDishes.find(d=>d.key===key && d.flavours) && !flavour) {
      alert('בחר טעם קודם'); return;
    }

    setOrder(prev => [...prev, { item:itemName, extras:[], price:price*q, quantity:q }]);
    setCheck(key);
    setTimeout(()=>setCheck(null), 1000);

    setQty(prev => ({ ...prev, [key]:'' }));
    setFlv(prev => ({ ...prev, [key]:'' }));
  };

  const removeItem = idx => setOrder(order.filter((_,i)=>i!==idx));

  const renderMenu = list => (
    <div className="menu">
      {list.map(({ img,name,price,key,portion,desc,flavours }) => (
        <div className="menu-item" key={key}>
          <img src={img} alt={name}/>
          <p>{name} - ₪{price}{portion ? '' : ' ליחידה'}</p>
          {desc && <span className="item-desc">{desc}</span>}

          {flavours && (
            <select
              value={flv[key] || ''}
              onChange={e=>setFlv({...flv, [key]:e.target.value})}
              style={{margin:'6px 0',width:'100%'}}
            >
              <option value="">בחר טעם</option>
              {flavours.map(f=>(<option key={f} value={f}>{f}</option>))}
            </select>
          )}

          {!portion && !flavours && (
            <input
              type="number" min="1" placeholder="כמות"
              value={qty[key] || ''}
              onChange={e=>setQty({...qty,[key]:e.target.value})}
            />
          )}

          <div style={{position:'relative'}}>
            <button className="add-button" onClick={()=>addItem(name,price,key)}>+</button>
            {check===key && <div className="checkmark-on-button">✓</div>}
          </div>
        </div>
      ))}
    </div>
  );

  /* ---------- submit order / fetch status (זהים לגרסה הקודמת) ---------- */
  const handleSubmit = async () => {
    if (!name || !phone || !table || order.length === 0) {
      alert('אנא מלא שם, טלפון, מספר שולחן והוסף לפחות פריט אחד.');
      return;
    }
    const totalRaw = order.reduce((s,i)=>s+i.price,0);
    const total    = (follow ? totalRaw*0.95 : totalRaw).toFixed(2);
    const payload  = { name, phone, table, items:order, total };

    try{
      const res = await fetch('https://cafe-production.up.railway.app/submit-order',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });
      if(res.ok){
        setOrder([]); setName(''); setPhone(''); setTable('');
        setFollow(false); setSel(null);
        setTrackPhone(phone);
        setMode('track');
        fetchStatus(phone);
      }else alert('שגיאה בשליחת ההזמנה.');
    }catch(e){ console.error(e); }
  };

  const fetchStatus = async ph => {
    if(!ph){ setTrackErr('יש להזין טלפון'); return; }
    try{
      const r = await fetch('https://cafe-production.up.railway.app/get-orders');
      const all = r.ok ? await r.json() : [];
      const hasActive = all.some(o=>o.phone===ph);
      setTrackStatus(hasActive ? 'preparing' : 'completed');
      setTrackErr(null);
    }catch(e){ console.error(e); setTrackErr('שגיאת שרת'); }
  };

  /* ---------- track view ---------- */
  if(mode==='track'){
    return(
      <div className="container">
        <h1>מעקב הזמנה</h1>

        <input type="text" placeholder="מס’ טלפון"
          value={trackPhone} onChange={e=>setTrackPhone(e.target.value)} />
        <button className="submit-button" onClick={()=>fetchStatus(trackPhone)}>בדוק</button>

        {trackStatus && (
          <p style={{
            fontSize:'1.2rem',marginTop:'1rem',
            color:trackStatus==='completed'?'#27ae60':'#e67e22'}}
          >
            סטטוס: <b>{trackStatus==='completed'?'מוכן ✅':'בהכנה 🍰'}</b>
          </p>
        )}
        {trackErr && <p style={{color:'red'}}>{trackErr}</p>}

        <hr/>
        <button className="fancy-btn" onClick={()=>{ setMode('menu'); setTrackStatus(null); setTrackErr(null); }}>
          ☕ להזמין שוב
        </button>
      </div>
    );
  }

  /* ---------- menu view ---------- */
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
          <div className="category-box" onClick={()=>setSel('baklava')}>
            <h3 className="category-title">בקלאווה</h3><img src={baklava} alt="בקלאווה"/>
          </div>
          <div className="category-box" onClick={()=>setSel('knafe')}>
            <h3 className="category-title">כנאפה</h3><img src={knafe} alt="כנאפה"/>
          </div>
          <div className="category-box" onClick={()=>setSel('cold')}>
            <h3 className="category-title">מנות קרות</h3><img src={coldCat} alt="מנות קרות"/>
          </div>
          <div className="category-box" onClick={()=>setSel('hot')}>
            <h3 className="category-title">משקאות חמים</h3><img src={hotCat} alt="חם"/>
          </div>
          <div className="category-box" onClick={()=>setSel('coldDrink')}>
            <h3 className="category-title">משקאות קרים</h3><img src={drinkCat} alt="קר"/>
          </div>
        </div>
      )}

      {selectedCategory==='baklava'   && (<>{<button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>}{renderMenu(baklavas)}</>)}
      {selectedCategory==='knafe'     && (<>{<button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>}{renderMenu(knafes)}</>)}
      {selectedCategory==='cold'      && (<>{<button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>}{renderMenu(coldDishes)}</>)}
      {selectedCategory==='hot'       && (<>{<button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>}{renderMenu(hotDrinks)}</>)}
      {selectedCategory==='coldDrink' && (<>{<button className="fancy-btn" onClick={()=>setSel(null)}>חזור</button>}{renderMenu(coldDrinks)}</>)}

      {/* -------- order summary -------- */}
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

          <p><strong>סה"כ:</strong> ₪{
            (order.reduce((s,i)=>s+i.price,0)*(follow?0.95:1)).toFixed(2)
          }{follow && <span style={{color:'green'}}> (5% הנחה)</span>}</p>

          <div style={{margin:'10px 0',display:'flex',justifyContent:'center'}}>
            <label style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'1.05rem'}}>
              <input type="checkbox" checked={follow}
                     onChange={()=>setFollow(!follow)} style={{width:20,height:20}}/>
              <span>
                עקבתי אחרי&nbsp;
                <a href="https://www.instagram.com/yosef.sweets_conditory" target="_blank" rel="noopener noreferrer">
                  <img src={instaIcon} alt="Instagram" style={{width:22,height:22,verticalAlign:'middle'}}/>
                </a>&nbsp;ומגיע לי 5% הנחה 🎉
              </span>
            </label>
          </div>

          <input type="text" placeholder="שם"        value={name}  onChange={e=>setName(e.target.value)}/>
          <input type="text" placeholder="טלפון"      value={phone} onChange={e=>setPhone(e.target.value)}/>
          <input type="text" placeholder="מספר שולחן / כתובת" value={table} onChange={e=>setTable(e.target.value)}/>
          <button className="submit-button" onClick={handleSubmit}>שלח הזמנה</button>
        </div>
      </div>
    </div>
  );
}

export default App;