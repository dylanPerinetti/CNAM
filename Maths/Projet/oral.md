# Oral du projet "Coquillages" — Dylan & Kiara

## Contexte

Document de support pour un oral à **deux voix** (Dylan + Kiara), durée **20–30 minutes**, niveau approfondi (équations + démonstrations), basé sur le projet `Maths/projet/` :
- [PROJET_Dylan_Perinetti_Correction.ipynb](Maths/projet/PROJET_Dylan_Perinetti_Correction.ipynb) : notebook principal (modèles, schémas, simulations, convergence)
- [PROJET_Shell_patterns_sujet.ipynb](Maths/projet/PROJET_Shell_patterns_sujet.ipynb) : sujet de l'énoncé
- Le bonus 3D ([coquille_3D.py](Maths/projet/coquille_3D.py)) **n'est pas couvert**.

Le document mélange **phrases rédigées** (à dire telles quelles aux moments-clés) et **bullet points** (à reformuler librement). Chaque section est étiquetée **[D]** (Dylan), **[K]** (Kiara) ou **[D+K]** (à deux). Une section finale de **FAQ/backups** anticipe les questions probables.

---

## Plan général et chronométrage

| # | Section | Voix | Durée |
|---|---------|------|-------|
| 1 | Introduction & contexte biologique | [D] | ~2 min |
| 2 | Partie A — Les 3 modèles mathématiques | [K] | ~5 min |
| 3 | Partie B — Discrétisation espace + temps | [D] | ~3 min |
| 4 | Partie B — Schémas numériques (Euler, Heun) | [D] | ~4 min |
| 5 | Partie B — Architecture du code (Param, main) | [K] | ~3 min |
| 6 | Partie C/D/E — Résultats des simulations | [K] | ~5 min |
| 7 | Étude de convergence | [D] | ~3 min |
| 8 | Conclusion | [D+K] | ~1 min |

Total ≈ **26 min** + ~3 min de questions de marge.

---

## 1. Introduction [D] — ~2 min

> **Dylan (à dire) :** « Bonjour à tous. Aujourd'hui nous vous présentons, avec Kiara, notre projet de mathématiques pour l'ingénieur sur l'**analyse numérique d'équations aux dérivées partielles**, appliquée à un problème de biologie : la **formation des motifs pigmentaires à la surface des coquillages**. »

**Points clés à développer :**
- Le mathématicien biologiste **Hans Meinhardt** a montré dans les années 1980 que les motifs colorés des coquillages (rayures, ondulations, chevrons) résultent de **réactions chimiques entre molécules** qui diffusent sur le bord de croissance de la coquille.
- C'est un problème de **réaction-diffusion** : deux ou trois molécules — appelées *activateur*, *inhibiteur* ou *substrat*, et parfois *hormone* — interagissent localement et diffusent dans l'espace.
- Trois modèles distincts permettent de reproduire trois familles de motifs réels :
  - **Modèle 1** → *Cepaea nemoralis* (lignes droites parallèles)
  - **Modèle 2** → *Amoria undulata* (lignes ondulantes)
  - **Modèle 3** → *Oliva porphyria* (ondes en chevrons « > »)
- L'objet du projet : **discrétiser** ces EDPs, les **résoudre numériquement** par schémas explicites (Euler, Heun), et **comparer** la convergence des deux schémas.

> **Dylan (transition) :** « Kiara va d'abord vous présenter les trois modèles mathématiques, puis je vous expliquerai comment nous les avons discrétisés et résolus, avant que Kiara ne vous montre les résultats des simulations. »

---

## 2. Partie A — Les trois modèles [K] — ~5 min

### 2.1 Modèle 1 : activateur-inhibiteur

> **Kiara (à dire) :** « Le premier modèle décrit l'interaction entre deux molécules : un **activateur** *a* qui stimule sa propre production, et un **inhibiteur** *b* qui freine cette production. »

**Équations à écrire au tableau (ou montrer sur slide) :**

$$\frac{\partial a}{\partial t} = s\left(\frac{a^2}{b} + b_a\right) - r_a\, a + D_a\, \frac{\partial^2 a}{\partial x^2} \quad (1.a)$$

