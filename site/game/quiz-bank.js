/* Kaun Banega Solar Hero: bilingual question bank (English / Hindi).
   Each item: {lv, en:[question, correct, wrong1, wrong2, wrong3, explanation], hi:[same in Hindi]} */
var pick=(a,r)=>a[Math.floor((r||Math.random)()*a.length)];
var rnd=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
var shuffle=a=>{ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; };
var inr=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const B=(lv,en,hi)=>({lv,en,hi});
window.QB_BANK=[
 B(1,['Which device turns the DC from solar panels into AC for your home?','Inverter','Charge controller','Transformer','Busbar','The inverter converts DC to grid-quality AC.'],
     ['कौन सा उपकरण सोलर पैनल की DC बिजली को घर के लिए AC में बदलता है?','इन्वर्टर','चार्ज कंट्रोलर','ट्रांसफॉर्मर','बसबार','इन्वर्टर DC को ग्रिड जैसी AC बिजली में बदलता है।']),
 B(1,['Solar panels make the most power when sunlight hits them…','Straight on, at 90°','At a low angle','Through glass','At night with moonlight','Power is highest when sunlight is perpendicular to the panel.'],
     ['सोलर पैनल सबसे ज़्यादा बिजली तब बनाते हैं जब धूप उन पर पड़ती है…','सीधी, 90° पर','तिरछे कोण से','काँच के पीछे से','रात में चाँदनी से','जब धूप पैनल पर सीधी पड़ती है, तब बिजली सबसे ज़्यादा बनती है।']),
 B(1,['In India, a fixed rooftop panel should usually face…','South','North','East','West','India is north of the equator, so the sun is mostly in the southern sky.'],
     ['भारत में छत पर लगा स्थिर पैनल आमतौर पर किस दिशा में होना चाहिए?','दक्षिण','उत्तर','पूर्व','पश्चिम','भारत भूमध्य रेखा के उत्तर में है, इसलिए सूरज ज़्यादातर दक्षिणी आकाश में रहता है।']),
 B(1,['What is net metering?','Selling extra solar power back to the grid on one meter','A fence around panels','A battery brand','A type of solar panel','The meter counts both power you take and power you export.'],
     ['नेट मीटरिंग क्या है?','एक ही मीटर से अतिरिक्त सोलर बिजली ग्रिड को देना','पैनलों के चारों ओर बाड़','एक बैटरी ब्रांड','एक तरह का सोलर पैनल','मीटर ली गई और दी गई, दोनों बिजली गिनता है।']),
 B(1,['What does "kWh" measure?','Energy','Power','Voltage','Current','One kWh is one unit on your electricity bill.'],
     ['"kWh" क्या मापता है?','ऊर्जा','पावर','वोल्टेज','करंट','एक kWh आपके बिजली बिल की एक यूनिट है।']),
 B(1,['Which scheme gives subsidy for home rooftop solar in India?','PM Surya Ghar: Muft Bijli Yojana','PM-KUSUM','Ujjwala Yojana','Jal Jeevan Mission','PM Surya Ghar is the national residential rooftop scheme.'],
     ['भारत में घर की छत पर सोलर के लिए सब्सिडी कौन सी योजना देती है?','पीएम सूर्य घर: मुफ़्त बिजली योजना','पीएम-कुसुम','उज्ज्वला योजना','जल जीवन मिशन','पीएम सूर्य घर घरों की छत के लिए राष्ट्रीय योजना है।']),
 B(1,['Which scheme supports solar pumps for farmers?','PM-KUSUM','PM Surya Ghar','Atal Pension Yojana','Swachh Bharat','PM-KUSUM covers standalone pumps, pump solarisation and small farm plants.'],
     ['किसानों के सोलर पंप के लिए कौन सी योजना है?','पीएम-कुसुम','पीएम सूर्य घर','अटल पेंशन योजना','स्वच्छ भारत','पीएम-कुसुम में अलग सोलर पंप, पुराने पंपों का सोलरीकरण और छोटे प्लांट आते हैं।']),
 B(1,['What should you do to keep panels producing well in dusty areas?','Clean them gently with water regularly','Paint them','Cover them with plastic','Tilt them flat','Dust can cut output noticeably; plain water and a soft cloth work.'],
     ['धूल वाली जगह पर पैनल अच्छी बिजली बनाते रहें, इसके लिए क्या करें?','नियमित रूप से पानी से हल्के हाथ से साफ़ करें','उन पर पेंट करें','प्लास्टिक से ढक दें','उन्हें सपाट कर दें','धूल से बिजली काफ़ी घटती है; सादा पानी और मुलायम कपड़ा काफ़ी है।']),
 B(1,['Shade from a tree on one panel can…','Reduce the output of the whole string','Increase output','Only affect that leaf','Do nothing','Panels in series share current, so one shaded panel drags the string down.'],
     ['एक पैनल पर पेड़ की छाया से क्या हो सकता है?','पूरी स्ट्रिंग की बिजली घट सकती है','बिजली बढ़ जाती है','सिर्फ़ उस पत्ते पर असर','कुछ नहीं','सीरीज़ में जुड़े पैनल एक ही करंट बाँटते हैं, इसलिए एक छायादार पैनल पूरी स्ट्रिंग को घटा देता है।']),
 B(1,['What is the main fuel a solar pump replaces on many farms?','Diesel','Petrol','Coal','LPG','Solar pumps cut diesel costs to zero for daytime pumping.'],
     ['कई खेतों में सोलर पंप मुख्य रूप से किस ईंधन की जगह लेता है?','डीज़ल','पेट्रोल','कोयला','एलपीजी','दिन में पानी खींचने पर सोलर पंप डीज़ल का ख़र्च शून्य कर देता है।']),
 B(1,['What colour wire is usually used for DC positive in solar?','Red','Green','Blue','White','Red for positive and black for negative is the common convention.'],
     ['सोलर में DC पॉज़िटिव के लिए आमतौर पर किस रंग का तार होता है?','लाल','हरा','नीला','सफ़ेद','आम नियम है: पॉज़िटिव लाल, नेगेटिव काला।']),
 B(1,['What PPE must a worker wear on a roof edge?','Harness tied to a lifeline','Sunglasses only','Sandals','Nothing on small roofs','Falls are the biggest risk in rooftop installation.'],
     ['छत के किनारे पर काम करने वाले को कौन सा सुरक्षा उपकरण पहनना ज़रूरी है?','लाइफ़लाइन से बँधा हार्नेस','सिर्फ़ धूप का चश्मा','चप्पल','छोटी छत पर कुछ नहीं','छत पर काम में गिरना सबसे बड़ा खतरा है।']),
 B(2,['Panels connected in series add up their…','Voltage','Current','Weight','Efficiency','Series adds voltage; parallel adds current.'],
     ['सीरीज़ में जुड़े पैनलों का क्या जुड़ता है?','वोल्टेज','करंट','वज़न','दक्षता','सीरीज़ में वोल्टेज जुड़ता है; पैरेलल में करंट।']),
 B(2,['Panels connected in parallel add up their…','Current','Voltage','Tilt','Temperature','Parallel strings add current at the same voltage.'],
     ['पैरेलल में जुड़े पैनलों का क्या जुड़ता है?','करंट','वोल्टेज','झुकाव','तापमान','पैरेलल में वोल्टेज वही रहता है, करंट जुड़ता है।']),
 B(2,['What does MPPT in an inverter do?','Finds the voltage where panels give maximum power','Measures panel temperature','Stops theft','Cools the inverter','Maximum Power Point Tracking keeps the array at its best operating point.'],
     ['इन्वर्टर में MPPT क्या करता है?','वह वोल्टेज ढूँढता है जहाँ पैनल सबसे ज़्यादा बिजली देते हैं','पैनल का तापमान मापता है','चोरी रोकता है','इन्वर्टर को ठंडा करता है','मैक्सिमम पावर पॉइंट ट्रैकिंग पैनलों को सबसे अच्छे बिंदु पर चलाती है।']),
 B(2,['Why are panels tilted instead of flat on Indian roofs?','To face the sun better and let rain wash dust','To look nicer','To reduce wind','To save cable','A tilt near the latitude angle boosts yield and helps self-cleaning.'],
     ['भारत की छतों पर पैनल सपाट की जगह झुकाकर क्यों लगाते हैं?','सूरज की तरफ़ बेहतर मुँह और बारिश से धूल धुल जाए','सुंदर दिखने के लिए','हवा कम करने के लिए','तार बचाने के लिए','अक्षांश के बराबर झुकाव से बिजली बढ़ती है और सफ़ाई अपने आप होती है।']),
 B(2,['What is "ALMM" in Indian solar?','The approved list of panel models and makers','A cleaning robot','A type of inverter','A wiring standard','Subsidised projects must use ALMM-listed modules.'],
     ['भारतीय सोलर में "ALMM" क्या है?','मंज़ूर पैनल मॉडल और निर्माताओं की सूची','सफ़ाई रोबोट','एक तरह का इन्वर्टर','वायरिंग का नियम','सब्सिडी वाले प्रोजेक्ट में ALMM सूची के पैनल ही लगते हैं।']),
 B(2,['What does a surge protection device (SPD) protect against?','Voltage spikes, such as from lightning','Rust','Dust','Birds','SPDs divert surges to earth before they damage equipment.'],
     ['सर्ज प्रोटेक्शन डिवाइस (SPD) किससे बचाता है?','अचानक वोल्टेज उछाल, जैसे बिजली गिरने से','जंग','धूल','पक्षी','SPD उछाल को उपकरण तक पहुँचने से पहले अर्थ में भेज देता है।']),
 B(2,['Why does panel output drop on very hot days?','Panel voltage falls as cells heat up','The sun is weaker','Wires shrink','The inverter sleeps','Most panels lose roughly 0.3–0.4% of power per °C above 25 °C.'],
     ['बहुत गर्म दिनों में पैनल की बिजली क्यों घटती है?','सेल गर्म होने पर पैनल का वोल्टेज गिरता है','सूरज कमज़ोर होता है','तार सिकुड़ जाते हैं','इन्वर्टर सो जाता है','25 °C से ऊपर हर डिग्री पर ज़्यादातर पैनल लगभग 0.3–0.4% बिजली खोते हैं।']),
 B(2,['For salt-air coastal sites, the mounting structure should be…','Hot-dip galvanised or aluminium','Plain mild steel','Wooden','Painted iron','Salt corrodes plain steel quickly.'],
     ['समुद्री खारी हवा वाली जगह पर ढाँचा कैसा होना चाहिए?','हॉट-डिप गैल्वनाइज़्ड या एल्युमिनियम','सादा माइल्ड स्टील','लकड़ी का','पेंट किया लोहा','नमक सादे स्टील को जल्दी जंग लगा देता है।']),
 B(2,['What is the "performance ratio" of a solar system?','Actual energy out vs. what the sunlight could ideally give','Panel colour score','Inverter weight','Cable length','Typical well-built rooftop systems sit around 0.75–0.85.'],
     ['सोलर सिस्टम का "परफ़ॉर्मेंस रेशियो" क्या है?','असल बिजली बनाम धूप से आदर्श रूप में मिलने वाली बिजली','पैनल के रंग का स्कोर','इन्वर्टर का वज़न','तार की लंबाई','अच्छे रूफ़टॉप सिस्टम में यह लगभग 0.75–0.85 होता है।']),
 B(2,['Which test checks that DC cables are not leaking current to earth?','Insulation resistance test','Polarity test','Torque test','Visual test','An insulation tester (megger) checks cable insulation.'],
     ['कौन सा टेस्ट देखता है कि DC तारों से करंट अर्थ में तो नहीं रिस रहा?','इन्सुलेशन रेज़िस्टेंस टेस्ट','पोलैरिटी टेस्ट','टॉर्क टेस्ट','विज़ुअल टेस्ट','इन्सुलेशन टेस्टर (मेगर) तार का इन्सुलेशन जाँचता है।']),
 B(2,['What is an agrivoltaic system?','Panels raised so crops grow underneath','A solar tractor','A biogas plant','A greenhouse heater','Land gives both a harvest and power.'],
     ['एग्रीवोल्टाइक सिस्टम क्या है?','ऊँचाई पर लगे पैनल जिनके नीचे फ़सल उगती है','सोलर ट्रैक्टर','बायोगैस प्लांट','ग्रीनहाउस हीटर','एक ही ज़मीन से फ़सल और बिजली दोनों मिलती हैं।']),
 B(2,['Before working on a string, what must you do first?','Isolate it and cover the panels or open the DC isolator','Pour water on it','Check the weather in another state','Nothing, DC is safe','Panels keep producing voltage whenever light falls on them.'],
     ['स्ट्रिंग पर काम करने से पहले सबसे पहले क्या करें?','उसे अलग करें: पैनल ढकें या DC आइसोलेटर खोलें','उस पर पानी डालें','दूसरे राज्य का मौसम देखें','कुछ नहीं, DC सुरक्षित है','जब तक रोशनी पड़ती है, पैनल वोल्टेज बनाते रहते हैं।']),
 B(3,['Which energy storage chemistry is most common in new home batteries?','Lithium iron phosphate (LFP)','Lead-acid flooded','Nickel-cadmium','Zinc-air','LFP is safer and lasts more cycles.'],
     ['नई घरेलू बैटरियों में सबसे आम केमिस्ट्री कौन सी है?','लिथियम आयरन फ़ॉस्फ़ेट (LFP)','फ़्लडेड लेड-एसिड','निकल-कैडमियम','ज़िंक-एयर','LFP ज़्यादा सुरक्षित है और ज़्यादा साइकल चलती है।']),
 B(3,['What does a single-line diagram (SLD) show?','The electrical path from panels to the grid point','The roof shape','Panel prices','Crew names','DISCOMs ask for an SLD to approve a connection.'],
     ['सिंगल-लाइन डायग्राम (SLD) क्या दिखाता है?','पैनल से ग्रिड तक बिजली का पूरा रास्ता','छत का आकार','पैनलों की कीमत','टीम के नाम','कनेक्शन मंज़ूर करने के लिए DISCOM SLD माँगती है।']),
 B(3,['What is bifacial in a solar panel?','It also collects light reflected onto its back','It has two inverters','It works at night','It has two colours','Bifacial panels can gain extra yield over reflective ground.'],
     ['बाइफ़ेशियल सोलर पैनल क्या है?','जो पीछे की ओर परावर्तित रोशनी भी लेता है','जिसमें दो इन्वर्टर हैं','जो रात में चलता है','जिसके दो रंग हैं','चमकदार ज़मीन पर बाइफ़ेशियल पैनल ज़्यादा बिजली देते हैं।']),
 B(3,['Why do installers check the cold-morning open-circuit voltage of a string?','Voc rises in the cold and must stay below the inverter maximum','To check theft','To see colour','It falls in the cold','Cold cells give higher voltage than at 25 °C.'],
     ['इंस्टॉलर ठंडी सुबह का ओपन-सर्किट वोल्टेज क्यों जाँचते हैं?','ठंड में Voc बढ़ता है और इन्वर्टर की सीमा से नीचे रहना चाहिए','चोरी जाँचने के लिए','रंग देखने के लिए','ठंड में यह घटता है','ठंडे सेल 25 °C से ज़्यादा वोल्टेज देते हैं।']),
 B(3,['Under PM-KUSUM Component C, what is solarised?','Existing grid-connected farm pumps','School roofs','Street lights','Electric cars','Component C solarises grid-connected pumps; Component B covers standalone pumps.'],
     ['पीएम-कुसुम कंपोनेंट C में किसे सोलर पर लाया जाता है?','ग्रिड से जुड़े मौजूदा खेत के पंप','स्कूल की छतें','स्ट्रीट लाइट','इलेक्ट्रिक कारें','कंपोनेंट C ग्रिड वाले पंपों के लिए है; कंपोनेंट B अलग सोलर पंपों के लिए।']),
 B(3,['What does "DCR" mean on an Indian solar panel?','Domestic Content Requirement: cells made in India','Direct Current Rating','Daily Cleaning Required','Dual Cell Row','Subsidy schemes often require DCR modules.'],
     ['भारतीय सोलर पैनल पर "DCR" का मतलब क्या है?','डोमेस्टिक कंटेंट रिक्वायरमेंट: भारत में बने सेल','डायरेक्ट करंट रेटिंग','रोज़ सफ़ाई ज़रूरी','डुअल सेल रो','सब्सिडी योजनाओं में अक्सर DCR पैनल ज़रूरी होते हैं।'])
];
/* Generators: every call returns {lv, en:[...], hi:[...]} with the same numbers in both languages. */
window.QB_GEN=[
 ()=>{ const kw=pick([1,2,3,4,5]), ph=pick([4.5,4.8,5,5.5]), pr=pick([0.75,0.78,0.8]); const u=kw*ph*30*pr; const r=x=>Math.round(x/5)*5; const o=[r(u),r(u*0.8),r(u*0.6),r(kw*ph*30)];
   return {lv:2, en:[`A ${kw} kW system gets ${ph} peak sun hours a day with a performance ratio of ${pr}. About how many units does it make in a 30-day month?`, ...o.map(x=>x+' units'), `${kw} × ${ph} × 30 × ${pr} ≈ ${r(u)} units.`],
     hi:[`${kw} kW सिस्टम को रोज़ ${ph} पीक धूप घंटे मिलते हैं और परफ़ॉर्मेंस रेशियो ${pr} है। 30 दिन में लगभग कितनी यूनिट बनेगी?`, ...o.map(x=>x+' यूनिट'), `${kw} × ${ph} × 30 × ${pr} ≈ ${r(u)} यूनिट।`]}; },
 ()=>{ const kw=pick([1,2,3]); const sub = kw===1?30000:kw===2?60000:78000; const o=[inr(sub), inr(sub+18000), inr(Math.max(15000,sub-12000)), inr(kw*40000)];
   return {lv:2, en:[`Under PM Surya Ghar, what is the central subsidy for a ${kw} kW home system?`, ...o, '₹30,000 per kW for the first 2 kW, plus ₹18,000 for the third kW, capped at ₹78,000.'],
     hi:[`पीएम सूर्य घर में ${kw} kW घरेलू सिस्टम पर केंद्र की सब्सिडी कितनी है?`, ...o, 'पहले 2 kW पर ₹30,000 प्रति kW, तीसरे kW पर ₹18,000; अधिकतम ₹78,000।']}; },
 ()=>{ const units=pick([200,250,300,320,360,400,450]); const kw=Math.round(units/(4.8*30*0.78)*2)/2; const o=[kw,kw+2,Math.max(0.5,kw-1.5),kw*3].map(x=>x+' kW');
   return {lv:3, en:[`A home uses ${units} units a month. With 4.8 sun hours and a 0.78 performance ratio, which size fits best?`, ...o, `${units} ÷ (4.8 × 30 × 0.78 ≈ 112 units per kW) ≈ ${kw} kW.`],
     hi:[`एक घर महीने में ${units} यूनिट इस्तेमाल करता है। 4.8 धूप घंटे और 0.78 रेशियो पर कौन सा साइज़ सही है?`, ...o, `${units} ÷ (4.8 × 30 × 0.78 ≈ 112 यूनिट प्रति kW) ≈ ${kw} kW।`]}; },
 ()=>{ const n=pick([5,6,7,8,9,10]), v=pick([38.5,41.7,44.2]); const tot=(n*v).toFixed(0); const o=[tot,v,(n*v*2).toFixed(0),(v/n).toFixed(1)].map(x=>x+' V');
   return {lv:3, en:[`${n} panels of ${v} V each are wired in series. What is the string voltage?`, ...o, `Series adds voltage: ${n} × ${v} ≈ ${tot} V.`],
     hi:[`${v} V के ${n} पैनल सीरीज़ में जोड़े गए। स्ट्रिंग का वोल्टेज कितना होगा?`, ...o, `सीरीज़ में वोल्टेज जुड़ता है: ${n} × ${v} ≈ ${tot} V।`]}; },
 ()=>{ const kw=pick([3,4,5]), w=pick([440,540,550,580]); const n=Math.ceil(kw*1000/w); const o=[n,n+3,Math.max(1,n-2),n*2];
   return {lv:1, en:[`How many ${w} W panels make at least ${kw} kW?`, ...o.map(x=>x+' panels'), `${kw*1000} ÷ ${w} = ${(kw*1000/w).toFixed(1)}, so ${n} panels.`],
     hi:[`कम से कम ${kw} kW के लिए ${w} W के कितने पैनल चाहिए?`, ...o.map(x=>x+' पैनल'), `${kw*1000} ÷ ${w} = ${(kw*1000/w).toFixed(1)}, यानी ${n} पैनल।`]}; },
 ()=>{ const cost=pick([67000,75000,85000]), save=pick([1800,2200,2700]); const yrs=(cost/(save*12)).toFixed(1); const o=[yrs,(yrs*2).toFixed(1),(yrs/3).toFixed(1),(yrs*4).toFixed(1)];
   return {lv:3, en:[`A family pays ${inr(cost)} after subsidy and saves ${inr(save)} a month. Roughly how long is the payback?`, ...o.map(x=>x+' years'), `${inr(cost)} ÷ (${inr(save)} × 12) ≈ ${yrs} years.`],
     hi:[`एक परिवार सब्सिडी के बाद ${inr(cost)} देता है और हर महीने ${inr(save)} बचाता है। लागत लगभग कितने समय में वसूल होगी?`, ...o.map(x=>x+' साल'), `${inr(cost)} ÷ (${inr(save)} × 12) ≈ ${yrs} साल।`]}; },
 ()=>{ const lit=pick([8,10,12,15]), price=pick([92,95,98]); const m=lit*price*30; const o=[inr(m),inr(m/30),inr(m*1.5),inr(lit*30)];
   return {lv:1, en:[`A diesel pump burns ${lit} litres a day at ₹${price}/litre. What does a solar pump save in a 30-day month?`, ...o, `${lit} × ₹${price} × 30 = ${inr(m)}.`],
     hi:[`एक डीज़ल पंप रोज़ ${lit} लीटर जलाता है, ₹${price} प्रति लीटर। सोलर पंप 30 दिन में कितना बचाएगा?`, ...o, `${lit} × ₹${price} × 30 = ${inr(m)}।`]}; }
];
window.QB_LADDER=[100,200,300,500,1000,2000,4000,8000,16000,32000,64000,125000,250000,500000,1000000];
