#!/usr/bin/env python3
"""
Visualisation 3D des motifs de coquillages — Modèle de Meinhardt
=================================================================
Lance ce script avec :  python3 coquille_3D.py

Ce script simule les motifs pigmentaires avec les 3 modèles de Meinhardt,
puis les projette sur la surface 3D d'une coquille réaliste.

Deux géométries disponibles :
  - cône         : coquille conique (ex. Conus textile)
  - spirale      : coquille spiralée logarithmique (ex. Oliva, Amoria)
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.cm as cm
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401
import warnings
warnings.filterwarnings('ignore')


# =============================================================================
#  SIMULATION (même code que le notebook, auto-contenu)
# =============================================================================

def _diffusion(q, dx):
    """d²q/dx² par différences finies centrées, CL périodiques."""
    return (np.roll(q, -1) - 2 * q + np.roll(q, 1)) * dx ** 2


def simuler_modele_1(nx=150, nt=800,
                     ra=0.05, rb=0.08, ba=0.0, bb=0.0,
                     Da=0.015, Db=0.40,
                     a0=1.5, b0=1.5, seed=42):
    """
    Modèle activateur-inhibiteur (motifs en lignes droites).
    Retourne stocke_a : tableau (nt+1) x (nx+1) de concentrations d'activateur.
    """
    np.random.seed(seed)
    dx = dt = 1.0
    s = 0.08 * ra * np.random.rand(nx + 1) + 0.96 * ra

    a = np.full(nx + 1, a0, dtype=float)
    b = np.full(nx + 1, b0, dtype=float)

    # Activation initiale aléatoire
    i = 1
    for _ in range(30):
        a[i] = 1.0
        i += np.random.randint(0, 101)
        if i > nx:
            break

    stocke_a = np.zeros((nt + 1, nx + 1))
    stocke_a[0] = a.copy()

    for _ in range(nt):
        b_safe = np.maximum(b, 1e-10)
        fa = s * (a ** 2 / b_safe + ba) - ra * a + Da * _diffusion(a, dx)
        fb = s * a ** 2 + bb - rb * b + Db * _diffusion(b, dx)
        a += dt * fa
        b += dt * fb
        a = np.maximum(a, 0.0)
        b = np.maximum(b, 0.0)
        stocke_a[_ + 1] = a.copy()

    return stocke_a


def simuler_modele_2(nx=500, nt=1000,
                     ra=0.10, rb=0.00, ba=0.005,
                     Da=0.004, Db=0.00, sa=1.00, sigma_max=0.012,
                     a0=0.5, b0=0.5, seed=1):
    """
    Modèle activateur-substrat (motifs en lignes ondulantes).
    """
    np.random.seed(seed)
    dx = dt = 1.0
    s = 0.08 * ra * np.random.rand(nx + 1) + 0.96 * ra
    x_arr = np.arange(nx + 1)
    sigma = sigma_max * np.abs(np.sin(4 * np.pi * x_arr / nx))

    a = np.full(nx + 1, a0, dtype=float)
    b = np.full(nx + 1, b0, dtype=float)

    i = 1
    for _ in range(30):
        a[i] = 1.0
        i += np.random.randint(0, 101)
        if i > nx:
            break

    stocke_a = np.zeros((nt + 1, nx + 1))
    stocke_a[0] = a.copy()

    for n in range(nt):
        a_tilde_sq = a ** 2 / (1 + sa * a ** 2) + ba
        fa = s * b * a_tilde_sq - ra * a + Da * _diffusion(a, dx)
        fb = sigma - s * b * a_tilde_sq - rb * b + Db * _diffusion(b, dx)
        a += dt * fa
        b += dt * fb
        a = np.maximum(a, 0.0)
        b = np.maximum(b, 0.0)
        stocke_a[n + 1] = a.copy()

    return stocke_a


def simuler_modele_3(nx=300, nt=1500,
                     ra=0.10, rb=0.014, rc=0.10, bb=0.10,
                     Da=0.015, Db=0.00, sa=0.25,
                     a0=0.0, b0=0.10, c0=0.10, seed=2):
    """
    Modèle activateur-inhibiteur-hormone (ondes en collision, motif ">").
    """
    np.random.seed(seed)
    dx = dt = 1.0
    s = 0.08 * ra * np.random.rand(nx + 1) + 0.96 * ra

    a = np.full(nx + 1, a0, dtype=float)
    b = np.full(nx + 1, b0, dtype=float)
    c = c0

    i = 1
    for _ in range(30):
        a[i] = 1.0
        i += np.random.randint(0, 101)
        if i > nx:
            break

    stocke_a = np.zeros((nt + 1, nx + 1))
    stocke_a[0] = a.copy()

    for n in range(nt):
        c_safe = max(c, 1e-10)
        autocatal = s * a ** 2 / (1 + sa * a ** 2)
        fa = autocatal / (bb + b) - ra * a + Da * _diffusion(a, dx)
        fb = autocatal - rb * b / c_safe + Db * _diffusion(b, dx)
        fc = -rc * c + (1.0 / nx) * np.sum(rc * a)
        a += dt * fa
        b += dt * fb
        c += dt * fc
        a = np.maximum(a, 0.0)
        b = np.maximum(b, 0.0)
        c = max(c, 1e-10)
        stocke_a[n + 1] = a.copy()

    return stocke_a


# =============================================================================
#  GÉOMÉTRIES 3D
# =============================================================================

def geometrie_cone(nt, nx, n_tours=2.5, rayon_base=1.0, rayon_apex=0.06, hauteur=4.0):
    """
    Coquille conique :
      - temps t  → hauteur le long de l'axe (de l'apex vers la base)
      - espace x → angle autour de la circonférence
    """
    theta = np.linspace(0, 2 * np.pi * n_tours, nx)   # angle circumférentiel
    t_norm = np.linspace(0, 1, nt)                      # [0=apex, 1=base]

    THETA, T = np.meshgrid(theta, t_norm)              # (nt, nx)

    R = rayon_apex + (rayon_base - rayon_apex) * T     # rayon croissant vers la base
    Z = hauteur * (1.0 - T)                            # apex en haut, base en bas

    X = R * np.cos(THETA)
    Y = R * np.sin(THETA)
    return X, Y, Z


def geometrie_spirale(nt, nx, n_tours=3.5, b=0.12, r_tube_0=0.18):
    """
    Coquille à spirale logarithmique (type Oliva/Amoria) :
      - temps t  → angle de spirale θ ∈ [0, 2π·n_tours]
      - espace x → angle φ autour de la section circulaire du tube

    Équations :
      R(θ) = exp(b·θ)           rayon de la spirale
      r(θ) = r_tube_0·exp(b·θ/2)  rayon du tube (croît avec la spirale)
      X = (R + r·cos(φ))·cos(θ)
      Y = (R + r·cos(φ))·sin(θ)
      Z = r·sin(φ)·exp(b·θ/4) + b·θ·R/6   (légère montée hélicoïdale)
    """
    theta_coil = np.linspace(0, 2 * np.pi * n_tours, nt)   # angle de spirale
    phi_tube   = np.linspace(0, 2 * np.pi, nx)              # angle autour du tube

    THETA, PHI = np.meshgrid(theta_coil, phi_tube, indexing='ij')  # (nt, nx)

    R_coil = np.exp(b * THETA)
    r_tube = r_tube_0 * np.exp(b * THETA / 2)

    X = (R_coil + r_tube * np.cos(PHI)) * np.cos(THETA)
    Y = (R_coil + r_tube * np.cos(PHI)) * np.sin(THETA)
    Z = (r_tube * np.sin(PHI) * np.exp(b * THETA / 4)
         + b * THETA * R_coil / 6)

    return X, Y, Z


# =============================================================================
#  NORMALISATION + COLORMAP
# =============================================================================

def normaliser(stocke_a):
    """Normalise stocke_a dans [0, 1] pour l'application de la colormap."""
    mn, mx = stocke_a.min(), stocke_a.max()
    if mx > mn:
        return (stocke_a - mn) / (mx - mn)
    return np.zeros_like(stocke_a)