$$\frac{\partial b}{\partial t} = s\, a^2 + b_b - r_b\, b + D_b\, \frac{\partial^2 b}{\partial x^2} \quad (1.b)$$

**Décomposer chaque terme :**
- $s \cdot a^2/b$ : **autocatalyse** — *a* stimule sa propre production (proportionnel à $a^2$), mais l'inhibiteur *b* freine cette production (division par *b*).
- $s \cdot a^2$ dans (1.b) : l'activateur **fabrique son propre antagoniste** (auto-régulation).
- $-r_a a$, $-r_b b$ : **dégradation naturelle** proportionnelle à la concentration.
- $D_a \partial^2 a/\partial x^2$, $D_b \partial^2 b/\partial x^2$ : **diffusion spatiale** sur le bord de croissance.
- $b_a$, $b_b$ : petites sources externes constantes.
- $s(x)$ : densité de source **légèrement aléatoire** en *x* — c'est elle qui brise la symétrie initiale.

**Point théorique majeur (à insister) :**

> **Kiara :** « La condition fondamentale pour qu'un motif apparaisse est ce qu'on appelle l'**instabilité de Turing** : il faut que **$D_a \ll D_b$**, c'est-à-dire **activation à courte portée et inhibition à longue portée**. Sinon le système reste homogène et aucun motif n'émerge. »

### 2.2 Modèle 2 : activateur-substrat

> **Kiara :** « Le deuxième modèle remplace l'inhibiteur actif par un **substrat consommé** — une ressource. »

**Équations :**

$$\frac{\partial a}{\partial t} = s\, b\, \tilde{a}^2 - r_a\, a + D_a\, \frac{\partial^2 a}{\partial x^2} \quad (2.a)$$

$$\frac{\partial b}{\partial t} = \sigma(x) - s\, b\, \tilde{a}^2 - r_b\, b + D_b\, \frac{\partial^2 b}{\partial x^2} \quad (2.b)$$

