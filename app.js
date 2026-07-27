const kpis=[
 {icon:'⇄',label:'رحلات اليوم',value:'84',trend:'▲ 12.5%',good:true},
 {icon:'▰',label:'الشاحنات المتاحة',value:'47',trend:'▲ 6 شاحنات',good:true},
 {icon:'◉',label:'السائقون المتاحون',value:'39',trend:'▲ 4 سائقين',good:true},
 {icon:'▣',label:'الحجوزات الجديدة',value:'12',trend:'▲ 3 هذا الصباح',good:true},
 {icon:'⌁',label:'الرحلات المتأخرة',value:'3',trend:'▼ تحسن 18%',good:true},
 {icon:'↺',label:'فرص رحلات العودة',value:'7',trend:'▲ 2 فرص جديدة',good:true},
 {icon:'◫',label:'إيرادات اليوم',value:'184K',trend:'▲ 9.4%',good:true},
 {icon:'✦',label:'استغلال الأسطول',value:'91.8%',trend:'▲ 4.2%',good:true}
];
const activities=[
 ['✓','تم اعتماد المطابقة','JED → RUH · T-205','منذ دقيقتين'],
 ['▣','حجز جديد من الراجحي','حمولة 20 طن · أولوية عاجلة','منذ 6 دقائق'],
 ['⇄','انطلاق الشاحنة T-119','الرياض → الدمام','منذ 11 دقيقة'],
 ['!','تنبيه تأخير بسيط','TR-1048 · 22 دقيقة','منذ 18 دقيقة'],
 ['↺','اكتشاف رحلة عودة','الدمام → جدة · هامش 26%','منذ 24 دقيقة'],
 ['✓','إثبات تسليم مستلم','TR-1039 · العميل وقّع','منذ 31 دقيقة']
];
const trips=[
 ['TR-1058','جدة','الرياض','الراجحي للصناعات','محمد السلمي','T-205',72,'اليوم 18:30','في الطريق','transit'],
 ['TR-1057','الرياض','الدمام','الدوائية السعودية','خالد المطيري','T-119',46,'اليوم 20:10','في الطريق','transit'],
 ['TR-1056','جدة','أبها','مجموعة بن لادن','علي الشهري','T-311',18,'غدًا 02:20','تحميل','loading'],
 ['TR-1055','الدمام','جدة','سابك للخدمات','سالم القحطاني','T-087',61,'غدًا 05:00','عودة متاحة','return'],
 ['TR-1054','تبوك','الرياض','النهدي','أحمد الحربي','T-154',83,'اليوم 17:45','متأخرة','delayed']
];
const titles={dashboard:'مركز القيادة اللوجستي',bookings:'إدارة الحجوزات',matching:'محرك المطابقة الذكي',trips:'إدارة الرحلات',fleet:'إدارة الأسطول',drivers:'إدارة السائقين',carriers:'إدارة الناقلين',customers:'إدارة العملاء',reports:'التقارير التنفيذية'};

document.getElementById('kpiGrid').innerHTML=kpis.map(k=>`<article class="kpi"><div class="icon">${k.icon}</div><small>${k.label}</small><strong>${k.value}</strong><footer class="${k.good?'':'down'}">${k.trend}</footer></article>`).join('');
document.getElementById('activityList').innerHTML=activities.map(a=>`<div class="activity"><div class="act-icon">${a[0]}</div><div><b>${a[1]}</b><small>${a[2]}</small></div><time>${a[3]}</time></div>`).join('');
document.getElementById('tripRows').innerHTML=trips.map(t=>`<tr><td><b>${t[0]}</b></td><td class="route-cell"><b>${t[1]} ← ${t[2]}</b><small>مسار بري</small></td><td>${t[3]}</td><td><b>${t[4]}</b><small>${t[5]}</small></td><td><div class="progress"><i style="width:${t[6]}%"></i></div><small>${t[6]}%</small></td><td>${t[7]}</td><td><span class="status ${t[9]}">${t[8]}</span></td><td>•••</td></tr>`).join('');

document.querySelectorAll('.nav-item').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));btn.classList.add('active');document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById(btn.dataset.view).classList.add('active');document.getElementById('pageTitle').textContent=titles[btn.dataset.view];document.getElementById('sidebar').classList.remove('open');window.scrollTo(0,0)}));

document.getElementById('mobileMenu').onclick=()=>document.getElementById('sidebar').classList.toggle('open');
const modal=document.getElementById('bookingModal');document.getElementById('newBookingBtn').onclick=()=>modal.classList.add('open');document.getElementById('closeModal').onclick=()=>modal.classList.remove('open');document.getElementById('saveBooking').onclick=()=>{modal.classList.remove('open');showToast('تم إنشاء الحجز وتشغيل المطابقة الذكية بنجاح')};
document.getElementById('assignBtn').onclick=()=>showToast('تم تعيين السائق محمد السلمي والشاحنة T-205');document.getElementById('alertsBtn').onclick=()=>showToast('لديك 3 تنبيهات تشغيلية جديدة');
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000)}

