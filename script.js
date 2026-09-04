// ---------- FAQ accordion ----------
document.querySelectorAll(".faq-item").forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    const isOpen = item.getAttribute("data-open") === "true";
    document.querySelectorAll(".faq-item").forEach((i) => i.setAttribute("data-open", "false"));
    item.setAttribute("data-open", isOpen ? "false" : "true");
  });
});

// ---------- Bairro pills (active state + horizontal scroll) ----------
const bairroTrack = document.getElementById("bairro-track");
if (bairroTrack) {
  bairroTrack.querySelectorAll(".bairro-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      bairroTrack.querySelectorAll(".bairro-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });

  document.getElementById("bairro-prev")?.addEventListener("click", () => {
    bairroTrack.scrollBy({ left: -160, behavior: "smooth" });
  });
  document.getElementById("bairro-next")?.addEventListener("click", () => {
    bairroTrack.scrollBy({ left: 160, behavior: "smooth" });
  });
}

// ---------- Protocol search (demo behaviour) ----------
document.querySelectorAll(".protocol-search").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const results = document.getElementById("protocol-results");
    if (results) results.scrollIntoView({ behavior: "smooth" });
  });
});

// ---------- Cadastro: multi-step form ----------
const steps = ["responsavel", "candidato", "endereco", "unidades", "residencia", "financeira", "resumo"];
const subStepItems = document.querySelectorAll("#sub-steps li");

function goToStep(stepId) {
  steps.forEach((id) => {
    const panel = document.getElementById("panel-" + id);
    if (panel) panel.hidden = id !== stepId;
  });
  subStepItems.forEach((li) => {
    li.classList.toggle("active", li.dataset.panel === stepId);
  });
  document.querySelector(".form-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll(".next-step").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentPanel = btn.closest(".form-step");
    const currentIndex = steps.findIndex((id) => "panel-" + id === currentPanel.id);
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      goToStep(steps[currentIndex + 1]);
    }
  });
});

document.querySelectorAll(".prev-step").forEach((btn) => {
  btn.addEventListener("click", () => {
    const currentPanel = btn.closest(".form-step");
    const currentIndex = steps.findIndex((id) => "panel-" + id === currentPanel.id);
    if (currentIndex > 0) {
      goToStep(steps[currentIndex - 1]);
    }
  });
});

subStepItems.forEach((li) => {
  li.addEventListener("click", () => goToStep(li.dataset.panel));
});

document.querySelectorAll(".overview-item").forEach((item) => {
  item.addEventListener("click", () => goToStep(item.dataset.panel));
});

document.getElementById("finish-btn")?.addEventListener("click", () => {
  alert("Protocolo gerado! Em um site real, aqui você baixaria o PDF do protocolo.");
});