avec $\tilde{a}^2 = \dfrac{a^2}{1 + s_a\, a^2} + b_a$ — terme **saturé** (l'autocatalyse plafonne quand *a* devient grand).

**Mécanisme à expliquer :**
- L'autocatalyse $s \cdot b \cdot \tilde{a}^2$ apparaît avec un signe **+** dans (2.a) — production de *a* — et un signe **−** dans (2.b) — **consommation de substrat**.
- Quand *a* monte localement, il **épuise** le substrat *b* à cet endroit → la production locale chute → c'est une **inhibition indirecte par épuisement de la ressource**.
- $\sigma(x) = \sigma_{\max} \cdot |\sin(4\pi x/n_x)|$ : la régénération du substrat est **modulée périodiquement** dans l'espace, ce qui induit les ondulations.

### 2.3 Modèle 3 : activateur-inhibiteur-hormone

> **Kiara :** « Le troisième modèle ajoute une troisième variable, une **hormone** *c*, qui contrairement à *a* et *b* est **constante en espace** : elle ne dépend que du temps. »

**Équations :**

$$\frac{\partial a}{\partial t} = \frac{s\, a^2}{1 + s_a a^2} \cdot \frac{1}{b_b + b} - r_a\, a + D_a\, \frac{\partial^2 a}{\partial x^2} \quad (3.a)$$

$$\frac{\partial b}{\partial t} = \frac{s\, a^2}{1 + s_a a^2} - \frac{r_b\, b}{c} + D_b\, \frac{\partial^2 b}{\partial x^2} \quad (3.b)$$

$$\frac{dc}{dt} = -r_c\, c + \frac{1}{L_x}\int_0^{L_x} r_c\, a\, dx \quad (3.c)$$

**Boucle de rétroaction (à expliquer pas à pas) :**
1. Si *a* est globalement faible → l'intégrale dans (3.c) est petite → **c diminue**.
2. *c* petit → le terme $-r_b b/c$ dans (3.b) explose en valeur absolue → **b diminue rapidement**.
3. *b* petit → le facteur $1/(b_b+b)$ dans (3.a) augmente → **a se met à croître** localement.
4. *a* élevé → l'intégrale dans (3.c) augmente → **c remonte** → l'équilibre est restauré.

> **Kiara :** « Cette régulation globale par l'hormone *c* maintient un **nombre d'ondes constant** sur tout le bord de croissance, et c'est ce qui donne les motifs en chevrons réguliers d'*Oliva porphyria*. »

---

## 3. Partie B — Discrétisation espace + temps [D] — ~3 min

> **Dylan :** « Maintenant que Kiara vous a présenté les modèles continus, je vais vous expliquer comment on les discrétise pour pouvoir les résoudre numériquement. »

### 3.1 Discrétisation spatiale

- Domaine $[0, L_x]$ découpé en $n_x$ cellules → **grille** $x_i = i \cdot \Delta x$ pour $i = 0, \ldots, n_x$.
- Choix imposé par l'énoncé : **$\Delta x = 1$**, donc $L_x = n_x$.
- Conditions aux limites **périodiques** (le bord du coquillage est une boucle fermée).

### 3.2 Discrétisation de la dérivée seconde (Laplacien 1D)

> **Dylan (à dire) :** « Pour la dérivée seconde, on utilise la formule classique des **différences finies centrées d'ordre 2**. »

$$\frac{\partial^2 q}{\partial x^2}\bigg|_{x_i} \approx \frac{q_{i+1} - 2q_i + q_{i-1}}{\Delta x^2}$$

**Démonstration courte (à savoir refaire) :** Taylor à l'ordre 2 :
- $q(x+\Delta x) = q + \Delta x \cdot q' + \tfrac{\Delta x^2}{2} q'' + O(\Delta x^3)$
- $q(x-\Delta x) = q - \Delta x \cdot q' + \tfrac{\Delta x^2}{2} q'' + O(\Delta x^3)$
- Somme : $q_{i+1} + q_{i-1} = 2q_i + \Delta x^2 q'' + O(\Delta x^4)$
- Donc $q'' \approx (q_{i+1} - 2q_i + q_{i-1})/\Delta x^2$ avec une **erreur en $O(\Delta x^2)$**.

**Implémentation Python avec CL périodiques :**

```python
def diffusion_periodique(q, param):
    return (np.roll(q, -1) - 2*q + np.roll(q, 1)) * param.dx**2
```

- `np.roll(q, -1)` décale d'un cran à gauche → équivaut à $q_{i+1}$ avec **bouclage** ($q_{n_x+1} = q_0$).
- `np.roll(q, 1)` décale d'un cran à droite → équivaut à $q_{i-1}$ avec **bouclage** ($q_{-1} = q_{n_x}$).

### 3.3 Discrétisation temporelle

- Intervalle $[0, T]$ découpé en $n_t$ pas → **grille** $t_n = n \cdot \Delta t$ pour $n = 0, \ldots, n_t$.
- Choix imposé : **$\Delta t = 1$**, donc $n_t = T$.
- On définit $U^n = (a^n, b^n)$ ou $(a^n, b^n, c^n)$ : la **solution discrète** au temps $t_n$.

---

## 4. Partie B — Les schémas numériques [D] — ~4 min

> **Dylan :** « Une fois la discrétisation spatiale faite, le système d'EDPs devient un système d'EDOs sur le vecteur $U$. On résout alors $\dfrac{dU}{dt} = f(U)$ avec deux schémas : Euler explicite et Heun. »

### 4.1 Euler explicite (ordre 1)

**Formule :**
$$\boxed{\,U^{n+1} = U^n + \Delta t \cdot f(U^n)\,}$$

**Démonstration (à savoir refaire) :** Taylor à l'ordre 1 :
$$U(t_n + \Delta t) = U(t_n) + \Delta t \cdot U'(t_n) + O(\Delta t^2)$$

En remplaçant $U'(t_n) = f(U(t_n))$, on obtient le schéma. **Erreur de troncature locale : $O(\Delta t^2)$ par pas**, donc **erreur globale $O(\Delta t)$ → ordre 1**.

**Code (très court) :**
```python
def euler_explicite(param):
    f = param.modele(param)
    param.solution_courante[:, :] = param.solution_courante[:, :] + param.dt * f
```

### 4.2 Heun (ordre 2, prédicteur-correcteur)

**Formules :**
$$\widetilde{U}_1 = U^n + \Delta t \cdot f(U^n) \qquad \text{(prédicteur — Euler)}$$
$$\widetilde{U}_2 = U^n + \Delta t \cdot f(\widetilde{U}_1) \qquad \text{(correcteur)}$$
$$\boxed{\,U^{n+1} = \tfrac{1}{2}(\widetilde{U}_1 + \widetilde{U}_2)\,}$$

**Idée intuitive :** Euler évalue la pente seulement au début du pas. Heun évalue **deux pentes** — une au début, une à l'extrémité prédite — et **moyenne**, ce qui annule l'erreur d'ordre 1.

**Démonstration de l'ordre 2 (esquisse à mentionner) :**
- En substituant $\widetilde{U}_1$ dans $f(\widetilde{U}_1)$ et en développant à l'ordre 2 : $f(\widetilde{U}_1) = f(U^n) + \Delta t \cdot f'(U^n) f(U^n) + O(\Delta t^2)$.
- En sommant et divisant par 2, on retrouve exactement le développement de Taylor d'ordre 2 de $U(t_n + \Delta t)$ : $U + \Delta t f + \tfrac{\Delta t^2}{2} f' f + O(\Delta t^3)$.
- **Erreur locale $O(\Delta t^3)$, erreur globale $O(\Delta t^2)$ → ordre 2.**

**Code :**
```python
def heun(param):
    U_n = param.solution_courante.copy()
    f_Un = param.modele(param)
    U_tilde_1 = U_n + param.dt * f_Un
    param.solution_courante[:, :] = U_tilde_1
    f_Ut1 = param.modele(param)
    U_tilde_2 = U_n + param.dt * f_Ut1
    param.solution_courante[:, :] = 0.5 * (U_tilde_1 + U_tilde_2)
```

### 4.3 Comparaison des deux schémas

| | **Euler explicite** | **Heun** |
|---|---|---|
| Ordre | 1 (erreur $O(\Delta t)$) | 2 (erreur $O(\Delta t^2)$) |
| Coût par pas | 1 évaluation de *f* | 2 évaluations de *f* |
| Implémentation | très simple | un peu plus longue |
| Stabilité | conditionnelle (CFL) | conditionnelle (CFL) |

> **Dylan :** « Pour la suite, on a choisi **Euler explicite** car les deux schémas donnent qualitativement le même motif, et Heun coûte le double. C'est crucial pour les modèles 2 et 3 où $n_x$ peut atteindre plusieurs milliers. »

---

## 5. Partie B — Architecture du code [K] — ~3 min

### 5.1 La classe `Param`

> **Kiara :** « Tout est centralisé dans une classe Python `Param` qui regroupe les paramètres de discrétisation, les paramètres physiques, les conditions initiales, et même des **pointeurs de fonctions** pour choisir le modèle et le schéma. »

**Attributs principaux :**
- **Discrétisation** : `nx`, `nt`, `dx`, `dt`, `L`, `T`, tableaux `x` et `t`.
- **Solutions** : `solution_courante` et `solution_prec` de forme $(n_x+1) \times d_d$ avec $d_d = 2$ ou $3$.
- **Stockage temporel** : `stocke_a` de forme $(n_t+1) \times (n_x+1)$ — historique complet de l'activateur.
- **Paramètres physiques** : `ra`, `rb`, `rc`, `ba`, `bb`, `Da`, `Db`, `sa`, `sigma_max`.
- **Conditions initiales** : `a0`, `b0`, `c0`.
- **Sources spatiales** : `s` (aléatoire), `sigma` (périodique pour modèle 2).
- **Fonctions modèle/schéma** : `param.modele = modele_activateur_inhibiteur`, `param.schema = euler_explicite`.

### 5.2 La fonction `initialisation`

**Étapes :**
1. Construire les grilles `x` et `t` via `tabx` et `tabtemps`.
2. Tirer la **source aléatoire** : `s(x) = 0.08·ra·rand + 0.96·ra` — fluctuations ±8 % autour de la valeur moyenne.
3. Pour le modèle 2 uniquement : construire $\sigma(x) = \sigma_{\max} \cdot |\sin(4\pi x/n_x)|$.
4. Initialiser les solutions à des valeurs **homogènes** ($a_0$, $b_0$, $c_0$).
5. **Activation aléatoire** : on impose $a = 1$ sur **30 cellules réparties aléatoirement** — ce sont les "graines" qui vont déclencher les motifs.

### 5.3 La boucle principale `main_run_exec`

```python
def main_run_exec(param):
    initialisation(param)
    param.stocke_a = np.zeros((param.nt + 1, param.nx + 1))
    param.stocke_a[0] = param.solution_courante[:, 0]

    for n in range(1, param.nt + 1):
        param.schema(param)                                     # 1 pas
        param.solution_prec[:, :] = param.solution_courante[:, :]
        param.stocke_a[n] = param.solution_courante[:, 0]       # historique

    # tracé final
```

> **Kiara :** « À chaque itération, on appelle simplement `param.schema(param)` — qui est soit `euler_explicite`, soit `heun`. Ce schéma appelle à son tour `param.modele(param)` qui calcule le second membre $f$. Cette architecture permet de **changer de modèle ou de schéma sans toucher à la boucle**. »

---

## 6. Partie C/D/E — Résultats des simulations [K] — ~5 min

> **Kiara :** « On peut maintenant lancer les simulations et observer les motifs émerger. »

### 6.1 Modèle 1 — *Cepaea nemoralis* (3 cas)

**Paramètres communs :** $r_a = 0.05$, $r_b = 0.08$, $a_0 = b_0 = 1.5$, $n_x = 100$, $n_t = 1000$.

| Cas | $D_a$ | $D_b$ | $D_b/D_a$ | Motif observé |
|---|---|---|---|---|
| 1 | 0.001 | 0.40 | 400 | Rayures **fines, irrégulières** |
| 2 | 0.015 | 0.40 | ~27 | Rayures **épaisses, régulières** |
| 3 | 0.050 | 0.30 | 6 | Rayures **larges, irrégulières** |

**Analyse :**
- **Cas 1** : l'activateur diffuse très peu → pics localisés et fins, espacés par la longue portée de l'inhibiteur.
- **Cas 2** : équilibre idéal → motif quasi-périodique, c'est le motif typique de *Cepaea*.
- **Cas 3** : la condition $D_a \ll D_b$ est moins respectée → la sélection de longueur d'onde se dégrade, espacement irrégulier.

### 6.2 Modèle 2 — *Amoria undulata*

**Paramètres :** $r_a = 0.10$, $b_a = 0.005$, $D_a = 0.004$, $D_b = 0$, $s_a = 1$, $\sigma_{\max} = 0.012$, $n_x = 2000$, $n_t = 4000$.

**Observations :**
- Le profil $\sigma(x)$ périodique fixe les **positions privilégiées** où le substrat est abondant.
- L'activateur s'y installe, consomme le substrat, le substrat se reconstitue ailleurs → les pics **glissent latéralement** au fil du temps.
- Résultat : des **lignes obliques et ondulantes** dans le diagramme espace-temps, exactement comme sur la coquille réelle.

### 6.3 Modèle 3 — *Oliva porphyria*

**Paramètres :** $r_a = 0.10$, $r_b = 0.014$, $r_c = 0.10$, $b_b = 0.10$, $D_a = 0.015$, $s_a = 0.25$, $a_0 = 0$, $b_0 = c_0 = 0.10$, $n_x = 1000$, $n_t = 5000$.

**Observations :**
- Les ondes d'activation **se propagent** dans les deux sens.
- Quand deux ondes se rencontrent, elles **s'annihilent** (chacune épuise le substrat de l'autre) → forme un **chevron en « > »**.
- L'**hormone *c*** — variable globale — empêche les ondes de proliférer : elle régule le nombre total de fronts actifs.
- Résultat : motif en chevrons réguliers, signature visuelle d'*Oliva porphyria*.

