const toast=document.getElementById('toast');
const modal=document.getElementById('modal');
const modalTitle=document.getElementById('modalTitle');
const modalBody=document.getElementById('modalBody');

function notify(message){
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>toast.classList.remove('show'),2600);
}
function openModal(title,body){
  modalTitle.textContent=title;
  modalBody.textContent=body;
  if(typeof modal.showModal==='function') modal.showModal();
}
document.getElementById('modalClose').onclick=()=>modal.close();

const actionMessages={
  dashboard:['لوحة التحكم','أنت في شاشة التحكم الرئيسية.'],
  operations:['غرفة العمليات','عرض الرحلات المباشرة والحجوزات والتنبيهات التشغيلية.'],
  bookings:['الحجوزات','فتح قائمة الحجوزات النشطة والجديدة.'],
  trips:['الرحلات','فتح إدارة الرحلات وتتبع حالاتها.'],
  fleet:['الأسطول','عرض الشاحنات المتاحة والمشغولة وتحت الصيانة.'],
  drivers:['السائقون','عرض السائقين والتقييمات وحالة التوفر.'],
  carriers:['الناقلون','عرض أداء الناقلين ونسب الالتزام.'],
  customers:['العملاء','عرض العملاء والرحلات والإيرادات.'],
  docs:['المستندات','فتح مستندات الرحلات والفواتير وبوالص الشحن.'],
  reports:['التقارير والتحليلات','فتح التقارير التشغيلية والمالية.'],
  alerts:['التنبيهات','لديك 5 تنبيهات تشغيلية جديدة.'],
  settings:['الإعدادات','فتح إعدادات النظام والصلاحيات.'],
  notifications:['الإشعارات','لديك 5 إشعارات جديدة.'],
  language:['اللغة','اللغة الحالية: العربية.'],
  profile:['أبو عثمان','مدير العمليات — Station One.'],
  'map-expand':['شبكة الرحلات المباشرة','تم فتح الخريطة في وضع العرض الموسع.'],
  'map-plus':['الخريطة','تم تكبير الخريطة.'],
  'map-minus':['الخريطة','تم تصغير الخريطة.'],
  'map-center':['الخريطة','تم توسيط الخريطة على المملكة العربية السعودية.'],
  'activity-all':['النشاط المباشر','عرض سجل النشاط التشغيلي الكامل.'],
  'trips-all':['الرحلات النشطة','عرض جميع الرحلات النشطة اليوم.']
};

document.querySelectorAll('[data-action]').forEach(el=>{
  el.addEventListener('click',()=>{
    const action=el.dataset.action;
    if(action==='assign'){
      notify('تم تعيين الناقل والسائق والشاحنة بنجاح');
      return;
    }
    const data=actionMessages[action];
    if(data) openModal(data[0],data[1]);
  });
});

document.querySelectorAll('[data-trip]').forEach(el=>{
  el.addEventListener('click',()=>notify('تم فتح تتبع الرحلة '+el.dataset.trip));
});

document.getElementById('searchInput').addEventListener('keydown',e=>{
  if(e.key==='Enter'){
    const q=e.currentTarget.value.trim();
    notify(q ? 'نتائج البحث عن: '+q : 'اكتب رقم رحلة أو اسم عميل');
  }
});
