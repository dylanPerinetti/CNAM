# Fiches de révision — Mécanique des fluides

## 🎯 Formules à connaître par cœur

### Constantes physiques utiles
| Grandeur | Valeur |
|----------|--------|
| g | 9.81 m/s² |
| ρ_eau (20°C) | 1000 kg/m³ |
| ρ_air (20°C, 1 atm) | 1.2 kg/m³ |
| μ_eau (20°C) | 1.0 × 10⁻³ Pa·s |
| μ_air (20°C) | 1.8 × 10⁻⁵ Pa·s |
| ν_eau | 10⁻⁶ m²/s |
| ν_air | 1.5 × 10⁻⁵ m²/s |
| p_atm | 101 325 Pa ≈ 1.013 bar |
| c_son (air, 20°C) | 343 m/s |

### Statique
- p₂ − p₁ = −ρg(z₂ − z₁)
- F_Archimède = ρ_fluide · V_déplacé · g

### Cinématique
- D/Dt = ∂/∂t + (u·∇)
- ∇·u = 0 (incompressible)
- Q = ∫∫ u·n dS

### Bilans
- Continuité (locale) : ∂ρ/∂t + ∇·(ρu) = 0
- Conservation du débit : ρ₁S₁V₁ = ρ₂S₂V₂
- Qté de mouvement (locale) : ρ·Du/Dt = ρg − ∇p + ∇·τ

### Bernoulli (5 hypothèses : parfait, stationnaire, incompressible, force conservative, ligne de courant)
- p/ρ + V²/2 + gz = cste
- p/(ρg) + V²/(2g) + z = H = cste
- Torricelli : V = √(2gh)
- Pression dynamique : ½ρV²

### Pertes de charge
- Régulières : ΔH = λ·(L/D)·V²/(2g)
- Singulières : ΔH = K·V²/(2g)
- Laminaire : λ = 64/Re

### Navier-Stokes incompressible
- ρ·Du/Dt = −∇p + μΔu + ρg
- Adhérence sur paroi : u = u_paroi
- Poiseuille (conduite) : Q = πR⁴/(8μL)·(p₁−p₂)

### Aérodynamique
- C_L = L / (½ρV²S), C_D = D / (½ρV²S)
- Kutta-Joukowski : L' = ρV_∞·Γ
- Stokes (sphère) : F = 6πμRV

### Nombres sans dimension
- **Reynolds** : Re = ρVL/μ = VL/ν
- **Mach** : Ma = V/c
- **Froude** : Fr = V/√(gL)
- **Strouhal** : St = fL/V
- **Weber** : We = ρV²L/σ
- **Prandtl** : Pr = ν/α

---

## 📋 Méthodologie d'examen

### Bilan en volume de contrôle (force sur paroi, jet)
1. Choisir le **volume de contrôle** (englobe l'objet, frontières aux entrées/sorties)
2. Bilan de **masse** : ρ₁S₁V₁ = ρ₂S₂V₂
3. Bilan de **qté de mouvement** vectoriel :
   - Flux de qté de mouvement entrant/sortant : ρV²S
   - Forces de pression sur les sections : pS
   - Forces volumiques : ρgV
   - Effort sur la paroi : F (à déterminer)
4. **Projeter** sur les axes
5. Résoudre

### Bernoulli (vidange, Pitot, Venturi)
1. Vérifier les **hypothèses** (5)
2. Choisir 2 points sur la même ligne de courant
3. Choisir un **référentiel d'altitude** (z = 0 au plus bas)
4. Écrire Bernoulli : p₁ + ½ρV₁² + ρgz₁ = p₂ + ½ρV₂² + ρgz₂
5. Compléter avec **conservation du débit** (S·V = cste) si nécessaire

### Hydraulique en conduite (avec pompe et pertes)
1. Tracer le schéma avec sections (1) et (2)
2. Ligne de charge / Ligne piézométrique
3. Bernoulli généralisé :
   p₁/(ρg) + V₁²/(2g) + z₁ + H_pompe = p₂/(ρg) + V₂²/(2g) + z₂ + ΔH
4. Calculer Re → λ (laminaire ou Moody)
5. ΔH_total = ΣΔH_régulières + ΣΔH_singulières
6. Puissance pompe : P = ρgQH

### Adimensionnement et similitude
1. Identifier toutes les variables et leurs dimensions
2. Vaschy-Buckingham : n−k groupes π
3. Pour la similitude : exprimer égalité des Re, Ma, Fr selon le problème
4. Calcul d'échelles : L_m/L_r, V_m/V_r...

---

## ⚠️ Pièges classiques

1. **Bernoulli avec viscosité** : ne pas oublier les pertes de charge (Bernoulli généralisé)
2. **Unités** : pression en Pa, longueurs en m, masse volumique en kg/m³, viscosité en Pa·s
3. **Vitesse débitante** vs vitesse locale : utiliser V̄ pour les pertes
4. **Pression relative vs absolue** : bien préciser (atm = 0 ou atm = 101 325 Pa)
5. **Surface libre** : V ≈ 0 (grand réservoir), p = p_atm
6. **Direction du flux** : signe de u·n sur les normales sortantes
7. **Reynolds** : bien choisir L (diamètre, corde, longueur de plaque...)
8. **Régime laminaire / turbulent** : vérifier Re avant de choisir λ
9. **Forces de pression** sur surfaces solides : ne pas oublier !

---

## 🧪 Types d'exercices fréquents

| Type | Outil principal |
|------|-----------------|
| Hydrostatique (barrage, paroi) | Intégration de p = ρgz |
| Vidange réservoir | Bernoulli + Torricelli |
| Mesure de vitesse / débit (Pitot, Venturi) | Bernoulli |
| Force sur une paroi (jet, aubage) | Bilan qté de mouvement intégral |
| Conduite avec pertes | Bernoulli généralisé + λ + Moody |
| Pompe / turbine | Bilan énergétique + P = ρgQH |
| Profil parabolique en conduite | NS / Poiseuille |
| Couche limite | Profil de vitesse, frottement à la paroi |
| Similitude maquette | Adimensionnement + Vaschy-Buckingham |

---

## 🚀 Stratégie le jour de l'examen

1. **Lire entièrement** le sujet avant de commencer
2. Faire un **schéma propre** avec les notations utilisées
3. **Lister les hypothèses** (incompressible ? stationnaire ? parfait ?)
4. **Encadrer** les résultats finaux
5. **Vérifier les unités** à la fin
6. **Vérifier l'ordre de grandeur** (V = 100 km/h pour une voiture, p ≈ 1 bar...)
7. Ne pas rester bloqué : passer à la suite et revenir
