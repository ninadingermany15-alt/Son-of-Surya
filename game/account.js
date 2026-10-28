/* Surya Games account + records.
   One Son of Surya account (email + 6-digit PIN) for the Design Studio and every game.
   Progress always saves in this browser; when signed in it also saves to the cloud
   (Apps Script "games_save" / "games_load") so it follows the player to any device. */
(function(){
  const LOGO='<img src="/assets/brand/logo-horizontal-transparent-white-text.png" alt="Son of Surya" height="30" style="height:30px;width:auto;display:block">';
  const URL_='https://script.google.com/macros/s/AKfycbzyW4Z_VQe94Mq6N-cVHBRmRUKacYahg8_E5tBe44eZfcMsixOiEmuDSHCb2k1DlLYShg/exec';
  const SITE_KEY='sos_account_v1'; // shared with the Design Studio on the same site
  const get=(k,d)=>{ try{ const v=localStorage.getItem(k); return v==null?d:JSON.parse(v);}catch(e){ return d; } };
  const set=(k,v)=>{ try{ if(v==null) localStorage.removeItem(k); else localStorage.setItem(k,JSON.stringify(v)); }catch(e){} };
  const hash=s=>{ let h=2166136261; for(const c of String(s)){ h^=c.charCodeAt(0); h=Math.imul(h,16777619);} return (h>>>0).toString(36); };
  const esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const blank=(id,name)=>({id, name:name||'Guest', contact:'', created:new Date().toISOString().slice(0,10), xp:0, badges:[], certs:[], records:{}, avatar:{}});
  let profiles=get('ss-accounts',{}); if(!profiles.guest) profiles.guest=blank('guest','Guest');
  const site=()=>{ const a=get(SITE_KEY,null); return a&&a.exp>Date.now()&&a.token?a:null; };
  let curId='guest';
  const listeners=[];
  let cloud={state:'off', at:0}; // off | saving | saved | error

  /* ---------- merge two progress records (keeps the best of both) ---------- */
  function merge(a,b){ if(!b) return a;
    a.xp=Math.max(a.xp||0,b.xp||0);
    a.badges=[...new Set([...(a.badges||[]),...(b.badges||[])])];
    const seen=new Set((a.certs||[]).map(c=>c.title+'|'+(c.role||'')+'|'+c.date)); (b.certs||[]).forEach(c=>{ const k=c.title+'|'+(c.role||'')+'|'+c.date; if(!seen.has(k)){ seen.add(k); a.certs.push(c);} });
    for(const g in (b.records||{})){ const A=a.records[g]=a.records[g]||{}, B=b.records[g]; for(const k in B){ const x=A[k], y=B[k]; if(!x){ A[k]=y; continue; } const m=Object.assign({},x,y); ['score','stars','best'].forEach(f=>{ if(x[f]!=null&&y[f]!=null&&typeof x[f]==='number') m[f]=Math.max(x[f],y[f]); }); m.plays=Math.max(x.plays||0,y.plays||0); A[k]=m; } }
    if(b.name && (!a.name||a.name==='Guest')) a.name=b.name;
    return a; }

  async function api(body){ const r=await fetch(URL_,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(body)}); const t=await r.text(); let js; try{ js=JSON.parse(t);}catch(e){ throw new Error('Accounts are being switched on. Please try again in a little while.'); } return js; }
  const REASONS={email:'Please enter a valid email address.',pin:'Your PIN must be exactly 6 digits.',name:'Please enter your name.',exists:'An account with this email already exists. Sign in instead.',no_account:'No account with this email yet. Create one first.',pin_wrong:'Email or PIN is not right.',busy:'Too many wrong tries. Please wait 15 minutes.',token:'Your sign-in has expired. Please sign in again.',size:'Your progress is too large to save online.'};

  function useSiteAccount(a){ const id='u_'+hash(a.email); if(!profiles[id]){ profiles[id]=blank(id,a.name||a.email.split('@')[0]); }
    profiles[id].contact=a.email; if(a.name) profiles[id].name=a.name; curId=id; }
  function save(noSync){ set('ss-accounts',profiles); listeners.forEach(f=>{ try{f(SS.me())}catch(e){} }); if(!noSync) push(); }
  let pushT=null;
  function push(){ const a=site(); if(!a||curId==='guest') return; clearTimeout(pushT); pushT=setTimeout(async()=>{ const m=SS.me(); cloud={state:'saving',at:Date.now()}; paintCloud();
      try{ const js=await api({action:'games_save',token:a.token,data:{name:m.name,xp:m.xp,badges:m.badges,certs:m.certs,records:m.records,avatar:m.avatar}}); cloud={state:js.ok?'saved':'error',at:Date.now(),reason:js.reason}; if(js.reason==='token'){ set(SITE_KEY,null); } }
      catch(e){ cloud={state:'error',at:Date.now()}; } paintCloud(); }, 2500); }
  async function pull(){ const a=site(); if(!a) return; try{ const js=await api({action:'games_load',token:a.token}); if(js.ok&&js.data){ merge(SS.me(),js.data); save(true); } if(js.ok) push(); if(js.reason==='token'){ set(SITE_KEY,null); curId='guest'; save(true); } }catch(e){ cloud={state:'error',at:Date.now()}; paintCloud(); } }
  function paintCloud(){ const el=document.getElementById('ss-cloud'); if(!el) return; el.textContent= !SS.signedIn()?'' : cloud.state==='saving'?'Saving…' : cloud.state==='saved'?'☁ Saved' : cloud.state==='error'?'⚠ Saved on this device only':'☁'; }

  const SS={
    config:{ syncUrl:URL_ },
    me(){ return profiles[curId]; },
    signedIn(){ return curId!=='guest'; },
    level(p){ p=p||SS.me(); return 1+Math.floor((p.xp||0)/300); },
    async signup(name,email,pin){ name=String(name||'').trim(); email=String(email||'').trim().toLowerCase(); pin=String(pin||'');
      if(name.length<2) return 'Enter your name (at least 2 letters).'; if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.'; if(!/^\d{6}$/.test(pin)) return 'Choose a 6-digit PIN.';
      let js; try{ js=await api({action:'account_register',email,name,pin}); }catch(e){ return e.message||'Could not reach the account service.'; }
      if(!js.ok) return REASONS[js.reason]||'Something went wrong.';
      return SS._enter(js); },
    async signin(email,pin){ email=String(email||'').trim().toLowerCase(); pin=String(pin||'');
      let js; try{ js=await api({action:'account_login',email,pin}); }catch(e){ return e.message||'Could not reach the account service.'; }
      if(!js.ok) return REASONS[js.reason]||'Something went wrong.';
      return SS._enter(js); },
    async _enter(js){ set(SITE_KEY,{email:js.email,name:js.name||'',token:js.token,exp:js.exp}); const g=profiles.guest; useSiteAccount(js);
      merge(SS.me(),g); profiles.guest=blank('guest','Guest'); save(true); await pull(); push(); return null; },
    signout(){ set(SITE_KEY,null); curId='guest'; save(true); },
    rename(n){ const m=SS.me(); m.name=String(n).slice(0,24)||m.name; save(); },
    addXP(n){ SS.me().xp+=Math.max(0,Math.round(n)); save(); },
    badge(id,label){ const m=SS.me(); if(m.badges.includes(id)) return false; m.badges.push(id); m.xp+=50; save(); SS.toast('Badge unlocked: '+(label||id)); return true; },
    cert(c){ SS.me().certs.push(Object.assign({date:new Date().toISOString().slice(0,10)},c)); save(); },
    record(game,key,data){ const m=SS.me(); const g=m.records[game]=m.records[game]||{}; const old=g[key]||{};
      const best=Object.assign({},old,data); if(old.score!=null && data.score!=null) best.score=Math.max(old.score,data.score); if(old.stars!=null && data.stars!=null) best.stars=Math.max(old.stars,data.stars);
      best.plays=(old.plays||0)+1; best.last=new Date().toISOString().slice(0,10); g[key]=best; save(); return best; },
    records(game){ return (SS.me().records[game])||{}; },
    onChange(f){ listeners.push(f); },
    toast(msg){ let t=document.querySelector('.ss-toast'); if(!t){ t=document.createElement('div'); t.className='ss-toast'; t.setAttribute('role','status'); document.body.appendChild(t);} t.textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2600); },
    esc,
    mountHeader(active){
      const links=[['index.html','Games','hub'],['mission.html','Surya Mission','mission'],['yoddha.html','Yoddha 3D','run'],['quiz.html','Solar Hero Quiz','quiz'],['gadget.html','Gadget Guru','gadget'],['build.html','Abhi Thik Karke Deta Hu','build']];
      const h=document.createElement('header'); h.className='ss-head';
      h.innerHTML='<div class="ss-wrap ss-bar"><a class="ss-logo" href="/" title="Back to sonofsurya.com">'+LOGO+'<small>Games</small></a><nav class="ss-nav" aria-label="Games">'+links.map(l=>'<a href="'+l[0]+'"'+(l[2]===active?' aria-current="page"':'')+'>'+l[1]+'</a>').join('')+'</nav><div class="ss-user" id="ss-user"></div></div>';
      document.body.prepend(h);
      const m=document.createElement('div'); m.className='ss-modal'; m.id='ss-modal'; m.hidden=true; document.body.appendChild(m);
      const paintUser=()=>{ const me=SS.me(), u=document.getElementById('ss-user');
        u.innerHTML= SS.signedIn() ? '<span class="ss-chip" title="Level '+SS.level()+' · '+me.xp+' XP"><span class="ss-av">'+esc(me.name.slice(0,1).toUpperCase())+'</span>'+esc(me.name)+' · L'+SS.level()+'</span><span class="ss-small" id="ss-cloud" aria-live="polite"></span><button class="ss-btn alt sm" type="button" id="ss-out">Sign out</button>'
          : '<span class="ss-chip">Guest · L'+SS.level()+'</span><button class="ss-btn sm" type="button" id="ss-in">Sign in or create account</button>';
        const o=document.getElementById('ss-out'); if(o) o.onclick=()=>{ SS.signout(); SS.toast('Signed out. Your progress is saved in your account.'); };
        const i=document.getElementById('ss-in'); if(i) i.onclick=()=>SS.openAuth(); paintCloud(); };
      paintUser(); SS.onChange(paintUser);
    },
    openAuth(tab){ const m=document.getElementById('ss-modal'); if(!m) return; tab=tab||'up';
      m.innerHTML='<div class="ss-card" role="dialog" aria-modal="true" aria-labelledby="ss-t"><h2 id="ss-t">Your Son of Surya account</h2><p>One account for the Design Studio and every game. Your cases, levels, scores, badges and certificates are saved online and follow you to any device.</p>'+
        '<div class="ss-tabs" role="tablist"><button type="button" id="ss-tu" aria-selected="'+(tab==='up')+'">Create account</button><button type="button" id="ss-ti" aria-selected="'+(tab==='in')+'">Sign in</button></div>'+
        '<form id="ss-f">'+(tab==='up'?'<label class="ss-field" for="ss-n">Your name<input id="ss-n" required maxlength="24" autocomplete="name"></label>':'')+
        '<label class="ss-field" for="ss-c">Email<input id="ss-c" type="email" required autocomplete="email"></label><label class="ss-field" for="ss-p">'+(tab==='up'?'Choose a 6-digit PIN':'6-digit PIN')+'<input id="ss-p" type="password" required inputmode="numeric" pattern="\\d{6}" maxlength="6" autocomplete="'+(tab==='up'?'new-password':'current-password')+'"></label>'+
        '<div class="ss-err" id="ss-e" role="alert"></div><button class="ss-btn" type="submit" id="ss-go">'+(tab==='up'?'Create account':'Sign in')+'</button> <button class="ss-btn alt" type="button" id="ss-x">'+(tab==='up'?'Play as guest':'Cancel')+'</button></form>'+
        '<p class="ss-small" style="margin-top:12px">'+(tab==='up'?'Your guest progress moves into your new account.':'Forgot your PIN? Message us on WhatsApp +49 160 4923611.')+'</p></div>';
      m.hidden=false;
      document.getElementById('ss-tu').onclick=()=>SS.openAuth('up'); document.getElementById('ss-ti').onclick=()=>SS.openAuth('in');
      document.getElementById('ss-x').onclick=()=>{ m.hidden=true; };
      document.getElementById('ss-f').onsubmit=async e=>{ e.preventDefault(); const c=document.getElementById('ss-c').value, p=document.getElementById('ss-p').value, go=document.getElementById('ss-go');
        go.disabled=true; go.textContent='Please wait…';
        const err= tab==='up' ? await SS.signup(document.getElementById('ss-n').value,c,p) : await SS.signin(c,p);
        go.disabled=false; go.textContent=tab==='up'?'Create account':'Sign in';
        if(err){ document.getElementById('ss-e').textContent=err; return; } m.hidden=true; SS.toast(tab==='up'?'Account created. Welcome, '+SS.me().name+'!':'Welcome back, '+SS.me().name+'! Your progress is loaded.'); };
      setTimeout(()=>{ const f=m.querySelector('input'); f&&f.focus(); },30);
    }
  };
  window.SS=SS;
  /* signed in on the Studio already? use that account here too */
  const a=site(); if(a){ useSiteAccount(a); set('ss-accounts',profiles); pull(); }
  window.addEventListener('storage',e=>{ if(e.key===SITE_KEY){ const b=site(); if(b){ useSiteAccount(b); pull(); } else curId='guest'; listeners.forEach(f=>{ try{f(SS.me())}catch(err){} }); } });
})();
