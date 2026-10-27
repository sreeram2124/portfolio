const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
const escapeHTML = value => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));

const projects = [
  {file:"chocolate_sales.pbix", title:"Chocolate Sales Analytics", category:"Analytics", description:"Interactive business intelligence dashboard exploring sales, profit, shipments, products, and regional performance.", stack:["Power BI","DAX","Power Query"], repo:"Chocolate-Sales-PowerBI-Dashboard", code:["dashboard = {","  'focus': ['sales', 'profit', 'shipments'],","  'tools': ['Power BI', 'DAX', 'Power Query'],","  'output': 'interactive business insights'","}"]},
  {file:"global_warming.pbix", title:"Global Warming Analytics Dashboard", category:"Analytics", description:"A climate data dashboard for exploring temperature and emissions patterns with interactive filtering and regional drill-downs.", stack:["Power BI","Python","Pandas","DAX"], repo:"GlobalWarming-power-BI-project", code:["climate_dashboard = {","  'question': 'How are climate patterns changing?',","  'prepare': ['clean', 'model', 'validate'],","  'explore': ['temperature', 'emissions', 'region']","}"]},
  {file:"wildfire_aqi.py", title:"Wildfire Smoke & AQI Trends", category:"AI & ML", description:"Environmental data exploration combining wildfire signals from NASA FIRMS with air quality and geospatial trends.", stack:["Python","NASA FIRMS","Air Quality","Geospatial Data"], repo:"wildfire-smoke-prediction-and-AQI-trends-using-NASA-FIRMS", code:["environment_study = {","  'signals': ['NASA FIRMS', 'air quality'],","  'methods': ['explore', 'compare', 'visualize'],","  'focus': 'wildfire smoke and AQI trends'","}"]},
  {file:"smart_city.py", title:"Smart City Data Explorer", category:"Data", description:"A geospatial exploration project using environmental and fire activity information from NASA FIRMS.", stack:["Python","NASA FIRMS","Geospatial Data"], repo:"SMART-CITY-NASA-FIRMS", code:["city_explorer = {","  'view': 'geospatial',","  'layers': ['city context', 'fire activity'],","  'source': 'NASA FIRMS'","}"]},
  {file:"fraud_detection.ipynb", title:"Credit Card Fraud Detection", category:"AI & ML", description:"Transaction risk analysis with exploratory analysis, feature engineering, classification, evaluation, and fraud reporting.", stack:["Python","Pandas","Classification","Power BI"], repo:"CREDIT-CARD-FRAUD-DETECTION", code:["fraud_analysis = {","  'task': 'transaction risk classification',","  'workflow': ['EDA', 'features', 'evaluation'],","  'report': 'fraud trends and model metrics'","}"]},
  {file:"air_quality.ipynb", title:"Air Quality Prediction", category:"AI & ML", description:"Machine learning exploration of air quality data and predictive modelling.", stack:["Python","Machine Learning","Air Quality"], repo:"Air-Quality-Prediction", code:["air_quality_model = {","  'domain': 'air quality',","  'stages': ['prepare data', 'fit model', 'review'],","  'goal': 'explore air quality prediction'","}"]},
  {file:"image_classification.ipynb", title:"Dog vs Cat Image Classification", category:"AI & ML", description:"Deep learning image classification project for distinguishing dog and cat images.", stack:["Python","Deep Learning","Computer Vision"], repo:"Dog-vs-Cat-Image-Classification-Deep-Learning", code:["image_classifier = {","  'task': 'image classification',","  'classes': ['dog', 'cat'],","  'approach': 'deep learning'","}"]},
  {file:"attendance_system.py", title:"Face Recognition Attendance System", category:"AI & ML", description:"Attendance management project using face recognition to assist identity-based attendance tracking.", stack:["Python","Computer Vision","Face Recognition"], repo:"Attendance-Management-system-using-face-recognition-master", code:["attendance_system = {","  'workflow': ['capture', 'recognize', 'record'],","  'focus': 'attendance management',","  'method': 'face recognition'","}"]},
  {file:"potato_disease.py", title:"Potato Disease Detection", category:"AI & ML", description:"Image-based plant disease detection project using machine learning techniques.", stack:["Python","Deep Learning","Image Classification"], repo:"potato-disease-detection-main", code:["plant_model = {","  'domain': 'plant health',","  'input': 'potato leaf image',","  'task': 'disease detection'","}"]},
  {file:"cgpa_calculator.java", title:"CGPA Calculator", category:"Java", description:"A utility project for calculating academic grade point averages.", stack:["Java","Application Development"], repo:"cgpa-calculator", code:["public class CgpaCalculator {","  public static void main(String[] args) {","    System.out.println(\"Calculate CGPA\");","  }","}"]},
  {file:"order_management.java", title:"Order Management System", category:"Java", description:"A software project for organizing order management workflows.", stack:["Java","Database"], repo:"order-management-system", code:["public class OrderManagement {","  // Manage and track orders","  void createOrder() { }","  void updateOrder() { }","}"]},
  {file:"train_reservation.java", title:"Train Reservation System", category:"Java", description:"A reservation system project for managing train booking workflows.", stack:["Java","Application Development"], repo:"TrainReservationSystem", code:["public class TrainReservation {","  // Search routes and manage bookings","  void reserveSeat() { }","}"]}
].map(project => Object.assign(project, {url:"https://github.com/sreeram2124/" + project.repo}));

