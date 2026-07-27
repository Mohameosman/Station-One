const kpis = [
  {label:"إجمالي الرحلات اليوم",value:"42",trend:"↑ 12%",note:"مقارنة مع أمس",icon:"▰",color:"#0a4e99"},
  {label:"الرحلات المكتملة",value:"35",trend:"↑ 83%",note:"مقارنة مع أمس",icon:"✓",color:"#2eae65"},
  {label:"الرحلات قيد التنفيذ",value:"7",trend:"↑ 17%",note:"مقارنة مع أمس",icon:"▣",color:"#f39a19"},
  {label:"إجمالي الإيرادات اليوم",value:"1,245,000",unit:"SAR",trend:"↑ 15%",note:"مقارنة مع أمس",icon:"$",color:"#19a9ba"},
  {label:"هامش الربح",value:"18.6%",trend:"↑ 2.3%",note:"مقارنة مع أمس",icon:"↗",color:"#7444c7",purple:true},
  {label:"نسبة الاستغلال",value:"91%",trend:"↑ 8%",note:"مقارنة مع أمس",icon:"◔",color:"#19a9ba"},
  {label:"الرحلات المتأخرة",value:"3",trend:"↓ -25%",note:"مقارنة مع أمس",icon:"◷",color:"#d93b43",down:true},
  {label:"متوسط وقت التسليم",value:"6.4",unit:"ساعة",trend:"↓ -8%",note:"مقارنة مع أمس",icon:"◴",color:"#0a4e99",down:true}
];

const timeline = [
  {time:"09:40",title:"تم إنشاء حجز جديد",sub:"جدة ← الرياض",tone:"blue",state:"جديد"},
  {time:"09:42",title:"تم ترشيح ناقل",sub:"ANC للنقل البري",tone:"",state:"✓"},
  {time:"09:44",title:"تم ترشيح سائق",sub:"أحمد سالم",tone:"",state:"✓"},
  {time:"09:45",title:"تم قبول الحجز",sub:"ANC للنقل البري",tone:"",state:"✓"},
  {time:"09:45",title:"انطلقت الشاحنة",sub:"T-205",tone:"orange",state:"▰"}
];

const trips = [
  ["TRP-10023","الرياض","جدة","مواد غذائية","ANC للنقل البري","أحمد سالم","08:00","قيد التنفيذ",75],
  ["TRP-10024","المدينة المنورة","الدمام","قطع غيار","النورس للنقل","محمد العتيبي","07:30","قيد التنفيذ",45],
  ["TRP-10025","مكة المكرمة","الرياض","أجهزة إلكترونية","المجد للنقل","سعود القحطاني","06:15","في الطريق",90],
  ["TRP-10022","الرياض","تبوك","مواد غذائية","ANC للنقل البري","ياسر الشهري","05:45","تم التسليم",100]
];

document.getElementById("kpiRow").innerHTML = kpis.map(k=>`
<article class="kpi">
  <div class="icon" style="background:${k.color}">${k.icon}</div>
  <span class="label">${k.label}</span>
  <strong>${k.value}${k.unit?` <span class="unit">${k.unit}</span>`:""}</strong>
  <span class="trend ${k.down?"down":k.purple?"purpleText":"up"}">${k.trend}</span>
  <small>${k.note}</small>
</article>`).join("");

document.getElementById("timeline").innerHTML = timeline.map(x=>`
<article>
  <time>${x.time}</time>
  <i class="${x.tone}"></i>
  <div><b>${x.title}</b><small>${x.sub}</small></div>
  <span class="state">${x.state}</span>
</article>`).join("");

document.getElementById("tripTable").innerHTML = trips.map(t=>`
<tr>
  <td class="trip-id">${t[0]}</td><td>${t[1]}</td><td>${t[2]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${t[5]}</td><td>${t[6]}</td>
  <td><span class="status ${t[7]==="تم التسليم"?"done":t[7]==="في الطريق"?"road":"active"}">${t[7]}</span></td>
  <td><div class="progress"><span>${t[8]}%</span><i><b class="${t[8]===45?"orange":""}" style="width:${t[8]}%"></b></i></div></td>
  <td><button class="track" data-trip="${t[0]}">تتبع</button></td>
</tr>`).join("");

const toast = document.getElementById("toast");
const dialog = document.getElementById("dialog");
function notify(msg){
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(()=>toast.classList.remove("show"),2400);
}
function openDialog(title, body){
  document.getElementById("dialogTitle").textContent = title;
  document.getElementById("dialogBody").innerHTML = `<p>${body}</p>`;
  dialog.showModal();
}
document.getElementById("dialogClose").onclick = ()=>dialog.close();

