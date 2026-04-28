# Chapitre 5 — Théorèmes de Bernoulli

## 5.1 Hypothèses de Bernoulli "classique"

Le théorème de Bernoulli s'obtient en intégrant l'équation d'Euler le long d'une **ligne de courant**, sous les hypothèses :

1. **Fluide parfait** (μ = 0, pas de viscosité)
2. **Écoulement stationnaire** (∂/∂t = 0)
3. **Fluide incompressible** (ρ = cste)
4. **Forces volumiques dérivant d'un potentiel** (ex : pesanteur)
5. **Le long d'une ligne de courant** (ou écoulement irrotationnel partout)

> Ces 5 conditions sont à connaître **par cœur** pour les exos !

## 5.2 Forme classique du théorème

Sur une même ligne de courant :

$$\boxed{\frac{p}{\rho} + \frac{V^2}{2} + gz = \text{constante}}$$

Ou en hauteurs (en divisant par g) :

$$\boxed{\frac{p}{\rho g} + \frac{V^2}{2g} + z = H = \text{cste}}$$

- p/ρg : hauteur piézométrique
- V²/2g : hauteur cinétique
- z : hauteur géométrique
- H : **charge hydraulique totale** [m]

Entre deux points (1) et (2) sur la même ligne de courant :
$$\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2$$

## 5.3 Interprétation énergétique

Bernoulli traduit la **conservation de l'énergie mécanique** d'un fluide parfait :
- p : énergie de pression (par unité de volume)
- ρV²/2 : énergie cinétique
- ρgz : énergie potentielle

> Quand la vitesse augmente, la pression diminue (effet **Venturi**).

## 5.4 Bernoulli généralisé (avec pertes de charge et machines)

Pour un fluide réel avec pompe / turbine et pertes :

$$\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 + H_p = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + H_t + \Delta H$$

- $H_p$ : hauteur fournie par la pompe
- $H_t$ : hauteur extraite par la turbine
- $\Delta H$ : pertes de charge (régulières + singulières)

## 5.5 Bernoulli en régime instationnaire

Le long d'une ligne de courant, pour un fluide parfait incompressible :
$$\int_1^2 \frac{\partial \vec{u}}{\partial t}\cdot d\vec{l} + \frac{p_2 - p_1}{\rho} + \frac{V_2^2 - V_1^2}{2} + g(z_2 - z_1) = 0$$

## 5.6 Applications classiques

### a) Tube de Pitot (mesure de vitesse)
Mesure la vitesse d'un écoulement par différence entre pression totale et pression statique :
$$V = \sqrt{\frac{2(p_t - p_s)}{\rho}}$$

### b) Tube de Venturi (mesure de débit)
Différence de pression entre deux sections d'aire S₁ et S₂ :
$$Q = S_2\sqrt{\frac{2(p_1 - p_2)}{\rho\left(1 - (S_2/S_1)^2\right)}}$$

### c) Vidange d'un réservoir (formule de Torricelli)
Hauteur d'eau h, vitesse de sortie :
$$\boxed{V = \sqrt{2gh}}$$

(idem chute libre — analogie remarquable)

### d) Effet Venturi
Dans un rétrécissement, la vitesse augmente et la pression diminue.
Applications : carburateurs, trompes à eau, atomiseurs.

### e) Sustentation (portance d'une aile)
La courbure de l'extrados accélère l'air → pression plus faible dessus que dessous → **portance** vers le haut.

## 5.7 Méthodologie pour résoudre un exercice avec Bernoulli

1. **Vérifier les hypothèses** (fluide parfait ? stationnaire ? incompressible ?)
2. **Identifier deux points** sur la même ligne de courant : un avec données complètes (typiquement surface libre, atmosphère), l'autre avec l'inconnue
3. **Choisir un référentiel d'altitude** (souvent au point bas)
4. **Écrire Bernoulli** entre les deux points
5. **Compléter** avec la **conservation du débit** (S₁V₁ = S₂V₂) si nécessaire
6. **Résoudre** le système

### Astuces fréquentes
- Surface libre d'un grand réservoir : V ≈ 0
- Surface libre / sortie à l'air libre : p = p_atm (souvent on prend p_atm = 0 en pression relative)
- Si la conduite est horizontale : z₁ = z₂

## 5.8 Limites de Bernoulli

❌ **Pas applicable** si :
- Fluide visqueux (sans terme correctif)
- Régime turbulent fortement énergétique
- Écoulement compressible à grande vitesse
- Présence d'une pompe / turbine (sans terme correctif)
- Points sur des lignes de courant différentes (sauf irrotationnel)

## 5.9 Points clés à retenir

- **5 hypothèses** : parfait, stationnaire, incompressible, force conservative, même ligne de courant ⭐
- **p + ρV²/2 + ρgz = cste** ⭐
- **Torricelli** : V = √(2gh) ⭐
- Venturi : V augmente quand S diminue → p diminue
- Bernoulli généralisé : ajouter H_pompe, H_turbine, ΔH_pertes
- En général, bien identifier les **deux points** et leur hauteur, vitesse, pression