const skillItems = [
  ["Python","languages","python.svg","linear-gradient(145deg,#306998,#ffd43b)"],["Java","languages","java.svg","#176b91"],["SQL","languages","database.svg","#355d8b"],["JavaScript","languages","javascript.svg","#f7df1e"],
  ["Power BI","data","powerbi.svg","#27251f"],["DAX","data","powerbi.svg","#24252a"],["Excel","data","excel.svg","#176b43"],["Tableau","data","tableau.svg","#202a45"],
  ["Pandas","data","pandas.svg","#150458"],["NumPy","data","numpy.svg","#013243"],["Data Visualization","data","chart.svg","#35677d"],["Statistics","data","sigma.svg","#514b78"],
  ["Business Analysis","data","briefcase.svg","#526a8d"],["KPI Tracking","data","gauge.svg","#426455"],["Forecasting","data","chart-line.svg","#267267"],["Data Cleaning","data","cleaning.svg","#647950"],
  ["Machine Learning","ai","tensorflow.svg","#e96c16"],["Deep Learning","ai","pytorch.svg","#2d2421"],["Computer Vision","ai","opencv.svg","#1b5379"],["Feature Engineering","ai","settings.svg","#775b38"],
  ["ETL Pipelines","backend","workflow.svg","#2a6272"],["Data Modeling","backend","database.svg","#365777"],["JDBC","backend","java.svg","#176b91"],["Collections","backend","table.svg","#3c5d83"],
  ["PostgreSQL","backend","postgresql.svg","#263c54"],["MySQL","backend","mysql.svg","#0e536e"],["MongoDB","backend","mongodb.svg","#173e36"],["AWS","tools","aws.svg","#232f3e"],
  ["OCI","tools","oracle.svg","#342222"],["Git","tools","git.svg","#f05032"],["GitHub","tools","github.svg","#181717"],["Linux","tools","linux.svg","#3d3521"],
  ["Power Query","tools","excel.svg","#1d3d70"],["Requirements Gathering","tools","clipboard-check.svg","#565d88"],["Data Integration","backend","workflow.svg","#2d6968"],["HTML","frontend","html5.svg","#e34f26"],
  ["CSS","frontend","css3.svg","#1572b6"],["React","frontend","react.svg","#20232a"],["Responsive Design","frontend","monitor-smartphone.svg","#425e9c"],["UI Development","frontend","figma.svg","#27252a"]
].map(([name, category, icon, background]) => ({name, category, icon, background}));

const experienceData = {
  work: [
    {kind:"APPRENTICESHIP", title:"Java Full Stack Apprentice", org:"LTIMindtree", location:"Navi Mumbai, India", date:"Jun 2026 — Jul 2026", body:"Worked on internal tooling and data integration. Built reusable DAOs and JDBC connectors, designed PostgreSQL schemas with data integrity in mind, and collaborated with cross-functional teams.", highlights:["Built reusable Java DAOs and JDBC connectors","Designed PostgreSQL schemas","Supported data integration for internal tools"], tags:["Java","JDBC","PostgreSQL","Data Integration"]},
    {kind:"INTERNSHIP", title:"AI & ML Intern", org:"Kodacy", location:"Remote", date:"Sep 2023 — Oct 2023", body:"Developed Python ETL pipelines and interactive Power BI dashboards to support data interpretation and KPI tracking.", highlights:["Optimized Python ETL pipelines","Built interactive KPI dashboards","Worked with analytics and machine learning workflows"], tags:["Python","ETL","Power BI","Machine Learning"]}
  ],
  achievements: [
    {kind:"CERTIFICATE", title:"Google Data Analytics Professional Certificate", org:"Google", location:"Online", date:"2023", body:"Professional learning in data analytics, including data preparation, analysis, visualization, and communicating findings.", highlights:["Data cleaning and analysis","Visualization and reporting"], tags:["Data Analytics"]},
    {kind:"CERTIFICATE", title:"IBM Data Science Professional Certificate", org:"IBM", location:"Online", date:"2023", body:"Professional learning in data science and applied data workflows.", highlights:["Data science foundations","Applied analytics"], tags:["Data Science"]},
    {kind:"CERTIFICATE", title:"AWS Cloud Solutions Architect", org:"Amazon Web Services", location:"Online", date:"2023", body:"Cloud architecture learning focused on AWS services and solution design.", highlights:["Cloud architecture foundations"], tags:["AWS","Cloud"]},
    {kind:"CERTIFICATE", title:"Oracle Cloud Infrastructure Foundations Associate", org:"Oracle", location:"Online", date:"2024", body:"Foundational learning in Oracle Cloud Infrastructure.", highlights:["OCI platform foundations"], tags:["OCI","Cloud"]}
  ],
  education: [
    {kind:"ACADEMIC EDUCATION", title:"B.Tech, Computer Science & Engineering", org:"SRM Institute of Science and Technology", location:"India", date:"Jun 2022 — May 2026", body:"Specialization in Big Data Analytics. Graduated with a CGPA of 9.01 / 10.", highlights:["Specialization: Big Data Analytics","CGPA: 9.01 / 10"], tags:["Computer Science","Big Data Analytics"]}
  ]
};
const folders = [
  {id:"work", label:"Work Experience", icon:"▰"},
  {id:"achievements", label:"Achievements", icon:"✧"},
  {id:"education", label:"Academic Education", icon:"▤"}
];

