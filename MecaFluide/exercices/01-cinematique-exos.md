# Exercices corrigés — Cinématique des fluides

## 📝 Exercice 1 — Calcul de l'accélération d'une particule

### Énoncé
On considère un écoulement bidimensionnel défini par le champ de vitesse :
$$\vec{u}(x, y, t) = (3x + t)\,\vec{e_x} + (-3y)\,\vec{e_y}$$

1. Cet écoulement est-il stationnaire ?
2. Vérifier qu'il est incompressible.
3. Calculer l'accélération d'une particule fluide.

### Correction

**1. Stationnarité**

Le champ de vitesse dépend explicitement de $t$ via le terme $3x + t$, donc l'écoulement n'est **pas stationnaire** :
$$\frac{\partial \vec{u}}{\partial t} = \vec{e_x} \neq \vec{0}$$

**2. Incompressibilité**

On calcule la divergence :
$$\vec{\nabla}\cdot\vec{u} = \frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} = 3 + (-3) = 0 \quad \checkmark$$

L'écoulement est bien **incompressible**.

**3. Accélération**

On utilise la dérivée particulaire :
$$\vec{a} = \frac{\partial \vec{u}}{\partial t} + (\vec{u}\cdot\vec{\nabla})\vec{u}$$

- Terme instationnaire : $\dfrac{\partial \vec{u}}{\partial t} = \vec{e_x}$
- Terme convectif :
$$(\vec{u}\cdot\vec{\nabla})\vec{u} = u\frac{\partial \vec{u}}{\partial x} + v\frac{\partial \vec{u}}{\partial y}$$

Avec :
- $\frac{\partial \vec{u}}{\partial x} = 3\,\vec{e_x}$
- $\frac{\partial \vec{u}}{\partial y} = -3\,\vec{e_y}$

Donc :
$$(\vec{u}\cdot\vec{\nabla})\vec{u} = (3x+t)(3)\vec{e_x} + (-3y)(-3)\vec{e_y} = (9x+3t)\vec{e_x} + 9y\,\vec{e_y}$$

**Résultat final** :
$$\boxed{\vec{a} = (9x + 3t + 1)\vec{e_x} + 9y\,\vec{e_y}}$$

> **💡 Astuce** : ne jamais oublier le terme $\partial \vec{u}/\partial t$ en régime instationnaire ! C'est l'erreur la plus fréquente.

---

## 📝 Exercice 2 — Lignes de courant et trajectoires

### Énoncé
Soit le champ de vitesse stationnaire dans le plan :
$$u = y, \quad v = -x$$

1. Tracer l'allure des lignes de courant.
2. Calculer la trajectoire d'une particule passant par $(1, 0)$ à $t = 0$.

### Correction

**1. Lignes de courant**

L'équation des lignes de courant :
$$\frac{dx}{u} = \frac{dy}{v} \Rightarrow \frac{dx}{y} = \frac{dy}{-x}$$

D'où : $-x\,dx = y\,dy \Rightarrow x\,dx + y\,dy = 0$

Intégration : $\dfrac{x^2 + y^2}{2} = \text{cste}$

→ Les lignes de courant sont des **cercles concentriques** autour de l'origine.

**2. Trajectoires**

Les équations différentielles :
$$\frac{dx}{dt} = y, \quad \frac{dy}{dt} = -x$$

En dérivant la première : $\ddot{x} = \dot{y} = -x$, donc :
$$\ddot{x} + x = 0$$

Solution : $x(t) = A\cos t + B\sin t$ et $y = \dot{x} = -A\sin t + B\cos t$.

Avec les conditions initiales $x(0) = 1, y(0) = 0$ : $A = 1, B = 0$.

**Résultat** :
$$\boxed{x(t) = \cos t, \quad y(t) = -\sin t}$$

C'est un **mouvement circulaire** dans le sens horaire — les trajectoires coïncident avec les lignes de courant (logique en stationnaire).

> **💡 Cas particulier** : en régime stationnaire, **lignes de courant = trajectoires**.

---

## 📝 Exercice 3 — Vorticité d'un écoulement

### Énoncé
Soit $\vec{u} = \omega(-y, x, 0)$ (rotation solide).

Calculer la vorticité.

### Correction

$$\vec{\omega}_v = \vec{\nabla} \times \vec{u}$$

En 2D, seule la composante $z$ est non nulle :
$$\omega_z = \frac{\partial v}{\partial x} - \frac{\partial u}{\partial y} = \omega - (-\omega) = 2\omega$$

**Résultat** : $\vec{\omega}_v = 2\omega\,\vec{e_z}$

> **💡 Remarque** : la vorticité d'une rotation solide vaut **2× la vitesse angulaire**. C'est l'inverse pour un tourbillon ponctuel ($u_\theta = \Gamma/(2\pi r)$) qui est irrotationnel sauf en $r = 0$.

