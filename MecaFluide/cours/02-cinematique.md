# Chapitre 2 — Cinématique des fluides

## 2.1 Description du mouvement

La cinématique étudie le **mouvement des fluides indépendamment des causes** qui le produisent (forces, pressions). Deux approches existent :

### Description Lagrangienne
On suit chaque particule fluide individuellement au cours du temps.
Position : **X**(X₀, t) où X₀ est la position initiale.
Vitesse : V = ∂X/∂t

> **Analogie** : suivre une bouée flottante sur une rivière.

### Description Eulérienne
On observe le champ de vitesse en un **point fixe de l'espace** au cours du temps.
Champ de vitesse : **u**(x, y, z, t)

> **Analogie** : observer le débit d'eau à un endroit fixe d'une rivière.

C'est cette **description eulérienne** qui est la plus utilisée en mécanique des fluides.

## 2.2 La dérivée particulaire (matérielle)

La dérivée d'une grandeur f attachée à une particule fluide en description eulérienne :

$$\boxed{\frac{Df}{Dt} = \frac{\partial f}{\partial t} + (\vec{u} \cdot \vec{\nabla}) f}$$

- **∂f/∂t** : terme **instationnaire** (variation locale au point fixe)
- **(u·∇)f** : terme **convectif** (variation due au déplacement)

### Pour un champ scalaire f(x,t)
$$\frac{Df}{Dt} = \frac{\partial f}{\partial t} + u\frac{\partial f}{\partial x} + v\frac{\partial f}{\partial y} + w\frac{\partial f}{\partial z}$$

### Accélération d'une particule
$$\vec{a} = \frac{D\vec{u}}{Dt} = \frac{\partial \vec{u}}{\partial t} + (\vec{u}\cdot\vec{\nabla})\vec{u}$$

## 2.3 Lignes caractéristiques d'un écoulement

### Trajectoire
Courbe décrite par une particule fluide donnée au cours du temps.
$$\frac{d\vec{X}}{dt} = \vec{u}(\vec{X}, t)$$

### Ligne de courant
Courbe tangente en chaque point au vecteur vitesse à un instant t fixé.
$$\frac{dx}{u} = \frac{dy}{v} = \frac{dz}{w}$$

### Ligne d'émission
Ensemble des positions à l'instant t des particules passées par un point fixe avant t.

> **Cas particulier** : en **régime permanent (stationnaire)**, trajectoires, lignes de courant et lignes d'émission **coïncident**.

### Tube de courant
Surface formée par toutes les lignes de courant s'appuyant sur une courbe fermée.

## 2.4 Régimes d'écoulement

### Stationnaire vs instationnaire
- **Stationnaire (permanent)** : ∂/∂t = 0 (les grandeurs ne dépendent que de l'espace)
- **Instationnaire** : les grandeurs dépendent aussi du temps

### Uniforme vs non-uniforme
- **Uniforme** : champ de vitesse constant dans l'espace à un instant donné
- **Non-uniforme** : varie spatialement

### Laminaire vs turbulent
- **Laminaire** : couches fluides parallèles, mouvement ordonné. Faible Re (< 2000 pour conduites)
- **Turbulent** : tourbillons, mouvement chaotique. Re > 4000

## 2.5 Décomposition du mouvement local

Le gradient de vitesse ∇**u** se décompose en :

$$\vec{\nabla}\vec{u} = \underbrace{\bar{\bar{D}}}_{\text{taux de déformation}} + \underbrace{\bar{\bar{\Omega}}}_{\text{taux de rotation}}$$

### Tenseur des taux de déformation (symétrique)
$$D_{ij} = \frac{1}{2}\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right)$$

### Tenseur des taux de rotation (antisymétrique)
$$\Omega_{ij} = \frac{1}{2}\left(\frac{\partial u_i}{\partial x_j} - \frac{\partial u_j}{\partial x_i}\right)$$

### Vecteur tourbillon (vorticité)
$$\vec{\omega} = \vec{\nabla} \times \vec{u} = \text{rot}\,\vec{u}$$

- **Écoulement irrotationnel** : ω = 0 (potentiel)
- **Écoulement rotationnel** : ω ≠ 0

## 2.6 Divergence et conservation de la masse

La **divergence** du champ de vitesse :
$$\vec{\nabla}\cdot\vec{u} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z}$$

représente le **taux de dilatation volumique** local.

### Écoulement incompressible
$$\boxed{\vec{\nabla}\cdot\vec{u} = 0}$$

C'est la **condition d'incompressibilité** — fondamentale, à connaître par cœur !

## 2.7 Débit

### Débit volumique
$$Q_v = \iint_S \vec{u} \cdot \vec{n}\, dS \quad [\text{m}^3/\text{s}]$$

### Débit massique
$$Q_m = \iint_S \rho \vec{u} \cdot \vec{n}\, dS \quad [\text{kg/s}]$$

### Vitesse débitante (moyenne)
$$\bar{u} = \frac{Q_v}{S}$$

## 2.8 Points clés à retenir

- Eulérien : observation en point fixe (le plus utilisé)
- Lagrangien : suivi de particule
- Dérivée particulaire : **D/Dt = ∂/∂t + u·∇** ⭐
- Ligne de courant : tangente à u à t fixé
- Régime stationnaire : trajectoire = ligne de courant
- Incompressibilité : **∇·u = 0** ⭐
- Vorticité : ω = rot u
- Re < 2000 : laminaire ; Re > 4000 : turbulent