const app = $("#app");
const pageNames = ["home","projects","skills","experience","calendar","contact","settings"];
let selectedProject = 0;
let projectView = "explorer";
let projectFilter = "All";
let skillFilter = "all";
let skillPage = 0;
let experienceFolder = "work";
let selectedExperience = 0;
let experienceQuery = "";
let settingsSection = localStorage.getItem("portfolio-settings-tab") || "appearance";
let toastTimer;
let renderTimer = 0;
let chatCloseTimer = 0;
let wallpaperSwapTimer = 0;

function activePage() {
  const route = location.hash.replace(/^#\/?/, "").toLowerCase();
  return pageNames.includes(route) ? route : "home";
}
function sourceTemplate(page) {
  const template = $("#" + page + "-template");
  return template ? template.innerHTML.trim() : "";
}
function updateNav(page) {
  $$('[data-page]').forEach(link => {
    const current = link.dataset.page === page;
    link.classList.toggle("active", current);
    if (current) link.setAttribute("aria-current", "page"); else link.removeAttribute("aria-current");
  });
}
function renderPage(page) {
  window.scrollTo(0, 0);
  app.innerHTML = sourceTemplate(page);
  app.dataset.page = page;
  app.classList.remove("page-exiting", "page-minimizing", "page-entering", "is-maximized");
  requestAnimationFrame(() => app.classList.add("page-entering"));
  window.setTimeout(() => app.classList.remove("page-entering"), 480);
  updateNav(page);
  document.title = (page[0].toUpperCase() + page.slice(1)) + " — M Sreeram Reddy";
  if (page === "projects") renderProjects();
  if (page === "skills") renderSkills();
  if (page === "experience") renderExperience();
  if (page === "settings") initSettings();
  if (page === "calendar") mountCalEmbed();
  updateDate();
  $("#mobile-links").classList.remove("open");
  $("#mobile-menu").setAttribute("aria-expanded", "false");
}
function render(page = activePage()) {
  if (renderTimer) window.clearTimeout(renderTimer);
  if (app.dataset.page && app.dataset.page !== page) {
    app.classList.remove("page-entering", "is-maximized");
    app.classList.add("page-exiting");
    renderTimer = window.setTimeout(() => {
      renderTimer = 0;
      renderPage(page);
    }, 190);
    return;
  }
  renderPage(page);
}
function updateDate() {
  const now = new Date();
  const date = new Intl.DateTimeFormat("en-US", {timeZone:"Asia/Kolkata", weekday:"short", month:"short", day:"numeric"}).format(now);
  const time = new Intl.DateTimeFormat("en-US", {timeZone:"Asia/Kolkata", hour:"numeric", minute:"2-digit", hour12:true}).format(now);
  const label = $("#system-date");
  if (label) label.textContent = date + " · " + time + " IST";
}
function mountCalEmbed() {
  const element = $("#cal-embed");
  if (!element) return;
  if (!window.Cal) {
    (function (C, A, L) {
      const queue = function (api, args) { api.q.push(args); };
      const doc = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const args = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; doc.head.appendChild(doc.createElement("script")).src = A; cal.loaded = true; }
        if (args[0] === L) {
          const api = function () { queue(api, arguments); };
          const namespace = args[1];
          api.q = api.q || [];
          if (typeof namespace === "string") { cal.ns[namespace] = api; queue(cal, args); queue(cal, ["initNamespace", namespace]); }
          else queue(cal, args);
          return;
        }
        queue(cal, args);
      };
    })(window, "https://cal.com/embed.js", "init");
  }
  window.Cal("init", "sreeramPortfolio", {origin:"https://cal.com"});
  window.Cal.ns.sreeramPortfolio("inline", {calLink:"m-sreeram-reddy-d4ftjr", elementOrSelector:element, config:{layout:"month_view", theme:"dark"}});
}

