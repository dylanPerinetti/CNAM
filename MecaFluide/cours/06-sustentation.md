# Chapitre 6 — Principes de sustentation (portance et traînée)

## 6.1 Forces aérodynamiques

Lorsqu'un solide est en mouvement relatif par rapport à un fluide, il subit une force aérodynamique **F⃗** qui se décompose en :

- **Portance L** (Lift) : composante **perpendiculaire** à la vitesse incidente
- **Traînée D** (Drag) : composante **parallèle** à la vitesse incidente (opposée au mouvement)

```
              ↑ L (portance)
              │
     V_∞ ────►├──────► écoulement
              │
              └──→ D (traînée)
```

## 6.2 Coefficients aérodynamiques

Les forces sont adimensionnées en **coefficients** sans dimension :

$$C_L = \frac{L}{\frac{1}{2}\rho V_\infty^2 S} \quad ; \quad C_D = \frac{D}{\frac{1}{2}\rho V_\infty^2 S}$$

- ρ : masse volumique du fluide
- V_∞ : vitesse à l'infini amont
- S : surface de référence (souvent l'aire alaire pour une aile)

> Le terme **½ρV²** est la **pression dynamique** — fondamentale en aérodynamique.

## 6.3 Origine de la portance

### Approche par Bernoulli
Sur une aile à incidence positive, l'air est **accéléré** sur l'extrados (dessus) et **ralenti** sur l'intrados (dessous). Par Bernoulli, p_extrados < p_intrados → **résultante de pression vers le haut** = portance.

### Approche par circulation (théorème de Kutta-Joukowski)
Pour un écoulement 2D autour d'un profil :
$$L' = \rho V_\infty \Gamma$$

où **Γ** est la **circulation** autour du profil :
$$\Gamma = \oint \vec{u}\cdot d\vec{l}$$

L' est la portance par unité d'envergure [N/m].

### Approche par déflexion (3e loi de Newton)
L'aile dévie l'air vers le bas → par réaction, l'air pousse l'aile vers le haut.

## 6.4 Profil d'aile (aérofoil)

```
                 corde
        ┌──────────────────┐
        │       ╭──────╮   │
   bord │      ╱        ╲  │ bord
   d'attaque ╱           ╲ │ de fuite
        │  ╲             ╱│
        │   ╲___________╱  │
```

### Vocabulaire
- **Bord d'attaque** : avant de l'aile
- **Bord de fuite** : arrière
- **Corde c** : ligne droite bord d'attaque → bord de fuite
- **Extrados** : surface supérieure
- **Intrados** : surface inférieure
- **Cambrure** : courbure moyenne du profil
- **Épaisseur relative** : épaisseur max / corde
- **Angle d'attaque (incidence) α** : angle entre la corde et V_∞

## 6.5 Polaire d'une aile

La courbe **C_L = f(α)** :
- Quasi-linéaire à petits α : pente ≈ 2π (théorie idéale)
- Maximum à l'**angle de décrochage** (stall) : ~15-20°
- Au-delà : chute brutale de portance → **décrochage**

La courbe **C_L = f(C_D)** est appelée **polaire**.

### Finesse
Rapport L/D = C_L/C_D, qui mesure l'**efficacité aérodynamique**.
Plus la finesse est élevée, plus le planeur va loin.

## 6.6 Différentes traînées

### Traînée de frottement (visqueuse)
Due au frottement dans la couche limite. Dépend du régime (laminaire/turbulent).

### Traînée de pression (de forme)
Due à la différence de pression entre l'avant et l'arrière, surtout si le sillage est large (décollement).

### Traînée induite
Liée à la production de portance (vortex de bout d'aile en 3D) :
$$C_{D,i} = \frac{C_L^2}{\pi e \lambda}$$
- λ : allongement (envergure²/surface)
- e : facteur d'efficacité (≤ 1)

> Allonger l'aile diminue la traînée induite — d'où les ailes longues des planeurs et avions long-courriers.

### Traînée d'onde (compressibilité)
Apparaît au voisinage de M = 1 (ondes de choc).

## 6.7 Couche limite

Près d'une paroi, la viscosité ralentit l'écoulement → **couche limite** (Prandtl, 1904).

Caractéristiques :
- Épaisseur δ ≈ 99% de V_∞
- Régime laminaire ou turbulent (transition à Re_x ≈ 5×10⁵ pour plaque plane)
- Peut **décoller** sous gradient de pression adverse → augmentation forte de la traînée

## 6.8 Le décrochage

À grand angle d'attaque, la couche limite décolle de l'extrados → perte brutale de portance → **décrochage**.

Conséquences :
- Chute violente de C_L
- Augmentation forte de C_D
- Perte de contrôle de l'avion (à éviter !)

Sécurité : un avion vole avec une marge importante par rapport à α_décrochage.

## 6.9 Points clés à retenir

- Décomposition : **portance L** ⊥ V_∞ ; **traînée D** ∥ V_∞
- C_L = L / (½ρV²S) ; idem C_D
- **Pression dynamique** : ½ρV² (à connaître ⭐)
- Bernoulli + courbure → portance
- Kutta-Joukowski : L' = ρV_∞·Γ
- Décrochage à α ≈ 15-20°
- Finesse = L/D = C_L/C_D
- Traînée induite ∝ C_L²/λ → allonger l'aile pour planer loin
- Couche limite et décollement déterminent la traînée