---

## 7. Étude de convergence [D] — ~3 min

> **Dylan :** « En bonus, on a fait une **étude de convergence en temps** comparant Euler et Heun, dans l'esprit des séances de TP. »

### 7.1 Protocole

- $T = 50$, $n_x = 100$ fixés. On fait varier $n_t \in \{50, 100, 200, 400, 800\}$ par doublement → $\Delta t = T/n_t$.
- Pour chaque $n_t$, on lance la simulation et on récupère $a(\cdot, T)$.
- **Solution de référence** = celle obtenue avec le $n_t$ le plus fin.
- **Erreur** = norme euclidienne $\|a^{(n_t)} - a^{\text{ref}}\|_2$.

### 7.2 Tracé en log-log

On trace $\log_2(\text{erreur})$ vs $\log_2(n_t)$. La pente $\alpha$ donne l'ordre :
$$\text{erreur} \sim n_t^{-\alpha} = (\Delta t)^\alpha$$

**Calcul de l'ordre par régression linéaire :**
```python
def OrdreConv(ite, err):
    ite_log = np.log(ite) / np.log(2)
    err_log = np.log(err) / np.log(2)
    alpha = np.cov(ite_log, err_log, bias=True)[0,1] / np.var(ite_log)
    return abs(alpha)
```