def appliquer_couleur(stocke_a_norm, cmap_name='copper'):
    """Retourne le tableau RGBA (nt, nx, 4) à partir des valeurs normalisées."""
    cmap = cm.get_cmap(cmap_name)
    return cmap(stocke_a_norm)


# =============================================================================
#  TRACÉ 3D
# =============================================================================

def tracer_coquille(X, Y, Z, facecolors, titre='Coquille 3D', elev=20, azim=45):
    """Affiche la coquille 3D avec le motif pigmentaire."""
    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111, projection='3d')

    ax.plot_surface(X, Y, Z,
                    facecolors=facecolors,
                    rstride=1, cstride=1,
                    linewidth=0, antialiased=True,
                    shade=True)

    ax.set_axis_off()
    ax.set_title(titre, fontsize=14, pad=15)
    ax.view_init(elev=elev, azim=azim)

    # Égaliser les axes pour ne pas déformer la géométrie
    max_range = np.array([X.max() - X.min(),
                          Y.max() - Y.min(),
                          Z.max() - Z.min()]).max() / 2
    mid = lambda arr: (arr.max() + arr.min()) / 2
    ax.set_xlim(mid(X) - max_range, mid(X) + max_range)
    ax.set_ylim(mid(Y) - max_range, mid(Y) + max_range)
    ax.set_zlim(mid(Z) - max_range, mid(Z) + max_range)

    plt.tight_layout()
    return fig, ax


