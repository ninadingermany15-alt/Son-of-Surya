/* Surya Mission: 35 more projects, built from compact specs.
   Numbers are rounded learning figures based on typical sun hours, tariffs and equipment. */
(function(){
const V=41.7, VOC=49.9;
const L={ // looks
 inFarmer:{skin:'#8D5A3B',shirt:'#F2EFE6',topi:true,moustache:true}, inMan:{skin:'#A86F48',shirt:'#5A7FB0',hair:'#1a1a1a',moustache:true},
 inTurban:{skin:'#8D5A3B',shirt:'#F4F1E8',turban:'#E0362E',moustache:true}, inWoman:{skin:'#9A6644',saree:'#2E8B57',hair:'#1a1a1a',bun:true,bindi:true},
 inWoman2:{skin:'#B57B52',saree:'#D94E5A',hair:'#1a1a1a',bun:true,bindi:true}, inGirl:{skin:'#B57B52',shirt:'#2E8B57',hair:'#1a1a1a',bun:true},
 inOffF:{skin:'#C68A5E',shirt:'#5A6F9E',hair:'#1a1a1a',bun:true,glasses:true,bindi:true}, inOffM:{skin:'#B57B52',shirt:'#5A6F9E',hair:'#1a1a1a',glasses:true},
 crew:{skin:'#B57B52',vest:true,hat:'#FDA604'}, crew2:{skin:'#4A2E1F',vest:true,hat:'#FDA604'}, crew3:{skin:'#E0B892',vest:true,hat:'#FDA604'}, crew4:{skin:'#C08A5E',vest:true,hat:'#FDA604'},
 gulfMan:{skin:'#C99A6E',ghutra:true,moustache:true}, gulfWoman:{skin:'#C99A6E',hijab:'#2A2A2A'}, gulfOff:{skin:'#B98A5E',ghutra:true,glasses:true},
 levMan:{skin:'#D9B08C',shirt:'#5E6E80',hair:'#2a1a10',moustache:true}, levWoman:{skin:'#D9B08C',shirt:'#9E4A5A',hair:'#2a1a10',bun:true},
 afMan:{skin:'#4A2E1F',shirt:'#E8B04A',hair:'#111'}, afMan2:{skin:'#5A3826',shirt:'#3E7A5A',hair:'#111',glasses:true}, afWoman:{skin:'#4A2E1F',saree:'#7B3FA0',hair:'#111',bun:true}, afWoman2:{skin:'#5A3826',saree:'#E07A3A',hair:'#111',bun:true},
 naMan:{skin:'#B98A5E',shirt:'#EDE6D6',moustache:true}, naWoman:{skin:'#B98A5E',hijab:'#8E3B46'},
 euMan:{skin:'#E8C4A0',shirt:'#6A8CAF',hair:'#6B4A2B'}, euWoman:{skin:'#E8C4A0',shirt:'#B0506A',hair:'#C9A15A',bun:true}, euOff:{skin:'#E8C4A0',shirt:'#5A6F9E',hair:'#8a8a8a',glasses:true},
 laMan:{skin:'#C9956A',shirt:'#3E7A5A',hair:'#2a1a10',moustache:true}, laWoman:{skin:'#C9956A',shirt:'#D9A13A',hair:'#2a1a10',bun:true}, amOff:{skin:'#8D5A3B',shirt:'#5A6F9E',hair:'#111',glasses:true},
 seMan:{skin:'#C08A5E',shirt:'#2F6E9E',hair:'#111'}, seWoman:{skin:'#C08A5E',saree:'#E07A3A',hair:'#111',bun:true}, seOff:{skin:'#C08A5E',shirt:'#5A6F9E',hair:'#111',glasses:true}
};
const cast=(o)=>{ const r={}; for(const k in o){ const [name,look,extra]=o[k]; r[k]=Object.assign({name},L[look]||{},extra||{}); } return r; };
const fmt=n=>Math.round(n).toLocaleString('en-IN');
const r1=n=>Math.round(n*10)/10;

/* ---------- climate libraries ---------- */
const PROTECT={
 coastal:{title:'Coastal protection',q:'The site is close to the sea. What else must go in?',opts:[['Hot-dip galvanised or aluminium structure, stainless fasteners, sealed connectors and a DC surge protector','Stops rust and lightning damage'],['Paint the steel once a year','Paint chips; galvanising lasts'],['Nothing extra','Salt air corrodes plain steel in a few years']],ok:0,hint:'Think rust and lightning.'},
 desert:{title:'Beat dust and heat',q:'What keeps a desert array producing?',opts:[['Regular cleaning, a raised frame for airflow and panels with a low temperature coefficient','Dust and heat cut output; cleaning and airflow help most'],['Cover the panels in summer','Covered panels make no power'],['Nothing, panels are self-cleaning','Desert dust builds up fast']],ok:0,hint:'Dust blocks light; heat lowers voltage.'},
 cold:{title:'Built for snow',q:'Heavy snow sits on this roof in winter. What do you check?',opts:[['Snow-load rating of the panels and rails, extra roof hooks and snow guards above the door','Snow weighs a lot and slides off in sheets'],['Lay the panels flat','Snow stays on flat panels and output drops'],['Nothing, snow melts','Snow load can bend rails and crack glass']],ok:0,hint:'Snow is heavy.'},
 monsoon:{title:'Ready for the monsoon',q:'Months of heavy rain and humidity. What protects the system?',opts:[['IP65 boxes, drip loops on cables, cable entries from below and an earthed structure','Water runs off instead of into the boxes'],['Wrap joints in plastic tape','Tape fails in a season'],['Switch off for the monsoon','You lose months of free power']],ok:0,hint:'Keep water out of every box.'},
 cyclone:{title:'Built for storms',q:'Cyclones and typhoons hit this coast. How do you fix the array?',opts:[['Wind-rated rails, extra clamps and roof anchors checked by an engineer for the local wind speed','Panels act like sails in a storm'],['Standard fixing, it is fine','Storm winds rip off weakly fixed panels'],['Remove the panels before every storm','Not practical and risky']],ok:0,hint:'Think wind uplift.'},
 altitude:{title:'High and cold',q:'The site is above 2,500 m. Sun is strong, nights freeze. What matters?',opts:[['UV-rated cable, cold-weather string voltage check and batteries kept indoors above 0 °C','Strong UV and freezing nights stress parts'],['Normal house wire is fine','UV cracks ordinary PVC fast'],['Batteries outside to stay cool','Lithium batteries must not charge below 0 °C']],ok:0,hint:'UV and frost.'},
 hot:{title:'Beat the heat',q:'Roofs here pass 70 °C in summer. What keeps output up?',opts:[['A gap under the panels for airflow and an inverter in the shade with space around it','Hot panels and inverters lose output'],['Mount panels flat on the roof','No airflow, hotter panels'],['Paint the panels white','White panels make no power']],ok:0,hint:'Air and shade for the hot parts.'},
 tropical:{title:'Heat and humidity',q:'It is hot and humid all year, with sudden storms. What protects the system?',opts:[['Earthing, a surge protector, IP65 boxes and an inverter in a ventilated, shaded place','Lightning and damp are the main killers'],['Put the inverter in a closed tin box in the sun','It overheats and sweats inside'],['Skip earthing','Lightning finds the panels first']],ok:0,hint:'Lightning and damp.'}
};
const WEATHER={
 coastal:(m)=>[[m+' · red alert, gale winds','Never lift panels in strong wind'],['Rain all day','Wet roofs are dangerous'],['Clear morning, showers after 3 pm','Start at dawn, finish roof work by 2 pm'],['Thunderstorms','Lightning risk on a metal structure'],2],
 desert:(m)=>[['Dust storm warning','Flying dust and panels act like sails'],['Heat wave, 48 °C','Heat stroke risk for the crew'],['Clear and calm, 38 °C','Start at 6 am and stop by 11 am'],['Winds 50 km/h','Unsafe for lifting panels'],2],
 cold:(m)=>[['Fresh snow, −8 °C','Icy roof, no safe footing'],['Freezing rain','Roof turns to an ice rink'],['Dry and sunny, 4 °C','Good day for roof work with harnesses'],['Gusts 70 km/h','Too windy to lift panels'],2],
 monsoon:(m)=>[[m+' · orange alert, very heavy rain','Never work on an orange alert'],['Moderate rain all day','Wet roofs are dangerous'],['Dry morning, showers after 3 pm','Move at dawn, finish by 2 pm'],['Thunderstorms','Lightning risk on a metal structure'],2],
 cyclone:(m)=>[['Storm warning, signal 3','Stay off roofs; secure everything'],['Heavy rain bands','Wet roof and poor visibility'],['Clear after the storm, light wind','Good window for roof work'],['Thunderstorms in the afternoon','Lightning risk'],2],
 altitude:(m)=>[['Snowfall on the pass','Road closed, truck cannot reach'],['−12 °C at dawn','Frozen ground and stiff cable'],['Clear and sunny, 10 °C at noon','Work from 10 am to 3 pm'],['High winds on the ridge','Unsafe for lifting'],2],
 hot:(m)=>[['Heat wave, 46 °C','Heat stroke risk for the crew'],['Dust in the air','Low visibility on the roads'],['Clear, 34 °C','Start early, stop by noon'],['Thunderstorm in the evening','Lightning risk late in the day'],2],
 tropical:(m)=>[['Tropical storm warning','Stay off the roof'],['Rain all day','Wet roof, slippery'],['Sunny morning, showers after 2 pm','Start early, finish by 1 pm'],['Thunderstorms','Lightning risk on metal'],2]
};
const CLIMATE_KEY={coastal:'coastal',desert:'desert',cold:'cold',monsoon:'tropical',cyclone:'coastal',altitude:'cold',hot:'hot',tropical:'tropical'};
const ROLES_BY_KIND={home:['eng','des','pm','saf','home','mfg'],pump:['eng','des','saf','farm','mfg'],school:['eng','des','pm','saf','stu','mfg'],lights:['eng','pm','saf','mfg','stu'],commercial:['eng','des','pm','saf','mfg'],hybrid:['eng','des','pm','saf','home','mfg']};

function crewQ(k,big){
 if(k==='pump') return {q:'Who goes for this pump job?',opts:[['1 helper','A pump and its panels need more hands'],['2 installers + pump technician + crew lead','Two for the structure, one for the pump, one in charge'],['10 people','Too many people for one borewell']],ok:1};
 if(k==='lights') return {q:'Who goes to put up the poles?',opts:[['1 helper','Poles need several people and a tripod'],['4 installers + 1 electrician + crew lead with a pole tripod','Enough hands to raise poles safely'],['20 people','A crowd around poles is unsafe']],ok:1};
 if(k==='commercial') return {q:'Who goes for a job this size?',opts:[['2 installers','Weeks of work and no electrician'],['Crew lead, 6–8 installers, 2 licensed electricians and a safety officer','Big roofs need a team, wiring experts and someone watching safety'],['30 people at once','Crowds on a roof cause accidents']],ok:1};
 if(k==='hybrid') return {q:'Who goes for a hybrid system with batteries?',opts:[['1 helper','Batteries are heavy and need trained hands'],['2 installers + 1 electrician trained on batteries + crew lead','Battery work needs a trained electrician'],['8 people','Too many people for one roof']],ok:1};
 return {q:'Who goes for this '+(k==='school'?'school roof':'rooftop')+'?',opts:[['1 helper','Panels need two people to lift'],['2 installers + 1 licensed electrician + crew lead','Two lifters, one wiring, one in charge'],['8 people','Too many people on one roof']],ok:1};
}
function commL(k,auth){
 if(k==='pump') return ['Visual check and torque on every bolt','Polarity and open-circuit voltage of the string','Insulation resistance test','Earth resistance test','Start the controller and check water flow','Pump trial and handover'+(auth?' with '+auth:'')];
 if(k==='lights') return ['Check every pole is plumb and the base has set','Panel facing the equator at the right tilt','Battery and controller wiring checked','Dusk test: cover the panel and the light comes on','Measure light on the road at night','Handover'+(auth?' to '+auth:'')+' with a maintenance register'];
 if(k==='hybrid') return ['Visual check and torque on every clamp','Polarity and open-circuit voltage of each string','Insulation and earth resistance tests','Battery: BMS check and first charge','Switch-over test: grid or generator off, loads stay on','Handover'+(auth?' and '+auth:'')+' with owner training'];
 return ['Visual check and torque on every clamp','Polarity and open-circuit voltage of each string','Insulation resistance test','Earth resistance test','Switch on AC, then DC; set the grid profile',(auth||'Grid inspection')+' and handover'];
}
function wireQ(s){
 const n=s.n, [lo,hi,mx]=s.mppt, cold=s.climate==='cold'||s.climate==='altitude', vocF=cold?1.15:1;
 let per=n, k=1; while(per*V>hi || per*VOC*vocF>mx){ k++; while(n%k) k++; per=n/k; }
 const vw=Math.round(per*V), vo=Math.round(per*VOC*vocF);
 const right= k===1 ? ['All '+n+' in series · '+vw+' V', vw+' V sits inside '+lo+'–'+hi+' V'+(cold?', and ~'+vo+' V on a cold morning is under '+mx+' V':'')]
                    : [k+' strings of '+per+' · '+vw+' V each', 'Each string sits inside '+lo+'–'+hi+' V'+(cold?' and stays under '+mx+' V when cold':' and under '+mx+' V open-circuit')];
 const over= k===1 ? [(2*n)+' in series · '+Math.round(2*n*V)+' V','You only have '+n+' panels, and that is over the limit'] : ['All '+n+' in series · '+fmt(n*V)+' V','Far over '+hi+' V; '+fmt(n*VOC)+' V open-circuit could destroy the inverter'];
 const par=['All '+n+' in parallel · 42 V','42 V is below the '+lo+' V minimum'];
 const box=s.kind==='pump'?'pump controller':s.kind==='hybrid'?'hybrid inverter':'inverter';
 return {title:k===1?'Wire the string':'Design the strings', q:'Each panel gives '+V+' V working and '+VOC+' V open-circuit'+(cold?' (about '+r1(VOC*1.15)+' V on a freezing morning)':'')+'. The '+box+' tracks '+lo+'–'+hi+' V and takes at most '+fmt(mx)+' V. How do you connect '+n+' panels?',
  opts:[par,right,over], ok:1, hint:'Series adds voltage. Stay inside '+lo+'–'+hi+' V'+(cold?' and below '+mx+' V when cold':'')+'.', show:{n:Math.min(per,18),v:V,label:s.invLabel||((s.kwp>60?Math.ceil(s.kwp/50)+' × 50 kW inverters':s.kwp+' kW '+box)+' · MPPT '+lo+'–'+hi+' V · max '+fmt(mx)+' V')}};
}
function cableQ(s){ return {title:'Choose the DC cable',q:'Which cable runs from the panels to the '+(s.kind==='pump'?'controller':'inverter')+'?',opts:[['1.5 mm² house wire','Too thin, and PVC cracks in the sun'],[(s.kwp>30?'6':'4')+' mm² UV-rated solar DC cable','Rated for sun, heat and DC'],['Any cable, it is only a short run','Wrong cable is a fire risk']],ok:1,hint:'A cable made for sunlight and DC.'}; }
function batteryQ(s){ const e=s.night, need=Math.round(e/0.9*10)/10;
 return {title:'Size the battery',q:'The evening and night load is about '+e+' kWh. You can use 90% of an LFP battery. Which battery?',opts:[[Math.max(2.5,Math.round(e/3*2)/2)+' kWh LFP','Runs out before midnight'],[s.batt+' kWh LFP','Right: '+e+' ÷ 0.9 ≈ '+need+' kWh, with a little spare'],[s.batt*3+' kWh lead-acid','Heavy, short-lived and far too big']],ok:1,hint:e+' kWh ÷ 0.9.'}; }

function sizeQ(s){
 if(s.kind==='pump'){ const hp=s.hp, L=[[2,'Cannot lift enough water from this depth'],[3,'Too little flow for this need'],[5,''],[7.5,''],[10,'']];
  const opts=[]; const ok=s.hpOpts.indexOf(hp); s.hpOpts.forEach(h=>{ const kw=r1(h*0.98); opts.push([h+' HP · '+kw+' kWp', h===hp?'Right: '+s.hpWhy : h<hp?'Too small: cannot deliver '+s.water+' from '+s.depth:'Oversized: costs more and can draw the well down']); });
  return {q:'Which pump fits '+s.depth+' and about '+s.water+'?',opts,ok,hint:'Deeper water and more water need more horsepower. Arrays are about 1 kWp per HP.'}; }
 if(s.kind==='lights'){ const n=s.len/s.gap+1; const opts=[[ (s.len/(s.gap*2)+1)+' lights','That is every '+(s.gap*2)+' m: dark gaps'],[n+' lights','Right: '+fmt(s.len)+' ÷ '+s.gap+' + 1 = '+n],[ (s.len/(s.gap/2)+1)+' lights','Too close together; wastes money']]; return {q:'Lights every '+s.gap+' m along '+fmt(s.len)+' m, plus one at the start. How many lights?',opts,ok:1,hint:'Count the gaps, then add one.'}; }
 const per=s.psh*30*s.pr, k=s.kwp, u=s.unit||'units';
 const c=[r1(k*0.4),r1(k*0.65),k,r1(k*1.9)];
 const opts=c.map((x,i)=>[x+' kWp · ~'+fmt(x*per)+' '+u, i===2?'Right: '+k+' × '+s.psh+' × 30 × '+s.pr+' ≈ '+fmt(k*per)+' '+u: i<2?'Leaves a big part of the '+(s.cur==='₹'?'bill':'use')+' uncovered':'Far more than needed, and may not fit']);
 return {q:'Which size covers ~'+fmt(s.need)+' '+u+' a month? (kWp × '+s.psh+' h × 30 days × '+s.pr+')',opts,ok:2,hint:'Each kWp gives about '+fmt(per)+' '+u+' a month here.'};
}

function make(s){
 s.kwp = s.kwp || r1(s.n*(s.w||550)/1000);
 const k=s.kind, climate=s.climate;
 const wire = k==='lights' ? [
   {title:'Size the battery',q:'Each '+s.lightW+' W light runs '+s.hours+' hours: '+(s.lightW*s.hours)+' Wh a night. You want 2 nights of backup and use 80% of the battery. Which battery?',opts:[['12.8 V · 20 Ah LFP (256 Wh)','Not even one night'],['12.8 V · '+Math.ceil(s.lightW*s.hours*2/0.8/12.8/10)*10+' Ah LFP','Right: '+(s.lightW*s.hours)+' × 2 ÷ 0.8 ≈ '+Math.round(s.lightW*s.hours*2/0.8)+' Wh'],['12 V · 200 Ah lead-acid','Heavy, theft-prone and short-lived']],ok:1,hint:'Wh per night × 2 ÷ 0.8.'},
   {title:'Size each panel',q:(s.lightW*s.hours)+' Wh a day, '+s.psh+' sun hours, about 25% losses. Which panel per light?',opts:[['20 W','Far too small'],[Math.ceil(s.lightW*s.hours/(s.psh*0.75)/10)*10+' W','Right: '+(s.lightW*s.hours)+' ÷ ('+s.psh+' × 0.75) ≈ '+Math.round(s.lightW*s.hours/(s.psh*0.75))+' W'],['400 W','Too big and too heavy for a pole']],ok:1,hint:'Wh ÷ (sun hours × 0.75).'},
   PROTECT[climate] ] : [wireQ(s), k==='hybrid'?batteryQ(s):cableQ(s), PROTECT[climate]];
 const w=WEATHER[climate](s.met||'Forecast'); const ok=w.pop();
 const units = k==='pump'||k==='lights' ? 0 : Math.round(s.kwp*s.psh*30*s.pr);
 const c={
  id:s.id, region:s.region, country:s.country, lat:s.lat, place:s.place, title:s.title, type:s.type, level:s.level,
  kind:k, climateKey:CLIMATE_KEY[climate], yieldKw:Math.round(s.psh*365*s.pr), co2:s.co2, cur:s.cur, roles:s.roles||ROLES_BY_KIND[k],
  theme:s.theme, route:s.route, cast:cast(s.cast), intro:s.intro,
  clues:Object.fromEntries(Object.entries(s.clues).map(([key,[lab,note,who,line]])=>[key,[lab,note,[who||'you',line||note+'.']]])),
  desk:{title:s.desk[0],rows:s.desk[1],note:s.desk[2]},
  size:sizeQ(s),
  layout:Object.assign({cols:7,rows:3,side:'west',block:'tank',label:k==='pump'?'field':k==='lights'?'lane':'roof',unit:k==='lights'?'pole':'panel'},s.layout||{}),
  wire, weather:{q:(s.met||'Forecast')+' for '+s.town+' this week:',opts:w.map((o,i)=>[['Mon','Tue','Wed','Thu'][i]+' · '+o[0],o[1]]),ok,hint:'Pick the dry, calm window and work early.'},
  crew:crewQ(k), comm:commL(k,s.auth), outro:s.outro,
  summary:s.summary||(s.kwp+' kWp · '+s.n+' × '+(s.w||550)+' W'+(units?' · ~'+fmt(units)+' units a month':''))
 };
 if(k==='pump') c.summary=s.kwp+' kWp array · '+s.n+' × 550 W · '+s.hp+' HP pump';
 if(k==='lights') c.summary=(s.len/s.gap+1)+' × '+s.lightW+' W solar streetlights · 2 nights backup';
 if(!c.layout.panels) c.layout.panels = k==='lights'? Math.min(12,s.len/s.gap+1) : s.n<=13 ? s.n : Math.min(12,Math.ceil(s.n/(s.block||10)));
 if(s.n>13 && k!=='lights'){ c.layout.unit='panel block'; c.layout.note='Each block is '+(s.block||10)+' panels'; }
 c.layout.cols=Math.max(7,Math.ceil((c.layout.panels+1)/3)+3);
 return c;
}

/* ---------- the projects ---------- */
const SPECS=[
/* ===== INDIA (6 new) ===== */
{id:'kochi',region:'India',country:'India',lat:10,place:'Kochi, Kerala, India',town:'Kochi',met:'IMD',title:'Monsoon Roof',type:'Home rooftop · 4.4 kWp',level:'Beginner',kind:'home',n:8,psh:4.5,pr:0.78,need:420,cur:'₹',co2:0.71,climate:'monsoon',mppt:[80,550,600],auth:'KSEB net-meter inspection',
 theme:{sky:['#7FB8DE','#CFE4EE','#EEE4C6'],ground:'#3F7A3F',far:'palms',bldg:'tiled',obst:'palm',sea:true},
 route:{from:'Ernakulam',mid:'NH 66',to:'Vypin island',km:22,sea:'Arabian Sea',hills:'Western Ghats'},
 cast:{client:['Thomas Kurian · retired teacher','inMan'],family:['Annamma · his wife','inWoman'],crew:['Biju · crew lead','crew'],inspector:['Lakshmi · KSEB engineer','inOffF']},
 intro:[['crew','{name}, eight 550 W panels and a 4 kW inverter are on the van. Vypin island is across the bridge.'],['client','Welcome! Our AC and pump push the bill past ₹4,000 in summer.']],
 clues:{load:['Ask for the bill','About 420 units a month','client','Here are the KSEB bills. About 400 to 440 units a month.'],obst:['Coconut palm','A coconut palm on the west shades part of the roof after 2 pm'],roof:['Roof','Flat concrete roof with a water tank, 30 m² free'],grid:['Meter','Single-phase KSEB meter'],site:['Rain','Over 3,000 mm of rain a year'],climate:['Humidity','Sea 2 km away and very humid air']},
 desk:['KSEB · Electricity bill',[['Consumer','Thomas Kurian'],['Tariff','LT-1A Domestic'],['Average','~420 units / month'],['Amount','~₹4,000 in summer']],['Kerala sun:','~4.5 peak hours/day','Losses:','performance 0.78']],
 outro:[['inspector','Net meter fitted. Your export will show on the next bill.'],['client','Even in the monsoon it makes power!'],['family','Now the AC does not scare me when the bill comes.']]},
{id:'nashik',region:'India',country:'India',lat:20,place:'Niphad, Nashik district, Maharashtra, India',town:'Nashik',met:'IMD',title:'Grapes and Sunshine',type:'Solar pump · 7.5 HP · 7.7 kWp',level:'Intermediate',kind:'pump',n:14,w:550,hp:7.5,hpOpts:[3,5,7.5,10],hpWhy:'drip irrigation for 6 acres from 250 ft needs about 7.5 HP',depth:'a 250 ft borewell',water:'70 m³ a day',psh:5.3,pr:0.75,cur:'₹',co2:0.71,climate:'hot',mppt:[250,750,800],auth:'the MSEDCL and agriculture officer',
 theme:{sky:['#8EC6E8','#E3E6D6','#F0DDB0'],ground:'#7E9A4A',far:'hills',bldg:'farm',obst:'mango'},layout:{panels:12,cols:7,rows:3,block:'pumphouse'},
 route:{from:'Nashik city',mid:'Niphad road',to:'Suryamala vineyard',km:40,hills:'Sahyadri foothills'},
 cast:{client:['Sunil Pawar · grape farmer','inFarmer'],family:['Sunita · his wife','inWoman2'],crew:['Ganesh · crew lead','crew'],inspector:['Rahul Jadhav · agriculture officer','inOffM']},
 intro:[['crew','{name}, fourteen panels, a 7.5 HP pump and a controller are on the truck.'],['client','Namaskar! Farm power comes only at night, three days a week. My grapes need water in the day.']],
 clues:{load:['Water need','Drip irrigation for 6 acres needs about 70 m³ a day','client','In February my vines drink about 70 thousand litres a day.'],obst:['Mango tree','A mango tree on the west edge shades the plot after 2 pm'],roof:['Land','Flat land beside the well, 60 m² free'],grid:['Farm feeder','Night-only farm power from MSEDCL'],site:['Borewell','Borewell 250 ft deep, water at about 180 ft','client','The borewell is 250 feet. Water is near 180.'],climate:['Heat','April and May pass 42 °C']},
 desk:['Farm water and pump sheet',[['Farmer','Sunil Pawar'],['Crop','Grapes, 6 acres, drip'],['Water need','~70 m³ / day'],['Borewell','250 ft'],['Water level','~180 ft'],['Scheme','PM-KUSUM / Magel Tyala Saur Pump']],['Nashik sun:','~5.3 peak hours/day','Rule:','~1 kWp per HP']],
 outro:[['inspector','Flow test passed. Scheme papers signed.'],['client','Water in the day, when the vines need it.'],['family','No more waking at 2 am to switch on the pump!']]},
{id:'jaipur',region:'India',country:'India',lat:27,place:'Sitapura industrial area, Jaipur, Rajasthan, India',town:'Jaipur',met:'IMD',title:'Factory Roof in the Pink City',type:'Commercial rooftop · 99 kWp',level:'Expert',kind:'commercial',n:180,psh:5.6,pr:0.78,need:13000,cur:'₹',co2:0.71,climate:'desert',mppt:[200,850,1000],block:15,auth:'JVVNL net-meter inspection',
 theme:{sky:['#86BEE4','#E8E2CF','#F0D7A2'],ground:'#CBA978',far:'city',bldg:'warehouse',obst:'building',sign:'RAJ BLOCK PRINTS'},layout:{cols:7,rows:3},
 route:{from:'Jaipur city',mid:'Tonk road',to:'Sitapura',km:18,hills:'Aravalli hills'},
 cast:{client:['Vikram Singh · factory owner','inTurban'],family:['Neha · finance head','inOffF',{glasses:false}],crew:['Rakesh · site lead','crew'],inspector:['Mr Meena · JVVNL engineer','inOffM']},
 intro:[['crew','{name}, 180 panels, two 50 kW inverters and the rails arrive in three trucks.'],['client','Our dye and print machines run all day. The power bill is our second-biggest cost.']],
 clues:{load:['Bills','About 13,000 units a month, mostly in daytime','client','Thirteen thousand units a month, from 9 to 6.'],obst:['Next building','A taller building on the west shades one corner after 3 pm'],roof:['Roof','Metal sheet roof, 900 m², checked for load'],grid:['Supply','Three-phase HT connection'],site:['Hours','Machines run 9 am to 6 pm, six days a week'],climate:['Dust and heat','Desert dust and 45 °C summers']},
 desk:['JVVNL · HT bill',[['Consumer','Raj Block Prints'],['Tariff','Industrial, three-phase'],['Units','~13,000 / month'],['Rate','~₹8 per unit']],['Jaipur sun:','~5.6 peak hours/day','Losses:','performance 0.78']],
 outro:[['inspector','Both inverters synchronised. Net meter sealed.'],['client','Our biggest cost just got much smaller.'],['family','Payback in about four years. I like those numbers.']]},
{id:'shillong',region:'India',country:'India',lat:25.6,place:'Near Shillong, Meghalaya, India',town:'Shillong',met:'IMD',title:'School in the Clouds',type:'School rooftop · 3.3 kWp',level:'Intermediate',kind:'school',n:6,psh:4.0,pr:0.78,need:300,cur:'₹',co2:0.71,climate:'monsoon',mppt:[80,550,600],auth:'MePDCL inspection',
 theme:{sky:['#9FC3DB','#D7E3EA','#E8E6D8'],ground:'#4E7D45',far:'hills',bldg:'school',obst:'pine',sign:'MAWLYNNONG SCHOOL'},
 route:{from:'Shillong',mid:'Pynursla road',to:'Mawlynnong',km:78,hills:'Khasi hills'},
 cast:{client:['Ms Kharkongor · headteacher','inOffF',{bindi:false}],family:['Daniel · Class 9 student','inGirl',{bun:false}],crew:['Bah Ricky · crew lead','crew'],inspector:['Mr Lyngdoh · MePDCL engineer','inOffM']},
 intro:[['crew','{name}, six panels and a 3 kW inverter. The road through the Khasi hills is steep and wet.'],['client','Kublei! Power cuts stop our computer class twice a week.']],
 clues:{load:['School bill','About 300 units a month','client','Fans are few here, but the computer lab uses a lot.'],obst:['Pine tree','A pine tree east of the roof shades it before 10 am'],roof:['Roof','Tin roof on steel trusses, south slope'],grid:['Meter','Single-phase, frequent cuts'],site:['Fog','Fog on many mornings'],climate:['Rain','One of the wettest places on earth']},
 desk:['MePDCL · School bill',[['Consumer','Govt LP School'],['Units','~300 / month'],['Cuts','2–3 a week']],['Meghalaya sun:','~4.0 peak hours/day','Losses:','performance 0.78']],
 layout:{side:'east',block:'tank'},
 outro:[['inspector','Earthing and net meter approved.'],['client','The computer class can run all week now.'],['family','We can see how many units the roof makes on the screen!']]},
{id:'sundarbans',region:'India',country:'India',lat:21.9,place:'Gosaba, Sundarbans, West Bengal, India',town:'Gosaba',met:'IMD',title:'Island Clinic Light',type:'Hybrid clinic · 4.4 kWp + 10 kWh battery',level:'Advanced',kind:'hybrid',n:8,psh:4.6,pr:0.75,need:420,night:8,batt:10,cur:'₹',co2:0.71,climate:'cyclone',mppt:[120,500,550],auth:'the block health officer',
 theme:{sky:['#86BEE0','#D9E8EC','#EDE3C4'],ground:'#4B7D4A',far:'palms',bldg:'clinic',obst:'palm',sea:true},
 route:{from:'Canning',mid:'Ferry from Gadkhali',to:'Gosaba island',km:55,sea:'Bay of Bengal',hills:'Mangrove delta'},
 cast:{client:['Dr Ananya Mondal · clinic doctor','inOffF'],family:['Rina · nurse','inWoman'],crew:['Subrata · crew lead','crew'],inspector:['Mr Das · block health officer','inOffM']},
 intro:[['crew','{name}, the panels, a hybrid inverter and a 10 kWh battery go across on the ferry.'],['client','Nomoskar. When the grid fails we deliver babies by torchlight, and the vaccine fridge warms up.']],
 clues:{load:['Clinic load','About 420 units a month; fridge, lights, fans','client','The vaccine fridge never stops. Lights and fans run at night.'],obst:['Palm','A palm on the west side shades the roof after 2 pm'],roof:['Roof','Concrete roof, raised above flood level'],grid:['Grid','Weak grid, cuts for hours'],site:['Night load','About 8 kWh used between sunset and sunrise'],climate:['Cyclones','Cyclones every few years and salty air']},
 desk:['Clinic energy sheet',[['Clinic','Gosaba PHC sub-centre'],['Use','~420 units / month'],['Night use','~8 kWh'],['Grid','Cuts 4–6 h a day']],['Delta sun:','~4.6 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Switch-over test passed. The fridge never blinked.'],['client','No more deliveries by torchlight.'],['family','The vaccines stay cold even in a storm.']]},
{id:'goa',region:'India',country:'India',lat:15.3,place:'Canacona, South Goa, India',town:'Canacona',met:'IMD',title:'Beach Road Lights',type:'Village streetlights · 25 lights',level:'Beginner',kind:'lights',len:1200,gap:50,lightW:30,hours:12,psh:5.2,cur:'₹',co2:0.71,climate:'coastal',auth:'the village panchayat',
 theme:{sky:['#7FC4E8','#CFE8F2','#F4E7C8'],ground:'#5E8F45',far:'palms',bldg:'lane',obst:'palm',sea:true},
 route:{from:'Margao',mid:'NH 66',to:'Agonda village',km:40,sea:'Arabian Sea',hills:'Western Ghats'},
 cast:{client:['Maria Fernandes · sarpanch','inWoman',{bindi:false,saree:'#2F6E9E'}],family:['Rohan · fisherman','inMan'],crew:['Santosh · crew lead','crew'],inspector:['Mr Naik · block engineer','inOffM']},
 intro:[['crew','{name}, 25 all-in-one lights and poles are on the truck to Agonda.'],['client','Bom dia! The road from the beach to the market is dark. Fishermen walk it at 4 am.']],
 clues:{load:['Road','The road is 1.2 km long','client','From the church to the beach, about 1.2 km.'],obst:['Palms','Coconut palms shade some pole spots'],roof:['Pole base','Sandy soil; poles need deep concrete bases'],grid:['Grid','No streetlight line on this road'],site:['Night use','Lights needed 12 hours'],climate:['Salt air','The sea is 200 m away']},
 desk:['Road survey sheet',[['Village','Agonda'],['Road','1,200 m'],['Spacing','every 50 m'],['Light','30 W all-in-one LED'],['Hours','12 per night']],['Goa sun:','~5.2 peak hours/day','Battery rule:','2 nights backup']],
 outro:[['inspector','All 25 lights pass the night test.'],['client','The beach road is bright and safe.'],['family','We walk to the boats at 4 am with light now.']]},

/* ===== MIDDLE EAST (9 new) ===== */
{id:'muscat',region:'Middle East',country:'Oman',lat:23.6,place:'Al Seeb, Muscat, Oman',town:'Muscat',met:'Oman Met',title:'Villa by the Gulf',type:'Home rooftop · 9.9 kWp',level:'Intermediate',kind:'home',n:18,psh:6.0,pr:0.77,need:1350,unit:'kWh',cur:'OMR',co2:0.5,climate:'coastal',mppt:[160,850,1000],block:6,auth:'Sahim programme inspection',
 theme:{sky:['#7DB8E2','#E8E3D2','#EED7A8'],ground:'#CDB083',far:'hills',bldg:'flat',obst:'palm',sea:true},
 route:{from:'Muscat',mid:'Sultan Qaboos Street',to:'Al Seeb',km:35,sea:'Gulf of Oman',hills:'Hajar mountains'},
 cast:{client:['Salim Al Balushi · homeowner','gulfMan'],family:['Aisha · his wife','gulfWoman'],crew:['Rajan · crew lead','crew'],inspector:['Mr Al Hinai · Nama inspector','gulfOff']},
 intro:[['crew','{name}, eighteen panels and a three-phase inverter are loaded for Al Seeb.'],['client','As-salamu alaykum! The AC runs nine months a year.']],
 clues:{load:['Ask for the bill','About 1,350 kWh a month','client','Summer bills reach 2,000 kWh; the year averages 1,350.'],obst:['Date palm','A date palm on the west shades one corner after 3 pm'],roof:['Roof','Flat concrete roof with a parapet, 70 m² free'],grid:['Meter','Three-phase meter'],site:['AC units','Six split AC units on the roof'],climate:['Salt and heat','Sea 1 km away and 45 °C summers']},
 desk:['Nama · Electricity bill',[['Account','Al Balushi villa'],['Average','~1,350 kWh / month'],['Scheme','Sahim net metering']],['Muscat sun:','~6.0 peak hours/day','Losses:','performance 0.77']],
 layout:{block:'ac'},
 outro:[['inspector','Net meter approved under Sahim.'],['client','The sun that heats the house now pays for the AC.'],['family','Shukran! The bill will be much lighter.']]},
{id:'doha',region:'Middle East',country:'Qatar',lat:25.3,place:'Al Rayyan, Doha, Qatar',town:'Doha',met:'QMD',title:'Shade and Power',type:'School rooftop · 33 kWp',level:'Advanced',kind:'school',n:60,psh:6.1,pr:0.76,need:4600,unit:'kWh',cur:'QAR',co2:0.49,climate:'desert',mppt:[200,850,1000],block:12,auth:'Kahramaa inspection',
 theme:{sky:['#7DB8E2','#E8E3D2','#EED7A8'],ground:'#D3B88A',far:'city',bldg:'school',obst:'building',sign:'AL RAYYAN SCHOOL'},
 route:{from:'West Bay',mid:'Al Rayyan Road',to:'Al Rayyan',km:15,hills:'Desert'},
 cast:{client:['Mr Al Kuwari · principal','gulfMan'],family:['Fatima · science teacher','gulfWoman'],crew:['Joseph · crew lead','crew'],inspector:['Eng. Al Marri · Kahramaa','gulfOff']},
 intro:[['crew','{name}, sixty panels and a 30 kW inverter for the school roof.'],['client','Marhaba! Our science club wants a roof that teaches and saves.']],
 clues:{load:['School use','About 4,600 kWh a month in the day','client','Mostly AC and lights, all during school hours.'],obst:['Tower','A tall building on the west shades one end after 3 pm'],roof:['Roof','Flat concrete roof, 300 m² free'],grid:['Supply','Three-phase supply'],site:['Hours','School runs 7 am to 2 pm'],climate:['Dust','Dust storms and 46 °C summers']},
 desk:['Kahramaa · School bill',[['Account','Al Rayyan School'],['Use','~4,600 kWh / month'],['Peak','School hours']],['Doha sun:','~6.1 peak hours/day','Losses:','performance 0.76']],
 outro:[['inspector','Grid connection approved.'],['client','The roof now runs the science lab.'],['family','My students will track the output every day.']]},
{id:'jeddah',region:'Middle East',country:'Saudi Arabia',lat:21.5,place:'Al Khumrah, Jeddah, Saudi Arabia',town:'Jeddah',met:'NCM',title:'Cold Store on the Red Sea',type:'Commercial rooftop · 198 kWp',level:'Expert',kind:'commercial',n:360,psh:6.2,pr:0.77,need:28000,unit:'kWh',cur:'SAR',co2:0.57,climate:'coastal',mppt:[200,850,1000],block:30,auth:'SEC inspection',
 theme:{sky:['#7DB8E2','#E8E3D2','#EED7A8'],ground:'#CDB083',far:'city',bldg:'warehouse',obst:'building',sea:true,sign:'RED SEA COLD STORE'},
 route:{from:'Jeddah port',mid:'Al Khumrah road',to:'Logistics zone',km:20,sea:'Red Sea',hills:'Hejaz hills'},
 cast:{client:['Mr Al Ghamdi · operations head','gulfMan'],family:['Nora · energy manager','gulfWoman'],crew:['Imran · site lead','crew'],inspector:['Eng. Al Harbi · SEC','gulfOff']},
 intro:[['crew','{name}, 360 panels and four 50 kW inverters. It is the biggest roof yet.'],['client','Our cold rooms run day and night. Cooling is most of our bill.']],
 clues:{load:['Bills','About 28,000 kWh a month','client','Cold rooms, about 28 thousand kWh every month.'],obst:['Next warehouse','A taller warehouse on the west shades one edge after 3 pm'],roof:['Roof','Metal roof, 2,000 m², checked for load'],grid:['Supply','Medium-voltage connection'],site:['Hours','Cooling peaks at midday'],climate:['Salt and humidity','Red Sea air is salty and humid']},
 desk:['SEC · Commercial bill',[['Account','Red Sea Cold Store'],['Use','~28,000 kWh / month'],['Peak','Midday cooling']],['Jeddah sun:','~6.2 peak hours/day','Losses:','performance 0.77']],
 outro:[['inspector','All four inverters approved.'],['client','The hotter the day, the more the roof gives.'],['family','We cut cooling cost by more than a third.']]},
{id:'amman',region:'Middle East',country:'Jordan',lat:31.9,place:'Khalda, Amman, Jordan',town:'Amman',met:'JMD',title:'Hilltop Home',type:'Home rooftop · 5.5 kWp',level:'Beginner',kind:'home',n:10,psh:5.5,pr:0.8,need:720,unit:'kWh',cur:'JOD',co2:0.45,climate:'hot',mppt:[100,550,600],auth:'JEPCO net-meter inspection',
 theme:{sky:['#7DB8E2','#E2E6E0','#EEDDB4'],ground:'#B9A87E',far:'hills',bldg:'flat',obst:'oak'},
 route:{from:'Downtown Amman',mid:'Mecca Street',to:'Khalda',km:12,hills:'Amman hills'},
 cast:{client:['Omar Haddad · engineer','levMan'],family:['Rania · his wife','levWoman'],crew:['Khaled · crew lead','crew3'],inspector:['Mr Nasser · JEPCO','levMan',{glasses:true}]},
 intro:[['crew','{name}, ten panels and a 5 kW inverter for the Khalda roof.'],['client','Ahlan! Winter heating and summer AC both raise our bill.']],
 clues:{load:['Ask for the bill','About 720 kWh a month','client','Around 700 kWh, more in January and August.'],obst:['Olive tree','An olive tree on the west shades a corner late in the day'],roof:['Roof','Flat roof with water tanks and a solar water heater'],grid:['Meter','Single-phase meter'],site:['Tanks','Two water tanks take roof space'],climate:['Heat and snow','Hot summers, sometimes snow in winter']},
 desk:['JEPCO · Electricity bill',[['Account','Haddad home'],['Average','~720 kWh / month'],['Scheme','Net metering']],['Amman sun:','~5.5 peak hours/day','Losses:','performance 0.80']],
 outro:[['inspector','Net meter installed.'],['client','A quiet roof that pays the bill.'],['family','Now the heater in winter does not worry me.']]},
{id:'wadirum',region:'Middle East',country:'Jordan',lat:29.6,place:'Wadi Rum, Aqaba, Jordan',town:'Wadi Rum',met:'JMD',title:'Desert Camp Nights',type:'Off-grid camp · 6.6 kWp + 15 kWh battery',level:'Advanced',kind:'hybrid',n:12,psh:6.3,pr:0.75,need:850,night:13,batt:15,unit:'kWh',cur:'JOD',co2:0.45,climate:'desert',mppt:[120,500,550],auth:'the camp owner',
 theme:{sky:['#7DB8E2','#EBD9BC','#E8B880'],ground:'#C98E5A',far:'dunes',bldg:'flat',obst:'tree'},
 route:{from:'Aqaba',mid:'Desert Highway',to:'Wadi Rum camp',km:65,hills:'Sandstone mountains'},
 cast:{client:['Suleiman · camp owner','gulfMan'],family:['Mariam · his daughter','gulfWoman'],crew:['Fadi · crew lead','crew3'],inspector:['Mr Zawaideh · electrician','levMan']},
 intro:[['crew','{name}, twelve panels, a hybrid inverter and a 15 kWh battery. No grid for 30 km.'],['client','Welcome to Rum. My diesel generator roars all night and guests hate it.']],
 clues:{load:['Camp load','About 850 kWh a month','client','Lights, a fridge, a water pump and phone charging.'],obst:['Acacia','An acacia west of the tents shades a corner after 3 pm'],roof:['Ground','Sandy ground, panels on a raised frame'],grid:['Grid','No grid; diesel generator now'],site:['Night use','About 13 kWh after sunset'],climate:['Sand','Sand storms and cold desert nights']},
 desk:['Camp energy sheet',[['Camp','Rum Stars'],['Use','~850 kWh / month'],['Night use','~13 kWh'],['Diesel','~12 L a night']],['Rum sun:','~6.3 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Generator off, lights on. Silent night.'],['client','Now guests hear only the wind.'],['family','We save the diesel money for the camels!']]},
{id:'alain',region:'Middle East',country:'UAE',lat:24.2,place:'Al Ain, Abu Dhabi, UAE',town:'Al Ain',met:'NCM',title:'Date Palm Water',type:'Solar pump · 10 HP · 9.9 kWp',level:'Intermediate',kind:'pump',n:18,hp:10,hpOpts:[3,5,7.5,10],hpWhy:'drip for 1,200 date palms from 300 ft needs about 10 HP',depth:'a 300 ft well',water:'120 m³ a day',psh:6.0,pr:0.75,cur:'AED',co2:0.45,climate:'desert',mppt:[300,750,800],auth:'the farm',
 theme:{sky:['#7DB8E2','#E8E3D2','#EED7A8'],ground:'#CDB083',far:'dunes',bldg:'farm',obst:'palm'},layout:{panels:12,block:'pumphouse'},
 route:{from:'Al Ain city',mid:'Al Khatm road',to:'Al Wagan farms',km:60,hills:'Hafeet mountain'},
 cast:{client:['Hamad Al Dhaheri · farmer','gulfMan'],family:['Mouza · his mother','gulfWoman'],crew:['Anwar · crew lead','crew'],inspector:['Eng. Al Kaabi · agriculture','gulfOff']},
 intro:[['crew','{name}, eighteen panels and a 10 HP pump for the date farm.'],['client','Marhaba! My diesel pump for the palms costs too much and breaks in summer.']],
 clues:{load:['Water need','About 120 m³ a day for 1,200 palms','client','In summer the palms drink 120 thousand litres a day.'],obst:['Date palm','A big date palm shades the west edge after 3 pm'],roof:['Land','Flat sandy land, 80 m² free'],grid:['Power','No grid line at the well'],site:['Well','Well 300 ft deep, water at 220 ft'],climate:['Heat and dust','Summers pass 48 °C']},
 desk:['Farm water sheet',[['Farm','Al Dhaheri dates'],['Palms','1,200'],['Water','~120 m³ / day'],['Well','300 ft'],['Water level','~220 ft']],['Al Ain sun:','~6.0 peak hours/day','Rule:','~1 kWp per HP']],
 outro:[['inspector','Flow is right for the drip lines.'],['client','The sun waters the palms now.'],['family','No more diesel smell near the house.']]},
{id:'kuwait',region:'Middle East',country:'Kuwait',lat:29.3,place:'Salwa, Kuwait',town:'Kuwait City',met:'KMD',title:'Fifty Degrees',type:'Home rooftop · 13.2 kWp',level:'Expert',kind:'home',n:24,psh:6.0,pr:0.74,need:1750,unit:'kWh',cur:'KWD',co2:0.6,climate:'hot',mppt:[160,850,1000],block:6,auth:'MEW inspection',
 theme:{sky:['#8AB8DA','#E8E3D2','#EED7A8'],ground:'#D3B88A',far:'city',bldg:'flat',obst:'building'},
 route:{from:'Kuwait City',mid:'Fifth Ring Road',to:'Salwa',km:16,sea:'Arabian Gulf',hills:'Desert'},
 cast:{client:['Abdullah Al Sabah · homeowner','gulfMan'],family:['Hessa · his sister','gulfWoman'],crew:['Thomas · crew lead','crew'],inspector:['Eng. Al Mutairi · MEW','gulfOff']},
 intro:[['crew','{name}, 24 panels for a big villa. The roof hits 75 °C at noon.'],['client','Hello! In August it is 50 °C. The AC never stops.']],
 clues:{load:['Ask for the bill','About 1,750 kWh a month','client','The house uses about 1,750 kWh a month.'],obst:['Neighbour','A taller villa on the west shades one corner after 3 pm'],roof:['Roof','Flat roof, 120 m² free'],grid:['Meter','Three-phase'],site:['Peak','Use peaks at 2 pm'],climate:['Extreme heat','Summers reach 50 °C']},
 desk:['MEW · Electricity bill',[['Account','Salwa villa'],['Average','~1,750 kWh / month'],['Peak','Afternoon AC']],['Kuwait sun:','~6.0 peak hours/day','Losses:','performance 0.74']],
 layout:{block:'ac'},
 outro:[['inspector','Connection approved.'],['client','The heat now works for us.'],['family','We will paint the roof white under the panels too.']]},
{id:'salalah',region:'Middle East',country:'Oman',lat:17,place:'Salalah, Dhofar, Oman',town:'Salalah',met:'Oman Met',title:'Clinic in the Khareef',type:'Hybrid clinic · 5.5 kWp + 10 kWh battery',level:'Advanced',kind:'hybrid',n:10,psh:5.2,pr:0.75,need:620,night:8,batt:10,unit:'kWh',cur:'OMR',co2:0.5,climate:'coastal',mppt:[120,500,550],auth:'the health directorate',
 theme:{sky:['#9DBFD6','#D6E1E6','#E6E2D2'],ground:'#5E8F45',far:'palms',bldg:'clinic',obst:'palm',sea:true},
 route:{from:'Salalah',mid:'Coast road',to:'Taqah',km:35,sea:'Arabian Sea',hills:'Dhofar mountains'},
 cast:{client:['Dr Shamsa Al Mashani · doctor','gulfWoman'],family:['Saeed · nurse','gulfMan'],crew:['Prakash · crew lead','crew'],inspector:['Mr Al Amri · health directorate','gulfOff']},
 intro:[['crew','{name}, ten panels, a hybrid inverter and a 10 kWh battery for the Taqah clinic.'],['client','In the khareef monsoon the grid drops and our medicine fridge suffers.']],
 clues:{load:['Clinic use','About 620 kWh a month','client','Fridge, lights, a sterilizer and fans.'],obst:['Coconut palm','A palm on the west shades the roof after 3 pm'],roof:['Roof','Flat concrete roof'],grid:['Grid','Cuts during the khareef'],site:['Night use','About 8 kWh at night'],climate:['Khareef','Cloudy, misty monsoon June to September']},
 desk:['Clinic energy sheet',[['Clinic','Taqah health centre'],['Use','~620 kWh / month'],['Night use','~8 kWh'],['Cuts','Khareef months']],['Salalah sun:','~5.2 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Switch-over test passed.'],['client','The fridge stays cold all monsoon.'],['family','Shukran, the night shift has light.']]},
{id:'beirut',region:'Middle East',country:'Lebanon',lat:33.9,place:'Achrafieh, Beirut, Lebanon',town:'Beirut',met:'LMS',title:'Twenty Hours of Darkness',type:'Hybrid home · 4.4 kWp + 10 kWh battery',level:'Intermediate',kind:'hybrid',n:8,psh:5.2,pr:0.77,need:480,night:7,batt:10,unit:'kWh',cur:'USD',co2:0.7,climate:'coastal',mppt:[120,500,550],auth:'the building committee',
 theme:{sky:['#7DB8E2','#DDE6EA','#EADCB8'],ground:'#9AA07A',far:'city',bldg:'flat',obst:'building',sea:true},
 route:{from:'Beirut port',mid:'Charles Malek Avenue',to:'Achrafieh',km:5,sea:'Mediterranean Sea',hills:'Mount Lebanon'},
 cast:{client:['Georges Khoury · pharmacist','levMan'],family:['Maya · his daughter','levWoman'],crew:['Elie · crew lead','crew3'],inspector:['Mr Haddad · building committee','levMan',{glasses:true}]},
 intro:[['crew','{name}, eight panels, a hybrid inverter and a battery up six floors of stairs.'],['client','Bonjour! State power comes only a few hours a day. The generator bill is crushing us.']],
 clues:{load:['Use','About 480 kWh a month','client','Fridge, lights, internet, a few fans.'],obst:['Next tower','A taller block on the west shades the roof after 2 pm'],roof:['Roof','Shared flat roof; space agreed with neighbours'],grid:['Grid','State power 2–4 hours a day; private generator'],site:['Night use','About 7 kWh at night'],climate:['Sea air','Mediterranean coast, salty air']},
 desk:['Home energy sheet',[['Home','Khoury apartment'],['Use','~480 kWh / month'],['State power','2–4 h / day'],['Generator','~$120 / month']],['Beirut sun:','~5.2 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Wiring checked; the neighbours are happy.'],['client','The lights stay on when the grid goes.'],['family','I can study at night without the generator noise.']]},

/* ===== AFRICA (9 new) ===== */
{id:'lagos',region:'Africa',country:'Nigeria',lat:6.5,place:'Ikeja, Lagos, Nigeria',town:'Lagos',met:'NiMet',title:'Goodbye Generator',type:'Hybrid home · 5.5 kWp + 10 kWh battery',level:'Intermediate',kind:'hybrid',n:10,psh:4.7,pr:0.75,need:550,night:8,batt:10,unit:'kWh',cur:'NGN',co2:0.43,climate:'tropical',mppt:[120,500,550],auth:'the estate electrician',
 theme:{sky:['#8AB8DA','#D9E6E8','#EAD9B0'],ground:'#5E8F45',far:'city',bldg:'flat',obst:'mango'},
 route:{from:'Lagos Island',mid:'Third Mainland Bridge',to:'Ikeja GRA',km:22,sea:'Lagos Lagoon',hills:'Coastal plain'},
 cast:{client:['Mr Adebayo · business owner','afMan'],family:['Mrs Adebayo · teacher','afWoman'],crew:['Chinedu · crew lead','crew2'],inspector:['Engr. Okafor · electrician','afMan2']},
 intro:[['crew','{name}, ten panels, a hybrid inverter and a 10 kWh battery for Ikeja.'],['client','Welcome! NEPA light comes and goes. Our generator eats fuel every night.']],
 clues:{load:['Use','About 550 kWh a month','client','Freezer, fans, lights, TV and the borehole pump.'],obst:['Mango tree','A mango tree on the west shades a corner in the afternoon'],roof:['Roof','Long-span aluminium roof, 40 m² south side'],grid:['Grid','Grid supply about 10 hours a day'],site:['Night use','About 8 kWh at night'],climate:['Humidity','Hot, humid, heavy rains']},
 desk:['Home energy sheet',[['Home','Adebayo house'],['Use','~550 kWh / month'],['Grid','~10 h / day'],['Fuel','₦ high every week']],['Lagos sun:','~4.7 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Changeover tested. Generator on standby only.'],['client','Quiet nights at last.'],['family','The freezer is safe and the fuel money stays in my purse.']]},
{id:'kano',region:'Africa',country:'Nigeria',lat:12,place:'Near Kano, Nigeria',town:'Kano',met:'NiMet',title:'Onions in the Sahel',type:'Solar pump · 3 HP · 3.3 kWp',level:'Beginner',kind:'pump',n:6,hp:3,hpOpts:[2,3,5,7.5],hpWhy:'a shallow 60 ft well for 2 acres needs about 3 HP',depth:'a 60 ft well',water:'30 m³ a day',psh:6.0,pr:0.75,cur:'NGN',co2:0.43,climate:'desert',mppt:[150,450,500],auth:'the farmer cooperative',
 theme:{sky:['#8EC6E8','#E6E2CF','#F1D9A6'],ground:'#CBA978',far:'savanna',bldg:'farm',obst:'acacia'},layout:{block:'pumphouse'},
 route:{from:'Kano city',mid:'Zaria road',to:'Kura farms',km:35,hills:'Sahel plain'},
 cast:{client:['Malam Ibrahim · onion farmer','naMan'],family:['Hauwa · his wife','naWoman'],crew:['Sani · crew lead','crew2'],inspector:['Mr Bello · cooperative officer','afMan2']},
 intro:[['crew','{name}, six panels and a 3 HP surface pump for the onion farm.'],['client','Sannu! Petrol for my pump costs more every season.']],
 clues:{load:['Water need','About 30 m³ a day for 2 acres','client','Two acres of onions need about 30 thousand litres a day.'],obst:['Neem tree','A neem tree on the west shades the plot after 3 pm'],roof:['Land','Flat land by the well'],grid:['Power','No grid; petrol pump now'],site:['Well','Well 60 ft deep, water at 40 ft'],climate:['Harmattan','Dusty harmattan winds December to February']},
 desk:['Farm water sheet',[['Farmer','Malam Ibrahim'],['Crop','Onions, 2 acres'],['Water','~30 m³ / day'],['Well','60 ft'],['Water level','~40 ft']],['Kano sun:','~6.0 peak hours/day','Rule:','~1 kWp per HP']],
 outro:[['inspector','Flow test passed.'],['client','No more petrol queues.'],['family','More onions to sell at the market!']]},
{id:'accra',region:'Africa',country:'Ghana',lat:5.6,place:'Madina, Accra, Ghana',town:'Accra',met:'GMet',title:'Lights for the Lab',type:'School rooftop · 5.5 kWp',level:'Beginner',kind:'school',n:10,psh:4.8,pr:0.77,need:600,unit:'kWh',cur:'GHS',co2:0.4,climate:'tropical',mppt:[100,550,600],auth:'ECG inspection',
 theme:{sky:['#86BEE0','#D9E6E8','#EAD9B0'],ground:'#6E8F45',far:'plains',bldg:'school',obst:'mango',sign:'MADINA BASIC SCHOOL'},
 route:{from:'Accra Central',mid:'Liberation Road',to:'Madina',km:18,sea:'Gulf of Guinea',hills:'Akuapem ridge'},
 cast:{client:['Mrs Mensah · headteacher','afWoman'],family:['Kofi · student','afMan',{shirt:'#2E8B57'}],crew:['Kwame · crew lead','crew2'],inspector:['Mr Owusu · ECG engineer','afMan2']},
 intro:[['crew','{name}, ten panels and a 5 kW inverter for the Madina school.'],['client','Akwaaba! Dumsor cuts stop our ICT classes.']],
 clues:{load:['School use','About 600 kWh a month','client','The ICT lab and fans use most of it.'],obst:['Mango tree','A mango tree on the west shades a corner after 2 pm'],roof:['Roof','Aluminium roof sheets on timber'],grid:['Grid','Frequent cuts'],site:['Hours','School runs 7 am to 3 pm'],climate:['Rain','Two rainy seasons']},
 desk:['ECG · School bill',[['Account','Madina Basic'],['Use','~600 kWh / month'],['Cuts','Several a week']],['Accra sun:','~4.8 peak hours/day','Losses:','performance 0.77']],
 outro:[['inspector','Grid tie approved.'],['client','The ICT class will not stop now.'],['family','We can watch the power numbers in class!']]},
{id:'marrakech',region:'Africa',country:'Morocco',lat:31.6,place:'Medina, Marrakech, Morocco',town:'Marrakech',met:'DMN',title:'Riad Roof',type:'Home rooftop · 6.6 kWp',level:'Intermediate',kind:'home',n:12,psh:5.6,pr:0.78,need:860,unit:'kWh',cur:'MAD',co2:0.63,climate:'hot',mppt:[100,550,600],auth:'ONEE inspection',
 theme:{sky:['#7DB8E2','#E8E1D2','#EBC9A0'],ground:'#C08A5A',far:'city',bldg:'flat',obst:'palm'},
 route:{from:'Gueliz',mid:'Bab Doukkala',to:'The medina',km:6,hills:'Atlas mountains'},
 cast:{client:['Youssef · riad owner','naMan'],family:['Khadija · his mother','naWoman'],crew:['Hamid · crew lead','crew3'],inspector:['Mr Benali · ONEE','naMan',{glasses:true}]},
 intro:[['crew','{name}, twelve panels carried by hand through the medina lanes.'],['client','Marhaba! My guest riad needs AC and hot water all year.']],
 clues:{load:['Use','About 860 kWh a month','client','Eight rooms with AC in summer.'],obst:['Palm','A palm in the courtyard shades part of the roof after 3 pm'],roof:['Roof terrace','Flat terrace, 50 m² free'],grid:['Meter','Three-phase'],site:['Access','No trucks in the medina; carry by hand'],climate:['Heat','Summers above 42 °C']},
 desk:['ONEE · Electricity bill',[['Account','Riad Dar Shams'],['Use','~860 kWh / month']],['Marrakech sun:','~5.6 peak hours/day','Losses:','performance 0.78']],
 outro:[['inspector','Connection approved.'],['client','Guests love that the riad runs on sunshine.'],['family','The roof terrace still has room for my mint.']]},
{id:'cairo',region:'Africa',country:'Egypt',lat:30.1,place:'10th of Ramadan City, Egypt',town:'Cairo',met:'EMA',title:'Textile Mill',type:'Commercial rooftop · 99 kWp',level:'Expert',kind:'commercial',n:180,psh:6.0,pr:0.77,need:14000,unit:'kWh',cur:'EGP',co2:0.47,climate:'desert',mppt:[200,850,1000],block:15,auth:'EEHC net-meter inspection',
 theme:{sky:['#86BEE4','#E8E2CF','#F0D7A2'],ground:'#CDB083',far:'city',bldg:'warehouse',obst:'building',sign:'NILE COTTON MILL'},
 route:{from:'Cairo',mid:'Ismailia desert road',to:'10th of Ramadan',km:55,hills:'Eastern desert'},
 cast:{client:['Mr Hassan · mill owner','naMan'],family:['Dina · plant engineer','naWoman'],crew:['Mahmoud · site lead','crew3'],inspector:['Eng. Farouk · EEHC','naMan',{glasses:true}]},
 intro:[['crew','{name}, 180 panels and two 50 kW inverters for the mill roof.'],['client','Our looms run all day. Power prices keep rising.']],
 clues:{load:['Bills','About 14,000 kWh a month','client','Fourteen thousand kWh, mostly daytime.'],obst:['Silo','A tall silo west of the roof shades a corner after 3 pm'],roof:['Roof','Steel roof, 1,000 m²'],grid:['Supply','Medium-voltage connection'],site:['Hours','Two daytime shifts'],climate:['Dust','Desert dust and khamsin winds']},
 desk:['EEHC · Industrial bill',[['Account','Nile Cotton Mill'],['Use','~14,000 kWh / month']],['Cairo sun:','~6.0 peak hours/day','Losses:','performance 0.77']],
 outro:[['inspector','Inverters synchronised.'],['client','The looms now run on the sun.'],['family','We will clean the panels every two weeks.']]},
{id:'kigali',region:'Africa',country:'Rwanda',lat:-1.95,place:'Near Musanze, Rwanda',town:'Musanze',met:'Meteo Rwanda',title:'School of a Thousand Hills',type:'School rooftop · 4.4 kWp',level:'Intermediate',kind:'school',n:8,psh:4.8,pr:0.78,need:450,unit:'kWh',cur:'RWF',co2:0.35,climate:'tropical',mppt:[80,550,600],auth:'REG inspection',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#4E8A3A',far:'hills',bldg:'school',obst:'jacaranda',sign:'MUSANZE SCHOOL'},
 route:{from:'Kigali',mid:'Musanze road',to:'Kinigi',km:100,hills:'Virunga volcanoes'},
 cast:{client:['Mrs Uwase · headteacher','afWoman'],family:['Eric · student','afMan',{shirt:'#2F6E9E'}],crew:['Jean-Paul · crew lead','crew2'],inspector:['Mr Habimana · REG','afMan2']},
 intro:[['crew','{name}, eight panels and a 4 kW inverter. The road winds through a thousand hills.'],['client','Muraho! We want the computer room open every day.']],
 clues:{load:['School use','About 450 kWh a month','client','Computers, lights and a water pump.'],obst:['Jacaranda','A jacaranda on the west shades the roof after 3 pm'],roof:['Roof','Iron sheet roof, north slope'],grid:['Grid','Weak rural line'],site:['Equator','Just south of the equator: the sun passes to the north'],climate:['Rain','Two rainy seasons and lightning']},
 desk:['REG · School bill',[['Account','Kinigi school'],['Use','~450 kWh / month']],['Rwanda sun:','~4.8 peak hours/day','Losses:','performance 0.78']],
 outro:[['inspector','Grid tie approved.'],['client','The computer room is open every day now.'],['family','Murakoze! I will learn coding here.']]},
{id:'arusha',region:'Africa',country:'Tanzania',lat:-3.4,place:'Near Arusha, Tanzania',town:'Arusha',met:'TMA',title:'Market Road Lights',type:'Village streetlights · 31 lights',level:'Beginner',kind:'lights',len:1500,gap:50,lightW:30,hours:12,psh:5.5,cur:'TZS',co2:0.4,climate:'tropical',auth:'the village council',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#7E9A4A',far:'savanna',bldg:'lane',obst:'acacia'},
 route:{from:'Arusha town',mid:'Moshi road',to:'Usa River market',km:22,hills:'Mount Meru'},
 cast:{client:['Mama Neema · village chair','afWoman2'],family:['Baraka · boda driver','afMan'],crew:['Juma · crew lead','crew2'],inspector:['Mr Massawe · district engineer','afMan2']},
 intro:[['crew','{name}, 31 all-in-one lights for the market road.'],['client','Karibu! Traders walk home in the dark after market.']],
 clues:{load:['Road','The market road is 1.5 km long','client','From the bus stand to the market, about 1.5 km.'],obst:['Acacias','Acacias shade some pole spots'],roof:['Pole base','Red soil; poles need concrete bases'],grid:['Grid','No streetlight line'],site:['Night use','Lights needed 12 hours'],climate:['Rain','Long rains March to May']},
 desk:['Road survey sheet',[['Village','Usa River'],['Road','1,500 m'],['Spacing','every 50 m'],['Light','30 W all-in-one LED'],['Hours','12 per night']],['Arusha sun:','~5.5 peak hours/day','Battery rule:','2 nights backup']],
 outro:[['inspector','All lights pass the night test.'],['client','Asante! The market can stay open later.'],['family','Night rides are safer now.']]},
{id:'capetown',region:'Africa',country:'South Africa',lat:-34,place:'Bellville, Cape Town, South Africa',town:'Cape Town',met:'SAWS',title:'Beat Load-Shedding',type:'Hybrid home · 6.6 kWp + 15 kWh battery',level:'Advanced',kind:'hybrid',n:12,psh:5.5,pr:0.78,need:780,night:12,batt:15,unit:'kWh',cur:'ZAR',co2:0.9,climate:'coastal',mppt:[120,500,550],auth:'the City electrical certificate (CoC)',
 theme:{sky:['#7DB8E2','#D9E6EA','#E6DDC0'],ground:'#7E9A4A',far:'hills',bldg:'suburban',obst:'oak',sea:true},
 route:{from:'Cape Town CBD',mid:'N1',to:'Bellville',km:20,sea:'Atlantic Ocean',hills:'Table Mountain'},
 cast:{client:['Thabo Nkosi · accountant','afMan2'],family:['Lerato · his wife','afWoman'],crew:['Pieter · crew lead','crew3'],inspector:['Ms Adams · electrician (CoC)','euWoman',{skin:'#C9956A'}]},
 intro:[['crew','{name}, twelve panels, a hybrid inverter and a 15 kWh battery for Bellville.'],['client','Howzit! Load-shedding cuts us off up to eight hours a day.']],
 clues:{load:['Use','About 780 kWh a month','client','Geyser, stove, fridge and two people working from home.'],obst:['Oak tree','An oak on the west shades a corner after 3 pm'],roof:['Roof','Concrete tile roof facing north'],grid:['Grid','Load-shedding up to 8 hours a day'],site:['Night use','About 12 kWh at night'],climate:['Cape wind','Strong south-easter wind and sea air']},
 desk:['Home energy sheet',[['Home','Nkosi house'],['Use','~780 kWh / month'],['Load-shedding','up to 8 h / day']],['Cape sun:','~5.5 peak hours/day','Battery:','LFP, use 90%']],
 layout:{side:'west'},
 outro:[['inspector','CoC issued. Switch-over works.'],['client','Load-shedding? We barely notice now.'],['family','Work calls never drop.']]},
{id:'dakar',region:'Africa',country:'Senegal',lat:14.7,place:'Hann fishing port, Dakar, Senegal',town:'Dakar',met:'ANACIM',title:'Ice for the Fishermen',type:'Commercial rooftop · 33 kWp',level:'Advanced',kind:'commercial',n:60,psh:5.8,pr:0.76,need:4500,unit:'kWh',cur:'XOF',co2:0.6,climate:'coastal',mppt:[200,850,1000],block:12,auth:'Senelec inspection',
 theme:{sky:['#7DB8E2','#D9E6EA','#EAD9B0'],ground:'#CDB083',far:'palms',bldg:'warehouse',obst:'building',sea:true,sign:'HANN FISH COLD STORE'},
 route:{from:'Dakar Plateau',mid:'Route de Rufisque',to:'Hann port',km:10,sea:'Atlantic Ocean',hills:'Cap-Vert'},
 cast:{client:['Moussa Diop · cooperative head','afMan'],family:['Awa · fish trader','afWoman2'],crew:['Ousmane · site lead','crew2'],inspector:['Mr Ndiaye · Senelec','afMan2']},
 intro:[['crew','{name}, sixty panels and a 30 kW inverter for the ice plant.'],['client','Salaam! Without ice our catch spoils by noon.']],
 clues:{load:['Use','About 4,500 kWh a month','client','The ice machine and cold room run all day.'],obst:['Warehouse','A taller warehouse on the west shades an edge after 3 pm'],roof:['Roof','Steel roof, 350 m²'],grid:['Supply','Three-phase supply'],site:['Hours','Ice making peaks in the morning'],climate:['Salt spray','Right on the ocean']},
 desk:['Senelec · Commercial bill',[['Account','Hann cooperative'],['Use','~4,500 kWh / month']],['Dakar sun:','~5.8 peak hours/day','Losses:','performance 0.76']],
 outro:[['inspector','Connection approved.'],['client','Ice from the sun, fish stays fresh.'],['family','We sell at better prices now.']]},

/* ===== AMERICAS (5 new) ===== */
{id:'hermosillo',region:'Americas',country:'Mexico',lat:29.1,place:'Hermosillo, Sonora, Mexico',town:'Hermosillo',met:'SMN',title:'Sonoran Sun',type:'Home rooftop · 5.5 kWp',level:'Beginner',kind:'home',n:10,psh:6.3,pr:0.77,need:800,unit:'kWh',cur:'MXN',co2:0.43,climate:'hot',mppt:[100,550,600],auth:'CFE net-meter inspection',
 theme:{sky:['#7DB8E2','#E8E3D2','#EED7A8'],ground:'#CBA978',far:'hills',bldg:'flat',obst:'tree'},
 route:{from:'Downtown Hermosillo',mid:'Boulevard Kino',to:'Colonia Pitic',km:8,hills:'Sierra Madre'},
 cast:{client:['Carlos Ramírez · mechanic','laMan'],family:['Lucía · his wife','laWoman'],crew:['Miguel · crew lead','crew4'],inspector:['Ing. Torres · CFE','amOff']},
 intro:[['crew','{name}, ten panels and a 5 kW inverter. It is 44 °C already.'],['client','¡Hola! Summer AC bills are crazy here.']],
 clues:{load:['Ask for the bill','About 800 kWh a month','client','Around 800, but 1,400 in July.'],obst:['Mesquite tree','A mesquite on the west shades a corner late in the day'],roof:['Roof','Flat concrete roof, 40 m² free'],grid:['Meter','Single-phase CFE meter'],site:['AC','Two mini-split units'],climate:['Heat','Summers pass 45 °C']},
 desk:['CFE · Electricity bill',[['Account','Ramírez home'],['Average','~800 kWh / month'],['Tariff','1F (hot climate)']],['Sonora sun:','~6.3 peak hours/day','Losses:','performance 0.77']],
 outro:[['inspector','Net meter installed.'],['client','The sun pays the AC now.'],['family','¡Qué bien! More money for the kids.']]},
{id:'minas',region:'Americas',country:'Brazil',lat:-18.9,place:'Near Uberlândia, Minas Gerais, Brazil',town:'Uberlândia',met:'INMET',title:'Coffee Water',type:'Solar pump · 5 HP · 4.95 kWp',level:'Intermediate',kind:'pump',n:9,hp:5,hpOpts:[2,3,5,10],hpWhy:'drip for 5 hectares of coffee from 150 ft needs about 5 HP',depth:'a 150 ft well',water:'50 m³ a day',psh:5.4,pr:0.75,cur:'BRL',co2:0.1,climate:'tropical',mppt:[250,650,750],auth:'the farm cooperative',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#6E9A45',far:'hills',bldg:'farm',obst:'mango'},layout:{block:'pumphouse'},
 route:{from:'Uberlândia',mid:'BR-050',to:'Fazenda Sol',km:45,hills:'Cerrado plateau'},
 cast:{client:['João Silva · coffee farmer','laMan'],family:['Ana · his daughter','laWoman'],crew:['Rafael · crew lead','crew4'],inspector:['Sr. Souza · cooperative','amOff']},
 intro:[['crew','{name}, nine panels and a 5 HP pump for the coffee farm.'],['client','Bom dia! The dry season is getting longer. My diesel pump costs a fortune.']],
 clues:{load:['Water need','About 50 m³ a day in the dry season','client','In August the coffee needs 50 thousand litres a day.'],obst:['Mango tree','A mango tree on the west shades the plot after 3 pm'],roof:['Land','Flat land by the well'],grid:['Power','No grid at the well'],site:['Well','Well 150 ft, water at 100 ft'],climate:['Dry season','Dry winters, stormy summers']},
 desk:['Farm water sheet',[['Farm','Fazenda Sol'],['Crop','Coffee, 5 ha'],['Water','~50 m³ / day'],['Well','150 ft']],['Cerrado sun:','~5.4 peak hours/day','Rule:','~1 kWp per HP']],
 outro:[['inspector','Flow test passed.'],['client','The coffee drinks sunshine now.'],['family','Obrigada! Less diesel, more coffee.']]},
{id:'cusco',region:'Americas',country:'Peru',lat:-13.5,place:'Near Cusco, Peru',town:'Cusco',met:'SENAMHI',title:'School Above the Clouds',type:'School rooftop · 3.3 kWp',level:'Advanced',kind:'school',n:6,psh:5.8,pr:0.8,need:450,unit:'kWh',cur:'PEN',co2:0.2,climate:'altitude',mppt:[80,550,600],auth:'Electro Sur Este inspection',
 theme:{sky:['#3E8FD9','#9FD0F2','#E9EEF2'],ground:'#9A8B5A',far:'snowpeaks',bldg:'school',obst:'poplar',sign:'ESCUELA INTI'},
 route:{from:'Cusco',mid:'Sacred Valley road',to:'Chinchero',km:30,hills:'Andes'},
 cast:{client:['Profesora Quispe · headteacher','laWoman',{skin:'#A86F48'}],family:['Mateo · student','laMan',{skin:'#A86F48',moustache:false}],crew:['Luis · crew lead','crew4'],inspector:['Ing. Mamani · utility','amOff',{skin:'#A86F48'}]},
 intro:[['crew','{name}, six panels and a 3 kW inverter, up to 3,700 m.'],['client','¡Bienvenidos! Our classroom computers need steady power.']],
 clues:{load:['School use','About 450 kWh a month','client','Computers, lights and a small heater in winter.'],obst:['Eucalyptus','A eucalyptus east of the roof shades it before 10 am'],roof:['Roof','Clay tile roof, north slope'],grid:['Grid','Weak rural line'],site:['Altitude','3,700 m: strong sun, freezing nights'],climate:['Frost','Nights below −5 °C in winter']},
 desk:['School energy sheet',[['School','Escuela Inti'],['Use','~450 kWh / month'],['Altitude','3,700 m']],['Andes sun:','~5.8 peak hours/day','Losses:','performance 0.80']],
 layout:{side:'east'},
 outro:[['inspector','Connection approved.'],['client','Steady power for every class.'],['family','¡Gracias! The computer lab is ours now.']]},
{id:'houston',region:'Americas',country:'USA',lat:29.8,place:'Houston, Texas, USA',town:'Houston',met:'NWS',title:'Warehouse in Hurricane Alley',type:'Commercial rooftop · 99 kWp',level:'Expert',kind:'commercial',n:180,psh:5.0,pr:0.78,need:11500,unit:'kWh',cur:'USD',co2:0.37,climate:'cyclone',mppt:[200,850,1000],block:15,auth:'Utility interconnection and city inspection',
 theme:{sky:['#7DB8E2','#D9E6EA','#EAD9B0'],ground:'#8C9A5A',far:'city',bldg:'warehouse',obst:'building',sign:'GULF COAST SUPPLY'},
 route:{from:'Downtown Houston',mid:'I-10',to:'Northwest industrial park',km:25,sea:'Gulf of Mexico',hills:'Coastal plain'},
 cast:{client:['Mike Johnson · owner','euMan',{skin:'#D9A982'}],family:['Keisha · facilities manager','afWoman',{saree:null,shirt:'#5A6F9E'}],crew:['Diego · site lead','crew4'],inspector:['Inspector Lee · city','amOff',{skin:'#E0B892'}]},
 intro:[['crew','{name}, 180 panels and two 50 kW inverters. Hurricane season starts soon.'],['client','Howdy! Our AC and forklifts eat power all day.']],
 clues:{load:['Bills','About 11,500 kWh a month','client','Eleven and a half thousand kWh, daytime.'],obst:['Next building','A taller building on the west shades a corner after 3 pm'],roof:['Roof','Metal roof, 1,000 m²'],grid:['Supply','Three-phase 480 V'],site:['Hours','Two daytime shifts'],climate:['Hurricanes','Hurricane winds and heavy rain']},
 desk:['Utility bill',[['Account','Gulf Coast Supply'],['Use','~11,500 kWh / month']],['Houston sun:','~5.0 peak hours/day','Losses:','performance 0.78']],
 outro:[['inspector','Wind-load paperwork checks out. Approved.'],['client','Lower bills, built for storms.'],['family','I will set up the monitoring dashboard.']]},
{id:'puertorico',region:'Americas',country:'Puerto Rico (USA)',lat:18.2,place:'Utuado, Puerto Rico',town:'Utuado',met:'NWS',title:'After the Hurricane',type:'Hybrid home · 4.4 kWp + 10 kWh battery',level:'Advanced',kind:'hybrid',n:8,psh:5.2,pr:0.76,need:450,night:7,batt:10,unit:'kWh',cur:'USD',co2:0.7,climate:'cyclone',mppt:[120,500,550],auth:'LUMA interconnection',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#4E8A3A',far:'hills',bldg:'flat',obst:'palm'},
 route:{from:'San Juan',mid:'PR-10',to:'Utuado hills',km:90,sea:'Caribbean Sea',hills:'Cordillera Central'},
 cast:{client:['Doña Carmen · retired nurse','laWoman'],family:['Javier · her grandson','laMan',{moustache:false}],crew:['Luis · crew lead','crew4'],inspector:['Ing. Rivera · LUMA','amOff',{skin:'#C9956A'}]},
 intro:[['crew','{name}, eight panels, a hybrid inverter and a 10 kWh battery up the mountain.'],['client','After the last hurricane we had no power for months. Never again.']],
 clues:{load:['Use','About 450 kWh a month','client','A fridge with my insulin, lights, fans and the radio.'],obst:['Palm','A palm on the west shades a corner after 3 pm'],roof:['Roof','Flat concrete roof'],grid:['Grid','Long outages after storms'],site:['Night use','About 7 kWh at night'],climate:['Hurricanes','Category 4–5 storms possible']},
 desk:['Home energy sheet',[['Home','Doña Carmen'],['Use','~450 kWh / month'],['Outages','Weeks after storms']],['Puerto Rico sun:','~5.2 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Interconnection approved; island mode tested.'],['client','Now the storm can take the grid, not my light.'],['family','Abuela is safe.']]},

/* ===== EUROPE (3 new) ===== */
{id:'seville',region:'Europe',country:'Spain',lat:37.4,place:'Near Seville, Andalusia, Spain',town:'Seville',met:'AEMET',title:'Olive Grove Water',type:'Solar pump · 7.5 HP · 7.7 kWp',level:'Intermediate',kind:'pump',n:14,hp:7.5,hpOpts:[3,5,7.5,10],hpWhy:'drip for 20 hectares of olives from 200 ft needs about 7.5 HP',depth:'a 200 ft well',water:'80 m³ a day',psh:5.6,pr:0.76,cur:'EUR',co2:0.15,climate:'hot',mppt:[250,750,800],auth:'the irrigation community',
 theme:{sky:['#7DB8E2','#E2E6E0','#EEDDB4'],ground:'#A99A5A',far:'hills',bldg:'farm',obst:'oak'},layout:{panels:12,block:'pumphouse'},
 route:{from:'Seville',mid:'A-4',to:'Finca Los Olivos',km:40,hills:'Sierra Morena'},
 cast:{client:['Antonio García · olive farmer','euMan',{skin:'#D9A982'}],family:['Carmen · his daughter','euWoman',{hair:'#2a1a10'}],crew:['Javi · crew lead','crew3'],inspector:['Sr. Moreno · irrigation community','euOff']},
 intro:[['crew','{name}, fourteen panels and a 7.5 HP pump for the olive grove.'],['client','¡Buenos días! Diesel and grid power both cost too much for irrigation.']],
 clues:{load:['Water need','About 80 m³ a day in summer','client','In July the olives need 80 thousand litres a day.'],obst:['Holm oak','A holm oak shades the west edge after 3 pm'],roof:['Land','Flat land by the well'],grid:['Power','Grid far away; diesel now'],site:['Well','Well 200 ft, water at 140 ft'],climate:['Heat','Summers above 42 °C']},
 desk:['Farm water sheet',[['Farm','Los Olivos'],['Crop','Olives, 20 ha'],['Water','~80 m³ / day'],['Well','200 ft']],['Andalusia sun:','~5.6 peak hours/day','Rule:','~1 kWp per HP']],
 outro:[['inspector','Flow approved for the drip lines.'],['client','The sun irrigates the olives.'],['family','We can call our oil solar-grown!']]},
{id:'friesland',region:'Europe',country:'Netherlands',lat:53.1,place:'Near Leeuwarden, Friesland, Netherlands',town:'Leeuwarden',met:'KNMI',title:'Dairy Barn Roof',type:'Commercial rooftop · 66 kWp',level:'Advanced',kind:'commercial',n:120,psh:2.7,pr:0.85,need:5800,unit:'kWh',cur:'EUR',co2:0.33,climate:'cold',mppt:[200,850,1000],block:12,auth:'Grid operator inspection',
 theme:{sky:['#9FC3DB','#D7E3EA','#E8E6D8'],ground:'#6E9C55',far:'plains',bldg:'warehouse',obst:'oak',sign:'DE ZON DAIRY'},
 route:{from:'Leeuwarden',mid:'N31',to:'Polder farm',km:15,sea:'Wadden Sea',hills:'Flat polders'},
 cast:{client:['Sjoerd de Vries · dairy farmer','euMan'],family:['Anke · his wife','euWoman'],crew:['Pieter · crew lead','crew3'],inspector:['Mr Bakker · grid operator','euOff']},
 intro:[['crew','{name}, 120 panels and a 60 kW inverter for the barn roof.'],['client','Goedemorgen! Milking robots and cooling run day and night.']],
 clues:{load:['Use','About 5,800 kWh a month','client','Milking robots, milk cooling and barn lights.'],obst:['Oak row','A row of oaks on the west shades an edge late in the day'],roof:['Roof','Big south-facing barn roof, asbestos already removed'],grid:['Supply','Three-phase farm connection'],site:['Cows','Work around milking times'],climate:['Wind and snow','North Sea storms and some snow']},
 desk:['Farm energy sheet',[['Farm','De Zon dairy'],['Cows','150'],['Use','~5,800 kWh / month']],['Friesland sun:','~2.7 peak hours/day','Losses:','performance 0.85']],
 outro:[['inspector','Connection approved.'],['client','The barn roof pays for the milk cooling.'],['family','The cows do not even notice.']]},
{id:'crete',region:'Europe',country:'Greece',lat:35.2,place:'Near Chania, Crete, Greece',town:'Chania',met:'HNMS',title:'Island Home',type:'Hybrid home · 5.5 kWp + 10 kWh battery',level:'Intermediate',kind:'hybrid',n:10,psh:5.3,pr:0.78,need:620,night:8,batt:10,unit:'kWh',cur:'EUR',co2:0.55,climate:'coastal',mppt:[120,500,550],auth:'HEDNO inspection',
 theme:{sky:['#6FA9DC','#D9E6EA','#EADCB8'],ground:'#9AA07A',far:'hills',bldg:'flat',obst:'oak',sea:true},
 route:{from:'Chania port',mid:'Coast road',to:'Kissamos village',km:38,sea:'Aegean Sea',hills:'White Mountains'},
 cast:{client:['Nikos Papadakis · olive oil maker','euMan',{skin:'#D9B08C'}],family:['Eleni · his wife','euWoman',{hair:'#2a1a10'}],crew:['Giorgos · crew lead','crew3'],inspector:['Mr Kostas · HEDNO','euOff']},
 intro:[['crew','{name}, ten panels, a hybrid inverter and a 10 kWh battery for the village house.'],['client','Kalimera! Island power is expensive and cuts in summer storms.']],
 clues:{load:['Use','About 620 kWh a month','client','Fridge, AC in summer, water heater and the olive press shed.'],obst:['Olive tree','An old olive tree on the west shades a corner late in the day'],roof:['Roof','Flat whitewashed roof'],grid:['Grid','Island grid, summer cuts'],site:['Night use','About 8 kWh at night'],climate:['Sea wind','Meltemi winds and salty air']},
 desk:['Home energy sheet',[['Home','Papadakis house'],['Use','~620 kWh / month'],['Grid','Island network']],['Crete sun:','~5.3 peak hours/day','Battery:','LFP, use 90%']],
 outro:[['inspector','Approved; backup mode works.'],['client','The sun of Crete powers the house.'],['family','Efcharistó! Cold drinks even in a blackout.']]},

/* ===== SOUTH-EAST ASIA (3 new) ===== */
{id:'mekong',region:'South-East Asia',country:'Vietnam',lat:10,place:'Can Tho, Mekong Delta, Vietnam',town:'Can Tho',met:'NCHMF',title:'Rice and River',type:'Solar pump · 3 HP · 3.3 kWp',level:'Beginner',kind:'pump',n:6,hp:3,hpOpts:[2,3,5,7.5],hpWhy:'lifting canal water to 3 hectares of rice needs about 3 HP',depth:'a low canal lift',water:'40 m³ a day',psh:4.8,pr:0.75,cur:'VND',co2:0.6,climate:'tropical',mppt:[150,450,500],auth:'the commune',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#5E9A45',far:'palms',bldg:'farm',obst:'palm'},layout:{block:'pumphouse'},
 route:{from:'Can Tho city',mid:'River road',to:'Phong Dien',km:20,sea:'Mekong River',hills:'River delta'},
 cast:{client:['Mr Nguyen · rice farmer','seMan'],family:['Mrs Lan · his wife','seWoman'],crew:['Minh · crew lead','crew4'],inspector:['Mr Tran · commune officer','seOff']},
 intro:[['crew','{name}, six panels and a 3 HP pump go by boat to the paddies.'],['client','Xin chào! My diesel pump smokes and breaks every season.']],
 clues:{load:['Water need','About 40 m³ a day for 3 ha of rice','client','The rice needs about 40 thousand litres a day.'],obst:['Coconut palm','A palm on the west shades the plot after 3 pm'],roof:['Land','Raised land by the canal'],grid:['Power','No grid at the canal'],site:['Canal','Water lifted about 4 m from the canal'],climate:['Floods','Seasonal floods and storms']},
 desk:['Farm water sheet',[['Farm','Nguyen paddies'],['Crop','Rice, 3 ha'],['Water','~40 m³ / day'],['Lift','~4 m']],['Mekong sun:','~4.8 peak hours/day','Rule:','~1 kWp per HP']],
 outro:[['inspector','Pump approved.'],['client','The sun fills my paddies.'],['family','Cảm ơn! No more diesel smoke.']]},
{id:'cebu',region:'South-East Asia',country:'Philippines',lat:10.3,place:'Near Cebu, Philippines',town:'Cebu',met:'PAGASA',title:'Typhoon-Ready School',type:'School rooftop · 6.6 kWp',level:'Advanced',kind:'school',n:12,psh:4.9,pr:0.77,need:750,unit:'kWh',cur:'PHP',co2:0.7,climate:'cyclone',mppt:[100,550,600],auth:'VECO inspection',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#4E8A3A',far:'palms',bldg:'school',obst:'palm',sea:true,sign:'CEBU ELEMENTARY'},
 route:{from:'Cebu City',mid:'Coastal road',to:'Talisay',km:15,sea:'Bohol Sea',hills:'Cebu hills'},
 cast:{client:['Mrs Santos · principal','seWoman',{saree:'#2F6E9E'}],family:['Paolo · student','seMan',{shirt:'#2E8B57'}],crew:['Jun · crew lead','crew4'],inspector:['Engr. Reyes · VECO','seOff']},
 intro:[['crew','{name}, twelve panels and a 6 kW inverter. Typhoon season is coming.'],['client','Maayong buntag! After typhoons the school is also the evacuation centre.']],
 clues:{load:['School use','About 750 kWh a month','client','Fans, lights, computers, and the evacuation centre after storms.'],obst:['Coconut palm','A palm on the west shades the roof after 2 pm'],roof:['Roof','Corrugated metal roof, needs extra fixing'],grid:['Grid','Cuts after every typhoon'],site:['Evacuation','School shelters families after storms'],climate:['Typhoons','Several typhoons a year']},
 desk:['VECO · School bill',[['Account','Cebu Elementary'],['Use','~750 kWh / month']],['Cebu sun:','~4.9 peak hours/day','Losses:','performance 0.77']],
 outro:[['inspector','Wind fixing approved.'],['client','A safe, bright shelter for the next typhoon.'],['family','Salamat! We will learn about solar in science class.']]},
{id:'bali',region:'South-East Asia',country:'Indonesia',lat:-8.5,place:'Ubud, Bali, Indonesia',town:'Ubud',met:'BMKG',title:'Rice Terrace Guesthouse',type:'Home rooftop · 5.5 kWp',level:'Intermediate',kind:'home',n:10,psh:5.0,pr:0.77,need:640,unit:'kWh',cur:'IDR',co2:0.75,climate:'tropical',mppt:[100,550,600],auth:'PLN net-meter inspection',
 theme:{sky:['#86BEE0','#D9E6E8','#E6E2D2'],ground:'#4E9A45',far:'palms',bldg:'tiled',obst:'palm'},
 route:{from:'Denpasar',mid:'Jalan Raya Ubud',to:'Tegallalang',km:35,hills:'Rice terraces'},
 cast:{client:['Made Wirawan · guesthouse owner','seMan'],family:['Ketut · his wife','seWoman'],crew:['Wayan · crew lead','crew4'],inspector:['Pak Hasan · PLN','seOff']},
 intro:[['crew','{name}, ten panels and a 5 kW inverter for the guesthouse roof.'],['client','Om Swastiastu! Guests want AC and hot showers. Our bill keeps rising.']],
 clues:{load:['Use','About 640 kWh a month','client','Six rooms with AC and water heaters.'],obst:['Coconut palm','A palm on the west shades a corner after 2 pm'],roof:['Roof','Clay tile roof, north slope'],grid:['Meter','Single-phase PLN meter'],site:['Equator','South of the equator: panels face north'],climate:['Humidity','Hot, humid, heavy rain']},
 desk:['PLN · Electricity bill',[['Account','Wirawan guesthouse'],['Use','~640 kWh / month']],['Bali sun:','~5.0 peak hours/day','Losses:','performance 0.77']],
 outro:[['inspector','Net meter approved.'],['client','Sunshine pays for the guests’ comfort.'],['family','Terima kasih! Guests love the solar roof.']]}
];
const out=SPECS.map(make);
/* Existing hand-written cases: tag kind, roles and region names the same way. */
const KIND={konkan:'home',thar:'pump',ladakh:'school',gaya:'lights',dubai:'commercial',nakuru:'hybrid',bavaria:'home',sacramento:'home'};
window.SM_CASES.forEach(c=>{ c.kind=c.kind||KIND[c.id]; c.roles=c.roles||ROLES_BY_KIND[c.kind]; if(c.region==='North America') c.region='Americas'; });
window.SM_CASES.push(...out);
const ORDER=['India','Middle East','Africa','Americas','Europe','South-East Asia'], LV={Beginner:0,Intermediate:1,Advanced:2,Expert:3};
window.SM_CASES.sort((a,b)=>ORDER.indexOf(a.region)-ORDER.indexOf(b.region)||LV[a.level]-LV[b.level]);
})();