### 7.3 Résultats attendus

- **Euler explicite** : pente proche de **1** (théorique : 1).
- **Heun** : pente proche de **2** (théorique : 2).
- À $n_t$ fixé, **Heun est nettement plus précis** que Euler — confirmé par la courbe rouge sous la courbe bleue.

> **Dylan :** « C'est exactement ce qu'on attend de la théorie : Heun gagne un ordre au prix d'un coût doublé. Pour des temps longs ou des précisions élevées, Heun devient avantageux ; pour notre étude qualitative des motifs à $\Delta t = 1$, Euler suffit largement. »

---

## 8. Conclusion [D+K] — ~1 min

> **Kiara :** « Pour conclure, on a vu qu'**un système simple de réaction-diffusion** suffit à reproduire la diversité des motifs pigmentaires observés sur les coquillages. »

> **Dylan :** « Numériquement, on a discrétisé les EDPs par **différences finies centrées avec conditions périodiques**, et résolu le système d'EDOs résultant par **Euler explicite** et **Heun**. L'étude de convergence confirme les ordres théoriques 1 et 2. »

> **Kiara :** « Ce projet illustre comment l'**analyse numérique** permet de relier un phénomène biologique observable à un modèle mathématique précis et calculable. Merci de votre attention, on est prêts pour vos questions. »

