# 🌊 Mécanique des Fluides — Cours et exercices

Site de cours complet et d'exercices corrigés en **Mécanique des Fluides Fondamentale**.

> **Rédigé par Dylan Perinetti**
> D'après le cours de M. Alfarez (CNAM)

## 📂 Contenu

```
MecaFluide/
├── index.html             ← Site web (sommaire interactif + lecteur)
├── README.md              ← Ce fichier
├── cours/
│   ├── 01-introduction.md
│   ├── 02-cinematique.md
│   ├── 03-equations-bilans.md
│   ├── 04-bilan-energie.md
│   ├── 05-bernoulli.md
│   ├── 06-sustentation.md
│   ├── 07-navier-stokes.md
│   ├── 08-adimensionnement.md
│   └── 09-fiches-revisions.md
└── exercices/
    ├── 01-cinematique-exos.md
    ├── 02-bilans-exos.md
    ├── 03-bernoulli-exos.md
    ├── 04-navier-stokes-exos.md
    └── 05-adimensionnement-exos.md
```

## 🚀 Comment lancer le site

Le site charge dynamiquement les fichiers `.md` via `fetch()`. Les navigateurs bloquent ces requêtes en `file://`, il faut donc lancer un mini-serveur HTTP local.

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

- 📑 **Sommaire interactif** dans la barre latérale (cours + exercices)
- 🔍 **Recherche** dans les titres
- 📐 **Rendu LaTeX** robuste des formules mathématiques (KaTeX, sans interférence avec le markdown)
- 🎨 **Thème sombre** confortable pour de longues sessions
- 📱 **Responsive** (mobile, tablette, desktop) avec menu hamburger
- ✏️ **Exercices corrigés** avec explications pas à pas
- ℹ️ **Page À propos** avec sources et auteur

## 📚 Programme couvert

### Cours
1. **Introduction** — propriétés des fluides, milieu continu
2. **Cinématique** — Eulérien/Lagrangien, dérivée particulaire
3. **Équations de bilans** — Reynolds, continuité, qté de mouvement
4. **Bilan d'énergie** — premier principe, dissipation, pertes de charge
5. **Bernoulli** — théorèmes classique et généralisé
6. **Sustentation** — portance, traînée, profils d'aile
7. **Navier-Stokes** — formulation, Poiseuille, Couette
8. **Adimensionnement** — Re, Ma, Fr, Vaschy-Buckingham
9. **Fiches de révision** — formules, méthodologie, pièges

### Exercices corrigés
- E1 — Cinématique
- E2 — Bilans (force sur paroi, aubage)
- E3 — Bernoulli (Torricelli, Pitot, Venturi, pompe)
- E4 — Navier-Stokes (Poiseuille, Couette, Stokes)
- E5 — Adimensionnement (Vaschy-Buckingham, similitude)

## 🔧 Modifier le contenu

Édite simplement les fichiers `.md` dans `cours/` ou `exercices/` — le site les rechargera automatiquement.

Pour ajouter un nouveau chapitre :
1. Crée le fichier `.md` dans le bon dossier
2. Ajoute une entrée dans le tableau `COURSES` ou `EXOS` en haut du `<script>` dans `index.html`

## 📜 Sources et références

- Cours de **M. Alfarez** — Mécanique des fluides fondamentale, CNAM
- *Mécanique des Fluides*, P.-L. Viollet
- *Fundamentals of Fluid Mechanics*, B.R. Munson
- *An Introduction to Fluid Dynamics*, G.K. Batchelor

## 📝 Licence et avertissement

Contenu pédagogique destiné à un usage personnel d'étude. Ne se substitue pas au cours officiel.
