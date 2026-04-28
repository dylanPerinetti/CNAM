# Exercices corrigés — Bilans (masse et quantité de mouvement)

## 📝 Exercice 1 — Conservation du débit dans une conduite à section variable

### Énoncé
Une conduite circulaire d'eau passe d'un diamètre $D_1 = 100$ mm à un diamètre $D_2 = 50$ mm. La vitesse moyenne en (1) vaut $V_1 = 2$ m/s.

Calculer la vitesse $V_2$ et le débit volumique $Q$.

### Correction

L'eau étant **incompressible** et le régime **stationnaire**, on a :
$$Q_v = S_1 V_1 = S_2 V_2$$

avec $S = \pi D^2/4$. D'où :
$$V_2 = V_1 \frac{S_1}{S_2} = V_1 \left(\frac{D_1}{D_2}\right)^2 = 2 \times \left(\frac{0.1}{0.05}\right)^2 = 2 \times 4 = 8 \text{ m/s}$$

Le débit :
$$Q = S_1 V_1 = \frac{\pi (0.1)^2}{4} \times 2 \approx 1.57 \times 10^{-2} \text{ m}^3/\text{s} \approx 15.7 \text{ L/s}$$

> **💡 Règle pratique** : quand le diamètre est divisé par 2, la vitesse est multipliée par 4 (loi en $D^2$).

---

## 📝 Exercice 2 — Force d'un jet sur une plaque verticale

### Énoncé
Un jet d'eau horizontal de section $S = 5\,\text{cm}^2$ et de vitesse $V = 20$ m/s frappe une plaque verticale fixe et est totalement dévié (s'écoule le long de la plaque).

Calculer la force exercée par le jet sur la plaque.

### Correction

**Volume de contrôle** : on choisit un VC qui englobe le jet à l'amont (1) et après déviation (2, 2'), avec une frontière coïncidant avec la plaque.

**Hypothèses** :
- Régime stationnaire
- Fluide incompressible ($\rho = 1000$ kg/m³)
- Pression atmosphérique sur tout le contour libre

**Bilan de qté de mouvement projeté sur $\vec{e_x}$** (axe du jet) :

$$0 = \rho V (-V) S + 0 + (-F_{plaque \to fluide,x})$$

(le flux sortant est purement vertical, donc $u_x = 0$ en 2)

D'où :
$$F_{plaque \to fluide,x} = -\rho V^2 S$$

Et donc, par réaction :
$$\boxed{F_{fluide \to plaque,x} = \rho V^2 S = 1000 \times 20^2 \times 5\times10^{-4} = 200 \text{ N}}$$

> **💡 Vérification d'ordre de grandeur** : 200 N ≈ 20 kg de force, ce qui est cohérent pour un jet de 20 m/s (≈ 72 km/h).

---

## 📝 Exercice 3 — Aubage déviant un jet à 60°

### Énoncé
Un jet d'eau de vitesse $V_1 = 30$ m/s, de section $S = 10\,\text{cm}^2$, est dévié de $\theta = 60°$ par un aubage fixe (la vitesse reste $V$ en module, on néglige les pertes).

Calculer la force exercée par le jet sur l'aubage.

### Correction

**Bilan de qté de mouvement** :
$$\vec{F}_{fluide \to aubage} = \rho Q (\vec{V_1} - \vec{V_2})$$

Avec $Q = SV = 10^{-3} \times 30 = 0.03$ m³/s.

Composantes :
- Avant : $\vec{V_1} = V\,\vec{e_x}$
- Après : $\vec{V_2} = V\cos\theta\,\vec{e_x} + V\sin\theta\,\vec{e_y}$

D'où :
$$F_x = \rho Q V(1 - \cos\theta) = 1000 \times 0.03 \times 30 \times (1 - 0.5) = 450 \text{ N}$$
$$F_y = -\rho Q V \sin\theta = -1000 \times 0.03 \times 30 \times \frac{\sqrt{3}}{2} \approx -779 \text{ N}$$

**Module** :
$$\|F\| = \sqrt{F_x^2 + F_y^2} \approx 900 \text{ N}$$

> **💡 Résultat clé** : pour une déviation à 180° (palette de Pelton parfaite), la force vaut $2\rho Q V$ — le **double** d'une plaque plane !

---

## 📝 Exercice 4 — Bilan local de masse en cylindrique

### Énoncé
Vérifier que le champ de vitesse $u_r = 0, u_\theta = \dfrac{\Gamma}{2\pi r}, u_z = 0$ (tourbillon irrotationnel) satisfait l'équation de continuité incompressible.

### Correction

En coordonnées cylindriques :
$$\vec{\nabla}\cdot\vec{u} = \frac{1}{r}\frac{\partial (r u_r)}{\partial r} + \frac{1}{r}\frac{\partial u_\theta}{\partial \theta} + \frac{\partial u_z}{\partial z}$$

Tous les termes sont nuls :
- $u_r = 0$
- $u_\theta$ indépendant de $\theta$
- $u_z = 0$

→ $\vec{\nabla}\cdot\vec{u} = 0$ ✓

L'écoulement est bien incompressible.

> **💡 Bonus** : on peut vérifier que la vorticité est nulle partout sauf en $r = 0$ (singularité). C'est le modèle du tourbillon idéal de Rankine.

