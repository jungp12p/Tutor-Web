// Set tutors array (name, folderId, zoomLink)
const COMMON_APPS_SCRIPT_BASE = "https://script.google.com/macros/s/AKfycbzCyDV6ovyNfYUdsayVjiYTYRacMR58GVquNi-qWEzrDrmqEDP_rKIOSDCxy7ZWVq4Xpw/exec";

const tutors = [
  { name: "DANIEL'S GROUP", folderId: "1xNtOUIMWs1o-b5Oo3_s5TqxN3ZCuuHrt", zoomLink: "https://us05web.zoom.us/j/5411669479?pwd=c1RXdktyaXlGTk1WdUtJMmE3WWtWQT09" },
  { name: "DOM'S GROUP",    folderId: "1f85RbVFBY5LXBj0bpmWBXn5IYTLwYQuA", zoomLink: "https://us04web.zoom.us/j/74792301832?pwd=mFUZcI0XsykRmxADbzPjXkdTsNjatA.1" },
  { name: "HANA'S GROUP",   folderId: "1VYKdKMGwO3NC1UlxB10uG8lEL36aPdC-",    zoomLink: "https://us04web.zoom.us/j/79594039777?pwd=Svn9g6SaDN47h5Rd500HWGgP9yZZM8.1" },
  { name: "SERENA'S GROUP", folderId: "1hcvu6q7B8kp1xG3zPZSWJKc4nhnE8sVn",  zoomLink: "https://us05web.zoom.us/j/85247366939?pwd=KKQoK7BcCkGhQulcUoPp8cxBhdlLS8.1&jst=2" }
];

// DOM refs
const tutorGrid = document.getElementById("tutorGrid");
const mainVideo = document.getElementById("mainVideo");
const zoomJoinBtn = document.getElementById("zoomJoinBtn");

let activeIndex = null;

// Render tutor buttons
function renderTutorButtons(){
  tutorGrid.innerHTML = "";
  tutors.forEach((tutor, i) => {
    const btn = document.createElement("button");
    btn.className = "tutor-card";
    btn.type = "button";
    btn.setAttribute("aria-pressed", "false");
    btn.innerHTML = `<div class="name">${escapeHtml(tutor.name)}</div>`;
    btn.addEventListener("click", () => selectTutor(i, btn));
    tutorGrid.appendChild(btn);
  });
}

// Highlight and select a tutor
function selectTutor(index, btnEl){
  // remove active from others
  Array.from(tutorGrid.children).forEach((c, idx) => {
    if (idx === index) {
      c.classList.add("active");
      c.setAttribute("aria-pressed", "true");
    } else {
      c.classList.remove("active");
      c.setAttribute("aria-pressed", "false");
    }
  });

  activeIndex = index;
  const tutor = tutors[index];

  // config Zoom button
  if (tutor.zoomLink && tutor.zoomLink.trim()) {
    zoomJoinBtn.disabled = false;
    zoomJoinBtn.removeAttribute("aria-disabled");
    zoomJoinBtn.onclick = () => window.open(tutor.zoomLink, "_blank");
  } else {
    zoomJoinBtn.disabled = true;
    zoomJoinBtn.setAttribute("aria-disabled", "true");
    zoomJoinBtn.onclick = null;
  }

  // load the latest video for this tutor
  loadFirstVideoForFolder(tutor.folderId).catch(err => {
    console.error(err);
    // clear player on error
    mainVideo.src = "";
  });
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
