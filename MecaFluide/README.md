# 🌊 Mécanique des Fluides — CNAM AEA110

Cours complet et site web de révision pour le module **Mécanique des Fluides Fondamentale (AEA110)** du CNAM.

## 📂 Contenu

```
MecaFluide/
├── index.html             ← Site web (sommaire + lecteur)
├── README.md              ← Ce fichier
└── cours/
    ├── 01-introduction.md
    ├── 02-cinematique.md
    ├── 03-equations-bilans.md
    ├── 04-bilan-energie.md
    ├── 05-bernoulli.md
    ├── 06-sustentation.md
    ├── 07-navier-stokes.md
    ├── 08-adimensionnement.md
    └── 09-fiches-revisions.md
```

## 🚀 Comment lancer le site

Le site charge dynamiquement les `.md` via `fetch()`. Les navigateurs bloquent ces requêtes en `file://`, il faut donc un mini-serveur HTTP local.

### Option 1 — Python (le plus simple)

```bash
cd MecaFluide
python3 -m http.server 8000
```

Puis ouvre [http://localhost:8000](http://localhost:8000)

### Option 2 — Node.js

```bash
cd MecaFluide
npx serve
```

### Option 3 — VS Code
Installe l'extension **Live Server**, puis clic droit sur `index.html` → *Open with Live Server*.

## ✨ Fonctionnalités du site

- 📑 **Sommaire interactif** dans la barre latérale
- 🔍 **Recherche** dans les titres de cours
- 📐 **Rendu LaTeX** des formules (KaTeX)
- 🎨 **Thème sombre** confortable pour de longues sessions
- 📱 **Responsive** (lisible sur mobile)
- 🃏 **Cartes** sur la page d'accueil pour navigation rapide

## 📚 Programme couvert

| # | Chapitre | Sujets clés |
|---|----------|-------------|
| 1 | Introduction | Définition d'un fluide, propriétés (ρ, μ, ν), milieu continu |
| 2 | Cinématique | Eulérien/Lagrangien, dérivée particulaire, lignes de courant |
| 3 | Équations de bilans | Reynolds, continuité, quantité de mouvement |
| 4 | Bilan d'énergie | Premier principe, dissipation visqueuse, pertes de charge |
| 5 | Bernoulli | Théorème classique, généralisé, Pitot, Venturi, Torricelli |
| 6 | Sustentation | Portance, traînée, profil d'aile, décrochage |
| 7 | Navier-Stokes | Construction, Poiseuille, Couette, Stokes |
| 8 | Adimensionnement | Re, Ma, Fr, Vaschy-Buckingham, similitude |
| 9 | Fiches révision | Formules clés, méthodologie, pièges classiques |

## 🎯 Pour qui ?

Étudiants du CNAM en :
- Aéronautique (AEA)
- Génie mécanique
- Énergétique
- Toute formation comportant un cours de mécanique des fluides niveau L3

## 🔧 Modifier le contenu

Édite simplement les fichiers `.md` dans `cours/` — le site les rechargera automatiquement.
Pour ajouter un nouveau chapitre :
1. Crée le `.md` dans `cours/`
2. Ajoute une entrée dans le tableau `COURSES` en haut du `<script>` dans `index.html`

## 📜 Sources et références

- Cours AEA110, CNAM
- *Mécanique des Fluides*, P.-L. Viollet
- *Fundamentals of Fluid Mechanics*, B.R. Munson
- *An Introduction to Fluid Dynamics*, G.K. Batchelor
