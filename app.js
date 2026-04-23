// Set tutors array (name, folderId, zoomLink)
const COMMON_APPS_SCRIPT_BASE = "https://script.google.com/macros/s/AKfycbzCyDV6ovyNfYUdsayVjiYTYRacMR58GVquNi-qWEzrDrmqEDP_rKIOSDCxy7ZWVq4Xpw/exec";
const tutors = [
  { 
    name: "JASON'S GROUP", 
    // folderId: "1xNtOUIMWs1o-b5Oo3_s5TqxN3ZCuuHrt", 
    folderId: "1JdfTymif327P7_IYmE-VSsMXAfE5d-5e", 
    zoomLink: "https://us05web.zoom.us/j/89188355583?pwd=OYo9U76YAhzyVpP4wawB5I3YFBZeId.1",
    time: "THURSDAYS 7:00 PM",
    color: "#f1eded"
  },
  { 
    name: "AUDREY'S GROUP",    
    folderId: "1lmOWoosdffILcskU8JpX2VupGyueG0YB", 
    zoomLink: "https://ucla.zoom.us/j/93451898462",
    time: "SATURDAYS 9:00 AM",
    color: "#E06666"
  },
  { 
    name: "AMELIA'S GROUP", 
    folderId: "1ZG5SAEGpvGwIxgjFKlq9H4tCnHGRCqtT", 
    zoomLink: "https://zoom.us/j/99269092280?pwd=0CqMazzXewNoCzbVMZ2YDATPobQoQ6.1" ,
    time: "THURSDAYS 6:30 PM",
    color: "#d0ecc6"
  },
  { 
    name: "ISABELLA'S GROUP",   
    folderId: "1gpyIjyG-lX1OS4e3kENsdjVjs3WlpHL4", 
    zoomLink: "https://us04web.zoom.us/j/73322908419?pwd=zqtjla0rFn0PkqdVarR406D7nbrgta.1" ,
    time: "THURSDAYS 6:30 PM",
    color: "#cfe2f3"
  },
  { 
    name: "ANDREW'S GROUP", 
    folderId: "1Z61FPZCuS7ImUJD_r1P6qpg_R3LePqRc-", 
    zoomLink: "https://ucla.zoom.us/j/98739330649 " ,
    time: "SATURDAY 6:00 PM",
    color: "#1155cc"
  },
  { 
    name: "DANIEL'S GROUP", 
    folderId: "1pPlx_1bpcpBzeJFxbQggEHyVebimH_0M", 
    zoomLink: "https://us06web.zoom.us/j/81911705972" ,
    time: "SATURDAYS 9:00 AM",
    color: "#ffd966"
  },
  { 
    name: "SIMRAN'S GROUP", 
    folderId: "1sbk__sOsEFKxDuQVvVzhH_Mi7Ubzj0ZM", 
    zoomLink: "https://ucla.zoom.us/j/93411013645",
    time: "SATURDAYS 7:00 PM",
    color: "#93c47d"
  },
  { 
    name: "SERENA'S GROUP", 
    folderId: "1ewFT3VU5Sx0e0ol987k2n2BWqmzZBJvZ", 
    zoomLink: "https://zoom.us/j/94517336772?pwd=VvLAZRb0dDPJfJK0CFPLWosbslkSGq.1 " ,
    time: "SATURDAYS 6:00 PM",
    color: "#ff9900"
  },
  { 
    name: "NOELANI'S GROUP", 
    folderId: "1DomFXabx9thhsmSNwh33IEk5A6ohFVEd", 
    zoomLink: "https://ucla.zoom.us/j/92397437970" ,
    time: "SATURDAYS 7:00 PM",
    color: "#e62f8a"
  },
  { 
    name: "MINJAE'S GROUP", 
    folderId: "1ZipV5m60nfRwfYPsO-4LD5w2V6ERa2-K", 
    zoomLink: "https://ucla.zoom.us/j/9207830480 " ,
    time: "SATURDAYS 7:00 PM",
    color: "#a4c2f4"
  },
  { 
    name: "ALLI'S GROUP", 
    folderId: "1d6byk6Y7fDpCcSf9O6vVOB3Vrmd5c6J2", 
    zoomLink: "https://us04web.zoom.us/j/95301340901?pwd=qA8LvMckLC50SEbIh2PfRHNry6zP0L.1" ,
    time: "THURSDAYS 6:30 PM",
    color: "#efacd6"
  },
  { 
    name: "CAT'S GROUP", 
    folderId: "1oZpNMnpn1iDidFiCM8rAVrH-xE48Ls3z", 
    zoomLink: "https://zoom.us/j/94719750895?pwd=9k6eZGPW1eKA51H1jvKFj2Z7bk6PWa.1" ,
    time: "SATURDAYS 7:00 PM",
    color: "#de67a3"
  },
  { 
    name: "SEUNGYOU'S GROUP", 
    folderId: "1RQBo1kzWg3IEclBd2H4g4Ah32ftQSepi", 
    zoomLink: "https://ucla.zoom.us/j/9623747125" ,
    time: "THURSDAYS 6:30 PM",
    color: "#69f569"
  }
];

