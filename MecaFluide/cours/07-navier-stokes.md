# Chapitre 7 — Formulation du modèle de Navier-Stokes

## 7.1 Construction des équations de Navier-Stokes

Les équations de Navier-Stokes (NS) régissent les écoulements **visqueux** d'un fluide newtonien. On les obtient en combinant :

1. **Conservation de la masse** (continuité)
2. **Conservation de la quantité de mouvement** (PFD)
3. **Loi de comportement** (Newton — fluide newtonien)

## 7.2 Loi de comportement d'un fluide newtonien

Le tenseur des contraintes :
$$\sigma_{ij} = -p\,\delta_{ij} + \tau_{ij}$$

Avec, pour un fluide newtonien :
$$\tau_{ij} = 2\mu D_{ij} + \lambda(\nabla\cdot\vec{u})\delta_{ij}$$

- **μ** : viscosité dynamique (cisaillement)
- **λ** : second coefficient de viscosité (compression)

Hypothèse de **Stokes** (en pratique) : λ = −2μ/3, donc :
$$\tau_{ij} = 2\mu D_{ij} - \frac{2}{3}\mu(\nabla\cdot\vec{u})\delta_{ij}$$

Pour un écoulement **incompressible** (∇·u = 0), il reste :
$$\tau_{ij} = 2\mu D_{ij} = \mu\left(\frac{\partial u_i}{\partial x_j} + \frac{\partial u_j}{\partial x_i}\right)$$

## 7.3 Équations de Navier-Stokes incompressible

### Forme vectorielle
$$\boxed{\rho\frac{D\vec{u}}{Dt} = -\vec{\nabla}p + \mu\Delta\vec{u} + \rho\vec{g}}$$

ou en développant la dérivée particulaire :

$$\boxed{\rho\left[\frac{\partial \vec{u}}{\partial t} + (\vec{u}\cdot\vec{\nabla})\vec{u}\right] = -\vec{\nabla}p + \mu\Delta\vec{u} + \rho\vec{g}}$$

associée à la **continuité** :
$$\vec{\nabla}\cdot\vec{u} = 0$$

### Forme indicielle (3 équations, en cartésien)
$$\rho\left(\frac{\partial u_i}{\partial t} + u_j\frac{\partial u_i}{\partial x_j}\right) = -\frac{\partial p}{\partial x_i} + \mu\frac{\partial^2 u_i}{\partial x_j \partial x_j} + \rho g_i$$

### Système complet
- 4 inconnues : (u, v, w, p)
- 4 équations : 3 NS + continuité

## 7.4 Équations d'Euler (fluide parfait)

Si μ = 0 (fluide non visqueux), les NS se réduisent aux **équations d'Euler** :
$$\rho\frac{D\vec{u}}{Dt} = -\vec{\nabla}p + \rho\vec{g}$$

Bernoulli est l'intégrale d'Euler le long d'une ligne de courant.

## 7.5 Conditions aux limites

### Condition d'adhérence (no-slip)
Sur une paroi solide imperméable :
$$\vec{u}_{fluide} = \vec{u}_{paroi}$$

Si la paroi est fixe : **u = 0**.

### Condition de glissement (Euler)
Pour un fluide parfait, on impose seulement :
$$\vec{u}\cdot\vec{n} = 0 \text{ (imperméabilité)}$$

### Surface libre (interface)
- Pression : p = p_atm
- Cinématique : la surface suit le fluide (∂F/∂t + u·∇F = 0)

### Conditions à l'infini
$$\vec{u} \rightarrow \vec{u}_\infty \quad ; \quad p \rightarrow p_\infty$$

## 7.6 Solutions analytiques classiques

### Écoulement de Couette plan
Entre deux plaques, l'une fixe, l'autre se déplaçant à V :
$$u(y) = V\frac{y}{h}$$
Profil **linéaire** ; cisaillement constant τ = μV/h.

### Écoulement de Poiseuille plan
Entre deux plaques fixes avec gradient de pression :
$$u(y) = -\frac{1}{2\mu}\frac{dp}{dx}\, y(h-y)$$
Profil **parabolique**.

### Écoulement de Poiseuille en conduite cylindrique
Dans un tube de rayon R :
$$u(r) = -\frac{1}{4\mu}\frac{dp}{dx}(R^2 - r^2)$$

Vitesse maximale au centre : $u_{max} = -\frac{R^2}{4\mu}\frac{dp}{dx}$
Vitesse moyenne : $\bar{u} = u_{max}/2$

Débit : $Q = \frac{\pi R^4}{8\mu}\left(-\frac{dp}{dx}\right)$ (**loi de Hagen-Poiseuille**) ⭐

## 7.7 Écoulement de Stokes (Re ≪ 1)

Pour un écoulement très visqueux (rampant), le terme inertiel devient négligeable :
$$0 = -\vec{\nabla}p + \mu\Delta\vec{u}$$

Applications : sédimentation, microfluidique, lubrification.

**Loi de Stokes** : traînée d'une sphère lente :
$$F = 6\pi\mu R V$$

## 7.8 Difficulté des équations de Navier-Stokes

Les équations NS sont **non linéaires** (à cause de (u·∇)u). Conséquences :
- Pas de solution analytique en général
- Phénomènes complexes : turbulence, bifurcations, chaos
- L'**existence et unicité des solutions** en 3D est l'un des **problèmes du millénaire** (Clay Math)

## 7.9 Points clés à retenir

- **NS incompressible** : ρ·Du/Dt = −∇p + μΔu + ρg ⭐
- + continuité : ∇·u = 0
- Conditions aux limites : **adhérence** sur paroi visqueuse (u = u_paroi)
- Euler = NS sans viscosité
- Profil de Poiseuille en conduite : **parabolique**, Q = πR⁴Δp/(8μL) ⭐
- Stokes (Re << 1) : F = 6πμRV (sphère)
- Non-linéaire → turbulence, problème ouvert
