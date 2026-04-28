# Chapitre 4 — Équations de bilan d'énergie

## 4.1 Premier principe de la thermodynamique

Pour un système fermé : variation d'énergie totale = chaleur reçue + travail reçu.

Énergie totale spécifique :
$$e = u + \frac{\vec{V}^2}{2} + gz$$

- **u** : énergie interne
- **V²/2** : énergie cinétique
- **gz** : énergie potentielle de pesanteur

## 4.2 Bilan d'énergie sur un volume de contrôle

### Forme intégrale
$$\frac{\partial}{\partial t}\int_V \rho e\, dV + \int_{\partial V} \rho e\,\vec{u}\cdot\vec{n}\, dS = \dot{Q} + \dot{W}$$

avec $\dot{Q}$ : flux de chaleur reçu, $\dot{W}$ : puissance des forces extérieures.

### Décomposition de la puissance des forces
$$\dot{W} = \dot{W}_{pression} + \dot{W}_{visqueux} + \dot{W}_{volumique}$$

## 4.3 Forme locale du bilan d'énergie

### Énergie totale
$$\rho\frac{De}{Dt} = -\vec{\nabla}\cdot(p\vec{u}) + \vec{\nabla}\cdot(\bar{\bar{\tau}}\cdot\vec{u}) + \rho\vec{g}\cdot\vec{u} - \vec{\nabla}\cdot\vec{q}$$

où **q** est le flux de chaleur (loi de Fourier : q = −k∇T).

### Énergie cinétique seule
En multipliant l'équation de qté de mouvement par u :
$$\rho\frac{D}{Dt}\left(\frac{V^2}{2}\right) = -\vec{u}\cdot\vec{\nabla}p + \vec{u}\cdot(\vec{\nabla}\cdot\bar{\bar{\tau}}) + \rho\vec{g}\cdot\vec{u}$$

### Énergie interne
Par soustraction :
$$\rho\frac{Du}{Dt} = -p(\vec{\nabla}\cdot\vec{u}) + \Phi - \vec{\nabla}\cdot\vec{q}$$

où **Φ** est la **dissipation visqueuse** (toujours ≥ 0) :
$$\Phi = \bar{\bar{\tau}}:\vec{\nabla}\vec{u}$$

> La dissipation visqueuse transforme **irréversiblement** l'énergie cinétique en chaleur → augmentation d'entropie, perte de charge.

## 4.4 Bilan énergétique en hydraulique (régime stationnaire)

Pour une conduite, entre une section d'entrée (1) et de sortie (2), incluant pompe (gain) et perte de charge :

$$\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 + H_{pompe} = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + H_{turbine} + \Delta H_{pertes}$$

où chaque terme est exprimé en **hauteur** [m].

### Hauteurs caractéristiques
- **p/ρg** : hauteur piézométrique (pression)
- **V²/2g** : hauteur cinétique (vitesse)
- **z** : hauteur géométrique (altitude)

## 4.5 Pertes de charge

### Pertes de charge **régulières** (linéiques)
Dues aux frottements visqueux le long d'une conduite :
$$\Delta H = \lambda \frac{L}{D} \frac{V^2}{2g}$$

- λ : coefficient de perte de charge (sans dim.)
- L : longueur, D : diamètre, V : vitesse débitante

**Détermination de λ** :
- Régime laminaire (Re < 2300) : $\lambda = \frac{64}{Re}$ (loi de Hagen-Poiseuille)
- Régime turbulent : abaque de **Moody**, ou formule de Colebrook-White :
$$\frac{1}{\sqrt{\lambda}} = -2\log\left(\frac{\varepsilon/D}{3.7} + \frac{2.51}{Re\sqrt{\lambda}}\right)$$

### Pertes de charge **singulières** (locales)
Dues aux singularités (coudes, vannes, élargissements) :
$$\Delta H_{sing} = K \frac{V^2}{2g}$$

K dépend de la singularité (tabulé).

## 4.6 Puissance d'une pompe / turbine

### Puissance hydraulique fournie
$$P = \rho g Q H_{pompe}$$
- Q : débit volumique [m³/s]
- H : hauteur manométrique [m]

### Puissance électrique consommée (rendement η)
$$P_{élec} = \frac{\rho g Q H}{\eta}$$

## 4.7 Points clés à retenir

- L'énergie totale = interne + cinétique + potentielle
- **Dissipation visqueuse Φ ≥ 0** : transformation irréversible en chaleur
- Bilan en hauteurs (m) : équation de l'**énergie hydraulique**
- Pertes **régulières** (λ·L/D·V²/2g) vs **singulières** (K·V²/2g)
- Régime laminaire : λ = 64/Re
- Puissance pompe : P = ρgQH (hydraulique)
- Toujours bien tracer un schéma avec les sections (1) et (2) !