document.getElementById("assignBtn").onclick = ()=>notify("تم تعيين الناقل والسائق والشاحنة بنجاح");
document.getElementById("notifyBtn").onclick = ()=>openDialog("التنبيهات","لديك 5 تنبيهات تشغيلية جديدة تحتاج المراجعة.");
document.getElementById("langBtn").onclick = ()=>notify("اللغة الحالية: العربية");
document.getElementById("allActivity").onclick = ()=>openDialog("النشاط المباشر","تم فتح سجل النشاط التشغيلي الكامل.");
document.getElementById("allTrips").onclick = ()=>openDialog("الرحلات النشطة","تم فتح جميع الرحلات النشطة اليوم.");
document.getElementById("showAllMap").onclick = ()=>openDialog("شبكة الرحلات","تم فتح عرض شبكة الرحلات المباشرة.");

document.querySelectorAll(".track").forEach(btn=>btn.onclick=()=>notify("فتح تتبع الرحلة "+btn.dataset.trip));
document.querySelectorAll(".city").forEach(city=>city.addEventListener("click",()=>notify("عرض الرحلات في "+city.dataset.city)));
document.querySelectorAll(".route").forEach(route=>route.addEventListener("click",()=>notify(route.dataset.route)));

let zoom = 1;
const map = document.getElementById("ksaMap");
document.getElementById("zoomIn").onclick = ()=>{zoom=Math.min(1.7,zoom+.1);map.style.transform=`scale(${zoom})`};
document.getElementById("zoomOut").onclick = ()=>{zoom=Math.max(.8,zoom-.1);map.style.transform=`scale(${zoom})`};
document.getElementById("resetMap").onclick = ()=>{zoom=1;map.style.transform="scale(1)";notify("تم توسيط الخريطة")};

document.querySelectorAll("[data-filter]").forEach(btn=>btn.onclick=()=>{
  const type = btn.dataset.filter;
  const cls = type+"-route";
  document.querySelectorAll(".route").forEach(r=>r.classList.toggle("hidden",!r.classList.contains(cls)));
  notify("تم تطبيق فلتر المسارات");
});

const sectionData = {
  operations:["غرفة العمليات","متابعة الرحلات والحجوزات والتنبيهات التشغيلية.",[["رحلات مباشرة","24"],["حجوزات جديدة","12"],["تنبيهات مفتوحة","5"]]],
  bookings:["الحجوزات","إدارة الحجوزات الجديدة والمؤكدة.",[["BK-2291","جدة ← الرياض"],["BK-2290","الرياض ← الدمام"],["BK-2289","جدة ← أبها"]]],
  trips:["الرحلات","إدارة وتتبع الرحلات.",[["TRP-10023","قيد التنفيذ"],["TRP-10024","قيد التنفيذ"],["TRP-10025","في الطريق"]]],
  fleet:["الأسطول","عرض حالة الشاحنات.",[["T-205","متاحة الآن"],["T-112","في رحلة"],["T-089","في الطريق"]]],
  drivers:["السائقون","السائقون والتقييمات.",[["أحمد سالم","4.8"],["محمد العتيبي","4.7"],["سعود القحطاني","4.9"]]],
  carriers:["الناقلون","أداء الناقلين ونسب الالتزام.",[["ANC للنقل البري","96%"],["النورس للنقل","92%"],["المجد للنقل","90%"]]],
  customers:["العملاء","العملاء والرحلات والإيرادات.",[["الراجحي للصناعات","128 رحلة"],["الدوائية السعودية","94 رحلة"],["سابك للخدمات","76 رحلة"]]],
  documents:["المستندات","بوالص الشحن والفواتير والمرفقات.",[["BOL-2281","جاهز"],["INV-7711","معلق"],["POD-9912","مستلم"]]],
  reports:["التقارير والتحليلات","تقارير الأداء والتشغيل والربحية.",[["تقرير الرحلات","يومي"],["تقرير الربحية","شهري"],["تقرير الأسطول","أسبوعي"]]],
  alerts:["التنبيهات","التنبيهات التشغيلية.",[["تأخير TRP-10028","22 دقيقة"],["صيانة T-224","خلال 4 ساعات"],["رحلة عودة","الدمام ← جدة"]]],
  settings:["الإعدادات","إعدادات النظام والصلاحيات.",[["المستخدمون","24"],["الصلاحيات","8 أدوار"],["المدن","13 مدينة"]]]
};

document.querySelectorAll(".nav-btn").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".nav-btn").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  const section = btn.dataset.section;
  if(section==="dashboard"){
    document.getElementById("dashboard").classList.add("active");
    document.getElementById("genericPage").classList.remove("active");
    return;
  }
  const data = sectionData[section];
  document.getElementById("dashboard").classList.remove("active");
  document.getElementById("genericPage").classList.add("active");
  document.getElementById("genericTitle").textContent = data[0];
  document.getElementById("genericDescription").textContent = data[1];
  document.getElementById("genericGrid").innerHTML = data[2].map(x=>`<article class="generic-item"><b>${x[0]}</b><small>${x[1]}</small></article>`).join("");
}));

document.getElementById("globalSearch").addEventListener("input",e=>{
  const q=e.target.value.trim().toLowerCase();
  document.querySelectorAll("#tripTable tr").forEach(row=>{
    row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
  });
});