function renderProjects() {
  const list = $("#project-file-list");
  if (list) list.innerHTML = projects.map((project, index) => '<button class="project-file ' + (index === selectedProject ? "active" : "") + '" data-project-index="' + index + '"><span class="project-file-icon">▣</span><span>' + escapeHTML(project.file) + '</span><span class="file-extension">' + escapeHTML(project.file.split(".").pop().toUpperCase()) + '</span></button>').join("");
  const project = projects[selectedProject];
  const title = $("#project-window-title");
  if (title) title.textContent = project.file + " — M Sreeram Reddy";
  const language = $("#editor-language");
  if (language) language.textContent = project.file.split(".").pop().toUpperCase();
  const editor = $("#project-editor");
  if (editor) editor.innerHTML = '<div class="editor-tabs"><div class="editor-tab"><i>◈</i>' + escapeHTML(project.file) + '</div><span class="editor-tab-spacer"></span><button class="editor-more" aria-label="More editor actions">···</button></div><div class="editor-breadcrumb">projects <span>›</span> ' + escapeHTML(project.file) + '</div><div class="project-code"><div class="code-meta"><span>' + escapeHTML(project.category.toUpperCase()) + '</span><span>UTF-8</span></div>' + project.code.map((line, i) => '<div class="code-line"><span class="line-number">' + (i + 1) + '</span><code>' + escapeHTML(line) + '</code></div>').join("") + '<div class="project-editor-note">// Explore the repository for source files, documentation, and implementation details.</div></div></div>';
  const preview = $("#project-preview");
  if (preview) preview.innerHTML = '<div class="preview-topline"><span>PROJECT PREVIEW</span><button aria-label="Preview options">···</button></div><div class="preview-art art-' + (selectedProject % 6) + '"><span class="art-mark">' + ["◫","◌","✳","⌖","⌁","▥"][selectedProject % 6] + '</span><span class="art-label">' + escapeHTML(project.category.toUpperCase()) + '</span></div><div class="preview-body"><span class="preview-kicker">FEATURED PROJECT</span><h2>' + escapeHTML(project.title) + '</h2><p>' + escapeHTML(project.description) + '</p><div class="preview-stack">' + project.stack.map(tag => '<span>' + escapeHTML(tag) + '</span>').join("") + '</div><a class="project-open" href="' + project.url + '" target="_blank" rel="noreferrer">VIEW ON GITHUB <b>↗</b></a></div>';
  const grid = $("#project-grid-view");
  if (grid) grid.innerHTML = '<div class="project-grid-toolbar"><div><span class="preview-kicker">REPOSITORY</span><h2>Projects</h2></div><label><span>⌕</span><input type="search" id="project-search" placeholder="Search projects"></label><div class="project-grid-filters">' + ["All","AI & ML","Analytics","Data","Java"].map(filter => '<button class="project-grid-filter ' + (projectFilter === filter ? "active" : "") + '" data-project-filter="' + escapeHTML(filter) + '">' + escapeHTML(filter) + '</button>').join("") + '</div></div><div class="project-cards">' + filteredProjects("").map(projectCard).join("") + '</div>';
  const window = $(".project-window");
  if (window) window.dataset.view = projectView;
  $$('[data-project-view]').forEach(button => button.classList.toggle("selected", button.dataset.projectView === projectView));
}
function filteredProjects(query) {
  return projects.filter(project => (projectFilter === "All" || project.category === projectFilter) && (project.title + " " + project.description + " " + project.stack.join(" ")).toLowerCase().includes(query.toLowerCase()));
}
function projectCard(project) {
  const index = projects.indexOf(project);
  return '<article class="project-card"><button class="project-card-open" data-project-index="' + index + '"><div class="project-card-art art-' + (index % 6) + '"><span>' + ["◫","◌","✳","⌖","⌁","▥"][index % 6] + '</span><small>' + escapeHTML(project.category.toUpperCase()) + '</small></div><div class="project-card-body"><span class="project-card-file">' + escapeHTML(project.file) + '</span><h3>' + escapeHTML(project.title) + '</h3><p>' + escapeHTML(project.description) + '</p><div class="preview-stack">' + project.stack.slice(0, 4).map(tag => '<span>' + escapeHTML(tag) + '</span>').join("") + '</div></div></button><a class="project-card-link" target="_blank" rel="noreferrer" href="' + project.url + '" aria-label="Open ' + escapeHTML(project.title) + ' on GitHub">↗</a></article>';
}