# =============================================================================
#  PROGRAMME PRINCIPAL
# =============================================================================

if __name__ == '__main__':

    print("=" * 60)
    print("Visualisation 3D des motifs de coquillages")
    print("Modèle de Meinhardt — Dylan Perinetti")
    print("=" * 60)

    # ------------------------------------------------------------------
    # 1. COQUILLE CONIQUE — Modèle 1 (Cepaea nemoralis, rayures)
    # ------------------------------------------------------------------
    print("\n[1/3] Simulation modèle 1 (activateur-inhibiteur)...")
    stocke1 = simuler_modele_1(
        nx=160, nt=600,
        ra=0.05, rb=0.08, Da=0.015, Db=0.40,
        a0=1.5, b0=1.5, seed=0
    )

    X_c, Y_c, Z_c = geometrie_cone(
        nt=stocke1.shape[0], nx=stocke1.shape[1],
        n_tours=2.5, rayon_base=1.0, rayon_apex=0.06, hauteur=4.0
    )

    norm1 = normaliser(stocke1)
    # Colormap 'copper' : fond chaud, pigment sombre (comme l'encre sur coquille)
    colors1 = appliquer_couleur(1.0 - norm1, cmap_name='copper')

    fig1, ax1 = tracer_coquille(
        X_c, Y_c, Z_c, colors1,
        titre='Coquille conique — Modèle 1\nCepaea nemoralis (lignes droites)',
        elev=25, azim=30
    )
    plt.savefig('coquille_modele1_cone.png', dpi=150, bbox_inches='tight')
    print("   → Sauvegardé : coquille_modele1_cone.png")

    # ------------------------------------------------------------------
    # 2. COQUILLE SPIRALÉE — Modèle 2 (Amoria undulata, lignes ondulantes)
    # ------------------------------------------------------------------
    print("\n[2/3] Simulation modèle 2 (activateur-substrat)...")
    stocke2 = simuler_modele_2(
        nx=200, nt=500,
        ra=0.10, rb=0.00, ba=0.005,
        Da=0.004, Db=0.00, sa=1.00, sigma_max=0.012,
        a0=0.5, b0=0.5, seed=1
    )

    X_s, Y_s, Z_s = geometrie_spirale(
        nt=stocke2.shape[0], nx=stocke2.shape[1],
        n_tours=3.5, b=0.12, r_tube_0=0.18
    )

    norm2 = normaliser(stocke2)
    # Colormap 'YlOrBr' : jaune → brun, évoque les teintes naturelles de coquillage
    colors2 = appliquer_couleur(norm2, cmap_name='YlOrBr')

    fig2, ax2 = tracer_coquille(
        X_s, Y_s, Z_s, colors2,
        titre='Coquille spiralée — Modèle 2\nAmoria undulata (lignes ondulantes)',
        elev=20, azim=60
    )
    plt.savefig('coquille_modele2_spirale.png', dpi=150, bbox_inches='tight')
    print("   → Sauvegardé : coquille_modele2_spirale.png")

    # ------------------------------------------------------------------
    # 3. COQUILLE SPIRALÉE — Modèle 3 (Oliva porphyria, ondes en ">")
    # ------------------------------------------------------------------
    print("\n[3/3] Simulation modèle 3 (activateur-inhibiteur-hormone)...")
    stocke3 = simuler_modele_3(
        nx=200, nt=800,
        ra=0.10, rb=0.014, rc=0.10, bb=0.10,
        Da=0.015, Db=0.00, sa=0.25,
        a0=0.0, b0=0.10, c0=0.10, seed=2
    )

    X_s3, Y_s3, Z_s3 = geometrie_spirale(
        nt=stocke3.shape[0], nx=stocke3.shape[1],
        n_tours=4.0, b=0.10, r_tube_0=0.22
    )

    norm3 = normaliser(stocke3)
    # Colormap 'bone' inverse : motif en ">" clair sur fond sombre
    colors3 = appliquer_couleur(1.0 - norm3, cmap_name='bone')

    fig3, ax3 = tracer_coquille(
        X_s3, Y_s3, Z_s3, colors3,
        titre='Coquille spiralée — Modèle 3\nOliva porphyria (ondes en ">")',
        elev=20, azim=45
    )
    plt.savefig('coquille_modele3_spirale.png', dpi=150, bbox_inches='tight')
    print("   → Sauvegardé : coquille_modele3_spirale.png")

    # ------------------------------------------------------------------
    # 4. VUE D'ENSEMBLE : 3 coquilles côte à côte
    # ------------------------------------------------------------------
    print("\n[4/4] Composition d'ensemble...")
    fig_all = plt.figure(figsize=(20, 7))

    for idx, (X, Y, Z, col, titre) in enumerate([
        (X_c,  Y_c,  Z_c,  colors1, 'Modèle 1\nCepaea nemoralis\n(lignes droites)'),
        (X_s,  Y_s,  Z_s,  colors2, 'Modèle 2\nAmoria undulata\n(lignes ondulantes)'),
        (X_s3, Y_s3, Z_s3, colors3, 'Modèle 3\nOliva porphyria\n(ondes en ">")'),
    ]):
        ax = fig_all.add_subplot(1, 3, idx + 1, projection='3d')
        ax.plot_surface(X, Y, Z, facecolors=col,
                        rstride=1, cstride=1,
                        linewidth=0, antialiased=True, shade=True)
        ax.set_axis_off()
        ax.set_title(titre, fontsize=11)
        ax.view_init(elev=25, azim=40 + idx * 10)

        # Même rapport d'aspect
        max_r = np.array([X.max()-X.min(), Y.max()-Y.min(), Z.max()-Z.min()]).max()/2
        mid = lambda a: (a.max()+a.min())/2
        ax.set_xlim(mid(X)-max_r, mid(X)+max_r)
        ax.set_ylim(mid(Y)-max_r, mid(Y)+max_r)
        ax.set_zlim(mid(Z)-max_r, mid(Z)+max_r)

    fig_all.suptitle("Motifs pigmentaires de coquillages — Modèle de Meinhardt\nDylan Perinetti",
                     fontsize=14, y=1.02)
    plt.tight_layout()
    plt.savefig('coquilles_3D_ensemble.png', dpi=150, bbox_inches='tight')
    print("   → Sauvegardé : coquilles_3D_ensemble.png")

    print("\nTerminé ! Affichage des figures...")
    plt.show()
