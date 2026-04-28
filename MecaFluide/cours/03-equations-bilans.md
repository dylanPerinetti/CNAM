# Chapitre 3 — Équations de bilans (masse et quantité de mouvement)

## 3.1 Théorème de transport de Reynolds

Pour relier dérivée d'une intégrale sur un volume matériel D(t) (qui suit le fluide) à une intégrale sur un volume de contrôle V (fixe) :

$$\frac{d}{dt}\int_{D(t)} f\, dV = \int_V \frac{\partial f}{\partial t}\, dV + \int_{\partial V} f\,\vec{u}\cdot\vec{n}\, dS$$

C'est l'**outil fondamental** pour passer des principes de conservation (formulés sur un système matériel) aux équations sur un volume de contrôle (analyse industrielle).

## 3.2 Bilan de masse (équation de continuité)

### Principe
La masse d'un système matériel se conserve :
$$\frac{d}{dt}\int_{D(t)} \rho\, dV = 0$$

### Forme intégrale
$$\boxed{\int_V \frac{\partial \rho}{\partial t}\, dV + \int_{\partial V} \rho\,\vec{u}\cdot\vec{n}\, dS = 0}$$

### Forme locale (différentielle)
$$\boxed{\frac{\partial \rho}{\partial t} + \vec{\nabla}\cdot(\rho\vec{u}) = 0}$$

### Cas particuliers

**Écoulement stationnaire** : ∂ρ/∂t = 0
$$\vec{\nabla}\cdot(\rho\vec{u}) = 0$$

**Écoulement incompressible** : ρ = cste
$$\boxed{\vec{\nabla}\cdot\vec{u} = 0}$$

### Application : conservation du débit en conduite
En régime stationnaire incompressible, sur un tube de courant :
$$\rho_1 S_1 V_1 = \rho_2 S_2 V_2$$
Si ρ = cste : $S_1 V_1 = S_2 V_2$ → **plus la section diminue, plus la vitesse augmente**.

## 3.3 Bilan de quantité de mouvement

### Principe fondamental de la dynamique
$$\frac{d}{dt}\int_{D(t)} \rho\vec{u}\, dV = \sum \vec{F}_{ext}$$

Les forces extérieures = forces volumiques (gravité) + forces surfaciques (pression, viscosité).

### Forme intégrale (volume de contrôle)
$$\frac{\partial}{\partial t}\int_V \rho\vec{u}\, dV + \int_{\partial V} \rho\vec{u}(\vec{u}\cdot\vec{n})\, dS = \int_V \rho\vec{g}\, dV + \int_{\partial V} \bar{\bar{\sigma}}\cdot\vec{n}\, dS$$

où σ̄ est le **tenseur des contraintes**.

### Tenseur des contraintes
$$\bar{\bar{\sigma}} = -p\,\bar{\bar{I}} + \bar{\bar{\tau}}$$
- **−p·I** : partie isotrope (pression)
- **τ̄** : tenseur des contraintes visqueuses

Pour un fluide newtonien incompressible :
$$\tau_{ij} = 2\mu D_{ij} = \mu\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right)$$

### Forme locale
$$\boxed{\rho\frac{D\vec{u}}{Dt} = \rho\vec{g} - \vec{\nabla}p + \vec{\nabla}\cdot\bar{\bar{\tau}}}$$

C'est l'équation **fondamentale** de la mécanique des fluides — base de Navier-Stokes.

## 3.4 Application : effort sur une paroi

Pour calculer l'effort exercé par un écoulement sur un objet (ex. : aubage de turbine, déviation d'un jet), on applique le bilan de qté de mouvement sur un **volume de contrôle bien choisi** englobant l'objet.

$$\vec{F}_{fluide \to objet} = -\int_{S_{entrée}} \rho\vec{u}(\vec{u}\cdot\vec{n})dS - \int_{S_{sortie}} \rho\vec{u}(\vec{u}\cdot\vec{n})dS - \int_S p\vec{n}\, dS$$

### Méthode pratique
1. Choisir un volume de contrôle (souvent englobant l'objet)
2. Identifier les surfaces d'entrée/sortie et les surfaces solides
3. Faire le bilan sur chaque surface (flux entrant - flux sortant)
4. Tenir compte des forces de pression et de la pesanteur
5. Projeter sur les axes voulus

## 3.5 Exemple type : jet déviant une plaque

Un jet de section S, vitesse V, frappe une plaque verticale et est dévié à 90°.
Force horizontale sur la plaque :
$$F_x = \rho S V^2$$

## 3.6 Points clés à retenir

- **Théorème de transport de Reynolds** : pont entre approche système et volume de contrôle
- **Continuité (locale)** : ∂ρ/∂t + ∇·(ρu) = 0 ⭐
- **Incompressible** : ∇·u = 0 ⭐
- **Bilan qté de mouvement (local)** : ρ·Du/Dt = ρg − ∇p + ∇·τ ⭐
- En conduite incompressible : SV = cste
- Pour les forces sur paroi : choisir un bon volume de contrôle, faire le bilan flux + forces