---

## ANNEXES — Backups & FAQ

### A. Questions probables du jury / public

#### A.1 « Pourquoi $D_a \ll D_b$ est-il nécessaire ? Que se passe-t-il sinon ? »

**Réponse [K] :** C'est la **condition d'instabilité de Turing**. Sans diffusion, l'état homogène $(a^*, b^*)$ est stable. La diffusion peut le déstabiliser **uniquement** si l'inhibiteur diffuse beaucoup plus vite que l'activateur. Intuitivement : un petit pic d'activateur s'amplifie localement (autocatalyse) tant que l'inhibiteur n'a pas eu le temps d'arriver ; mais l'inhibiteur, qui diffuse plus vite, va **étouffer les pics voisins**, créant ainsi des zones d'ombre régulièrement espacées. Si $D_a \approx D_b$, l'inhibiteur tue le pic en même temps qu'il se forme → état homogène uniforme, **pas de motif**.

#### A.2 « Pourquoi des conditions aux limites périodiques ? »

**Réponse [D] :** La coquille croît en **spirale** : le bord de croissance est topologiquement une boucle fermée. Quand on déroule cette boucle sur l'axe *x*, le point $x = 0$ et le point $x = L_x$ sont **physiquement le même point**. C'est exactement ce qu'imposent les CL périodiques. L'utilisation de `np.roll` réalise cela en une ligne, élégamment.

#### A.3 « Pourquoi tirer une source $s(x)$ aléatoire ? »

**Réponse [K] :** Si $s(x)$ était strictement uniforme et que l'état initial était parfaitement homogène, le système resterait éternellement homogène (par symétrie). Les **petites fluctuations** ±8 % de $s(x)$ jouent le rôle du **bruit naturel** des cellules biologiques : elles brisent la symétrie initiale et permettent à certaines positions de se "spécialiser" plus tôt que d'autres, faisant émerger le motif.

#### A.4 « Pourquoi le modèle 3 a-t-il une variable scalaire *c* et pas spatiale ? »

