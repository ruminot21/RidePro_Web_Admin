
const DEFAULT_CONFIG={"siteName": "RidePro", "showBooking": true, "showServices": true, "showBusSchedules": true, "showMetrics": true, "showSafety": true, "announcement": "Servicio disponible todos los días. Revisa los horarios de buses antes de viajar.", "services": [{"name": "Económico", "description": "1 a 4 pasajeros", "price": "$12.500"}, {"name": "Comfort", "description": "Más espacio y comodidad", "price": "$18.900"}, {"name": "Premium", "description": "Vehículo ejecutivo", "price": "$27.500"}], "buses": [{"route": "B-101", "from": "Terminal Central", "to": "Aeropuerto", "time": "06:30", "days": "Lunes a domingo"}, {"route": "B-205", "from": "Centro", "to": "Zona Norte", "time": "08:00", "days": "Lunes a viernes"}, {"route": "B-310", "from": "Terminal Sur", "to": "Centro", "time": "17:45", "days": "Todos los días"}]};
let config;
const toast=m=>{const e=document.getElementById("toast");e.textContent=m;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)};
const load=()=>{try{config={...DEFAULT_CONFIG,...JSON.parse(localStorage.getItem("ridepro_config")||"{}")}}catch{config=structuredClone(DEFAULT_CONFIG)}};
const showAdmin=()=>{document.getElementById("loginView").classList.add("hidden");document.getElementById("adminView").classList.remove("hidden");fill()};
if(sessionStorage.getItem("ridepro_admin")==="1")showAdmin();
document.getElementById("loginBtn").onclick=()=>{
 if(document.getElementById("loginUser").value==="admin"&&document.getElementById("loginPass").value==="admin123"){sessionStorage.setItem("ridepro_admin","1");showAdmin()}else toast("Usuario o contraseña incorrectos");
};
document.getElementById("logoutBtn").onclick=()=>{sessionStorage.removeItem("ridepro_admin");location.reload()};
document.querySelectorAll("[data-panel]").forEach(b=>b.onclick=()=>{
 document.querySelectorAll(".admin-panel").forEach(p=>p.classList.add("hidden"));document.getElementById(b.dataset.panel).classList.remove("hidden");
 document.querySelectorAll("[data-panel]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
});
function fill(){
 load();
 ["siteName","announcement"].forEach(id=>document.getElementById(id).value=config[id]);
 ["showBooking","showServices","showBusSchedules","showMetrics","showSafety"].forEach(id=>document.getElementById(id).checked=!!config[id]);
 renderBuses();renderServices();
}
function renderBuses(){
 document.getElementById("busEditor").innerHTML=config.buses.map((b,i)=>`
 <div class="card-body" style="border:1px solid var(--line);border-radius:14px;margin-bottom:12px">
  <div class="grid grid-2">
   <div class="field"><label>Ruta</label><input data-bus="${i}" data-key="route" value="${b.route}"></div>
   <div class="field"><label>Hora</label><input type="time" data-bus="${i}" data-key="time" value="${b.time}"></div>
   <div class="field"><label>Origen</label><input data-bus="${i}" data-key="from" value="${b.from}"></div>
   <div class="field"><label>Destino</label><input data-bus="${i}" data-key="to" value="${b.to}"></div>
  </div>
  <div class="field"><label>Días</label><input data-bus="${i}" data-key="days" value="${b.days}"></div>
  <button class="btn btn-danger" onclick="removeBus(${i})">Eliminar</button>
 </div>`).join("");
 document.querySelectorAll("[data-bus]").forEach(e=>e.oninput=()=>config.buses[+e.dataset.bus][e.dataset.key]=e.value);
}
function renderServices(){
 document.getElementById("serviceEditor").innerHTML=config.services.map((s,i)=>`
 <div class="grid grid-3" style="padding:12px;border-bottom:1px solid var(--line)">
  <div class="field"><label>Nombre</label><input data-service="${i}" data-key="name" value="${s.name}"></div>
  <div class="field"><label>Descripción</label><input data-service="${i}" data-key="description" value="${s.description}"></div>
  <div class="field"><label>Precio</label><input data-service="${i}" data-key="price" value="${s.price}"><button class="btn btn-danger" onclick="removeService(${i})">Eliminar</button></div>
 </div>`).join("");
 document.querySelectorAll("[data-service]").forEach(e=>e.oninput=()=>config.services[+e.dataset.service][e.dataset.key]=e.value);
}
window.removeBus=i=>{config.buses.splice(i,1);renderBuses()};
window.removeService=i=>{config.services.splice(i,1);renderServices()};
document.getElementById("addBus").onclick=()=>{config.buses.push({route:"Nueva",from:"Origen",to:"Destino",time:"08:00",days:"Lunes a viernes"});renderBuses()};
document.getElementById("addService").onclick=()=>{config.services.push({name:"Nuevo servicio",description:"Descripción",price:"$0"});renderServices()};
document.getElementById("saveAll").onclick=()=>{
 config.siteName=document.getElementById("siteName").value.trim()||"RidePro";
 config.announcement=document.getElementById("announcement").value.trim();
 ["showBooking","showServices","showBusSchedules","showMetrics","showSafety"].forEach(id=>config[id]=document.getElementById(id).checked);
 localStorage.setItem("ridepro_config",JSON.stringify(config));toast("Cambios guardados");
};
load();
