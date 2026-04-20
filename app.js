// Set tutors array (name, folderId, zoomLink)
const COMMON_APPS_SCRIPT_BASE = "https://script.google.com/macros/s/AKfycbzCyDV6ovyNfYUdsayVjiYTYRacMR58GVquNi-qWEzrDrmqEDP_rKIOSDCxy7ZWVq4Xpw/exec";
const tutors = [
  { 
    name: "JASON'S GROUP", 
    // folderId: "1xNtOUIMWs1o-b5Oo3_s5TqxN3ZCuuHrt", 
    folderId: "1GwTPGAVq4uAdURucdphMdGDLZo06Bs_7", 
    zoomLink: "https://us05web.zoom.us/j/89188355583?pwd=OYo9U76YAhzyVpP4wawB5I3YFBZeId.1",
    time: "FRIDAY 6:00 PM"
  },
  { 
    name: "AUDREY'S GROUP",    
    folderId: "1f85RbVFBY5LXBj0bpmWBXn5IYTLwYQuA", 
    zoomLink: "https://ucla.zoom.us/j/93451898462",
    time: "SATURDAY 8:00 AM"
  },
  { 
    name: "AMELIA'S GROUP", 
    folderId: "1hcvu6q7B8kp1xG3zPZSWJKc4nhnE8sVn", 
    zoomLink: "https://zoom.us/j/99269092280?pwd=0CqMazzXewNoCzbVMZ2YDATPobQoQ6.1" ,
    time: "THURSDAY 6:00 PM"
  },
  { 
    name: "ISABELLA'S GROUP",   
    folderId: "1V4i8ZtlRYwSgFV1kTMgEBg8z-dD49c5E", 
    zoomLink: "https://us04web.zoom.us/j/73322908419?pwd=zqtjla0rFn0PkqdVarR406D7nbrgta.1" ,
    time: "FRIDAY 6:00 PM"
  },
  { 
    name: "ANDREW'S GROUP", 
    folderId: "1VYKdKMGwO3NC1UlxB10uG8lEL36aPdC-", 
    zoomLink: "https://ucla.zoom.us/j/98739330649 " ,
    time: "SATURDAY 8:00 AM"
  },
  { 
    name: "DANIEL'S GROUP", 
    folderId: "1rAFd64PRSQ3t4BFNNGUqX3OSDx8u7SNN", 
    zoomLink: "https://us06web.zoom.us/j/81911705972" ,
    time: "SATURDAY 8:00 AM"
  },
  { 
    name: "SIMRAN'S GROUP", 
    folderId: "1jBeOdw-EmgUukawldeVR8ub-lMjzb7Gi", 
    zoomLink: "https://ucla.zoom.us/j/93411013645",
    time: "THURSDAY 6:00 PM"
  },
  { 
    name: "SERENA'S GROUP", 
    folderId: "1kZjZwhFQidF_tDfxF_iY2gJfwQzquEoT", 
    zoomLink: "https://zoom.us/j/94517336772?pwd=VvLAZRb0dDPJfJK0CFPLWosbslkSGq.1 " ,
    time: "THURSDAY 6:00 PM"
  },
  { 
    name: "NOELANI'S GROUP", 
    folderId: "1kZjZwhFQidF_tDfxF_iY2gJfwQzquEoT", 
    zoomLink: "https://ucla.zoom.us/j/92397437970" ,
    time: "THURSDAY 6:00 PM"
  },
  { 
    name: "MINJAE'S GROUP", 
    folderId: "1kZjZwhFQidF_tDfxF_iY2gJfwQzquEoT", 
    zoomLink: "https://ucla.zoom.us/j/9207830480 " ,
    time: "FRIDAY 6:00 PM"
  },
  { 
    name: "ALLI'S GROUP", 
    folderId: "1kZjZwhFQidF_tDfxF_iY2gJfwQzquEoT", 
    zoomLink: "https://us04web.zoom.us/j/95301340901?pwd=qA8LvMckLC50SEbIh2PfRHNry6zP0L.1" ,
    time: "THURSDAY 6:00 PM"
  },
  { 
    name: "CAT'S GROUP", 
    folderId: "1kZjZwhFQidF_tDfxF_iY2gJfwQzquEoT", 
    zoomLink: "https://zoom.us/j/94719750895?pwd=9k6eZGPW1eKA51H1jvKFj2Z7bk6PWa.1" ,
    time: "SATURDAY 8:00 AM"
  },
  { 
    name: "SEUNGYOU'S GROUP", 
    folderId: "1kZjZwhFQidF_tDfxF_iY2gJfwQzquEoT", 
    zoomLink: "https://zoom.us/launch/chat?src=direct_chat_link&email=seungyou%40g.ucla.edu" ,
    time: "THURSDAY 6:00 PM"
  }
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
