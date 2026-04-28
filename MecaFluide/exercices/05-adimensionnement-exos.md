# Exercices corrigés — Adimensionnement et similitude

## 📝 Exercice 1 — Application du théorème de Vaschy-Buckingham

### Énoncé
La traînée $F$ d'une sphère lisse en écoulement uniforme dépend de :
- $\rho$ : masse volumique du fluide
- $V$ : vitesse à l'infini
- $D$ : diamètre de la sphère
- $\mu$ : viscosité dynamique

Trouver les groupes adimensionnels.

### Correction

**Variables** : $F, \rho, V, D, \mu$ → $n = 5$

**Unités fondamentales** : M, L, T → $k = 3$

**Nombre de groupes π** : $n - k = 2$

**Choix des variables de référence** : $\rho, V, D$ (dimensionnellement indépendantes)

**Construction de π₁** (avec $F$) :
$$\pi_1 = \frac{F}{\rho^a V^b D^c}$$

Dimensions : $[F] = MLT^{-2}$, $[\rho^a V^b D^c] = M^a L^{a+b+c} T^{-b}$

Pour que $\pi_1$ soit sans dimension :
- M : $1 - a = 0 \Rightarrow a = 1$
- T : $-2 + b = 0 \Rightarrow b = 2$
- L : $1 - a - b - c = 0 \Rightarrow c = -2 \Rightarrow c = 2$

(en fait $1 - 1 - 2 - c = 0 \Rightarrow c = -2$, donc $D^2$ au dénominateur)

$$\pi_1 = \frac{F}{\rho V^2 D^2} \propto C_D$$

**Construction de π₂** (avec $\mu$) :

De la même manière, on trouve :
$$\pi_2 = \frac{\mu}{\rho V D} = \frac{1}{Re}$$

**Conclusion** :
$$\boxed{C_D = f(Re)}$$

→ La courbe $C_D = f(Re)$ pour une sphère est universelle, indépendante des valeurs absolues des paramètres.

> **💡 À retenir** : Vaschy-Buckingham permet de réduire considérablement le nombre d'expériences nécessaires.

---

## 📝 Exercice 2 — Similitude pour un essai en soufflerie

### Énoncé
On veut tester un modèle d'avion à l'échelle 1/10 en soufflerie.
- Avion réel : $V_r = 200$ m/s, $L_r = 10$ m, dans l'air à pression atmosphérique
- Maquette : $L_m = 1$ m

Quelle vitesse en soufflerie pour respecter la similitude de Reynolds ?

### Correction

Similitude de Reynolds :
$$Re_m = Re_r \Rightarrow \frac{V_m L_m}{\nu_m} = \frac{V_r L_r}{\nu_r}$$

Si on utilise le **même fluide** ($\nu_m = \nu_r$) :
$$V_m = V_r \frac{L_r}{L_m} = 200 \times 10 = 2000 \text{ m/s}$$

→ $V_m \approx 5.8 \times c_{son}$ : **impossible** dans une soufflerie subsonique standard !

**Alternative** : pressuriser la soufflerie. Si on multiplie $\rho$ par 10, on divise $\nu$ par 10 et :
$$V_m = V_r \frac{L_r}{L_m} \frac{\nu_m}{\nu_r} = 2000 \times 0.1 = 200 \text{ m/s}$$

Cela devient faisable (mais coûteux).

> **💡 Conséquence pratique** : pour les essais aérodynamiques d'avions de ligne, on utilise des **souffleries cryogéniques** (azote liquide) ou pressurisées pour augmenter $\rho$ et abaisser $\nu$.

---

## 📝 Exercice 3 — Similitude de Froude pour un navire

### Énoncé
Un navire de longueur $L_r = 100$ m navigue à $V_r = 10$ m/s. On teste une maquette à l'échelle 1/50.

Quelle vitesse pour la maquette ? Et quelle force est à attendre sur le réel si la maquette mesure $F_m = 5$ N ?

### Correction

Pour les écoulements à **surface libre**, on respecte la similitude de **Froude** :
$$Fr_m = Fr_r \Rightarrow \frac{V_m}{\sqrt{g L_m}} = \frac{V_r}{\sqrt{g L_r}}$$

D'où :
$$V_m = V_r \sqrt{\frac{L_m}{L_r}} = 10 \times \sqrt{1/50} \approx 1.41 \text{ m/s}$$

**Loi d'échelle pour les forces** :
La force est de la forme $F \sim \rho V^2 L^2$ :
$$\frac{F_r}{F_m} = \frac{\rho_r}{\rho_m}\left(\frac{V_r}{V_m}\right)^2\left(\frac{L_r}{L_m}\right)^2$$

Si même fluide ($\rho_m = \rho_r$) et $V_r/V_m = \sqrt{L_r/L_m}$ :
$$\frac{F_r}{F_m} = \frac{L_r}{L_m} \times \left(\frac{L_r}{L_m}\right)^2 = \left(\frac{L_r}{L_m}\right)^3 = 50^3$$

D'où :
$$F_r = 5 \times 125\,000 = 625\,000 \text{ N} = 625 \text{ kN}$$

> **💡 Le facteur $L^3$** est très significatif : une petite force sur la maquette correspond à des centaines de kN sur le réel — c'est cohérent avec le fait que le poids varie aussi en $L^3$.

---

## 📝 Exercice 4 — Quel régime pour un dirigeable ?

### Énoncé
Un dirigeable de longueur $L = 80$ m vole à $V = 25$ m/s dans l'air ($\nu = 1.5 \times 10^{-5}$ m²/s).

Calculer le Reynolds et déterminer le régime.

### Correction

$$Re = \frac{V L}{\nu} = \frac{25 \times 80}{1.5 \times 10^{-5}} \approx 1.33 \times 10^8$$

→ Régime **fortement turbulent** ($Re \gg 10^6$).

**Conséquences** :
- Modèle de fluide parfait inapplicable près de la paroi (couche limite turbulente)
- Traînée surtout due au frottement et à la traînée de pression
- $C_D$ relativement constant pour $Re$ élevé

> **💡 Astuce** : pour les engins volants, $Re$ est typiquement entre $10^6$ et $10^8$. C'est le régime des avions, des trains, des sous-marins, des poissons (plus bas pour les petits insectes : $Re \sim 10^2-10^4$).

---

## 📝 Exercice 5 — Vortex shedding (lâchers tourbillonnaires)

### Énoncé
Une cheminée de diamètre $D = 2$ m est exposée à un vent de $V = 15$ m/s. On sait que le nombre de Strouhal vaut environ $St = 0.21$ pour un cylindre.

Calculer la fréquence des lâchers tourbillonnaires.

### Correction

$$St = \frac{f D}{V} \Rightarrow f = \frac{St \cdot V}{D} = \frac{0.21 \times 15}{2} = 1.575 \text{ Hz}$$

**Période** : $T = 1/f \approx 0.63$ s.

> **💡 Implication** : si la cheminée a une fréquence propre proche de 1.6 Hz, elle peut entrer en **résonance** sous l'effet des tourbillons → effondrement potentiel ! C'est ce qui s'est passé pour le pont du Tacoma Narrows en 1940.
> 
> Solutions : ajout d'**spirales** ou de **strakes** pour casser la cohérence des lâchers tourbillonnaires.

