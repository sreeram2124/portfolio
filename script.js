(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Icon enhancement: the page remains usable if the icon CDN fails.
  const makeIcons = () => { if (window.lucide?.createIcons) window.lucide.createIcons(); };
  window.addEventListener("load", makeIcons);

  // Mobile menu with Escape and close-on-navigation support.
  const menuButton = $(".menu-toggle");
  const mobileNav = $(".mobile-nav");
  function setMenu(open) {
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    mobileNav?.classList.toggle("open", open);
    mobileNav?.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  }
  menuButton?.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  $$(".mobile-nav a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", event => { if (event.key === "Escape") setMenu(false); });

  // Scroll progress and active reading progress.
  const progress = $("#progress-bar");
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0) + "%";
  };
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // Respect reduced-motion, while preserving the content flow.
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
    const timeline = $(".timeline");
    if (timeline) {
      const timelineObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { timeline.classList.add("is-visible"); timelineObserver.disconnect(); }
      }), { threshold: 0.12 });
      timelineObserver.observe(timeline);
    }
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
    $(".timeline")?.classList.add("is-visible");
  }

  // Desktop custom cursor, disabled on touch and reduced-motion setups.
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const dot = $(".cursor-dot");
  const ring = $(".cursor-ring");
  if (finePointer && !reducedMotion && dot && ring) {
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
    let visible = false;
    window.addEventListener("mousemove", event => {
      x = event.clientX; y = event.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = ring.style.opacity = "1";
      }
      dot.style.left = x + "px"; dot.style.top = y + "px";
    }, { passive: true });
    const moveRing = () => {
      rx += (x - rx) * .16; ry += (y - ry) * .16;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(moveRing);
    };
    requestAnimationFrame(moveRing);
    $$("a,button,.project-card,.skill-chips span,select,input").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("hovering"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hovering"));
    });
    window.addEventListener("mouseleave", () => { dot.style.opacity = ring.style.opacity = "0"; });
  }

  // Magnetic movement is intentionally subtle and only enabled with a mouse.
  if (finePointer && !reducedMotion) {
    $$(".magnetic").forEach(el => {
      el.addEventListener("mousemove", event => {
        const rect = el.getBoundingClientRect();
        const dx = (event.clientX - rect.left - rect.width / 2) * .08;
        const dy = (event.clientY - rect.top - rect.height / 2) * .12;
        el.style.transform = `translate(${dx}px,${dy - 2}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
      el.addEventListener("blur", () => { el.style.transform = ""; });
    });
  }

  // Animated particle field: canvas is decorative, low-cost, and responsive.
  const canvas = $("#particle-canvas");
  const ctx = canvas?.getContext("2d", { alpha: true });
  if (canvas && ctx && !reducedMotion) {
    let width = 0, height = 0, particles = [], frame = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      width = rect.width; height = rect.height;
      canvas.width = Math.floor(width * dpr); canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(74, Math.max(24, Math.floor(width / 15)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width, y: Math.random() * height,
        r: Math.random() * 1.5 + .4, vx: (Math.random() - .5) * .22,
        vy: (Math.random() - .5) * .19,
        hue: [180, 250, 310][Math.floor(Math.random() * 3)],
        alpha: Math.random() * .4 + .15
      }));
    };
    const draw = () => {
      frame = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.alpha})`; ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j], dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 105) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(148, 126, 220, ${(1 - dist / 105) * .1})`;
            ctx.lineWidth = .6; ctx.stroke();
          }
        }
      });
    };
    resize(); draw();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else { cancelAnimationFrame(frame); draw(); }
    });
  }

  // Project cards open real repository destinations. Keyboard activation works too.
  const toast = $(".project-toast");
  let toastTimer;
  function openProject(card) {
    const url = card.dataset.url;
    if (!url) return;
    if (toast) {
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 900);
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }
  $$(".project-card").forEach(card => {
    card.addEventListener("click", () => openProject(card));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); openProject(card);
      }
    });
    if (finePointer && !reducedMotion) {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        card.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 3.2}deg) rotateY(${(px - 0.5) * 3.2}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
      card.addEventListener("blur", () => { card.style.transform = ""; });
    }
  });

  // Working chart playground — values are demonstrative, never project results.
  const datasets = {
    sales: {
      title: "Sales over time", unit: "REVENUE / SAMPLE USD", legend: "Sample revenue", prefix: "$", suffix: "k",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      values: [4.2, 5.8, 5.1, 7.4, 6.3, 8.2, 7.1, 9.3], decimals: 1,
      insight: "Highest visible value: "
    },
    air: {
      title: "Air quality index", unit: "AQI / ILLUSTRATIVE INDEX", legend: "Illustrative AQI", prefix: "", suffix: "",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"],
      values: [42, 58, 37, 73, 66, 51, 84, 61], decimals: 0,
      insight: "Highest visible index: "
    },
    climate: {
      title: "Temperature anomaly", unit: "ANOMALY / ILLUSTRATIVE °C", legend: "Illustrative anomaly", prefix: "+", suffix: "°",
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      values: [.5, .7, .6, .9, 1.0, .8, 1.2, 1.1], decimals: 1,
      insight: "Highest visible value: "
    }
  };
  let chartKind = "bar";
  const datasetSelect = $("#dataset-select");
  const rangeSelect = $("#range-select");
  const rangeOutput = $("#range-output");
  const chartPlot = $("#chart-plot");
  const chartTooltip = $("#chart-tooltip");
  const chartTotal = $("#chart-total");
  const chartTitle = $("#dataset-title");
  const chartUnit = $("#chart-unit");
  const legendName = $("#legend-name");
  const chartInsight = $("#chart-insight");
  const yAxis = $("#y-axis");
  const chartToggleButtons = $$("[data-chart]");
  const formatVal = (value, data) => data.prefix + Number(value).toLocaleString("en-US", { maximumFractionDigits: data.decimals }) + data.suffix;
  function renderChart() {
    if (!chartPlot) return;
    const data = datasets[datasetSelect.value] || datasets.sales;
    const count = Number(rangeSelect.value);
    const labels = data.labels.slice(0, count);
    const values = data.values.slice(0, count);
    const max = Math.max(...data.values) * 1.16;
    const total = values.reduce((sum, value) => sum + value, 0);
    chartTitle.textContent = data.title;
    chartUnit.textContent = data.unit;
    legendName.textContent = data.legend;
    rangeOutput.textContent = count;
    chartTotal.textContent = datasetSelect.value === "sales"
      ? "$ " + (total * 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })
      : (datasetSelect.value === "climate" ? "+" : "") + total.toLocaleString("en-US", { maximumFractionDigits: data.decimals }) + (datasetSelect.value === "climate" ? "°" : "");
    const peak = values.reduce((best, value, i) => value > values[best] ? i : best, 0);
    chartInsight.textContent = data.insight + labels[peak];
    yAxis.innerHTML = "";
    for (let tick = 4; tick >= 0; tick--) {
      const el = document.createElement("span");
      const value = max * tick / 4;
      el.textContent = datasetSelect.value === "sales" ? (value ? Math.round(value) + "k" : "0") :
        datasetSelect.value === "climate" ? value.toFixed(1) + "°" : Math.round(value);
      yAxis.append(el);
    }
    chartPlot.innerHTML = "";
    values.forEach((value, index) => {
      const percent = Math.max(3, value / max * 100);
      const col = document.createElement("button");
      col.type = "button";
      col.className = "chart-column";
      col.style.setProperty("--height", percent + "%");
      col.setAttribute("aria-label", labels[index] + ": " + formatVal(value, data));
      col.dataset.label = labels[index];
      col.dataset.value = formatVal(value, data);
      const visual = document.createElement("span");
      visual.className = chartKind === "area" ? "area" : "bar";
      if (chartKind === "line") {
        const point = document.createElement("span");
        point.className = "point";
        visual.append(point);
      }
      col.append(visual);
      if (chartKind === "line") {
        const line = document.createElement("span");
        line.className = "point-line";
        col.append(line);
      }
      const label = document.createElement("span");
      label.className = "x-label";
      label.textContent = labels[index];
      col.append(label);
      const showTooltip = () => {
        const plotRect = chartPlot.getBoundingClientRect();
        const colRect = col.getBoundingClientRect();
        chartTooltip.textContent = labels[index] + " · " + formatVal(value, data);
        chartTooltip.style.left = (colRect.left - plotRect.left + colRect.width / 2) + "px";
        chartTooltip.style.top = Math.max(10, colRect.top - plotRect.top + Math.max(0, plotRect.height * (1 - percent / 100))) + "px";
        chartTooltip.classList.add("visible");
      };
      col.addEventListener("mouseenter", showTooltip);
      col.addEventListener("focus", showTooltip);
      col.addEventListener("mouseleave", () => chartTooltip.classList.remove("visible"));
      col.addEventListener("blur", () => chartTooltip.classList.remove("visible"));
      chartPlot.append(col);
    });
  }
  datasetSelect?.addEventListener("change", renderChart);
  rangeSelect?.addEventListener("input", renderChart);
  chartToggleButtons.forEach(button => button.addEventListener("click", () => {
    chartKind = button.dataset.chart;
    chartToggleButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderChart();
  }));
  renderChart();

  $("#year").textContent = new Date().getFullYear();
})();