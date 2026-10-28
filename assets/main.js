/*
 * Site config: replace these with the tracked links from your affiliate
 * network dashboard (CJ, Impact, etc.). Every element with data-offer="..."
 * gets its href from here. Without JS the HTML falls back to the vendor home page.
 */
const OFFERS = {
  norton: "https://us.norton.com/",   // TODO: Norton affiliate tracking link
  mcafee: "https://www.mcafee.com/",  // TODO: McAfee affiliate tracking link
};

document.querySelectorAll("[data-offer]").forEach((link) => {
  const url = OFFERS[link.dataset.offer];
  if (url) link.href = url;
  link.rel = "sponsored nofollow noopener";
  link.target = "_blank";
});

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Deal filter ---------- */
const filterButtons = document.querySelectorAll("[data-filter]");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const brand = button.dataset.filter;
    filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    document.querySelectorAll(".deal").forEach((deal) => {
      deal.hidden = brand !== "all" && deal.dataset.brand !== brand;
    });
  });
});

/* ---------- Picker ---------- */
const picker = document.querySelector("#picker-form");

if (picker) {
  const verdict = document.querySelector("#verdict");
  const nameEl = verdict.querySelector(".verdict-name");
  const whyEl = verdict.querySelector(".verdict-why");
  const goEl = verdict.querySelector("[data-verdict-go]");
  const progress = document.querySelector("#picker-progress");
  const total = picker.querySelectorAll("fieldset").length;

  // Each answer nudges the score toward one product, with the reason we show.
  const WEIGHTS = {
    devices: {
      few: { norton: 1, reason: "Norton's standard plans cover a household's handful of devices well." },
      family: {
        norton: 1, mcafee: 1,
        reason: {
          norton: "Norton 360 Deluxe covers up to 5 devices, a good fit for a family.",
          mcafee: "McAfee's family-sized plans cover every phone and laptop in the house.",
        },
      },
      many: { mcafee: 2, reason: "McAfee offers plans that cover a large number of devices on one subscription." },
    },
    priority: {
      backup: { norton: 2, reason: "Norton includes cloud backup for Windows PCs in its 360 plans." },
      privacy: { mcafee: 2, reason: "McAfee bundles its VPN and identity monitoring across its main plans." },
      price: { mcafee: 2, reason: "McAfee's first-year offers usually come in lower." },
      kids: { norton: 2, reason: "Norton's parental controls are among the most complete in its plans." },
    },
    platform: {
      windows: { norton: 1, reason: "Norton is especially strong on Windows PCs." },
      mixed: { mcafee: 1, reason: "McAfee keeps the same features across Windows, Mac, iOS and Android." },
    },
  };

  const LABELS = { norton: "Norton 360", mcafee: "McAfee Total Protection" };

  const update = () => {
    const data = new FormData(picker);
    const answered = [...new Set([...data.keys()])].length;
    progress.textContent = answered < total
      ? `${answered} of ${total} answered`
      : "All set. Here's our pick.";

    if (answered < total) {
      verdict.hidden = true;
      return;
    }

    const score = { norton: 0, mcafee: 0 };
    const reasons = { norton: [], mcafee: [] };
    for (const [question, answer] of data.entries()) {
      const w = WEIGHTS[question]?.[answer];
      if (!w) continue;
      for (const brand of ["norton", "mcafee"]) {
        if (w[brand]) {
          score[brand] += w[brand];
          reasons[brand].push(typeof w.reason === "string" ? w.reason : w.reason[brand]);
        }
      }
    }

    // Ties go to the household's top priority.
    let pick = score.norton >= score.mcafee ? "norton" : "mcafee";
    if (score.norton === score.mcafee) {
      pick = WEIGHTS.priority[data.get("priority")].norton ? "norton" : "mcafee";
    }

    nameEl.textContent = LABELS[pick];
    whyEl.textContent = reasons[pick].join(" ");
    goEl.dataset.offer = pick;
    goEl.href = OFFERS[pick];
    goEl.textContent = `See ${LABELS[pick]} offers`;

    verdict.hidden = false;
    verdict.classList.remove("is-new");
    void verdict.offsetWidth;
    verdict.classList.add("is-new");
  };

  picker.addEventListener("change", update);
  picker.addEventListener("submit", (e) => e.preventDefault());
}

/* ---------- Contact form (no backend yet) ---------- */
const contact = document.querySelector("#contact-form");

if (contact) {
  contact.addEventListener("submit", (e) => {
    // TODO: point the form's action at Formspree, Netlify Forms, or your own endpoint,
    // then delete this handler.
    if (contact.getAttribute("action") === "#") {
      e.preventDefault();
      document.querySelector("#contact-status").textContent =
        "Form isn't connected yet. Set the form action to your form endpoint.";
    }
  });
}