function renderSkills(query = "") {
  const grid = $("#skill-grid");
  if (!grid) return;
  const items = skillItems.filter(skill => (skillFilter === "all" || skill.category === skillFilter) && skill.name.toLowerCase().includes(query.toLowerCase()));
  const perPage = window.innerWidth < 640 ? 16 : 18;
  const pages = Math.max(1, Math.ceil(items.length / perPage));
  skillPage = Math.min(skillPage, pages - 1);
  grid.innerHTML = items.slice(skillPage * perPage, (skillPage + 1) * perPage).map(skill => '<button class="skill-icon-card" title="' + escapeHTML(skill.name) + '" aria-label="' + escapeHTML(skill.name) + '"><span class="skill-app-icon skill-' + escapeHTML(skill.category) + '" style="--skill-bg:' + escapeHTML(skill.background) + '"><img src="assets/skills/' + escapeHTML(skill.icon) + '" alt="" loading="lazy"></span><span>' + escapeHTML(skill.name) + '</span></button>').join("");
  const count = $("#skills-page-count");
  if (count) count.textContent = "Page " + (skillPage + 1) + " of " + pages;
  const dots = $("#skill-dots");
  if (dots) dots.innerHTML = Array.from({length:pages}, (_, i) => '<button class="' + (i === skillPage ? "active" : "") + '" data-skill-page="' + i + '" aria-label="Page ' + (i + 1) + '"></button>').join("");
  const prev = $("#skill-prev"), next = $("#skill-next");
  if (prev) prev.disabled = skillPage === 0;
  if (next) next.disabled = skillPage >= pages - 1;
}

function renderExperience() {
  const foldersNode = $("#experience-folder-list");
  if (foldersNode) foldersNode.innerHTML = folders.map(folder => '<button class="experience-folder ' + (experienceFolder === folder.id ? "active" : "") + '" data-exp-folder="' + folder.id + '"><span class="folder-symbol">' + folder.icon + '</span><strong>' + folder.label + '</strong><small>' + experienceData[folder.id].length + '</small></button>').join("");
  const allEntries = experienceData[experienceFolder] || [];
  const filtered = allEntries.filter(entry => (entry.title + " " + entry.org + " " + entry.location + " " + entry.body).toLowerCase().includes(experienceQuery.toLowerCase()));
  selectedExperience = Math.min(selectedExperience, Math.max(0, filtered.length - 1));
  const list = $("#experience-record-list");
  if (list) list.innerHTML = '<div class="record-list-heading"><span>' + (folders.find(f => f.id === experienceFolder)?.label || "Recently Deleted") + '</span><small>' + filtered.length + ' items</small></div>' + filtered.map((entry, index) => '<button class="experience-record-row ' + (index === selectedExperience ? "active" : "") + '" data-exp-index="' + index + '"><span class="record-row-icon">' + (entry.kind === "CERTIFICATE" ? "✧" : entry.kind === "ACADEMIC EDUCATION" ? "▤" : "▰") + '</span><span><strong>' + escapeHTML(entry.title) + '</strong><small>' + escapeHTML(entry.org) + ' · ' + escapeHTML(entry.date) + '</small></span><b>›</b></button>').join("") || '<div class="empty-records">No matching items</div>';
  const selected = filtered[selectedExperience];
  const detail = $("#experience-detail");
  if (!detail) return;
  if (!selected) { detail.innerHTML = '<div class="empty-detail"><span>▤</span><strong>Recently Deleted</strong><p>There are no items in Recently Deleted.</p></div>'; return; }
  detail.innerHTML = '<div class="experience-detail-actions"><button title="Share" aria-label="Share">↗</button><button title="More options" aria-label="More options">···</button></div><div class="detail-document-icon">' + (selected.kind === "CERTIFICATE" ? "✧" : selected.kind === "ACADEMIC EDUCATION" ? "▤" : "▰") + '</div><span class="detail-kind">' + escapeHTML(selected.kind) + '</span><h1>' + escapeHTML(selected.title) + '</h1><div class="detail-org">' + escapeHTML(selected.org) + '</div><div class="detail-meta"><span>⌖ &nbsp;' + escapeHTML(selected.location) + '</span><span>◷ &nbsp;' + escapeHTML(selected.date) + '</span></div><p class="detail-description">' + escapeHTML(selected.body) + '</p><h2>KEY HIGHLIGHTS</h2><ul>' + selected.highlights.map(text => '<li>' + escapeHTML(text) + '</li>').join("") + '</ul><div class="record-tags">' + selected.tags.map(tag => '<span>' + escapeHTML(tag) + '</span>').join("") + '</div>';
}

