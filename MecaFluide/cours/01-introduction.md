# Chapitre 1 — Introduction générale à la mécanique des fluides

## 1.1 Qu'est-ce qu'un fluide ?

Un **fluide** est un milieu matériel **continu, déformable, sans rigidité** qui peut s'écouler. Il englobe les **liquides** et les **gaz**.

> **Définition mécanique** : un fluide est un corps qui ne peut s'opposer durablement à une contrainte tangentielle (de cisaillement). Il se déforme tant que la contrainte est appliquée.

### Liquide vs Gaz

| Caractéristique | Liquide | Gaz |
|-----------------|---------|-----|
| Volume propre | Oui | Non (occupe tout le volume) |
| Forme propre | Non | Non |
| Compressibilité | Faible (≈ incompressible) | Forte |
| Masse volumique | Élevée (~1000 kg/m³ pour l'eau) | Faible (~1.2 kg/m³ pour l'air) |
| Distance intermoléculaire | Faible | Grande |

## 1.2 L'hypothèse du milieu continu

À l'échelle microscopique, un fluide est composé de molécules en mouvement désordonné. La mécanique des fluides utilise une **hypothèse de continuité** : on considère le fluide comme un milieu continu où les grandeurs physiques (vitesse, pression, masse volumique...) sont des **fonctions continues de l'espace et du temps**.

> Cette hypothèse est valable tant que l'**échelle d'observation** est grande devant le libre parcours moyen des molécules (échelle dite **mésoscopique**).

Le **nombre de Knudsen** Kn = λ/L caractérise la validité de cette hypothèse :
- Kn < 0.01 : milieu continu (Navier-Stokes valable)
- Kn > 10 : régime moléculaire libre

## 1.3 Propriétés physiques des fluides

### Masse volumique ρ
$$\rho = \frac{dm}{dV} \quad [\text{kg/m}^3]$$

- Eau (20°C) : ρ ≈ 1000 kg/m³
- Air (20°C, 1 atm) : ρ ≈ 1.20 kg/m³
- Mercure : ρ ≈ 13 600 kg/m³

### Poids volumique
$$\gamma = \rho g \quad [\text{N/m}^3]$$

### Densité
$$d = \frac{\rho}{\rho_{ref}}$$
(Sans dimension. Pour les liquides, ρ_ref = ρ_eau ; pour les gaz, ρ_ref = ρ_air)

### Viscosité
La **viscosité dynamique μ** caractérise la résistance d'un fluide à l'écoulement (frottement interne).

Loi de Newton (fluide newtonien) :
$$\tau = \mu \frac{du}{dy}$$
- τ : contrainte de cisaillement [Pa]
- du/dy : taux de cisaillement [s⁻¹]
- μ : viscosité dynamique [Pa·s]

**Viscosité cinématique** :
$$\nu = \frac{\mu}{\rho} \quad [\text{m}^2/\text{s}]$$

| Fluide | μ (Pa·s) à 20°C |
|--------|-----------------|
| Air | 1.8 × 10⁻⁵ |
| Eau | 1.0 × 10⁻³ |
| Huile moteur | 0.1 à 1 |
| Miel | 10 |

### Compressibilité
Coefficient de compressibilité isotherme :
$$\chi_T = -\frac{1}{V}\left(\frac{\partial V}{\partial p}\right)_T$$

- **Liquide** : χ très faible → souvent supposé **incompressible**
- **Gaz** : χ importante → compressible (sauf si M < 0.3)

### Tension superficielle σ
À l'interface entre deux fluides, force par unité de longueur [N/m].
Donne lieu à des phénomènes comme : capillarité, gouttes sphériques, ménisque.

## 1.4 Classification des fluides

### Fluides newtoniens vs non-newtoniens
- **Newtonien** : τ = μ·(du/dy), μ constante (eau, air, huile)
- **Non-newtonien** : viscosité variable
  - **Rhéofluidifiant** (sang, peinture)
  - **Rhéoépaississant** (Maïzena+eau)
  - **Bingham** (dentifrice, boue)

### Fluides parfaits vs réels
- **Parfait** : viscosité nulle (μ = 0). Modèle idéalisé.
- **Réel** : viscosité non nulle, frottements existent.

### Compressible vs incompressible
- **Incompressible** : ρ = constante (liquides, gaz à faible vitesse)
- **Compressible** : ρ varie (gaz à haute vitesse, M > 0.3)

## 1.5 Statique des fluides — Rappels

### Équation fondamentale de l'hydrostatique
Dans un fluide au repos soumis à la pesanteur :
$$\frac{dp}{dz} = -\rho g$$

Pour un fluide incompressible :
$$p_2 - p_1 = -\rho g (z_2 - z_1)$$

### Théorème de Pascal
La pression en un point d'un fluide au repos est la même dans toutes les directions.

### Théorème d'Archimède
Tout corps plongé dans un fluide subit une poussée verticale, dirigée du bas vers le haut, égale au poids du fluide déplacé :
$$F_A = \rho_{fluide} \cdot V_{déplacé} \cdot g$$

## 1.6 Domaines d'application

- **Aérodynamique** : avions, voitures, éoliennes
- **Hydraulique** : barrages, canalisations, pompes
- **Météorologie / Océanographie** : circulation atmosphérique et océanique
- **Biomécanique** : circulation sanguine, respiration
- **Énergétique** : turbines, moteurs, échangeurs

## 1.7 Points clés à retenir

- Un fluide se déforme sous une contrainte de cisaillement aussi faible soit-elle
- Hypothèse du milieu continu → champs continus de ρ, p, v
- Distinguer μ (dynamique) et ν (cinématique)
- Connaître les ordres de grandeur de l'eau et de l'air
- Liquides ≈ incompressibles ; gaz compressibles à grande vitesse (M > 0.3)
- Loi de Newton : τ = μ·du/dy (fluides newtoniens)
