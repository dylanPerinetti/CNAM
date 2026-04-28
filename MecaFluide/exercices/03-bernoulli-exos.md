# Exercices corrigés — Théorèmes de Bernoulli

## 📝 Exercice 1 — Vidange d'un réservoir (Torricelli)

### Énoncé
Un réservoir cylindrique de grande section contient de l'eau jusqu'à une hauteur $h = 4$ m. Un orifice de diamètre $d = 2$ cm est percé à la base.

1. Calculer la vitesse de sortie de l'eau.
2. Calculer le débit (en supposant la section de sortie = section de l'orifice).
3. En combien de temps le réservoir se vide-t-il (section de réservoir $S = 1$ m²) ?

### Correction

**1. Vitesse de sortie**

On applique Bernoulli entre la surface libre (1) et la sortie (2), sur une ligne de courant :

$$\underbrace{\frac{p_{atm}}{\rho g}}_{\text{(1)}} + \underbrace{\frac{V_1^2}{2g}}_{\approx 0} + h = \underbrace{\frac{p_{atm}}{\rho g}}_{\text{(2)}} + \frac{V_2^2}{2g} + 0$$

Hypothèses :
- Réservoir grand → $V_1 \approx 0$
- Surface libre et sortie à $p_{atm}$
- Référentiel : $z = 0$ à la sortie, $z = h$ à la surface libre

D'où la **formule de Torricelli** :
$$\boxed{V_2 = \sqrt{2gh} = \sqrt{2 \times 9.81 \times 4} \approx 8.86 \text{ m/s}}$$

**2. Débit**

$$Q = S_2 V_2 = \frac{\pi d^2}{4}\sqrt{2gh} = \frac{\pi (0.02)^2}{4} \times 8.86 \approx 2.78 \times 10^{-3} \text{ m}^3/\text{s} \approx 2.78 \text{ L/s}$$

**3. Temps de vidange**

Soit $z(t)$ la hauteur d'eau à l'instant $t$. La conservation du volume donne :
$$S\frac{dz}{dt} = -S_2\sqrt{2gz}$$

Séparation des variables :
$$\frac{dz}{\sqrt{z}} = -\frac{S_2}{S}\sqrt{2g}\,dt$$

Intégration de $z = h$ (à $t = 0$) à $z = 0$ (à $t = T$) :
$$2\sqrt{h} = \frac{S_2}{S}\sqrt{2g}\,T$$

D'où :
$$T = \frac{2S}{S_2}\sqrt{\frac{h}{2g}} = \frac{S}{S_2}\sqrt{\frac{2h}{g}}$$

Application numérique :
- $S = 1$ m², $S_2 = \pi(0.01)^2 \approx 3.14\times10^{-4}$ m²
- $T \approx 3185 \times \sqrt{8/9.81} \approx 3185 \times 0.9 \approx 2880$ s ≈ **48 min**

> **💡 Astuce** : le temps de vidange est $\sqrt{2}$ × le temps "naïf" $V/Q_0$ avec $V$ le volume initial et $Q_0$ le débit initial.

---

## 📝 Exercice 2 — Tube de Pitot

### Énoncé
Un tube de Pitot mesure une différence de pression $\Delta p = p_t - p_s = 850$ Pa dans l'air ($\rho = 1.2$ kg/m³).

Calculer la vitesse de l'écoulement.

### Correction

Le point d'arrêt (où $V = 0$) sur le Pitot mesure la **pression totale** $p_t$. Une prise latérale mesure la **pression statique** $p_s$.

Bernoulli entre l'amont (vitesse $V$, pression $p_s$) et le point d'arrêt :
$$p_s + \frac{1}{2}\rho V^2 = p_t$$

D'où :
$$\boxed{V = \sqrt{\frac{2\Delta p}{\rho}} = \sqrt{\frac{2 \times 850}{1.2}} \approx 37.6 \text{ m/s} \approx 135 \text{ km/h}}$$

> **💡 Application** : c'est ainsi que les avions mesurent leur vitesse air. La sonde de Pitot est essentielle (cf. accident AF447 en 2009 lié à un givrage des sondes).

---

## 📝 Exercice 3 — Tube de Venturi

### Énoncé
Un Venturi est inséré dans une conduite d'eau ($D_1 = 100$ mm, col $D_2 = 50$ mm). On mesure une chute de pression $p_1 - p_2 = 25$ kPa.

Calculer le débit.

### Correction

**Bernoulli** entre (1) et (2), conduite horizontale ($z_1 = z_2$) :
$$p_1 + \frac{1}{2}\rho V_1^2 = p_2 + \frac{1}{2}\rho V_2^2$$

**Conservation du débit** : $S_1 V_1 = S_2 V_2$ → $V_1 = V_2 (D_2/D_1)^2$

En substituant :
$$p_1 - p_2 = \frac{\rho}{2}\left(V_2^2 - V_2^2\frac{D_2^4}{D_1^4}\right) = \frac{\rho V_2^2}{2}\left(1 - \frac{D_2^4}{D_1^4}\right)$$

D'où :
$$V_2 = \sqrt{\frac{2(p_1-p_2)}{\rho(1 - (D_2/D_1)^4)}}$$

Avec $(D_2/D_1)^4 = (0.5)^4 = 0.0625$ :
$$V_2 = \sqrt{\frac{2 \times 25000}{1000 \times 0.9375}} \approx 7.30 \text{ m/s}$$

Débit :
$$Q = S_2 V_2 = \frac{\pi(0.05)^2}{4} \times 7.30 \approx 1.43 \times 10^{-2} \text{ m}^3/\text{s} \approx 14.3 \text{ L/s}$$

> **💡 Le Venturi** est un débitmètre passif fiable mais introduit une perte de charge. Souvent associé à un coefficient de débit $C_d \approx 0.95$ pour tenir compte du frottement.

---

## 📝 Exercice 4 — Pompe alimentant un réservoir

### Énoncé
Une pompe puise de l'eau dans un puits (surface 0 m) et la remonte à un réservoir ouvert à $z = 30$ m. Le débit est $Q = 50$ L/s, les pertes totales valent $\Delta H = 5$ m.

Calculer la puissance hydraulique nécessaire.

### Correction

**Bernoulli généralisé** entre les deux surfaces libres (vitesses ≈ 0, pressions atm) :
$$0 + 0 + 0 + H_p = 0 + 0 + 30 + \Delta H$$

D'où :
$$H_p = 30 + 5 = 35 \text{ m}$$

**Puissance hydraulique** :
$$\boxed{P = \rho g Q H_p = 1000 \times 9.81 \times 0.05 \times 35 \approx 17.2 \text{ kW}}$$

Si la pompe a un rendement $\eta = 0.7$, la **puissance électrique** consommée :
$$P_{élec} = \frac{P}{\eta} = \frac{17.2}{0.7} \approx 24.5 \text{ kW}$$

> **💡 Astuce mémo** : pour une pompe, la formule magique est $P = \rho g Q H$. Bien retenir les unités : $\rho$ en kg/m³, $Q$ en m³/s, $H$ en m → P en watts.

