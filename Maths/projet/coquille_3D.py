#!/usr/bin/env python3
"""
Visualisation 3D des motifs de coquillages — Modèle de Meinhardt
=================================================================
Lancer :  python3 coquille_3D.py

Principe de la projection (Meinhardt) :
  - x  (espace, horizontal dans le graphe espace-temps)
      → UNE SEULE révolution θ ∈ [0, 2π] autour du cône
  - t  (temps, vertical dans le graphe espace-temps)
      → direction de croissance : apex (t=0) → ouverture (t=T)
  - a(x,t) → couleur du pigment sur la surface

Géométries disponibles :
  cone_droit      : cône allongé droit (Amoria, Lyria)
  cone_convexe    : profil convexe légèrement bombé (Oliva)
  escargot        : coquille planispirale hélicoïdale (Cepaea)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from mpl_toolkits.mplot3d import Axes3D   # noqa: F401
import warnings
warnings.filterwarnings('ignore')


# =============================================================================
#  SIMULATION DES 3 MODÈLES
# =============================================================================

def _diff(q):
    """d²q/dx² différences finies centrées, CL périodiques, dx=1."""
    return np.roll(q, -1) - 2 * q + np.roll(q, 1)


def simuler_modele_1(nx=200, nt=600,
                     ra=0.05, rb=0.08, ba=0., bb=0.,
                     Da=0.015, Db=0.40,
                     a0=1.5, b0=1.5, seed=0):
    """Activateur-inhibiteur → lignes droites (Cepaea / Lyria)."""
    np.random.seed(seed)
    s = 0.08 * ra * np.random.rand(nx + 1) + 0.96 * ra
    a = np.full(nx + 1, a0); b = np.full(nx + 1, b0)
    i = 1
    for _ in range(30):
        a[i] = 1.; i += np.random.randint(0, 101)
        if i > nx: break
    out = np.zeros((nt + 1, nx + 1)); out[0] = a
    for n in range(nt):
        fa = s * (a**2 / np.maximum(b, 1e-10) + ba) - ra*a + Da*_diff(a)
        fb = s * a**2 + bb - rb*b + Db*_diff(b)
        a += fa; b += fb; a = np.maximum(a, 0); b = np.maximum(b, 0)
        out[n+1] = a
    return out


def simuler_modele_2(nx=200, nt=600,
                     ra=0.10, rb=0., ba=0.005,
                     Da=0.004, Db=0., sa=1., sigma_max=0.012,
                     a0=0.5, b0=0.5, seed=1):
    """Activateur-substrat → lignes ondulantes (Amoria undulata)."""
    np.random.seed(seed)
    s = 0.08 * ra * np.random.rand(nx + 1) + 0.96 * ra
    x_arr = np.arange(nx + 1)
    sigma = sigma_max * np.abs(np.sin(4 * np.pi * x_arr / nx))
    a = np.full(nx + 1, a0); b = np.full(nx + 1, b0)
    i = 1
    for _ in range(30):
        a[i] = 1.; i += np.random.randint(0, 101)
        if i > nx: break
    out = np.zeros((nt + 1, nx + 1)); out[0] = a
    for n in range(nt):
        at2 = a**2 / (1 + sa*a**2) + ba
        fa = s*b*at2 - ra*a + Da*_diff(a)
        fb = sigma - s*b*at2 - rb*b + Db*_diff(b)
        a += fa; b += fb; a = np.maximum(a, 0); b = np.maximum(b, 0)
        out[n+1] = a
    return out


def simuler_modele_3(nx=200, nt=800,
                     ra=0.10, rb=0.014, rc=0.10, bb=0.10,
                     Da=0.015, Db=0., sa=0.25,
                     a0=0., b0=0.10, c0=0.10, seed=2):
    """Activateur-inhibiteur-hormone → ondes en '>' (Oliva porphyria)."""
    np.random.seed(seed)
    s = 0.08 * ra * np.random.rand(nx + 1) + 0.96 * ra
    a = np.full(nx + 1, a0); b = np.full(nx + 1, b0); c = c0
    i = 1
    for _ in range(30):
        a[i] = 1.; i += np.random.randint(0, 101)
        if i > nx: break
    out = np.zeros((nt + 1, nx + 1)); out[0] = a
    for n in range(nt):
        cs = max(c, 1e-10)
        ac = s * a**2 / (1 + sa*a**2)
        fa = ac / (bb + b) - ra*a + Da*_diff(a)
        fb = ac - rb*b/cs + Db*_diff(b)
        fc = -rc*c + np.mean(rc*a)
        a += fa; b += fb; c += fc
        a = np.maximum(a, 0); b = np.maximum(b, 0); c = max(c, 1e-10)
        out[n+1] = a
    return out


# =============================================================================
#  GÉOMÉTRIES 3D — principe : x → 1 révolution, t → axe de croissance
# =============================================================================

def _maillage_base(nt, nx):
    """Retourne THETA (nt×nx) et T_NORM (nt×nx) pour toutes les géométries."""
    # endpoint=False : le dernier point en θ = 0 et le premier coincident
    theta = np.linspace(0, 2 * np.pi, nx, endpoint=False)
    t_norm = np.linspace(0, 1, nt)
    return np.meshgrid(theta, t_norm)          # THETA, T (nt × nx)


def geo_cone_droit(nt, nx, hauteur=5.0, R_base=1.0, R_apex=0.04):
    """
    Cône droit allongé (type Amoria, Lyria).
    L'apex (t=0, ancien) est en BAS, l'ouverture (t=T, récent) est en HAUT.
    """
    THETA, T = _maillage_base(nt, nx)
    R = R_apex + (R_base - R_apex) * T        # rayon croissant vers le haut
    Z = hauteur * T
    return R * np.cos(THETA), R * np.sin(THETA), Z


def geo_cone_convexe(nt, nx, hauteur=4.5, R_max=1.0, R_apex=0.05):
    """
    Profil convexe : le rayon max est atteint aux 2/3 de la hauteur,
    puis se referme légèrement vers l'ouverture (type Oliva).
    """
    THETA, T = _maillage_base(nt, nx)
    # Profil en cloche : R(t) ~ sin^0.6(π*t) * R_max avec un minimum aux extrémités
    profil = np.sin(np.pi * T) ** 0.55
    R = R_apex + (R_max - R_apex) * profil
    Z = hauteur * T
    return R * np.cos(THETA), R * np.sin(THETA), Z


def geo_escargot(nt, nx, n_tours=3.5, b_helix=0.10, r_tube_0=0.08):
    """
    Coquille planispirale hélicoïdale (type Cepaea nemoralis).
    - t → angle de la spirale (plusieurs tours)
    - x → angle autour du tube toroïdal

    Chaque anneau du tube porte une ligne du motif (x).
    """
    theta_coil = np.linspace(0, 2 * np.pi * n_tours, nt)
    phi_tube   = np.linspace(0, 2 * np.pi, nx, endpoint=False)
    THETA, PHI = np.meshgrid(theta_coil, phi_tube, indexing='ij')   # (nt, nx)

    # Spirale logarithmique
    R_coil = np.exp(b_helix * THETA)
    r_tube = r_tube_0 * np.exp(b_helix * THETA / 2)

    X = (R_coil + r_tube * np.cos(PHI)) * np.cos(THETA)
    Y = (R_coil + r_tube * np.cos(PHI)) * np.sin(THETA)
    Z = r_tube * np.sin(PHI) + b_helix * THETA * R_coil * 0.3
    return X, Y, Z


# =============================================================================
#  COULEUR
# =============================================================================

def pigment(stocke_a, cmap_name='bone', inverse=True):
    """
    Convertit stocke_a en tableau RGBA.
    inverse=True : fort activateur → pigment sombre (comme sur les vraies coquilles).
    """
    mn, mx = stocke_a.min(), stocke_a.max()
    n = (stocke_a - mn) / (mx - mn + 1e-12)
    if inverse:
        n = 1.0 - n
    return cm.get_cmap(cmap_name)(n)


# =============================================================================
#  TRACÉ
# =============================================================================

def afficher(X, Y, Z, facecolors, titre='', elev=25, azim=40, ax=None):
    standalone = (ax is None)
    if standalone:
        fig = plt.figure(figsize=(9, 9))
        ax  = fig.add_subplot(111, projection='3d')

    ax.plot_surface(X, Y, Z, facecolors=facecolors,
                    rstride=1, cstride=1,
                    linewidth=0, antialiased=True, shade=True)
    ax.set_axis_off()
    ax.set_title(titre, fontsize=12, pad=12)
    ax.view_init(elev=elev, azim=azim)

    # Égaliser les axes (aucune déformation)
    pts = np.array([X.ravel(), Y.ravel(), Z.ravel()])
    centre = pts.mean(axis=1)
    demi   = (pts.max(axis=1) - pts.min(axis=1)).max() / 2
    ax.set_xlim(centre[0]-demi, centre[0]+demi)
    ax.set_ylim(centre[1]-demi, centre[1]+demi)
    ax.set_zlim(centre[2]-demi, centre[2]+demi)

    if standalone:
        plt.tight_layout()
    return ax


# =============================================================================
#  MAIN
# =============================================================================

if __name__ == '__main__':

    print("Simulation et visualisation 3D des coquillages de Meinhardt\n")

    # ------------------------------------------------------------------
    # Modèle 1 — Cepaea nemoralis : lignes droites
    # Géométrie escargot (planispirale) + cône pour la vue dépliée
    # ------------------------------------------------------------------
    print("[1/3] Modèle 1 — Cepaea nemoralis …", end=' ', flush=True)
    S1 = simuler_modele_1(nx=200, nt=500, Da=0.015, Db=0.40, seed=0)
    col1 = pigment(S1, 'bone',   inverse=True)    # brun-blanc
    print("OK")

    X1s, Y1s, Z1s = geo_escargot(S1.shape[0], S1.shape[1],
                                  n_tours=3.5, b_helix=0.10, r_tube_0=0.08)
    X1c, Y1c, Z1c = geo_cone_droit(S1.shape[0], S1.shape[1],
                                    hauteur=5.0, R_base=0.8, R_apex=0.04)

    fig1, axes1 = plt.subplots(1, 2, figsize=(14, 7),
                                subplot_kw={'projection': '3d'})
    afficher(X1s, Y1s, Z1s, col1,
             titre='Cepaea nemoralis\n(coquille spiralée)', ax=axes1[0],
             elev=20, azim=30)
    afficher(X1c, Y1c, Z1c, col1,
             titre='Cepaea nemoralis\n(vue dépliée sur cône)', ax=axes1[1],
             elev=25, azim=45)
    fig1.suptitle("Modèle 1 — activateur-inhibiteur (Da=0.015, Db=0.40)",
                  fontsize=13)
    plt.tight_layout()
    plt.savefig('coquille_modele1.png', dpi=150, bbox_inches='tight')
    print("   → coquille_modele1.png")

    # ------------------------------------------------------------------
    # Modèle 2 — Amoria undulata : lignes ondulantes
    # Géométrie cône droit allongé
    # ------------------------------------------------------------------
    print("[2/3] Modèle 2 — Amoria undulata …", end=' ', flush=True)
    S2 = simuler_modele_2(nx=200, nt=500, seed=1)
    col2 = pigment(S2, 'YlOrBr', inverse=True)   # jaune-brun naturel
    print("OK")

    X2, Y2, Z2 = geo_cone_droit(S2.shape[0], S2.shape[1],
                                 hauteur=5.5, R_base=0.9, R_apex=0.04)

    fig2, ax2 = plt.subplots(1, 1, figsize=(7, 9),
                              subplot_kw={'projection': '3d'})
    afficher(X2, Y2, Z2, col2,
             titre='Amoria undulata\nModèle 2 — activateur-substrat',
             ax=ax2, elev=20, azim=50)
    plt.tight_layout()
    plt.savefig('coquille_modele2.png', dpi=150, bbox_inches='tight')
    print("   → coquille_modele2.png")

    # ------------------------------------------------------------------
    # Modèle 3 — Oliva porphyria : ondes en ">"
    # Géométrie convexe (profil ovale fermé)
    # ------------------------------------------------------------------
    print("[3/3] Modèle 3 — Oliva porphyria …", end=' ', flush=True)
    S3 = simuler_modele_3(nx=200, nt=600, seed=2)
    col3 = pigment(S3, 'copper', inverse=True)    # teinte cuivrée
    print("OK")

    X3, Y3, Z3 = geo_cone_convexe(S3.shape[0], S3.shape[1],
                                   hauteur=4.5, R_max=1.0, R_apex=0.05)

    fig3, ax3 = plt.subplots(1, 1, figsize=(7, 9),
                              subplot_kw={'projection': '3d'})
    afficher(X3, Y3, Z3, col3,
             titre='Oliva porphyria\nModèle 3 — activateur-inhibiteur-hormone',
             ax=ax3, elev=20, azim=50)
    plt.tight_layout()
    plt.savefig('coquille_modele3.png', dpi=150, bbox_inches='tight')
    print("   → coquille_modele3.png")

    # ------------------------------------------------------------------
    # Vue d'ensemble : motif 2D (contour) + coquille 3D côte à côte
    # ------------------------------------------------------------------
    print("Composition ensemble …", end=' ', flush=True)
    fig_all = plt.figure(figsize=(20, 12))

    donnees = [
        (S1, X1c, Y1c, Z1c, col1, 'bone',   True,
         'Modèle 1 — Cepaea nemoralis\n(lignes droites)'),
        (S2, X2,  Y2,  Z2,  col2, 'YlOrBr', True,
         'Modèle 2 — Amoria undulata\n(lignes ondulantes)'),
        (S3, X3,  Y3,  Z3,  col3, 'copper', True,
         'Modèle 3 — Oliva porphyria\n(ondes en ">")'),
    ]

    for col_idx, (S, X, Y, Z, coul, cmap, inv, titre) in enumerate(donnees):
        # --- Motif 2D (contour espace-temps) ---
        ax2d = fig_all.add_subplot(2, 3, col_idx + 1)
        mn, mx = S.min(), S.max()
        sn = (S - mn) / (mx - mn + 1e-12)
        if inv:
            sn = 1.0 - sn
        ax2d.imshow(sn, aspect='auto', cmap=cmap, origin='lower',
                    extent=[0, S.shape[1], 0, S.shape[0]])
        ax2d.set_xlabel('position (x)')
        ax2d.set_ylabel('temps (t)')
        ax2d.set_title(titre + '\n— motif 2D', fontsize=10)

        # --- Coquille 3D ---
        ax3d = fig_all.add_subplot(2, 3, col_idx + 4, projection='3d')
        afficher(X, Y, Z, coul, titre=titre + '\n— coquille 3D',
                 ax=ax3d, elev=22, azim=40 + col_idx * 15)

    fig_all.suptitle(
        "Motifs pigmentaires de coquillages — Modèle de Meinhardt\n"
        "Haut : contour espace-temps   |   Bas : projection sur coquille 3D",
        fontsize=13, y=1.01
    )
    plt.tight_layout()
    plt.savefig('coquilles_ensemble.png', dpi=150, bbox_inches='tight')
    print("OK\n   → coquilles_ensemble.png")

    print("\nTerminé ! Affichage …")
    plt.show()
