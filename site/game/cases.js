/* Surya Mission case library. Game values are realistic approximations for learning. */
window.SM_CASES=[
{
 id:'konkan', region:'India', place:'Ratnagiri district, Maharashtra, India', title:'The Konkan File', type:'Home rooftop · 3.3 kWp', level:'Beginner',
 theme:{sky:['#7FC4E8','#CFE8F2','#F4E7C8'], ground:'#4E7D45', far:'palms', bldg:'tiled', obst:'palm', sea:true},
 route:{from:'Ratnagiri city', mid:'Coastal highway', to:'Suryawadi village', km:38, sea:'Arabian Sea', hills:'Sahyadri ghats'},
 cast:{client:{name:'Shankar Patil · farmer', skin:'#8D5A3B', shirt:'#F2EFE6', topi:true, moustache:true}, family:{name:'Aaji · his mother', skin:'#9A6644', saree:'#2E8B57', hair:'#DDD', bun:true, bindi:true}, crew:{name:'Anil · crew lead', skin:'#B57B52', vest:true, hat:'#FDA604'}, inspector:{name:'Meera · MSEDCL inspector', skin:'#C68A5E', shirt:'#5A6F9E', hair:'#1a1a1a', bun:true, glasses:true, bindi:true}},
 intro:[['crew','Morning, {name}! The tempo is loaded: six 550 W panels, a 3 kW inverter, rails and cable. Suryawadi is 38 km south, off the coastal highway.'],['client','Namaskar, {name}! My power bill keeps going up, and Aaji wants lights that stay on through the monsoon.']],
 clues:{
  load:['Ask for the bill','Bill: about 320 units a month, ₹2,700',['client','Here are my last three bills. Around 300 to 330 units a month.']],
  obst:['Palm tree','Coconut palm on the west side shades the roof after 2 pm',['you','That palm is west of the roof. After 2 pm its shadow falls across the left side.']],
  roof:['Roof','Mangalore tiles on a wooden frame, south slope 12 m²',['you','Mangalore tiles on wood. I need tile hooks, not drilling, or the roof will leak.']],
  grid:['Meter box','Single-phase MSEDCL meter',['you','Single-phase meter. That decides the inverter and the net-meter paperwork.']],
  site:['Borewell','Borewell 120 ft deep, 3 HP diesel pump today',['client','The borewell is 120 feet deep. A 3 HP diesel pump runs it today.']],
  climate:['Sea breeze','Sea 4 km away: salt air rusts metal fast',['you','The sea is only 4 km away. Salt air means galvanised steel and sealed connectors.']]
 },
 desk:{title:'MSEDCL · Electricity bill', rows:[['Consumer','Shankar Patil'],['Tariff','LT-I Residential'],['Units (Jun)','312'],['Units (Jul)','298'],['Units (Aug)','330'],['Average','~320 units / month'],['Amount','₹2,700']], note:['Konkan sun:','~4.8 peak hours/day','Losses:','performance 0.78']},
 size:{q:'Which size covers ~320 units a month? (kW × 4.8 h × 30 days × 0.78)', opts:[['1 kW · ~112 units','Too small: a third of the bill'],['2 kW · ~225 units','Leaves ~100 units on the bill'],['3 kW · ~337 units','Right: 3 × 4.8 × 30 × 0.78 ≈ 337 units'],['5 kW · ~562 units','Oversized, and the subsidy is capped at 3 kW']], ok:2, hint:'Divide 320 by (4.8 × 30 × 0.78 ≈ 112 units per kW).'},
 layout:{panels:6, cols:6, rows:3, side:'west', block:'tank', label:'roof', unit:'panel'},
 wire:[
  {title:'Wire the string', q:'Each panel gives 41.7 V. The inverter tracks 80–550 V and takes at most 600 V. How do you connect six panels?', opts:[['All 6 in parallel · 42 V','42 V is below the 80 V minimum'],['All 6 in series · 250 V','250 V sits inside 80–550 V'],['12 in series · 500 V','You only have 6 panels']], ok:1, hint:'Series adds voltage. Find the option inside 80–550 V.', show:{n:6,v:41.7,label:'3 kW inverter · MPPT 80–550 V · max 600 V'}},
  {title:'Choose the DC cable', q:'Which cable runs from the roof to the inverter?', opts:[['1.5 mm² house wire','Too thin, and PVC cracks in the sun'],['4 mm² UV-rated solar DC cable','Rated for sun, heat and DC'],['Any cable, it is only 15 m','Wrong cable is a fire risk']], ok:1, hint:'A cable made for sunlight and DC.'},
  {title:'Coastal protection', q:'The site is 4 km from the sea. What else must go in?', opts:[['Hot-dip galvanised structure, earthing and a DC surge protector','Stops rust and lightning damage'],['Paint the steel once a year','Paint chips; galvanising lasts'],['Nothing extra','Salt air corrodes plain steel in a few years']], ok:0, hint:'Think rust and lightning.'}
 ],
 weather:{q:'IMD forecast for Ratnagiri this week:', opts:[['Mon · orange alert, 120 mm rain','Never work on an orange alert'],['Tue · moderate rain all day','Wet tiles are dangerous'],['Wed · clear morning, showers after 3 pm','Move at dawn, finish roof work by 2 pm'],['Thu · thunderstorms','Lightning risk on a metal structure']], ok:2, hint:'Roof work needs a dry window of several hours.'},
 crew:{q:'Who goes for a 3 kW tiled-roof job?', opts:[['1 helper','Panels need two people to lift'],['2 installers + 1 licensed electrician + crew lead','Two lifters, one wiring, one in charge'],['8 people','Too many people break tiles']], ok:1},
 comm:['Visual check and torque on every clamp','Polarity and open-circuit voltage of the string','Insulation resistance test','Earth resistance test','Switch on AC, then DC; set grid profile','Net-meter inspection with MSEDCL'],
 outro:[['inspector','Everything checks out. Net meter approved.'],['client','The meter is running backwards! No more diesel smoke at the well soon.'],['family','Shabaas. Now the lights stay on.']],
 summary:'3.3 kWp rooftop · 6 × 550 W · 250 V string · ~337 units a month · coastal-grade structure'
},
{
 id:'thar', region:'India', place:'Near Bhadla, Jodhpur district, Rajasthan, India', title:'Water in the Thar', type:'Solar pump · 5 HP · 4.95 kWp', level:'Intermediate',
 theme:{sky:['#8EC6E8','#E6E2CF','#F1D9A6'], ground:'#D7B57A', far:'dunes', bldg:'farm', obst:'tree'},
 route:{from:'Jodhpur city', mid:'Phalodi road', to:'Suryanagar dhani', km:190, hills:'Thar desert'},
 cast:{client:{name:'Bhanwar Lal · farmer', skin:'#8D5A3B', shirt:'#F4F1E8', turban:'#E0362E', moustache:true}, family:{name:'Kamla · his wife', skin:'#9A6644', saree:'#D94E5A', hair:'#1a1a1a', bun:true, bindi:true}, crew:{name:'Kishan · crew lead', skin:'#B57B52', vest:true, hat:'#FDA604'}, inspector:{name:'Ritu Sharma · agriculture officer', skin:'#C68A5E', shirt:'#5A6F9E', hair:'#1a1a1a', bun:true, glasses:true}},
 intro:[['crew','{name}, the truck has nine 550 W panels, a pump controller and a 5 HP submersible pump. 190 km of desert road to go.'],['client','Ram Ram, {name}! Diesel for my pump costs me more than my cumin earns.']],
 clues:{
  load:['Water need','Needs ~50 m³ of water a day for 4 acres of cumin',['client','In season I need about 50 thousand litres a day for four acres.']],
  obst:['Khejri tree','Khejri tree on the west edge shades the field after 2 pm',['you','That khejri tree will shade the west side in the afternoon. Keep panels clear of it.']],
  roof:['Free land','Flat sandy land beside the borewell, about 40 m² free',['you','Flat land, no roof. A raised ground-mount structure on concrete footings.']],
  grid:['Power line','No grid line to the field; diesel pump today',['client','No electricity line reaches my field. Only diesel.']],
  site:['Borewell','Borewell 200 ft deep, water at about 160 ft',['client','The borewell is 200 feet. Water stands around 160 feet.']],
  climate:['Dust and heat','Dust storms in May–June, summers above 45 °C',['you','Dust storms and 45 °C heat. Panels lose output when dusty and hot.']]
 },
 desk:{title:'Farm water and pump sheet', rows:[['Farmer','Bhanwar Lal'],['Crop','Cumin, 4 acres'],['Water need','~50 m³ / day'],['Borewell depth','200 ft'],['Water level','~160 ft'],['Diesel use','~10 L / day'],['Scheme','PM-KUSUM Component B']], note:['Thar sun:','~5.8 peak hours/day','Rule:','~1 kWp per HP']},
 size:{q:'Which pump fits a 200 ft borewell and ~50 m³ a day?', opts:[['2 HP · 2 kWp','Cannot lift enough water from 160 ft'],['3 HP · 3 kWp','Too little flow at this depth'],['5 HP · 4.95 kWp','Right: the usual size for 150–250 ft at this water need'],['10 HP · 9.6 kWp','Oversized: can draw the borewell down and costs double']], ok:2, hint:'Deeper wells need more horsepower. Under PM-KUSUM the array is about 1 kWp per HP.'},
 layout:{panels:9, cols:7, rows:3, side:'west', block:'pumphouse', label:'field', unit:'panel'},
 wire:[
  {title:'Wire the pump array', q:'Nine 41.7 V panels feed a pump controller that tracks 250–650 V and takes at most 750 V. How do you connect them?', opts:[['All 9 in parallel · 42 V','Far below the 250 V minimum'],['All 9 in series · 375 V','375 V is inside 250–650 V'],['18 in series · 750 V','You have only 9 panels, and 750 V is the limit']], ok:1, hint:'Series adds voltage. Stay inside 250–650 V.', show:{n:9,v:41.7,label:'5 HP pump controller · MPPT 250–650 V · max 750 V'}},
  {title:'Choose the DC cable', q:'Which cable runs from the array to the controller?', opts:[['1.5 mm² house wire','Too thin, and PVC fails in desert sun'],['4 mm² UV-rated solar DC cable','Rated for sun, heat and DC'],['Cheapest cable in the market','Wrong cable is a fire risk']], ok:1, hint:'A cable made for sunlight and DC.'},
  {title:'Beat dust and heat', q:'What keeps a desert pump array producing?', opts:[['Weekly cleaning with water and a soft brush, and a raised frame for airflow','Dust and heat cut output; cleaning and airflow help most'],['Cover the panels in summer','Covered panels make no power'],['Nothing, panels are self-cleaning','Desert dust builds up fast']], ok:0, hint:'Dust blocks light; heat lowers voltage.'}
 ],
 weather:{q:'Forecast for Jodhpur this week:', opts:[['Mon · dust storm warning','Flying dust and panels act like sails'],['Tue · heat wave, 47 °C','Heat stroke risk for the crew'],['Wed · clear, 39 °C, calm','Start at 6 am and stop by 11 am'],['Thu · winds 50 km/h','Unsafe for lifting panels']], ok:2, hint:'Pick the calm day and work early.'},
 crew:{q:'Who goes for a 5 HP pump job?', opts:[['1 helper','A pump and nine panels need more hands'],['2 installers + pump technician + crew lead','Two for the structure, one for the pump, one in charge'],['10 people','Too many people for one borewell']], ok:1},
 comm:['Visual check and torque on every bolt','Polarity and open-circuit voltage of the string','Insulation resistance test','Earth resistance test','Start the controller and check water flow','Pump trial and handover to the farmer'],
 outro:[['inspector','Flow test passed. PM-KUSUM inspection signed.'],['client','Water without diesel! The cumin will love it.'],['family','No more carrying cans of fuel to the field.']],
 summary:'4.95 kWp ground array · 9 × 550 W · 375 V string · 5 HP pump · desert-ready'
},
{
 id:'ladakh', region:'India', place:'Leh, Ladakh, India', title:'School on the Roof of the World', type:'School rooftop · 4.95 kWp', level:'Advanced',
 theme:{sky:['#3E8FD9','#9FD0F2','#E9EEF2'], ground:'#B89A73', far:'snowpeaks', bldg:'school', obst:'poplar'},
 route:{from:'Leh town', mid:'Indus valley road', to:'Suryaling school', km:24, hills:'Himalaya'},
 cast:{client:{name:'Tsering Dolma · headteacher', skin:'#C68A5E', shirt:'#8E2B2B', hair:'#1a1a1a', bun:true}, family:{name:'Nawang · student', skin:'#C68A5E', shirt:'#2F5D9E', hair:'#1a1a1a'}, crew:{name:'Stanzin · crew lead', skin:'#B57B52', vest:true, hat:'#FDA604'}, inspector:{name:'Rigzin · power department', skin:'#C68A5E', shirt:'#5A6F9E', hair:'#1a1a1a', glasses:true}},
 intro:[['crew','Julley, {name}! Nine panels and a 5 kW inverter are strapped down. The school is 24 km up the Indus valley.'],['client','Julley! Our computer lab sits idle in power cuts, and winter is coming.']],
 clues:{
  load:['School load','School uses about 600 units a month: lab, lights, heaters',['client','Our bills show around 600 units a month.']],
  obst:['Poplar trees','Poplars on the east side shade the roof before 10 am',['you','Those poplars are east. Morning shade on the right side of the roof.']],
  roof:['Flat roof','Flat mud-and-timber roof with a concrete top, 40 m²',['you','Flat roof. A tilted frame with ballast, so we don’t damage the waterproofing.']],
  grid:['Meter','Single-phase meter, Ladakh power department',['you','Grid-connected, with long outages in winter.']],
  site:['Water tank','Water tank on the north-west corner of the roof',['you','The water tank blocks one corner in the morning.']],
  climate:['Cold and snow','Winters reach −20 °C; heavy snow and strong UV',['you','Minus 20 in winter. Cold raises panel voltage, and snow sits on flat frames.']]
 },
 desk:{title:'School energy sheet', rows:[['School','Suryaling Govt School'],['Units (Sep)','610'],['Units (Oct)','590'],['Average','~600 units / month'],['Load','Lab, lights, heaters'],['Grid','Frequent winter cuts'],['Panel','550 W · Voc 49.9 V']], note:['Ladakh sun:','~5.5 peak hours/day','Cold helps:','performance 0.80']},
 size:{q:'Which size covers ~600 units a month? (kW × 5.5 h × 30 × 0.80)', opts:[['3 kW · ~396 units','Leaves a third of the load'],['5 kW · ~660 units','Right: 5 × 5.5 × 30 × 0.8 ≈ 660 units'],['8 kW · ~1,056 units','Oversized for the roof and load'],['10 kW · ~1,320 units','Twice what the school needs']], ok:1, hint:'Each kW gives about 132 units a month here.'},
 layout:{panels:9, cols:7, rows:3, side:'east', block:'tank', label:'roof', unit:'panel'},
 wire:[
  {title:'Cold-proof the string', q:'The 5 kW inverter tracks 120–550 V and takes at most 600 V. On a −20 °C morning each panel’s open-circuit voltage rises to about 57 V. Which string?', opts:[['9 in series · 375 V working, ~515 V cold','Inside the range, and under 600 V even at −20 °C'],['12 in series · ~685 V cold','Cold voltage passes 600 V and can damage the inverter'],['9 in parallel · 42 V','Below the 120 V minimum']], ok:0, hint:'Multiply the panel count by 57 V and stay under 600 V.', show:{n:9,v:41.7,label:'5 kW inverter · MPPT 120–550 V · max 600 V'}},
  {title:'Choose the DC cable', q:'Which cable survives Ladakh’s UV and cold?', opts:[['PVC house wire','PVC turns brittle in cold and UV'],['4 mm² UV-rated solar cable rated to −40 °C','Made for UV and extreme cold'],['Telephone cable','Not rated for power at all']], ok:1, hint:'Check the temperature rating.'},
  {title:'Snow and wind', q:'What does the frame need?', opts:[['A steeper tilt so snow slides off, and rails rated for snow load','Snow slides off a steep panel, and strong rails hold the weight'],['Lay panels flat to cut wind','Snow piles up on flat panels'],['Nothing special','Snow and wind can break a weak frame']], ok:0, hint:'Where does the snow go?'}
 ],
 weather:{q:'Forecast for Leh this week:', opts:[['Mon · snowfall, Khardung La closed','Roads close and the roof is icy'],['Tue · clear but −8 °C morning','Frost makes the roof slippery until late morning'],['Wed · sunny, 12 °C at midday','Work 10 am to 3 pm in dry sun'],['Thu · gusts 60 km/h','Unsafe for lifting panels']], ok:2, hint:'Look for dry sun and calm wind.'},
 crew:{q:'Who goes for a 5 kW school roof at 3,500 m?', opts:[['1 helper','Too few people at high altitude'],['3 installers + 1 licensed electrician + crew lead','Extra hands because work is slower at altitude'],['12 people','Too many people on a mud roof']], ok:1},
 comm:['Visual check and torque on every clamp','Polarity and open-circuit voltage of the string','Insulation resistance test','Earth resistance test','Switch on AC, then DC; set grid profile','Net-meter inspection with the power department'],
 outro:[['inspector','All tests passed. Net meter approved.'],['client','The lab will run even in December!'],['family','Can we play Surya Mission on the new computers?']],
 summary:'4.95 kWp school roof · 9 × 550 W · 375 V string · cold-rated · snow-ready frame'
},
{
 id:'gaya', region:'India', place:'Near Gaya, Bihar, India', title:'Light the Lane', type:'Village streetlights · 21 lights', level:'Beginner',
 theme:{sky:['#86C2E6','#DCEBEF','#EFE4C2'], ground:'#5E8F45', far:'plains', bldg:'lane', obst:'mango'},
 route:{from:'Gaya town', mid:'District road', to:'Suryapur village', km:31, hills:'Ganga plains'},
 cast:{client:{name:'Rekha Devi · sarpanch', skin:'#9A6644', saree:'#F99B02', hair:'#1a1a1a', bun:true, bindi:true}, family:{name:'Pooja · college student', skin:'#B57B52', shirt:'#2E8B57', hair:'#1a1a1a', bun:true}, crew:{name:'Manoj · crew lead', skin:'#8D5A3B', vest:true, hat:'#FDA604'}, inspector:{name:'Alok · block engineer', skin:'#B57B52', shirt:'#5A6F9E', hair:'#1a1a1a', glasses:true}},
 intro:[['crew','{name}, we have 21 all-in-one streetlights and poles on the truck.'],['client','Pranam! After dark the main lane is pitch black. Girls coming home from tuition are scared.']],
 clues:{
  load:['Main lane','Main lane is 1 km long, with 2 junctions',['client','From the temple to the school, about one kilometre.']],
  obst:['Mango trees','Mango trees on the west side shade some pole spots after 2 pm',['you','Each light charges from its own panel. Mango trees on the west will shade some spots.']],
  roof:['Pole base','Soft soil; poles need a concrete base',['you','Soft soil here. Every pole needs a proper concrete foundation.']],
  grid:['Grid','No grid poles on this stretch',['client','The electricity line doesn’t come down this lane.']],
  site:['Night use','Lights needed 12 hours a night',['client','From 6 in the evening to 6 in the morning.']],
  climate:['Floods and theft','Monsoon floods and some theft risk',['you','Floods and theft. Raise the base and use anti-theft fittings.']]
 },
 desk:{title:'Lane survey sheet', rows:[['Village','Suryapur'],['Main lane','1,000 m'],['Spacing','every 50 m'],['Junctions','2'],['Light','30 W all-in-one LED'],['Hours','12 per night'],['Grid','None on lane']], note:['Bihar sun:','~5 peak hours/day','Battery rule:','2 nights backup']},
 size:{q:'Lights every 50 m along 1,000 m, plus one at each end. How many lights?', opts:[['10 lights','That is every 100 m: dark gaps'],['21 lights','Right: 1,000 ÷ 50 + 1 = 21'],['40 lights','Too close together; wastes money'],['5 lights','Huge dark stretches']], ok:1, hint:'Count the gaps, then add one.'},
 layout:{panels:9, cols:7, rows:3, side:'west', block:'tank', label:'lane', unit:'pole'},
 wire:[
  {title:'Size the battery', q:'Each 30 W light runs 12 hours: 360 Wh a night. You want 2 nights of backup and use 80% of the battery. Which battery?', opts:[['12.8 V · 20 Ah LFP (256 Wh)','Not even one night'],['12.8 V · 70 Ah LFP (~900 Wh)','Right: 360 × 2 ÷ 0.8 ≈ 900 Wh'],['12 V · 200 Ah lead-acid','Heavy, theft-prone, and short-lived']], ok:1, hint:'360 Wh × 2 nights ÷ 0.8.'},
  {title:'Size each panel', q:'360 Wh a day, 5 sun hours, about 25% losses. Which panel per light?', opts:[['20 W','Gives only ~75 Wh a day'],['100 W','Right: 360 ÷ (5 × 0.75) ≈ 96 W'],['400 W','Too big and too heavy for a pole']], ok:1, hint:'360 ÷ (5 × 0.75).'},
  {title:'Stop theft and floods', q:'How do you protect the lights?', opts:[['6 m poles, anti-theft bolts, battery inside the fixture, raised concrete base','Out of reach and above flood level'],['Put the battery in a box at ground level','Easy to steal and floods'],['Nothing, villages are safe','Theft and floods are common risks']], ok:0, hint:'Height and hidden batteries.'}
 ],
 weather:{q:'Forecast for Gaya this week:', opts:[['Mon · heavy rain, fields flooded','Trucks get stuck and pits fill with water'],['Tue · thunderstorms','Lightning risk on tall poles'],['Wed · partly cloudy, dry roads','Good for digging and pouring bases'],['Thu · heavy rain','Concrete won’t set well']], ok:2, hint:'Concrete needs dry ground.'},
 crew:{q:'Who goes to erect 21 poles?', opts:[['1 helper','Poles need several people and a tripod'],['4 installers + 1 electrician + crew lead with a pole tripod','Enough hands to raise poles safely'],['20 people','Crowd around poles is unsafe']], ok:1},
 comm:['Visual check of every pole and fixture','Check panel and battery polarity','Test the dusk sensor by covering the panel','Measure light level on the road at night','Log every light in the maintenance register','Handover to the gram panchayat'],
 outro:[['inspector','All 21 lights pass the night test.'],['client','The lane is bright from the temple to the school!'],['family','I can walk home from tuition without fear now.']],
 summary:'21 × 30 W solar streetlights · 100 W panel and 900 Wh LFP each · 2 nights backup'
},
{
 id:'dubai', region:'Middle East', place:'Al Quoz, Dubai, UAE', title:'Desert Warehouse', type:'Commercial rooftop · 50 kWp', level:'Expert',
 theme:{sky:['#7DB8E2','#E8E3D2','#EED7A8'], ground:'#CDB083', far:'city', bldg:'warehouse', obst:'building'},
 route:{from:'Business Bay', mid:'Sheikh Zayed Road', to:'Al Quoz industrial area', km:14, sea:'Arabian Gulf', hills:'Dubai skyline'},
 cast:{client:{name:'Faisal Al Mansoori · warehouse owner', skin:'#C68A5E', shirt:'#F7F7F7', ghutra:true}, family:{name:'Sara · facility manager', skin:'#C68A5E', shirt:'#2F5D9E', hair:'#1a1a1a', bun:true}, crew:{name:'Ravi · site supervisor', skin:'#8D5A3B', vest:true, hat:'#FDA604'}, inspector:{name:'Aisha · DEWA inspector', skin:'#C68A5E', shirt:'#1F5E8C', hijab:'#2A2A2A'}},
 intro:[['crew','Good morning, {name}. 90 panels and a 50 kW inverter arrive by crane this week.'],['client','Salaam, {name}. My cooling bills in summer are enormous.']],
 clues:{
  load:['Power bills','About 7,500 kWh a month, peaking in summer',['client','Around 7,500 kilowatt-hours a month, more in July and August.']],
  obst:['Next warehouse','A taller warehouse to the west shades the roof after 2 pm',['you','That taller building on the west casts afternoon shade.']],
  roof:['Metal roof','Trapezoidal metal roof, 600 m² clear',['you','Metal roof. Clamp rails to the seams; no drilling through.']],
  grid:['Meter','Three-phase DEWA meter under Shams Dubai',['you','Three-phase supply. Shams Dubai net metering with DEWA.']],
  site:['Roof units','AC condensers in the north-east corner',['you','The AC units block one corner of the roof.']],
  climate:['Heat and dust','48 °C summers and frequent dust',['you','Extreme heat and dust. Cleaning and inverter cooling matter.']]
 },
 desk:{title:'DEWA · Electricity bill', rows:[['Customer','Al Mansoori Logistics'],['Tariff','Commercial'],['Jun','8,200 kWh'],['Jul','9,100 kWh'],['Annual average','~7,500 kWh / month'],['Supply','Three-phase'],['Scheme','Shams Dubai']], note:['Dubai sun:','~6.0 peak hours/day','Heat losses:','performance 0.78']},
 size:{q:'Which size covers ~7,500 kWh a month? (kW × 6.0 × 30 × 0.78)', opts:[['20 kW · ~2,800 kWh','Covers barely a third'],['50 kW · ~7,020 kWh','Right: close to the monthly use'],['80 kW · ~11,200 kWh','More than the roof and the use'],['150 kW','Far beyond the roof area']], ok:1, hint:'Each kW gives about 140 kWh a month here.'},
 layout:{panels:6, cols:7, rows:3, side:'west', block:'ac', label:'roof', unit:'block of 15 panels'},
 wire:[
  {title:'Design the strings', q:'The 50 kW inverter tracks 200–850 V and takes at most 1,000 V. Panels are 41.7 V working and 49.9 V open-circuit. Which string?', opts:[['18 in series · 750 V working, 898 V open','Inside the range and under 1,000 V; 5 strings ≈ 90 panels'],['25 in series · 1,043 V working','Above the 1,000 V limit'],['4 in series · 167 V','Below the 200 V minimum']], ok:0, hint:'Multiply 49.9 V by the count and stay under 1,000 V.', show:{n:18,v:41.7,label:'50 kW inverter · MPPT 200–850 V · max 1,000 V'}},
  {title:'Choose the DC cable', q:'Long DC runs in 48 °C heat need…', opts:[['6 mm² UV-rated solar cable, sized for heat','Thicker cable keeps losses and heat down'],['2.5 mm² house wire','Overheats and fails'],['Any cable in conduit','Conduit adds heat; cable must still be rated']], ok:0, hint:'Heat lowers how much current a cable can carry.'},
  {title:'Heat and dust', q:'What keeps the system healthy in Dubai?', opts:[['Weekly cleaning, airflow under panels, inverter in a shaded ventilated room','Dust and heat are the two big losses'],['Paint the roof black','Makes panels hotter'],['Clean once a year','Dust builds up in weeks']], ok:0, hint:'Two enemies: dust and heat.'}
 ],
 weather:{q:'Dubai this week (August):', opts:[['Mon · shamal winds, 45 km/h sandstorm','Unsafe for crane lifts'],['Tue · 46 °C','Midday outdoor work is banned in summer'],['Wed · 38 °C, calm, work 6 am to 12:30 pm','Within the summer midday-break rules'],['Thu · fog, then wind','Crane can’t see; then wind']], ok:2, hint:'Calm air and morning hours.'},
 crew:{q:'Who goes for a 50 kW metal roof?', opts:[['2 people','Far too few for 91 panels'],['6 installers + 2 electricians + supervisor + crane operator','Right size crew with lifting support'],['25 people','Overcrowds the roof']], ok:1},
 comm:['Visual check and torque on every clamp','Polarity and open-circuit voltage of each string','Insulation resistance test','Earth resistance test','Switch on AC, then DC; set grid profile','DEWA inspection and Shams Dubai meter'],
 outro:[['inspector','DEWA inspection passed. Your meter is connected.'],['client','My summer bill will finally shrink.'],['family','I’ll add the solar output to our building dashboard.']],
 summary:'~50 kWp metal roof · 90 × 550 W · 5 strings of 18 · Shams Dubai net metering'
},
{
 id:'nakuru', region:'Africa', place:'Near Nakuru, Kenya', title:'Power for the Clinic', type:'Hybrid clinic · 4.95 kWp + 10 kWh battery', level:'Advanced',
 theme:{sky:['#79B8E5','#D9ECF2','#EBDDB6'], ground:'#8C9A4B', far:'savanna', bldg:'clinic', obst:'jacaranda'},
 route:{from:'Nakuru town', mid:'Murram road', to:'Suryani health centre', km:27, hills:'Rift Valley'},
 cast:{client:{name:'Wanjiru · clinic nurse in-charge', skin:'#5A3A26', shirt:'#FFFFFF', hair:'#111', bun:true}, family:{name:'Achieng · mother with baby', skin:'#4E3222', shirt:'#D94E5A', hair:'#111', bun:true}, crew:{name:'Otieno · crew lead', skin:'#4E3222', vest:true, hat:'#FDA604'}, inspector:{name:'Kamau · county health engineer', skin:'#5A3A26', shirt:'#5A6F9E', hair:'#111', glasses:true}},
 intro:[['crew','Habari, {name}! Nine panels, a hybrid inverter and a 10 kWh battery are on the pickup.'],['client','Karibu! When power cuts at night, our vaccine fridge warms up. Babies are born by torchlight.']],
 clues:{
  load:['Clinic load','About 600 kWh a month; 6 kWh used at night',['client','Our meter shows around 600 a month. The fridge and lights run all night.']],
  obst:['Jacaranda tree','Jacaranda west of the roof shades it after 2 pm',['you','That jacaranda will shade the west side in the afternoon.']],
  roof:['Tin roof','Corrugated iron roof on timber, 35 m² facing north',['you','South of the equator, so panels face north. Iron sheet roof, clamp to the purlins.']],
  grid:['Grid','Grid connection with frequent outages',['client','The power goes off almost every evening.']],
  site:['Vaccine fridge','Vaccine fridge must stay between 2 and 8 °C',['client','If the fridge goes above 8 degrees, we lose the vaccines.']],
  climate:['Storms','Afternoon thunderstorms and lightning in the rainy season',['you','Lightning season. Surge protection and good earthing are a must.']]
 },
 desk:{title:'Clinic energy sheet', rows:[['Facility','Suryani health centre'],['Use','~600 kWh / month'],['Night load','~6 kWh'],['Critical','Vaccine fridge, delivery room'],['Grid','Daily outages'],['Roof','North-facing iron sheet'],['Panel','550 W · Voc 49.9 V']], note:['Rift Valley sun:','~5.5 peak hours/day','Losses:','performance 0.75']},
 size:{q:'Which array covers ~600 kWh a month? (kW × 5.5 × 30 × 0.75)', opts:[['2 kW · ~250 kWh','Too small'],['5 kW · ~620 kWh','Right: 5 × 5.5 × 30 × 0.75 ≈ 620 kWh'],['10 kW · ~1,240 kWh','Twice the need'],['20 kW','Far too big for the roof']], ok:1, hint:'Each kW gives about 124 kWh a month here.'},
 layout:{panels:9, cols:7, rows:3, side:'west', block:'tank', label:'roof', unit:'panel'},
 wire:[
  {title:'Wire the hybrid inverter', q:'The hybrid inverter tracks 120–500 V and takes at most 550 V. Panels: 41.7 V working, 49.9 V open-circuit. Which string?', opts:[['9 in series · 375 V working, 449 V open','Inside the range and under 550 V'],['12 in series · 599 V open','Over the 550 V limit'],['9 in parallel · 42 V','Below the 120 V minimum']], ok:0, hint:'Multiply 49.9 V by the count; stay under 550 V.', show:{n:9,v:41.7,label:'Hybrid inverter · MPPT 120–500 V · max 550 V'}},
  {title:'Size the battery', q:'Night load is 6 kWh. You want a cloudy-morning buffer and use 90% of an LFP battery. Which battery?', opts:[['2.5 kWh','Runs out before midnight'],['10 kWh LFP','Covers the night with a buffer: 6 ÷ 0.9 ≈ 6.7 kWh plus reserve'],['50 kWh','Very costly; the array can’t refill it']], ok:1, hint:'6 ÷ 0.9, then add a buffer.'},
  {title:'Lightning season', q:'What protects the clinic’s system?', opts:[['Proper earthing, a lightning arrester, and DC and AC surge protectors','Gives surges a safe path to ground'],['Unplug it when it rains','The fridge must run during storms'],['Nothing extra','One strike can destroy the inverter']], ok:0, hint:'Give lightning a safe path.'}
 ],
 weather:{q:'Nakuru this week (long rains):', opts:[['Mon · heavy rain, murram road muddy','The pickup will get stuck'],['Tue · afternoon thunderstorms','Lightning on the roof'],['Wed · dry and sunny','Install in dry weather'],['Thu · heavy rain','Roof is slippery']], ok:2, hint:'Dry road and dry roof.'},
 crew:{q:'Who goes for a 5 kW clinic job with a battery?', opts:[['1 helper','Battery and panels need more people'],['2 installers + 1 licensed electrician + crew lead','Two lifting, one wiring and battery, one in charge'],['10 people','Crowds a working clinic']], ok:1},
 comm:['Visual check and torque on every clamp','Polarity and open-circuit voltage of the string','Insulation resistance test','Earth resistance test','Battery check and first charge','Test backup by switching off the grid, then train the staff'],
 outro:[['inspector','Backup test passed. The fridge stayed at 5 °C.'],['client','No more deliveries by torchlight.'],['family','Asante sana!']],
 summary:'4.95 kWp north-facing roof · 9 × 550 W · 375 V string · 10 kWh LFP backup'
},
{
 id:'bavaria', region:'Europe', place:'Near Rosenheim, Bavaria, Germany', title:'Snow on the Alps', type:'Home rooftop · 5.5 kWp', level:'Intermediate',
 theme:{sky:['#6FA9DC','#C9DFEE','#EEF1F2'], ground:'#6E9C55', far:'alps', bldg:'alpine', obst:'chimney'},
 route:{from:'Rosenheim', mid:'B15 road', to:'Sonnendorf', km:12, hills:'Bavarian Alps'},
 cast:{client:{name:'Anna Huber · homeowner', skin:'#E8C4A4', shirt:'#8E2B2B', hair:'#C9A066', bun:true}, family:{name:'Max · her son', skin:'#E8C4A4', shirt:'#2F5D9E', hair:'#C9A066'}, crew:{name:'Jonas · installer', skin:'#E0B896', vest:true, hat:'#FDA604'}, inspector:{name:'Grid technician · Bayernwerk Netz', skin:'#E0B896', shirt:'#1F5E8C', hair:'#5a4030', glasses:true}},
 intro:[['crew','Servus, {name}! Ten panels and a 6 kW inverter are in the van. Sonnendorf is 12 km away.'],['client','Grüß Gott! Our power price keeps rising. We want to make our own.']],
 clues:{
  load:['Energy bill','About 4,500 kWh a year, ~375 a month',['client','Our bill says about 4,500 kilowatt-hours a year.']],
  obst:['Chimney','Chimney on the west side shades part of the roof after 2 pm',['you','The chimney is on the west. Afternoon shade on the left side.']],
  roof:['Roof','Clay tile roof, south face, 35° pitch, 30 m²',['you','South-facing at 35 degrees. Ideal. Roof hooks under the tiles.']],
  grid:['Meter cabinet','Old meter cabinet; grid operator Bayernwerk Netz',['you','The meter cabinet may need an update for the new meter.']],
  site:['Dormer','A dormer window blocks one corner',['you','The dormer takes one corner of the roof.']],
  climate:['Snow','Heavy snow load zone; −15 °C winter mornings',['you','Heavy snow zone. Rails and hooks must be rated for it.']]
 },
 desk:{title:'Stromrechnung · power bill', rows:[['Customer','Familie Huber'],['Year','4,520 kWh'],['Average','~375 kWh / month'],['Roof','South, 35°'],['Grid operator','Bayernwerk Netz'],['Register','Marktstammdatenregister'],['Panel','550 W · Voc 49.9 V']], note:['Bavaria sun:','~2.9 peak hours/day (year)','Cool climate:','performance 0.85']},
 size:{q:'Which size covers ~375 kWh a month? (kWp × 2.9 × 30 × 0.85)', opts:[['2 kWp · ~150 kWh','Covers well under half'],['5.5 kWp · ~407 kWh','Right: 10 panels cover the yearly use'],['10 kWp · ~740 kWh','Twice the use; extra export pays little'],['15 kWp','Does not fit the roof']], ok:1, hint:'Each kWp gives about 74 kWh a month here, averaged over the year.'},
 layout:{panels:10, cols:7, rows:3, side:'west', block:'dormer', label:'roof', unit:'panel'},
 wire:[
  {title:'Wire for a cold morning', q:'The inverter tracks 160–850 V and takes at most 1,000 V. At −15 °C each panel’s open-circuit voltage rises to ~56 V. Which string?', opts:[['10 in series · 417 V working, ~560 V cold','Inside the range and well under 1,000 V'],['10 in parallel · 42 V','Below the 160 V minimum'],['Only 5 panels in series','Half the system, and below the bill']], ok:0, hint:'10 × 56 V stays far below 1,000 V.', show:{n:10,v:41.7,label:'6 kW inverter · MPPT 160–850 V · max 1,000 V'}},
  {title:'Choose the DC cable', q:'Which DC cable goes from roof to inverter?', opts:[['6 mm² solar cable, UV- and cold-rated','Rated for outdoor DC and cold'],['Speaker cable','Not a power cable'],['Indoor PVC cable','Not UV-rated']], ok:0, hint:'Rated for outdoor DC.'},
  {title:'Snow load', q:'How do you prepare the roof for snow?', opts:[['Hooks and rails rated for the snow zone, plus snow guards over the entrance','Holds the weight and stops snow sliding onto people'],['Remove panels each winter','Not practical, and loses winter sun'],['Nothing, snow melts','Snow load can bend rails']], ok:0, hint:'Weight and sliding snow.'}
 ],
 weather:{q:'Rosenheim this week (November):', opts:[['Mon · 15 cm snowfall','Snow-covered tiles are dangerous'],['Tue · freezing rain','Ice on the roof'],['Wed · dry, 4 °C','Safe to work with care'],['Thu · storm gusts 70 km/h','Unsafe for panels on a roof']], ok:2, hint:'Dry and calm.'},
 crew:{q:'Who goes for a 5.5 kWp tile roof?', opts:[['1 person','Not safe on a 35° roof'],['2 roofers + 1 certified electrician','Two on the roof with scaffolding, one for the AC side'],['8 people','Too many on a steep roof']], ok:1},
 comm:['Visual check and torque on every hook','Polarity and open-circuit voltage of the string','Insulation resistance test','Earth and equipotential bonding test','Switch on and set the grid profile','Register in the Marktstammdatenregister; grid operator fits the meter'],
 outro:[['inspector','The new meter is in. You’re connected.'],['client','Our first sunny day already covered the washing machine!'],['family','Can we get a heat pump next?']],
 summary:'5.5 kWp south roof · 10 × 550 W · 417 V string · snow-zone rated'
},
{
 id:'sacramento', region:'North America', place:'Sacramento, California, USA', title:'Sun Over the Valley', type:'Home rooftop · 7.15 kWp', level:'Expert',
 theme:{sky:['#77B6E6','#D4E8F2','#F1E2C0'], ground:'#B9A35E', far:'hills', bldg:'suburban', obst:'oak'},
 route:{from:'Downtown Sacramento', mid:'US-50', to:'Sunfield neighborhood', km:18, hills:'Sierra foothills'},
 cast:{client:{name:'Maria Garcia · homeowner', skin:'#C68A5E', shirt:'#2E8B57', hair:'#2a1a10', bun:true}, family:{name:'Diego · her son', skin:'#C68A5E', shirt:'#D94E5A', hair:'#2a1a10'}, crew:{name:'Mike · crew lead', skin:'#E0B896', vest:true, hat:'#FDA604'}, inspector:{name:'Linda · city building inspector', skin:'#E8C4A4', shirt:'#1F5E8C', hair:'#C9A066', glasses:true}},
 intro:[['crew','Morning, {name}. Thirteen panels and a 7.6 kW inverter are on the truck.'],['client','Hi! Our summer AC bills are brutal.']],
 clues:{
  load:['Utility bill','About 900 kWh a month, more in summer',['client','We use around 900 kilowatt-hours a month.']],
  obst:['Oak tree','Oak to the west shades the roof after 2 pm',['you','That oak shades the west side in the afternoon.']],
  roof:['Roof','Composition shingle, south face, 22° pitch',['you','South-facing shingle roof. Flashed mounts so it doesn’t leak.']],
  grid:['Main panel','200 A main panel; utility is SMUD',['you','The main panel has room for the solar breaker.']],
  site:['Vent pipes','Plumbing vents block one corner',['you','Vent pipes take one corner of the roof.']],
  climate:['Fire season','Extreme heat and wildfire season',['you','Fire season. Firefighters need rapid shutdown and clear roof paths.']]
 },
 desk:{title:'SMUD · Electricity bill', rows:[['Customer','Garcia household'],['Jul','1,150 kWh'],['Annual average','~900 kWh / month'],['Roof','South, 22°'],['Main panel','200 A'],['Code','Rapid shutdown required'],['Panel','550 W · Voc 49.9 V']], note:['Valley sun:','~5.5 peak hours/day','Losses:','performance 0.80']},
 size:{q:'Which size covers ~900 kWh a month? (kW × 5.5 × 30 × 0.80)', opts:[['4 kW · ~530 kWh','Leaves a big bill'],['7 kW · ~925 kWh','Right: 13 panels ≈ 7.15 kWp'],['12 kW · ~1,580 kWh','Much more than you use'],['15 kW','Does not fit the roof']], ok:1, hint:'Each kW gives about 132 kWh a month here.'},
 layout:{panels:13, cols:8, rows:3, side:'west', block:'vent', label:'roof', unit:'panel'},
 wire:[
  {title:'Split the strings', q:'The 7.6 kW inverter tracks 100–480 V and takes at most 600 V. Panels: 41.7 V working, 49.9 V open-circuit. How do you wire 13 panels?', opts:[['All 13 in series · 542 V','Above the 480 V tracking limit, and 649 V open-circuit is over 600 V'],['Two strings: 7 and 6 panels','292 V and 250 V both sit inside 100–480 V'],['All 13 in parallel · 42 V','Below the 100 V minimum']], ok:1, hint:'One long string is too much. Split it.', show:{n:7,v:41.7,label:'7.6 kW inverter · MPPT 100–480 V · max 600 V'}},
  {title:'Choose the DC wire', q:'Which wire runs on the roof?', opts:[['PV wire, 10 AWG, sunlight-resistant','Listed for rooftop DC'],['Extension cord','Never for permanent wiring'],['Thin bell wire','Not a power wire']], ok:0, hint:'Look for PV wire.'},
  {title:'Fire safety', q:'What does the code require on a California roof?', opts:[['Rapid shutdown at the panels and clear firefighter paths on the roof','Lets firefighters work safely'],['Paint panels red','Not a safety feature'],['Nothing extra for homes','Rapid shutdown is required']], ok:0, hint:'What do firefighters need?'}
 ],
 weather:{q:'Sacramento this week (September):', opts:[['Mon · red flag warning, 35 mph winds','Too windy for panels on a roof'],['Tue · 41 °C heat advisory','Heat illness risk'],['Wed · 29 °C, clear','Good install day'],['Thu · wildfire smoke, AQI 180','Unhealthy air for the crew']], ok:2, hint:'Calm, clear and not extreme.'},
 crew:{q:'Who goes for a 7 kW shingle roof?', opts:[['1 person','Not safe'],['2 installers + 1 licensed electrician + crew lead','A standard residential crew'],['12 people','Too many on one roof']], ok:1},
 comm:['Visual check and torque on every mount','Polarity and open-circuit voltage of each string','Insulation resistance test','Rapid-shutdown test','City building inspection','Permission to operate from SMUD, then switch on'],
 outro:[['inspector','Inspection passed. You can apply for permission to operate.'],['client','We got permission! The system is live.'],['family','Our AC now runs on the sun.']],
 summary:'7.15 kWp south roof · 13 × 550 W · two strings (7 + 6) · rapid shutdown'
}
];