const wallpapers = [
  {id:"abstract", name:"Abstract Dark", image:"assets/wallpapers/abstract-dark.jpg"},
  {id:"mountain", name:"Mountain", image:"assets/wallpapers/mountain.jpg"},
  {id:"ocean", name:"Ocean", image:"assets/wallpapers/ocean.jpg"},
  {id:"gradient", name:"Gradient", image:"assets/wallpapers/gradient.jpg"},
  {id:"forest", name:"Forest", image:"assets/wallpapers/forest.jpg"},
  {id:"space", name:"Space", image:"assets/wallpapers/space.jpg"}
];
function applyWallpaper(id, animate = true) {
  const desktop = $("#desktop-wallpaper");
  const selected = wallpapers.find(wallpaper => wallpaper.id === id) || wallpapers[0];
  document.body.dataset.wallpaper = selected.id;
  if (!desktop) return;
  const current = desktop.querySelector(".wallpaper-image.current");
  desktop.querySelectorAll(".wallpaper-image:not(.current)").forEach(layer => layer.remove());
  const next = document.createElement("div");
  next.className = "wallpaper-image";
  next.style.backgroundImage = 'url("' + selected.image + '")';
  next.setAttribute("aria-hidden", "true");
  if (!animate || !current) {
    desktop.querySelectorAll(".wallpaper-image").forEach(layer => layer.remove());
    next.classList.add("current", "is-visible");
    desktop.prepend(next);
    return;
  }
  desktop.append(next);
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => next.classList.add("is-visible")));
  if (wallpaperSwapTimer) window.clearTimeout(wallpaperSwapTimer);
  wallpaperSwapTimer = window.setTimeout(() => {
    current.remove();
    next.classList.add("current");
    wallpaperSwapTimer = 0;
  }, 720);
}
function applySettings() {
  const wallpaper = localStorage.getItem("portfolio-wallpaper") || "abstract";
  if (document.body.dataset.wallpaper !== wallpaper || !$("#desktop-wallpaper .wallpaper-image.current")) applyWallpaper(wallpaper, false);
  document.body.dataset.appearance = localStorage.getItem("portfolio-appearance") || "dark";
  document.body.dataset.textSize = localStorage.getItem("portfolio-text-size") || "medium";
}
function renderSettingsPanel(section) {
  const panel = $("#settings-panel");
  if (!panel) return;
  settingsSection = section;
  localStorage.setItem("portfolio-settings-tab", section);
  $$('[data-settings-tab]').forEach(button => button.classList.toggle("active", button.dataset.settingsTab === section));
  let body = "";
  if (section === "background") {
    body = '<div class="settings-panel-heading"><h1>Background</h1><p>Choose a wallpaper for your desktop.</p></div><div class="settings-panel-body"><span class="settings-section-label">DESKTOP WALLPAPER</span><p class="settings-help">Select a high-resolution background for your desktop.</p><div class="wallpaper-grid">' + wallpapers.map(w => '<button class="wallpaper-choice ' + (document.body.dataset.wallpaper === w.id ? "selected" : "") + '" data-wallpaper-choice="' + w.id + '" aria-pressed="' + (document.body.dataset.wallpaper === w.id) + '"><span class="wallpaper-swatch" style="background-image:url(\'' + w.image + '\')"></span><span>' + w.name + '</span></button>').join("") + '</div></div>';
  } else if (section === "appearance") {
    body = '<div class="settings-panel-heading"><h1>Appearance</h1><p>Choose how your workspace looks.</p></div><div class="settings-panel-body"><span class="settings-section-label">THEME MODE</span><p class="settings-help">Select a light or dark appearance.</p><div class="appearance-options">' + ["light","dark"].map(mode => '<button class="appearance-choice ' + (document.body.dataset.appearance === mode ? "selected" : "") + '" data-appearance-choice="' + mode + '"><span class="appearance-preview appearance-' + mode + '"></span><strong>' + mode[0].toUpperCase() + mode.slice(1) + '</strong></button>').join("") + '</div><div class="settings-tip">Your choice is saved in this browser.</div></div>';
  } else {
    body = '<div class="settings-panel-heading"><h1>Typography</h1><p>Adjust the interface text size.</p></div><div class="settings-panel-body"><span class="settings-section-label">TEXT SIZE</span><p class="settings-help">Choose a comfortable text size for your workspace.</p><div class="text-size-options">' + ["small","medium","large","extra-large"].map((size, i) => '<button class="text-size-choice size-' + size + ' ' + (document.body.dataset.textSize === size ? "selected" : "") + '" data-text-size="' + size + '"><strong>AA</strong><small>' + ["SMALL","MEDIUM","LARGE","EXTRA LARGE"][i] + '</small></button>').join("") + '</div><div class="typography-sample"><span>The quick brown fox jumps over the lazy dog.</span><small>PREVIEW TEXT</small></div></div>';
  }
  panel.innerHTML = body;
}
function initSettings() {
  applySettings();
  renderSettingsPanel(settingsSection);
}

