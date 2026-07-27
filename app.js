const kpis = [
  {label:"إجمالي الرحلات اليوم",value:"42",trend:"↑ 12%",note:"مقارنة مع أمس",icon:"▰",color:"#0b5fc7"},
  {label:"الرحلات المكتملة",value:"35",trend:"↑ 83%",note:"مقارنة مع أمس",icon:"✓",color:"#2caf64"},
  {label:"الرحلات قيد التنفيذ",value:"7",trend:"↑ 17%",note:"مقارنة مع أمس",icon:"▣",color:"#f39a19"},
  {label:"إجمالي الإيرادات",value:"1,245,000",unit:"SAR",trend:"↑ 15%",note:"مقارنة مع أمس",icon:"$",color:"#12a7b2"},
  {label:"هامش الربح",value:"18.6%",trend:"↑ 2.3%",note:"مقارنة مع أمس",icon:"↗",color:"#7444c7"},
  {label:"نسبة الاستغلال",value:"91%",trend:"↑ 8%",note:"مقارنة مع أمس",icon:"◔",color:"#12a7b2"},
  {label:"الرحلات المتأخرة",value:"3",trend:"↓ -25%",note:"مقارنة مع أمس",icon:"◷",color:"#d63d45",down:true},
  {label:"متوسط وقت التسليم",value:"6.4",unit:"ساعة",trend:"↓ -8%",note:"مقارنة مع أمس",icon:"◴",color:"#0b5fc7",down:true}
];

const activities = [
  {time:"09:40",title:"تم إنشاء حجز جديد",sub:"جدة ← الرياض",tone:"blue"},
  {time:"09:42",title:"تم ترشيح ناقل",sub:"ANC للنقل البري",tone:""},
  {time:"09:44",title:"تم ترشيح سائق",sub:"أحمد سالم",tone:""},
  {time:"09:45",title:"تم قبول الحجز",sub:"ANC للنقل البري",tone:""},
  {time:"09:45",title:"انطلقت الشاحنة",sub:"T-205",tone:"orange"}
];

const trips = [
  ["TRP-10023","الرياض","جدة","مواد غذائية","ANC للنقل البري","أحمد سالم","08:00","قيد التنفيذ",75],
  ["TRP-10024","المدينة المنورة","الدمام","قطع غيار","النورس للنقل","محمد العتيبي","07:30","قيد التنفيذ",45],
  ["TRP-10025","مكة المكرمة","الرياض","أجهزة إلكترونية","المجد للنقل","سعود القحطاني","06:15","في الطريق",90],
  ["TRP-10022","الرياض","تبوك","مواد غذائية","ANC للنقل البري","ياسر الشهري","05:45","تم التسليم",100]
];

const titles = {
  dashboard:"Station One Operations Control Center",operations:"غرفة العمليات",bookings:"إدارة الحجوزات",trips:"إدارة الرحلات",fleet:"إدارة الأسطول",drivers:"السائقون",carriers:"الناقلون",customers:"العملاء",reports:"التقارير والتحليلات",alerts:"التنبيهات",settings:"الإعدادات"
};

document.getElementById("kpiGrid").innerHTML = kpis.map(k => `
  <article class="kpi-card">
    <div class="kpi-icon" style="background:${k.color}">${k.icon}</div>
    <small>${k.label}</small>
    <strong>${k.value}${k.unit?` <span class="unit">${k.unit}</span>`:""}</strong>
    <footer class="${k.down?"down":""}">${k.trend}<span>${k.note}</span></footer>
  </article>`).join("");

document.getElementById("activityTimeline").innerHTML = activities.map(a => `
  <div class="timeline-item ${a.tone}">
    <time>${a.time}</time><span class="timeline-marker"></span>
    <div><b>${a.title}</b><small>${a.sub}</small></div>
  </div>`).join("");