// DOM refs
const tutorGrid = document.getElementById("tutorGrid");
const selectionView = document.getElementById("selectionView");
const sessionView = document.getElementById("sessionView");
const activeTutorName = document.getElementById("activeTutorName");
const mainVideo = document.getElementById("mainVideo");
const zoomJoinBtn = document.getElementById("zoomJoinBtn");
const backBtn = document.getElementById("backBtn");

let activeIndex = null;

// Render tutor buttons
function renderTutorButtons(){
  tutorGrid.innerHTML = "";
  tutors.forEach((tutor, i) => {
    const btn = document.createElement("button");
    btn.className = "tutor-card";
    btn.type = "button";
    btn.setAttribute("aria-pressed", "false");
    btn.style.backgroundColor = tutor.color;
    btn.innerHTML = `
      <div class="name">${escapeHtml(tutor.name)}</div>
      <div class="sub">${escapeHtml(tutor.time)}</div>
    `;
    btn.addEventListener("click", () => selectTutor(i));
    tutorGrid.appendChild(btn);
  });
}

// Highlight and select a tutor
function selectTutor(index){
  activeIndex = index;
  const tutor = tutors[index];
  applySessionTheme(tutor.color);
  activeTutorName.textContent = tutor.name;
  showSessionView();

  // config Zoom button
  if (tutor.zoomLink && tutor.zoomLink.trim()) {
    zoomJoinBtn.disabled = false;
    zoomJoinBtn.removeAttribute("aria-disabled");
    zoomJoinBtn.textContent = `Join Zoom Session • ${tutor.time}`;
    zoomJoinBtn.onclick = () => window.open(tutor.zoomLink, "_blank");
  } else {
    zoomJoinBtn.disabled = true;
    zoomJoinBtn.setAttribute("aria-disabled", "true");
    zoomJoinBtn.textContent = "Join Zoom Session";
    zoomJoinBtn.onclick = null;
  }

  // load the latest video for this tutor
  loadFirstVideoForFolder(tutor.folderId).catch(err => {
    console.error(err);
    // clear player on error
    mainVideo.src = "";
  });
}

// View
function showSessionView() {
  selectionView.classList.add("hidden");
  sessionView.classList.remove("hidden");
}

// Clear video and return to selection
function showSelectionView() {
  sessionView.classList.add("hidden");
  selectionView.classList.remove("hidden");
  mainVideo.src = "";
  clearSessionTheme();
}

function applySessionTheme(color) {
  if (!color || !color.trim()) return;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty("--app-bg", color);
  rootStyle.setProperty("--app-card-bg", color);
  rootStyle.setProperty("--app-card-border", "1px solid rgba(0,0,0,0.12)");
  sessionView.style.setProperty("--session-bg", color);
  sessionView.style.setProperty("--session-ink", getReadableTextColor(color));
}

function clearSessionTheme() {
  const rootStyle = document.documentElement.style;
  rootStyle.removeProperty("--app-bg");
  rootStyle.removeProperty("--app-card-bg");
  rootStyle.removeProperty("--app-card-border");
  sessionView.style.removeProperty("--session-bg");
  sessionView.style.removeProperty("--session-ink");
}

function getReadableTextColor(hexColor) {
  const normalized = String(hexColor || "").trim().replace("#", "");
  if (![3, 6].includes(normalized.length)) return "#081225";

  const full = normalized.length === 3
    ? normalized.split("").map((c) => c + c).join("")
    : normalized;

  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return "#081225";

  const luminance = (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
  return luminance > 150 ? "#081225" : "#f8fbff";
}

// Apps script URL with folderid + cache
function makeAppsScriptUrl(folderId) {
  if (!COMMON_APPS_SCRIPT_BASE) return null;
  const sep = COMMON_APPS_SCRIPT_BASE.includes("?") ? "&" : "?";
  const cb = "_cb=" + Date.now();
  return `${COMMON_APPS_SCRIPT_BASE}${sep}folderId=${encodeURIComponent(folderId)}&${cb}`;
}

// Fetch the list and play the first video
async function loadFirstVideoForFolder(folderId) {
  if (!folderId || !folderId.trim()) {
    throw new Error("No folderId configured for this tutor.");
  }

  const url = makeAppsScriptUrl(folderId);
  if (!url) throw new Error("Apps Script base URL not configured.");

  // fetch JSON
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Network error: " + res.status);
  const data = await res.json();

  if (data && data.error) throw new Error(data.error);
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No videos found in that folder.");
  }

  const first = data[0];
  if (!first || !first.previewUrl) throw new Error("No preview URL found.");

  // Google drive preview
  mainVideo.src = first.previewUrl;
}

// Simple escape to avoid injection in innerHTML
function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// initial render
renderTutorButtons();
showSelectionView();

backBtn.addEventListener("click", showSelectionView);