**Réponse [K] :** Biologiquement, *c* représente une **hormone** qui circule rapidement dans tout l'organisme — sa concentration s'homogénéise instantanément à l'échelle du processus. Mathématiquement, on évite donc de discrétiser une diffusion infiniment rapide. *c(t)* dépend des autres variables via une **moyenne spatiale** : $\dfrac{1}{L_x}\int_0^{L_x} r_c\, a\, dx$, qu'on calcule numériquement par `np.mean(rc*a)` ou `np.sum(rc*a)/nx`.

#### A.5 « Pourquoi avoir choisi Euler explicite plutôt que Heun pour les simulations finales ? »

**Réponse [D] :** Trois raisons :
1. À $\Delta t = 1$, les deux schémas donnent **qualitativement le même motif** — l'œil ne les distingue pas.
2. Heun coûte le **double** (deux évaluations de *f* par pas).
3. Pour les modèles 2 et 3, $n_x$ atteint plusieurs milliers et $n_t$ aussi → l'écart de coût devient prohibitif.

L'étude de convergence reste précieuse pour **valider** les implémentations et confirmer les ordres théoriques.

#### A.6 « Quelle est la condition de stabilité (CFL) d'Euler explicite pour la diffusion ? »

**Réponse [D] :** Pour l'équation $\partial u/\partial t = D \partial^2 u/\partial x^2$ discrétisée par Euler explicite + différences finies centrées, la **condition CFL** est :
$$\frac{D \Delta t}{\Delta x^2} \leq \frac{1}{2}$$

Avec $\Delta x = \Delta t = 1$ et notre $D_b = 0.40$, on a $D_b \Delta t/\Delta x^2 = 0.40 < 0.5$ → **stable**. Pour $D_b > 0.5$, il faudrait réduire $\Delta t$.

#### A.7 « Comment l'erreur globale est-elle reliée à l'erreur locale ? »

**Réponse [D] :** Pour un schéma à un pas appliqué sur $[0, T]$ : si l'erreur locale est $O(\Delta t^{p+1})$ et qu'on fait $n_t = T/\Delta t$ pas, alors l'erreur globale est de l'ordre $n_t \cdot O(\Delta t^{p+1}) = O(\Delta t^p)$ — c'est **l'ordre du schéma**. Donc :
- Euler : local $O(\Delta t^2)$ → global $O(\Delta t)$ → ordre 1.
- Heun : local $O(\Delta t^3)$ → global $O(\Delta t^2)$ → ordre 2.

#### A.8 « Comment passe-t-on de l'EDP à l'EDO ? »

**Réponse [D] :** C'est la **méthode des lignes** (*method of lines*). On discrétise **uniquement en espace** d'abord : chaque inconnue $a(x_i, t)$ devient $a_i(t)$, fonction du temps seul. Le Laplacien discret transforme alors le système d'EDPs en un grand système d'EDOs couplées, qu'on résout ensuite par n'importe quel intégrateur temporel (Euler, Heun, RK4, etc.). C'est la stratégie qu'on applique ici.

#### A.9 « Pourquoi le terme $a^2$ et pas $a$ dans l'autocatalyse ? »

**Réponse [K] :** L'autocatalyse en $a^2$ représente une **réaction bimoléculaire** : il faut *deux molécules d'activateur* pour catalyser la production d'une troisième. Cette non-linéarité quadratique est essentielle : avec un terme linéaire en $a$, le système serait stable et ne formerait pas de pics. C'est la non-linéarité qui crée les **structures spatiales discrètes** (pics localisés au lieu d'un profil sinusoïdal).

#### A.10 « Que représente concrètement `stocke_a` et pourquoi le stocke-t-on ? »

**Réponse [K] :** `stocke_a` est une matrice $(n_t+1) \times (n_x+1)$ qui contient l'**historique complet** de l'activateur : chaque ligne est un "cliché" de $a(x, t_n)$ à un instant $t_n$. On le stocke pour pouvoir tracer le **diagramme espace-temps** à la fin — c'est ce diagramme qui ressemble au motif réel de la coquille (l'axe temps correspond à la **direction de croissance** de la coquille).

#### A.11 « Quelle est la complexité du calcul ? »