document.getElementById("tripRows").innerHTML = trips.map(t => `
  <tr>
    <td><b style="color:#0b5fc7">${t[0]}</b></td><td>${t[1]}</td><td>${t[2]}</td><td>${t[3]}</td>
    <td>${t[4]}</td><td>${t[5]}</td><td>${t[6]}</td>
    <td><span class="status ${t[7]==="تم التسليم"?"active":t[7]==="قيد التنفيذ"?"delayed":"active"}">${t[7]}</span></td>
    <td><div class="progress"><span>${t[8]}%</span><div class="progress-bar"><i style="width:${t[8]}%"></i></div></div></td>
    <td><button class="track-btn" onclick="showToast('فتح تتبع الرحلة ${t[0]}')">تتبع</button></td>
  </tr>`).join("");

document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));
  document.querySelectorAll(".view").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(btn.dataset.view).classList.add("active");
  document.getElementById("pageTitle").textContent = titles[btn.dataset.view];
  document.getElementById("sidebar").classList.remove("open");
  window.scrollTo(0,0);
}));

document.getElementById("menuBtn").onclick = () => document.getElementById("sidebar").classList.toggle("open");
document.getElementById("notificationBtn").onclick = () => showToast("لديك 5 تنبيهات تشغيلية جديدة");
document.getElementById("assignNow").onclick = () => showToast("تم تعيين الناقل والسائق والشاحنة بنجاح");
document.getElementById("refreshMap").onclick = e => {
  e.currentTarget.textContent = "جاري التحديث...";
  setTimeout(()=>{e.currentTarget.textContent="تحديث الخريطة ↻";showToast("تم تحديث شبكة الرحلات المباشرة");},900);
};

document.querySelectorAll(".city-node").forEach(node => node.addEventListener("click", () => {
  showToast(`عرض الرحلات النشطة في ${node.dataset.city}`);
}));

document.getElementById("globalSearch").addEventListener("input", e => {
  const q = e.target.value.trim().toLowerCase();
  document.querySelectorAll("#tripRows tr").forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});

function showToast(message){
  const t = document.getElementById("toast");
  t.textContent = message;
  t.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>t.classList.remove("show"),2700);
}

const cards = items => items.map(x=>`<article class="mini-card"><b>${x[0]}</b><small>${x[1]}</small></article>`).join("");
document.getElementById("bookingCards").innerHTML = cards([["BK-2291","الراجحي · جدة ← الرياض · عاجل"],["BK-2290","الدوائية · الرياض ← الدمام"],["BK-2289","النهدي · جدة ← أبها"]]);
document.getElementById("tripCards").innerHTML = cards([["TRP-10023","جدة ← الرياض · 75%"],["TRP-10024","المدينة ← الدمام · 45%"],["TRP-10025","مكة ← الرياض · 90%"]]);
document.getElementById("fleetCards").innerHTML = cards([["T-205","متاحة الآن · جدة"],["T-119","في الطريق · الرياض"],["T-311","تحميل · جدة"],["T-087","عودة متاحة · الدمام"]]);
document.getElementById("driverCards").innerHTML = cards([["أحمد سالم","تقييم 4.8 · متاح"],["محمد العتيبي","تقييم 4.7 · في رحلة"],["سعود القحطاني","تقييم 4.9 · في الطريق"]]);
document.getElementById("carrierCards").innerHTML = cards([["ANC للنقل البري","التزام 96%"],["النورس للنقل","التزام 92%"],["المجد للنقل","التزام 90%"]]);
document.getElementById("customerCards").innerHTML = cards([["الراجحي للصناعات","128 رحلة"],["الدوائية السعودية","94 رحلة"],["سابك للخدمات","76 رحلة"]]);
document.getElementById("alertCards").innerHTML = cards([["تأخير TRP-10028","تجاوز الموعد المتوقع بـ 22 دقيقة"],["صيانة T-224","موعد الصيانة خلال 4 ساعات"],["رحلة عودة متاحة","الدمام ← جدة · هامش 26%"]]);
