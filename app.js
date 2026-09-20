function creer(balise, classe, texte) {
  const el = document.createElement(balise);
  if (classe) el.className = classe;
  if (texte !== undefined) el.textContent = texte;
  return el;
}

function creerImage(produit) {
  const img = creer("img");
  img.alt = produit.nom;
  img.src = produit.image;
  img.addEventListener("error", function () {
    const parent = img.parentElement;
    img.remove();
    if (parent && parent.classList.contains("vignette")) parent.classList.add("sans-image");
  });
  return img;
}

const reduireMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const piste = document.getElementById("piste");
const conteneurPoints = document.getElementById("points");
const vedettes = PRODUITS.filter(function (p) { return p.vedette; });

function indexCourant() {
  if (!piste.clientWidth) return 0;
  return Math.round(piste.scrollLeft / piste.clientWidth);
}

function aller(i) {
  const n = vedettes.length;
  if (!n) return;
  const cible = (i + n) % n;
  piste.scrollTo({
    left: piste.children[cible].offsetLeft,
    behavior: reduireMouvement ? "auto" : "smooth"
  });
}

function majPoints() {
  const courant = indexCourant();
  Array.from(conteneurPoints.children).forEach(function (pt, i) {
    pt.setAttribute("aria-current", i === courant ? "true" : "false");
  });
}

vedettes.forEach(function (p, i) {
  const lien = creer("a", "slide");
  lien.href = p.page;
  lien.style.setProperty("--fond", p.fond);
  lien.setAttribute("aria-label", p.nom + ", " + p.prix + ". Voir le produit");
  lien.appendChild(creerImage(p));

  const etiquette = creer("span", "etiquette");
  etiquette.appendChild(creer("strong", "", p.nom));
  etiquette.appendChild(creer("span", "", p.prix));
  lien.appendChild(etiquette);
  piste.appendChild(lien);

  const point = creer("button", "point");
  point.type = "button";
  point.setAttribute("aria-label", "Aller au produit " + (i + 1));
  point.addEventListener("click", function () { aller(i); });
  conteneurPoints.appendChild(point);
});

piste.addEventListener("scroll", majPoints, { passive: true });
document.getElementById("prec").addEventListener("click", function () { aller(indexCourant() - 1); });
document.getElementById("suiv").addEventListener("click", function () { aller(indexCourant() + 1); });
majPoints();

let minuteur = null;
function demarrer() {
  if (reduireMouvement || vedettes.length < 2 || minuteur) return;
  minuteur = setInterval(function () { aller(indexCourant() + 1); }, 4500);
}
function arreter() {
  clearInterval(minuteur);
  minuteur = null;
}
const banniere = document.querySelector(".banniere");
banniere.addEventListener("mouseenter", arreter);
banniere.addEventListener("mouseleave", demarrer);
banniere.addEventListener("focusin", arreter);
banniere.addEventListener("focusout", demarrer);
banniere.addEventListener("touchstart", arreter, { passive: true });
banniere.addEventListener("touchend", demarrer, { passive: true });
demarrer();

const grille = document.getElementById("grille");
const vide = document.getElementById("vide");
const barre = document.getElementById("categories");
let categorieActive = "Tous";

function afficherGrille() {
  while (grille.firstChild) grille.removeChild(grille.firstChild);
  const liste = PRODUITS.filter(function (p) {
    return categorieActive === "Tous" || p.categorie === categorieActive;
  });
  vide.hidden = liste.length > 0;
  liste.forEach(function (p) {
    const carte = creer("a", "carte");
    carte.href = p.page;
    const vignette = creer("div", "vignette");
    vignette.style.setProperty("--fond", p.fond);
    vignette.setAttribute("data-nom", p.nom);
    const img = creerImage(p);
    img.loading = "lazy";
    vignette.appendChild(img);
    carte.appendChild(vignette);
    carte.appendChild(creer("p", "nom", p.nom));
    carte.appendChild(creer("p", "prix", p.prix));
    grille.appendChild(carte);
  });
}

CATEGORIES.forEach(function (nom) {
  const bouton = creer("button", "", nom);
  bouton.type = "button";
  bouton.setAttribute("aria-pressed", nom === categorieActive ? "true" : "false");
  bouton.addEventListener("click", function () {
    categorieActive = nom;
    Array.from(barre.children).forEach(function (b) {
      b.setAttribute("aria-pressed", b === bouton ? "true" : "false");
    });
    afficherGrille();
  });
  barre.appendChild(bouton);
});
afficherGrille();
