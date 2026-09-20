// MODIFIE TES PRODUITS ICI
// nom, prix, categorie (Chaussures, Bijoux, Tenues ou Divers)
// image : le chemin de la photo dans ton repository
// page : la page du produit vers laquelle le clic redirige
// vedette : true = la photo défile dans la bannière du haut
// fond : couleur affichée tant que la photo n'est pas ajoutée
const PRODUITS = [
  { nom: "Bijoux igbo", prix: "25 000 FCFA", categorie: "Bijoux",
    image: akan1.jpeg"", page: "produits/bijoux-igbo.html",
    vedette: true, fond: "#7C2A24" },
  { nom: "Abodjé noir Or", prix: "15 000 FCFA", categorie: "Chaussures",
    image: "images/abodje-noir-or.jpg", page: "produits/abodje-noir-or.html",
    vedette: true, fond: "#3B2A1E" },
  { nom: "Parure corail", prix: "XX 000 FCFA", categorie: "Bijoux",
    image: "images/parure-corail.jpg", page: "produits/parure-corail.html",
    vedette: true, fond: "#5A1F1B" },
  { nom: "Chaussures noires", prix: "XX 000 FCFA", categorie: "Chaussures",
    image: "images/chaussures-noires.jpg", page: "produits/chaussures-noires.html",
    vedette: false, fond: "#2A2622" }
];

const CATEGORIES = ["Tous", "Chaussures", "Bijoux", "Tenues", "Divers"];
