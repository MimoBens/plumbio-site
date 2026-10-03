// Plumbio — scripts du site vitrine

// Adresse courriel qui reçoit les messages du formulaire de contact.
// Laisser vide tant qu'aucune adresse officielle n'existe (aucun courriel n'est alors ouvert).
const CONTACT_EMAIL = "";

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("menu-principal");

function setMenu(open) {
  nav.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
}

toggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Année courante dans le pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

// Formulaire de contact : validation simple, puis ouverture du logiciel de courriel.
// (Aucun serveur pour l'instant — pourra être remplacé par un service de formulaires.)
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;
  form.querySelectorAll("input, textarea").forEach((field) => {
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.setAttribute("aria-invalid", String(!ok));
    if (!ok) valid = false;
  });

  if (!valid) {
    status.className = "form-status error";
    status.textContent = "Veuillez remplir tous les champs avec une adresse courriel valide.";
    return;
  }

  if (!CONTACT_EMAIL) {
    status.className = "form-status";
    status.textContent = "L'envoi de messages sera activé très prochainement. Merci de votre patience.";
    return;
  }

  const nom = form.nom.value.trim();
  const courriel = form.courriel.value.trim();
  const message = form.message.value.trim();
  const subject = encodeURIComponent(`Demande d'information — ${nom}`);
  const body = encodeURIComponent(`${message}\n\n—\n${nom}\n${courriel}`);

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  status.className = "form-status ok";
  status.textContent = "Votre logiciel de courriel va s'ouvrir pour envoyer le message.";
});