document.getElementById('matchingForm').addEventListener('submit',e=>{e.preventDefault();const o=document.getElementById('origin').value,d=document.getElementById('destination').value;const box=document.getElementById('matchResults');box.className='';box.innerHTML='<div class="empty-state"><div>✦</div><h4>جاري تحليل 142 خيارًا...</h4><p>مقارنة التوفر والموقع والتكلفة ورحلات العودة.</p></div>';setTimeout(()=>{box.innerHTML=[['96%','ANC Logistics · T-205','محمد السلمي · متاح خلال 35 دقيقة','1,820 ر.س'],['91%','ناقل الخليج · T-119','خالد المطيري · متاح خلال 55 دقيقة','1,540 ر.س'],['84%','النقل الشرقي · T-310','أحمد الحربي · متاح خلال 75 دقيقة','1,210 ر.س']].map((r,i)=>`<article class="recommendation ${i===0?'best':''}"><div class="score">${r[0]}</div><div><h4>${i===0?'⭐ ':''}${r[1]}</h4><p>${o} ← ${d} · ${r[2]} · الربح ${r[3]}</p></div><button onclick="showToast('تم اعتماد الترشيح بنجاح')">اعتماد</button></article>`).join('')},1100)});

const cards=(arr)=>arr.map(x=>`<article class="mini-card"><b>${x[0]}</b><small>${x[1]}</small></article>`).join('');
document.getElementById('bookingCards').innerHTML=cards([['BK-2291','الراجحي · جدة ← الرياض · عاجل'],['BK-2290','الدوائية · الرياض ← الدمام'],['BK-2289','النهدي · جدة ← أبها'],['BK-2288','سابك · الدمام ← جدة'],['BK-2287','بن لادن · مكة ← تبوك'],['BK-2286','المراعي · الرياض ← جدة']]);
document.getElementById('fleetGrid').innerHTML=cards([['T-205','متاحة · جدة'],['T-119','في الطريق · الرياض'],['T-311','تحميل · جدة'],['T-087','عودة متاحة · الدمام'],['T-154','متأخرة · تبوك'],['T-224','صيانة · جدة'],['T-192','متاحة · الرياض'],['T-306','في الطريق · أبها']]);
document.getElementById('driverCards').innerHTML=cards([['محمد السلمي','تقييم 4.9 · متاح'],['خالد المطيري','تقييم 4.8 · في رحلة'],['علي الشهري','تقييم 4.7 · تحميل'],['سالم القحطاني','تقييم 4.9 · في رحلة'],['أحمد الحربي','تقييم 4.6 · متأخر'],['نايف العتيبي','تقييم 4.8 · متاح']]);
document.getElementById('carrierCards').innerHTML=cards([['ANC Logistics','التزام 96% · 48 شاحنة'],['ناقل الخليج','التزام 92% · 31 شاحنة'],['النقل الشرقي','التزام 89% · 26 شاحنة'],['حلول المسار','التزام 94% · 18 شاحنة'],['الرواد للنقل','التزام 87% · 14 شاحنة'],['الوطنية للشحن','التزام 91% · 22 شاحنة']]);
document.getElementById('customerCards').innerHTML=cards([['الراجحي للصناعات','128 رحلة · هامش 24%'],['الدوائية السعودية','94 رحلة · هامش 22%'],['مجموعة بن لادن','81 رحلة · هامش 19%'],['سابك للخدمات','76 رحلة · هامش 27%'],['النهدي','63 رحلة · هامش 21%'],['المراعي','58 رحلة · هامش 23%']]);

function drawChart(){const c=document.getElementById('performanceChart');if(!c)return;const ctx=c.getContext('2d');const dpr=window.devicePixelRatio||1;const w=c.clientWidth,h=230;c.width=w*dpr;c.height=h*dpr;ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(154,181,211,.10)';ctx.lineWidth=1;for(let y=25;y<h-20;y+=40){ctx.beginPath();ctx.moveTo(25,y);ctx.lineTo(w-10,y);ctx.stroke()}const vals=[58,72,66,84,78,92,88];const step=(w-55)/(vals.length-1);const grad=ctx.createLinearGradient(0,20,0,h);grad.addColorStop(0,'rgba(33,212,195,.35)');grad.addColorStop(1,'rgba(33,212,195,0)');ctx.beginPath();vals.forEach((v,i)=>{const x=30+i*step,y=h-28-v*1.65;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.lineTo(30+(vals.length-1)*step,h-25);ctx.lineTo(30,h-25);ctx.closePath();ctx.fillStyle=grad;ctx.fill();ctx.beginPath();vals.forEach((v,i)=>{const x=30+i*step,y=h-28-v*1.65;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle='#21d4c3';ctx.lineWidth=2.5;ctx.stroke();vals.forEach((v,i)=>{const x=30+i*step,y=h-28-v*1.65;ctx.beginPath();ctx.arc(x,y,3.5,0,Math.PI*2);ctx.fillStyle='#07111f';ctx.fill();ctx.strokeStyle='#21d4c3';ctx.stroke()});['س','ح','ن','ث','ر','خ','ج'].forEach((d,i)=>{ctx.fillStyle='#6f879f';ctx.font='10px Tajawal';ctx.fillText(d,27+i*step,h-8)})}drawChart();window.addEventListener('resize',drawChart);

document.getElementById('globalSearch').addEventListener('input',e=>{const q=e.target.value.toLowerCase();document.querySelectorAll('#tripRows tr').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(q)?'':'none')});
