const DEFAULT_CONFIG={siteName:"RidePro",showBooking:true,showServices:true,showBusSchedules:true,showMetrics:true,showSafety:true,announcement:"Servicio disponible todos los días. Revisa los horarios de buses antes de viajar.",services:[{name:"Económico",description:"1 a 4 pasajeros",price:"$12.500"},{name:"Comfort",description:"Más espacio y comodidad",price:"$18.900"},{name:"Premium",description:"Vehículo ejecutivo",price:"$27.500"}],buses:[{route:"B-101",from:"Terminal Central",to:"Aeropuerto",time:"06:30",days:"Lunes a domingo"},{route:"B-205",from:"Centro",to:"Zona Norte",time:"08:00",days:"Lunes a viernes"},{route:"B-310",from:"Terminal Sur",to:"Centro",time:"17:45",days:"Todos los días"}]};
const safe=s=>String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const clone=o=>JSON.parse(JSON.stringify(o));
const getConfig=()=>{try{return {...clone(DEFAULT_CONFIG),...JSON.parse(localStorage.getItem("ridepro_config")||"{}")}}catch{return clone(DEFAULT_CONFIG)}};
const getRequests=()=>{try{return JSON.parse(localStorage.getItem("ridepro_requests")||"[]")}catch{return[]}};
const toast=msg=>{const el=document.getElementById("toast");el.textContent=msg;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),2200)};
let config=getConfig(),quote=null;
function applyConfig(){
 document.title=config.siteName; document.getElementById("brandName").textContent=config.siteName; document.getElementById("announcement").textContent=config.announcement;
 const visibility={bookingSection:config.showBooking,servicesSection:config.showServices,busSection:config.showBusSchedules,metricsSection:config.showMetrics,safetySection:config.showSafety};
 Object.entries(visibility).forEach(([id,on])=>document.getElementById(id)?.classList.toggle("hidden",!on)); renderServices();renderBuses();updateMetrics();
}
function renderServices(){
 const list=document.getElementById("servicesList"),select=document.getElementById("serviceSelect");
 list.innerHTML=config.services.length?config.services.map((s,i)=>`<button class="service service-option" data-service-index="${i}"><span class="service-icon">🚘</span><div><strong>${safe(s.name)}</strong><small>${safe(s.description)}</small></div><b>${safe(s.price)}</b></button>`).join(""):"<p>No hay servicios disponibles.</p>";
 select.innerHTML='<option value="">Selecciona un servicio</option>'+config.services.map((s,i)=>`<option value="${i}">${safe(s.name)} — ${safe(s.price)}</option>`).join("");
 document.querySelectorAll("[data-service-index]").forEach(b=>b.onclick=()=>{select.value=b.dataset.serviceIndex;syncService();document.getElementById("bookingSection").scrollIntoView({behavior:"smooth"})});
}
function renderBuses(filter=""){
 const f=filter.toLowerCase(),rows=config.buses.filter(b=>Object.values(b).join(" ").toLowerCase().includes(f));
 document.getElementById("busList").innerHTML=rows.length?rows.map(b=>`<div class="bus-row"><b>${safe(b.route)}</b><div><strong>${safe(b.from)} → ${safe(b.to)}</strong><small>${safe(b.days)}</small></div><span class="badge">${safe(b.time)}</span><button class="btn btn-outline bus-use" data-from="${safe(b.from)}" data-to="${safe(b.to)}">Usar ruta</button></div>`).join(""):"<p>No se encontraron horarios.</p>";
 document.querySelectorAll(".bus-use").forEach(b=>b.onclick=()=>{origin.value=b.dataset.from;destination.value=b.dataset.to;syncRoute();document.getElementById("bookingSection").scrollIntoView({behavior:"smooth"})});
}
function syncRoute(){originText.textContent=origin.value.trim()||"Sin definir";destinationText.textContent=destination.value.trim()||"Sin definir";quote=null;confirmBtn.disabled=true;priceText.textContent="Se mostrará antes de confirmar";tripStatus.textContent="Pendiente"}
function syncService(){const s=config.services[+serviceSelect.value];serviceText.textContent=s?`${s.name} — ${s.description}`:"Selecciona una opción";quote=null;confirmBtn.disabled=true;priceText.textContent="Se mostrará antes de confirmar"}
function validate(){if(!passengerName.value.trim())return"Escribe tu nombre";if(!passengerPhone.value.trim())return"Escribe tu teléfono";if(!origin.value.trim())return"Escribe el lugar de recogida";if(!destination.value.trim())return"Escribe el destino";if(serviceSelect.value==="")return"Selecciona un servicio";return""}
function updateMetrics(){const today=new Date().toISOString().slice(0,10);document.getElementById("todayTrips").textContent=getRequests().filter(r=>String(r.createdAt).slice(0,10)===today).length}
requestBtn.onclick=()=>{const error=validate();if(error)return toast(error);const s=config.services[+serviceSelect.value];quote={service:s.name,price:s.price};priceText.textContent=s.price;tripStatus.textContent="Cotización lista";confirmBtn.disabled=false;toast("Precio calculado. Confirma la solicitud.")};
confirmBtn.onclick=()=>{const error=validate();if(error)return toast(error);if(!quote)return toast("Primero calcula el viaje");const requests=getRequests();const req={id:"RP-"+Date.now().toString().slice(-8),name:passengerName.value.trim(),phone:passengerPhone.value.trim(),origin:origin.value.trim(),destination:destination.value.trim(),service:quote.service,price:quote.price,status:"Pendiente",createdAt:new Date().toISOString()};requests.unshift(req);localStorage.setItem("ridepro_requests",JSON.stringify(requests));successText.textContent=`Código ${req.id}. El viaje quedó pendiente de asignación.`;successModal.classList.remove("hidden");tripStatus.textContent="Solicitud enviada";confirmBtn.disabled=true;updateMetrics()};
closeModal.onclick=()=>successModal.classList.add("hidden");busSearch.oninput=e=>renderBuses(e.target.value);serviceSelect.onchange=syncService;origin.oninput=destination.oninput=syncRoute;
document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
window.addEventListener("storage",e=>{if(e.key==="ridepro_config"){config=getConfig();applyConfig()}if(e.key==="ridepro_requests")updateMetrics()});applyConfig();