function botAnswer(question) {
  const q = question.toLowerCase();
  if (/project|github|built|portfolio/.test(q)) return "Sreeram's projects include analytics dashboards, climate and air quality exploration, wildfire and geospatial work, fraud detection, and computer vision. Open the Projects app to browse the repositories on GitHub.";
  if (/skill|technology|tool|stack/.test(q)) return "His skills include Python, Java, SQL, Power BI, DAX, Excel, Tableau, Pandas, NumPy, JavaScript, ETL, databases, AWS, OCI, Git, and machine learning.";
  if (/experience|job|intern|apprentice/.test(q)) return "Sreeram worked as an AI & ML Intern at Kodacy and as a Java Full Stack Apprentice at LTIMindtree. The Experience app has his work, achievements, and education details.";
  if (/education|degree|college|srm|cgpa/.test(q)) return "He completed a B.Tech in Computer Science & Engineering with a specialization in Big Data Analytics at SRM Institute of Science and Technology. His CGPA was 9.01/10.";
  if (/contact|email|linkedin|reach/.test(q)) return "Email Sreeram at sreeram2124@gmail.com or connect on LinkedIn at linkedin.com/in/m-sreeram-reddy-3820b1261. You can also book a meeting from the Calendar app.";
  if (/available|location|remote|bengaluru|bangalore/.test(q)) return "Sreeram is based in Bengaluru, India and is open to on-site, hybrid, or remote opportunities.";
  if (/resume|cv/.test(q)) return "Use the Resume button on the Home app to download Sreeram's resume.";
  if (/book|meeting|calendar/.test(q)) return "You can choose an available time through Cal.com or Calendly from the Calendar app.";
  return "I can answer questions about Sreeram's projects, skills, experience, education, resume, location, or contact details. What would you like to know?";
}
function addChatMessage(text, type) {
  const messages = $("#chat-messages");
  const node = document.createElement("div");
  node.className = type === "user" ? "user-message" : "bot-message";
  node.textContent = text;
  messages.appendChild(node);
  messages.scrollTop = messages.scrollHeight;
}
function askBot(question) {
  const text = question.trim();
  if (!text) return;
  addChatMessage(text, "user");
  window.setTimeout(() => addChatMessage(botAnswer(text), "bot"), 260);
}
function toggleChat(open) {
  const chat = $("#chat-window");
  const launcher = $("#chat-launcher");
  if (chatCloseTimer) window.clearTimeout(chatCloseTimer);
  if (open) {
    chat.classList.remove("closing");
    chat.classList.add("open");
    chat.setAttribute("aria-hidden", "false");
    launcher.classList.remove("is-closing");
    launcher.setAttribute("aria-expanded", "true");
    $("#chat-close-floating").classList.add("visible");
    $("#chat-input").focus();
    return;
  }
  if (!chat.classList.contains("open")) return;
  chat.classList.remove("open");
  chat.classList.add("closing");
  chat.setAttribute("aria-hidden", "true");
  launcher.classList.add("is-closing");
  launcher.setAttribute("aria-expanded", "false");
  $("#chat-close-floating").classList.remove("visible");
  chatCloseTimer = window.setTimeout(() => {
    chat.classList.remove("closing");
    launcher.classList.remove("is-closing");
    chatCloseTimer = 0;
  }, 240);
}
function showToast(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2500);
}

