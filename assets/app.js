
const DEFAULT_CONFIG = {"siteName": "RidePro", "showBooking": true, "showServices": true, "showBusSchedules": true, "showMetrics": true, "showSafety": true, "announcement": "Servicio disponible todos los días. Revisa los horarios de buses antes de viajar.", "services": [{"name": "Económico", "description": "1 a 4 pasajeros", "price": "$12.500"}, {"name": "Comfort", "description": "Más espacio y comodidad", "price": "$18.900"}, {"name": "Premium", "description": "Vehículo ejecutivo", "price": "$27.500"}], "buses": [{"route": "B-101", "from": "Terminal Central", "to": "Aeropuerto", "time": "06:30", "days": "Lunes a domingo"}, {"route": "B-205", "from": "Centro", "to": "Zona Norte", "time": "08:00", "days": "Lunes a viernes"}, {"route": "B-310", "from": "Terminal Sur", "to": "Centro", "time": "17:45", "days": "Todos los días"}]};
const getConfig = () => {
  try { return {...DEFAULT_CONFIG, ...JSON.parse(localStorage.getItem("ridepro_config") || "{}")}; }
  catch { return DEFAULT_CONFIG; }
};
const toast = msg => {
  const el=document.getElementById("toast"); el.textContent=msg; el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2200);
};
let config=getConfig();
document.getElementById("brandName").innerHTML=config.siteName.replace("Pro","<b>Pro</b>");
document.getElementById("announcement").textContent=config.announcement;
const visibility={bookingSection:config.showBooking,servicesSection:config.showServices,busSection:config.showBusSchedules,metricsSection:config.showMetrics,safetySection:config.showSafety};
Object.entries(visibility).forEach(([id,on])=>document.getElementById(id)?.classList.toggle("hidden",!on));

function renderServices(){
  document.getElementById("servicesList").innerHTML=config.services.map(s=>`
    <div class="service"><span style="font-size:1.6rem">🚘</span><div><strong>${s.name}</strong><small>${s.description}</small></div><b style="margin-left:auto">${s.price}</b></div>`).join("");
}
function renderBuses(filter=""){
  const f=filter.toLowerCase();
  const rows=config.buses.filter(b=>Object.values(b).join(" ").toLowerCase().includes(f));
  document.getElementById("busList").innerHTML=rows.length?rows.map(b=>`
    <div class="bus-row"><b>${b.route}</b><div><strong>${b.from} → ${b.to}</strong><small style="display:block;color:var(--muted)">${b.days}</small></div><span class="badge">${b.time}</span><button class="btn btn-outline" onclick="toast('Horario ${b.route} seleccionado')">Ver</button></div>`).join(""):"<p>No se encontraron horarios.</p>";
}
renderServices(); renderBuses();
document.getElementById("busSearch").addEventListener("input",e=>renderBuses(e.target.value));
document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"}));
["origin","destination"].forEach(id=>document.getElementById(id).addEventListener("input",e=>document.getElementById(id+"Text").textContent=e.target.value));
document.getElementById("requestBtn").onclick=()=>toast("Buscando conductores cercanos...");
document.getElementById("confirmBtn").onclick=()=>toast("Solicitud enviada correctamente");