**Réponse [D] :** À chaque pas de temps, on effectue $O(n_x)$ opérations (vectorisation NumPy). On a $n_t$ pas. Donc complexité totale : **$O(n_x \cdot n_t)$**. Pour le modèle 1 ($n_x = 100$, $n_t = 1000$) c'est instantané. Pour le modèle 3 ($n_x = 1000$, $n_t = 5000$) c'est environ 5 millions d'opérations vectorielles, soit quelques secondes.

#### A.12 « Pourquoi `np.maximum(b, 1e-10)` ? »

**Réponse [D] :** Protection numérique. Dans (1.a), on divise par *b*. Si *b* devient nul ou négatif (par accumulation d'erreurs d'arrondi ou par décroissance non-physique), on aurait une division par zéro. Le clamp à `1e-10` garantit qu'on ne plante pas la simulation. Idem pour *c* dans le modèle 3.

### B. Équations clés à connaître par cœur

**Différences finies centrées :**
$$q''(x_i) \approx \frac{q_{i+1} - 2q_i + q_{i-1}}{\Delta x^2} \quad \text{erreur} = O(\Delta x^2)$$

**Euler explicite :**
$$U^{n+1} = U^n + \Delta t \cdot f(U^n)$$

**Heun :**
$$U^{n+1} = U^n + \frac{\Delta t}{2}\left[f(U^n) + f\left(U^n + \Delta t f(U^n)\right)\right]$$

**Condition de Turing :** $D_a \ll D_b$.

**Méthode des lignes :** EDP → discrétisation spatiale → système d'EDOs → intégration temporelle.

### C. Tableau récapitulatif des paramètres

| Paramètre | Modèle 1 | Modèle 2 | Modèle 3 |
|---|---|---|---|
| $r_a$ | 0.05 | 0.10 | 0.10 |
| $r_b$ | 0.08 | 0.00 | 0.014 |
| $r_c$ | — | — | 0.10 |
| $b_a$ | 0.00 | 0.005 | 0.00 |
| $b_b$ | 0.00 | 0.00 | 0.10 |
| $D_a$ | 0.001 → 0.05 | 0.004 | 0.015 |
| $D_b$ | 0.40 → 0.30 | 0.00 | 0.00 |
| $s_a$ | — | 1.00 | 0.25 |
| $\sigma_{\max}$ | — | 0.012 | — |
| $a_0$ | 1.50 | 0.50 | 0.00 |
| $b_0$ | 1.50 | 0.50 | 0.10 |
| $c_0$ | — | — | 0.10 |
| $n_x$ | 100 | 2000 | 1000 |
| $n_t$ | 1000 | 4000 | 5000 |

### D. Si on est à court de temps (version 10 min)

Sauter les sections : **3.2** (démo des différences finies), **4.1/4.2** (démos d'ordre), **6.1 cas 3**, **7** (convergence). Garder l'intro, les 3 modèles en mode survol, l'architecture du code, les motifs visuels.

### E. Si on a du temps en plus (questions abondantes)

- Évoquer les **alternatives numériques** : RK4 (ordre 4), schémas implicites (inconditionnellement stables mais demandent à résoudre un système linéaire), schémas spectraux (très précis pour les CL périodiques).
- Évoquer les **autres motifs naturels** modélisés par Turing : taches du léopard, rayures du zèbre, doigts de la main embryonnaire.
- Mentionner le **fait historique** : Alan Turing a publié l'article fondateur "*The Chemical Basis of Morphogenesis*" en **1952**, c'est l'un des premiers articles de biomathématiques modernes.

---

## Vérification (avant l'oral)

- [ ] Relancer le notebook [PROJET_Dylan_Perinetti_Correction.ipynb](Maths/projet/PROJET_Dylan_Perinetti_Correction.ipynb) et vérifier que toutes les cellules s'exécutent sans erreur.
- [ ] Préparer **3 captures d'écran** : motif modèle 1 cas 2, motif modèle 2 (zoom ondulations), motif modèle 3 (zoom chevrons).
- [ ] Préparer **1 capture** des courbes de convergence (cellule 39 du notebook).
- [ ] Tester le timing : faire un essai à blanc à deux pour confirmer ~26 min.
- [ ] Préparer une **slide d'équations** pour les 3 modèles (sinon écrire au tableau).
- [ ] Avoir ouverts en arrière-plan : le notebook + le sujet pour pouvoir répondre aux questions techniques très précises.