window.addEventListener("hashchange", () => render());
window.addEventListener("resize", () => { if (activePage() === "skills") renderSkills($("#skill-search")?.value || ""); });
$("#chat-launcher").addEventListener("click", () => toggleChat(!$("#chat-window").classList.contains("open")));
$("#chat-close").addEventListener("click", () => toggleChat(false));
$("#chat-close-floating").addEventListener("click", () => toggleChat(false));
$("#chat-minimize").addEventListener("click", () => toggleChat(false));
$("#chat-expand").addEventListener("click", () => $("#chat-window").classList.toggle("expanded"));
$("#chat-form").addEventListener("submit", event => { event.preventDefault(); const input = $("#chat-input"); askBot(input.value); input.value = ""; });
document.addEventListener("keydown", event => { if (event.key === "Escape") { toggleChat(false); $("#trash-panel").classList.remove("open"); } });
$("#mobile-menu").addEventListener("click", event => { const links = $("#mobile-links"); const open = !links.classList.contains("open"); links.classList.toggle("open", open); event.currentTarget.setAttribute("aria-expanded", String(open)); });
$("#profile-shortcut").addEventListener("click", event => { event.preventDefault(); location.hash = "#home"; });
$("#trash-shortcut").addEventListener("click", () => { $("#trash-panel").classList.add("open"); $("#trash-panel").setAttribute("aria-hidden", "false"); });
$("#trash-close").addEventListener("click", () => { $("#trash-panel").classList.remove("open"); $("#trash-panel").setAttribute("aria-hidden", "true"); });
document.addEventListener("click", event => {
  const windowControl = event.target.closest("[data-window-action]");
  if (windowControl) {
    const action = windowControl.dataset.windowAction;
    if (action === "maximize") {
      const maximized = app.classList.toggle("is-maximized");
      windowControl.setAttribute("aria-pressed", String(maximized));
    } else if (activePage() !== "home") {
      location.hash = "#home";
    }
    return;
  }
  const project = event.target.closest("[data-project-index]");
  if (project && activePage() === "projects") { selectedProject = Number(project.dataset.projectIndex); if (projectView === "grid") projectView = "explorer"; renderProjects(); return; }
  const view = event.target.closest("[data-project-view]");
  if (view && activePage() === "projects") { projectView = view.dataset.projectView; renderProjects(); return; }
  const filter = event.target.closest("[data-project-filter]");
  if (filter && activePage() === "projects") { projectFilter = filter.dataset.projectFilter; renderProjects(); return; }
  const skillCategory = event.target.closest("[data-filter]");
  if (skillCategory && activePage() === "skills") { skillFilter = skillCategory.dataset.filter; skillPage = 0; $$(".skill-filter").forEach(button => button.classList.toggle("active", button === skillCategory)); renderSkills($("#skill-search").value); return; }
  const skillPageButton = event.target.closest("[data-skill-page]");
  if (skillPageButton && activePage() === "skills") { skillPage = Number(skillPageButton.dataset.skillPage); renderSkills($("#skill-search").value); return; }
  const step = event.target.closest("[data-page-step]");
  if (step && activePage() === "skills") { skillPage += Number(step.dataset.pageStep); renderSkills($("#skill-search").value); return; }
  const folder = event.target.closest("[data-exp-folder]");
  if (folder && activePage() === "experience") { experienceFolder = folder.dataset.expFolder; selectedExperience = 0; renderExperience(); return; }
  const record = event.target.closest("[data-exp-index]");
  if (record && activePage() === "experience") { selectedExperience = Number(record.dataset.expIndex); renderExperience(); return; }
  const settingsTab = event.target.closest("[data-settings-tab]");
  if (settingsTab && activePage() === "settings") { renderSettingsPanel(settingsTab.dataset.settingsTab); return; }
  const wallpaper = event.target.closest("[data-wallpaper-choice]");
  if (wallpaper && activePage() === "settings") { localStorage.setItem("portfolio-wallpaper", wallpaper.dataset.wallpaperChoice); applyWallpaper(wallpaper.dataset.wallpaperChoice); renderSettingsPanel("background"); return; }
  const appearance = event.target.closest("[data-appearance-choice]");
  if (appearance && activePage() === "settings") { localStorage.setItem("portfolio-appearance", appearance.dataset.appearanceChoice); applySettings(); renderSettingsPanel("appearance"); return; }
  const textSize = event.target.closest("[data-text-size]");
  if (textSize && activePage() === "settings") { localStorage.setItem("portfolio-text-size", textSize.dataset.textSize); applySettings(); renderSettingsPanel("typography"); return; }
  const question = event.target.closest("[data-question]");
  if (question) askBot(question.dataset.question);
});
document.addEventListener("input", event => {
  if (event.target.id === "skill-search") { skillPage = 0; renderSkills(event.target.value); const search = $("#skill-search"); if (search) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); } }
  if (event.target.id === "experience-search") { experienceQuery = event.target.value; selectedExperience = 0; renderExperience(); const search = $("#experience-search"); if (search) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); } }
  if (event.target.id === "project-search") { const grid = $("#project-grid-view"); const cards = $(".project-cards", grid); if (cards) cards.innerHTML = filteredProjects(event.target.value).map(projectCard).join(""); const search = $("#project-search"); if (search) { search.focus(); search.setSelectionRange(search.value.length, search.value.length); } }
});
applySettings();
render();
window.setInterval(updateDate, 30000);
