# Chapitre 8 — Adimensionnement et nombres caractéristiques

## 8.1 Pourquoi adimensionner ?

L'**adimensionnement** consiste à exprimer les équations sous une forme sans dimension, en utilisant des grandeurs caractéristiques (L, V, ρ, μ, ...).

**Avantages :**
1. **Faire apparaître les nombres sans dimension** qui caractérisent l'écoulement (Re, Ma, Fr...)
2. **Identifier les termes négligeables** (asymptotique)
3. **Réaliser des essais en similitude** (maquette → grandeur réelle)
4. **Comparer des écoulements** apparemment différents
5. **Réduire le nombre de paramètres** d'une étude paramétrique

## 8.2 Adimensionnement des équations de Navier-Stokes

### Choix des grandeurs caractéristiques
- Longueur L (géométrie)
- Vitesse V (à l'infini, ou imposée)
- Temps T (souvent T = L/V)
- Pression P (souvent P = ρV²)

### Variables sans dimension
$$x^* = \frac{x}{L},\quad u^* = \frac{u}{V},\quad t^* = \frac{tV}{L},\quad p^* = \frac{p}{\rho V^2}$$

### NS adimensionnée
$$St\,\frac{\partial \vec{u}^*}{\partial t^*} + (\vec{u}^*\cdot\vec{\nabla}^*)\vec{u}^* = -\vec{\nabla}^* p^* + \frac{1}{Re}\Delta^*\vec{u}^* + \frac{1}{Fr^2}\vec{g}^*$$

Apparition naturelle des nombres sans dimension !

## 8.3 Les principaux nombres sans dimension

### Nombre de Reynolds Re ⭐
$$\boxed{Re = \frac{\rho V L}{\mu} = \frac{V L}{\nu}}$$

Rapport **forces d'inertie / forces visqueuses**.

| Re | Régime |
|----|--------|
| Re ≪ 1 | Écoulement de Stokes (visqueux pur) |
| 1 < Re < 2000 | Laminaire |
| 2000 < Re < 4000 | Transition |
| Re > 4000 | Turbulent |

> **Critique pour conduite circulaire** : Re_c ≈ 2300

### Nombre de Mach Ma ⭐
$$\boxed{Ma = \frac{V}{c}}$$
où c est la **vitesse du son** dans le fluide.

| Ma | Régime |
|----|--------|
| Ma < 0.3 | Incompressible (gaz) |
| 0.3 < Ma < 0.8 | Subsonique compressible |
| 0.8 < Ma < 1.2 | Transsonique |
| 1.2 < Ma < 5 | Supersonique |
| Ma > 5 | Hypersonique |

### Nombre de Froude Fr
$$Fr = \frac{V}{\sqrt{gL}}$$

Rapport **forces d'inertie / forces de pesanteur**. Important pour les écoulements à **surface libre** (rivières, navires).

- Fr < 1 : régime **fluvial** (subcritique)
- Fr > 1 : régime **torrentiel** (supercritique)

### Nombre de Strouhal St
$$St = \frac{fL}{V}$$

Caractérise les phénomènes **instationnaires périodiques** (lâchers tourbillonnaires de Karman).

### Nombre de Weber We
$$We = \frac{\rho V^2 L}{\sigma}$$

Inertie / tension superficielle. Important pour les gouttes, atomisation.

### Nombre d'Euler Eu
$$Eu = \frac{p}{\rho V^2}$$

Pression / inertie.

### Nombre de Prandtl Pr
$$Pr = \frac{\nu}{\alpha} = \frac{\mu c_p}{k}$$

Diffusion de qté de mouvement / diffusion thermique.
- Air : Pr ≈ 0.7
- Eau : Pr ≈ 7
- Huiles : Pr ≈ 100

### Nombre de Péclet Pe = Re·Pr
Convection thermique / diffusion thermique.

### Nombre de Nusselt Nu
$$Nu = \frac{hL}{k}$$
Transfert convectif / conductif (sans dimension).

## 8.4 Théorème de Vaschy-Buckingham (théorème π)

Si une grandeur physique dépend de **n** variables impliquant **k** unités fondamentales, on peut former **(n − k)** nombres sans dimension indépendants.

### Méthode
1. Lister toutes les variables (y compris l'inconnue)
2. Identifier leurs dimensions fondamentales (M, L, T, Θ)
3. Choisir k variables de référence (dimensionnellement indépendantes)
4. Former les n−k groupes π = produit de puissances → sans dimension
5. La relation cherchée s'écrit : f(π₁, π₂, ..., π_{n-k}) = 0

### Exemple : traînée d'une sphère
F = f(ρ, V, D, μ) → 5 variables, 3 unités (M, L, T) → 2 groupes π :
- π₁ = F / (ρV²D²) = C_D / 2
- π₂ = ρVD/μ = Re

→ C_D = f(Re) — la traînée adimensionnée ne dépend que du Reynolds.

## 8.5 Similitude

Deux écoulements sont **semblables** si :

1. **Similitude géométrique** : maquette et réel à l'échelle (rapports de longueurs égaux)
2. **Similitude cinématique** : champs de vitesse semblables (rapports de vitesses)
3. **Similitude dynamique** : tous les nombres sans dimension importants sont égaux

> En pratique, on impose l'**égalité des nombres dominants** (Re, Ma, Fr selon le problème).

### Difficultés
- Souvent impossible de respecter **tous** les nombres simultanément
- En aérodynamique subsonique : Re uniquement (Ma faible)
- En hydraulique à surface libre : Fr (Re est trop grand pour être respecté à l'échelle)

## 8.6 Méthode des approximations

L'adimensionnement permet de **simplifier** les équations en négligeant les termes petits :

### Re très grand → fluide parfait (Euler)
Le terme visqueux 1/Re·Δu* devient négligeable → équations d'Euler hors couches limites.

### Re très petit → écoulement de Stokes
Le terme inertiel (u·∇)u devient négligeable.

### Ma très petit → incompressible
La masse volumique varie peu.

### Fr très grand → pesanteur négligeable
(Cas typique des écoulements internes en conduites horizontales)

## 8.7 Points clés à retenir

- **Adimensionner** = isoler les paramètres clés et permettre la similitude
- **Reynolds Re = ρVL/μ** : inertie/viscosité ⭐
- **Mach Ma = V/c** : compressibilité ⭐
- **Froude Fr = V/√(gL)** : surface libre
- **Vaschy-Buckingham** : n variables, k unités → n−k groupes π
- **Similitude** : géométrique + cinématique + dynamique (Re, Ma, Fr...)
- **Re très grand** → Euler (parfait) ; **Re très petit** → Stokes
