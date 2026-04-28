# Exercices corrigés — Navier-Stokes

## 📝 Exercice 1 — Écoulement de Poiseuille en conduite cylindrique

### Énoncé
On considère un écoulement permanent, laminaire, incompressible d'un fluide newtonien dans une conduite cylindrique de rayon $R$, soumis à un gradient de pression $-dp/dx > 0$ constant.

1. Établir le profil de vitesse $u(r)$.
2. Calculer la vitesse maximale, la vitesse moyenne et le débit.

### Correction

**1. Profil de vitesse**

En coordonnées cylindriques, en régime établi (∂/∂t = 0, $u_r = u_\theta = 0$, $u = u(r)$), Navier-Stokes selon $\vec{e_x}$ se réduit à :
$$0 = -\frac{dp}{dx} + \mu \frac{1}{r}\frac{d}{dr}\left(r\frac{du}{dr}\right)$$

Soit $G = -dp/dx > 0$. On intègre :
$$\frac{1}{r}\frac{d}{dr}\left(r\frac{du}{dr}\right) = -\frac{G}{\mu}$$

Première intégration :
$$r\frac{du}{dr} = -\frac{G r^2}{2\mu} + C_1$$

Régularité en $r = 0$ → $C_1 = 0$.

Seconde intégration :
$$u(r) = -\frac{G r^2}{4\mu} + C_2$$

Adhérence en $r = R$ : $u(R) = 0$ → $C_2 = GR^2/(4\mu)$.

**Résultat** :
$$\boxed{u(r) = \frac{G}{4\mu}(R^2 - r^2) = \frac{1}{4\mu}\left(-\frac{dp}{dx}\right)(R^2 - r^2)}$$

C'est un **profil parabolique**.

**2. Caractéristiques**

- **Vitesse maximale** (en $r = 0$) :
$$u_{max} = \frac{GR^2}{4\mu}$$

- **Débit** :
$$Q = \int_0^R u(r)\,2\pi r\,dr = \frac{2\pi G}{4\mu}\int_0^R (R^2 r - r^3)\,dr = \frac{\pi G R^4}{8\mu}$$

$$\boxed{Q = \frac{\pi R^4}{8\mu}\left(-\frac{dp}{dx}\right)}$$

C'est la **loi de Hagen-Poiseuille** ⭐

- **Vitesse moyenne** : $\bar{u} = Q/(\pi R^2) = GR^2/(8\mu) = u_{max}/2$

> **💡 À retenir** : la vitesse moyenne d'un Poiseuille = **moitié de la vitesse max**. Pour un Couette, c'est la moitié de la vitesse de la plaque mobile.

---

## 📝 Exercice 2 — Écoulement de Couette plan

### Énoncé
Deux plaques planes infinies sont distantes de $h$. La plaque inférieure ($y = 0$) est fixe, la plaque supérieure ($y = h$) se déplace à vitesse $V_0$ constante. Pas de gradient de pression.

Établir le profil de vitesse.

### Correction

Hypothèses :
- $u = u(y)$, $v = w = 0$
- $\partial p/\partial x = 0$
- Régime établi

NS selon $\vec{e_x}$ :
$$0 = \mu \frac{d^2 u}{dy^2}$$

D'où $u(y) = ay + b$.

CL : $u(0) = 0 \Rightarrow b = 0$ et $u(h) = V_0 \Rightarrow a = V_0/h$.

**Résultat** :
$$\boxed{u(y) = \frac{V_0}{h}\,y}$$

Profil **linéaire**. Cisaillement constant :
$$\tau = \mu\frac{du}{dy} = \frac{\mu V_0}{h}$$

> **💡 Application** : c'est le modèle de la **lubrification** entre deux pièces (palier, coussinet) — le coefficient de frottement est lié à $\tau$.

---

## 📝 Exercice 3 — Écoulement de Couette-Poiseuille

### Énoncé
Mêmes conditions que l'exercice 2, mais avec maintenant un gradient de pression $G = -dp/dx$ non nul.

### Correction

NS selon $\vec{e_x}$ :
$$\mu \frac{d^2 u}{dy^2} = -G$$

Solution générale : $u(y) = -\dfrac{G}{2\mu}y^2 + ay + b$

CL : $u(0) = 0 \Rightarrow b = 0$ et $u(h) = V_0 \Rightarrow a = V_0/h + Gh/(2\mu)$.

**Résultat** :
$$\boxed{u(y) = \frac{V_0}{h}\,y + \frac{G}{2\mu}\,y(h-y)}$$

C'est la **superposition** d'un Couette (linéaire) et d'un Poiseuille (parabolique).

> **💡 Cas particulier** : si $G < 0$ (gradient adverse) suffisamment fort, le profil peut **rebrousser** près de la paroi inférieure → début de décollement.

---

## 📝 Exercice 4 — Calcul du Reynolds critique en conduite

### Énoncé
De l'eau ($\nu = 10^{-6}$ m²/s) circule dans une conduite de diamètre $D = 25$ mm avec un débit $Q = 0.5$ L/s.

L'écoulement est-il laminaire ou turbulent ?

### Correction

Vitesse moyenne :
$$\bar{V} = \frac{Q}{S} = \frac{0.5\times 10^{-3}}{\pi(0.025)^2/4} \approx 1.02 \text{ m/s}$$

Reynolds :
$$Re = \frac{\bar{V}D}{\nu} = \frac{1.02 \times 0.025}{10^{-6}} \approx 25500$$

$Re > 4000$ → l'écoulement est **turbulent**.

> **💡 Repères** : pour de l'eau dans une conduite de quelques cm avec une vitesse de l'ordre du m/s, on est presque toujours en régime turbulent. Le régime laminaire est typique des écoulements lents, visqueux ou très petites échelles.

---

## 📝 Exercice 5 — Loi de Stokes pour une bille en chute

### Énoncé
Une bille en acier ($\rho_s = 7800$ kg/m³) de rayon $R = 1$ mm tombe dans la glycérine ($\rho = 1260$ kg/m³, $\mu = 1.5$ Pa·s).

Calculer la vitesse limite de chute.

### Correction

À la vitesse limite, l'équilibre des forces :
$$P - F_A - F_{Stokes} = 0$$

- Poids : $P = \rho_s V g$
- Archimède : $F_A = \rho V g$
- Stokes : $F = 6\pi\mu R V_{lim}$

D'où :
$$V_{lim} = \frac{2 R^2 g (\rho_s - \rho)}{9\mu}$$

Application numérique :
$$V_{lim} = \frac{2 \times (10^{-3})^2 \times 9.81 \times (7800 - 1260)}{9 \times 1.5} \approx 9.5 \times 10^{-3} \text{ m/s} \approx 1 \text{ cm/s}$$

**Vérification de l'hypothèse Stokes** :
$$Re = \frac{\rho V_{lim} (2R)}{\mu} = \frac{1260 \times 0.0095 \times 0.002}{1.5} \approx 0.016 \ll 1 \quad \checkmark$$

L'hypothèse $Re \ll 1$ est bien vérifiée.

> **💡 Application** : c'est le principe du **viscosimètre à chute de bille**. La mesure de $V_{lim}$ permet de remonter à la viscosité $\mu$.

