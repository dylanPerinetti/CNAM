/* Quiz de mécanique des fluides — données.
   Chaque quiz : { id, title, desc, questions: [{ q, options, correct (index), explanation }] }
   La syntaxe $...$ est supportée dans q, options et explanation. */
window.QUIZZES = [
  {
    id: 'q-introduction',
    title: 'Introduction & propriétés',
    desc: 'Bases : définitions, viscosité, milieu continu',
    questions: [
      {
        q: "Qu'est-ce qui caractérise mécaniquement un fluide ?",
        options: [
          "Il a une forme propre",
          "Il ne peut s'opposer durablement à une contrainte de cisaillement",
          "Il est toujours incompressible",
          "Il est toujours newtonien"
        ],
        correct: 1,
        explanation: "Un fluide se déforme tant qu'une contrainte tangentielle est appliquée. Cette propriété distingue fluides et solides — c'est la **définition mécanique** fondamentale."
      },
      {
        q: "Quelle est la viscosité dynamique de l'eau à 20°C ?",
        options: [
          "$1 \\times 10^{-5}$ Pa·s",
          "$1 \\times 10^{-3}$ Pa·s",
          "$1 \\times 10^{-1}$ Pa·s",
          "$1$ Pa·s"
        ],
        correct: 1,
        explanation: "$\\mu_{eau} = 10^{-3}$ Pa·s à 20°C. À retenir, ainsi que $\\mu_{air} \\approx 1.8 \\times 10^{-5}$ Pa·s."
      },
      {
        q: "Quelle est la relation entre viscosité dynamique $\\mu$ et cinématique $\\nu$ ?",
        options: [
          "$\\nu = \\mu \\cdot \\rho$",
          "$\\nu = \\mu / \\rho$",
          "$\\mu = \\nu / \\rho$",
          "$\\mu = \\nu \\cdot g$"
        ],
        correct: 1,
        explanation: "$\\nu = \\mu / \\rho$ avec $\\nu$ en m²/s. Pour l'eau : $\\nu \\approx 10^{-6}$ m²/s ; pour l'air : $\\nu \\approx 1.5 \\times 10^{-5}$ m²/s."
      },
      {
        q: "Pour un fluide newtonien, la loi de comportement est :",
        options: [
          "$\\tau = \\mu \\cdot \\nabla u$",
          "$\\tau = \\mu \\cdot du/dy$",
          "$\\tau = \\rho \\cdot du/dy$",
          "$\\tau = \\mu \\cdot u$"
        ],
        correct: 1,
        explanation: "Loi de Newton : $\\tau = \\mu \\, du/dy$, où $du/dy$ est le gradient de vitesse perpendiculaire à l'écoulement. C'est cette **proportionnalité** qui définit un fluide newtonien."
      },
      {
        q: "Le théorème d'Archimède stipule que la poussée vaut :",
        options: [
          "Le poids du corps immergé",
          "Le poids du fluide déplacé",
          "Le poids de l'air ambiant",
          "$\\rho_{corps} \\cdot V \\cdot g$"
        ],
        correct: 1,
        explanation: "$F_A = \\rho_{fluide} \\cdot V_{déplacé} \\cdot g$. La poussée dépend du fluide environnant, pas du corps. C'est pourquoi un bateau lourd flotte si son volume immergé déplace assez d'eau."
      },
      {
        q: "À quelle condition un gaz peut-il être traité comme incompressible ?",
        options: [
          "Si la température est constante",
          "Si le nombre de Mach est inférieur à 0.3",
          "Si la pression est atmosphérique",
          "Toujours"
        ],
        correct: 1,
        explanation: "Pour $Ma < 0.3$ (env. 100 m/s pour l'air), les variations de masse volumique restent inférieures à 5 %, on peut négliger la compressibilité."
      }
    ]
  },
  {
    id: 'q-cinematique',
    title: 'Cinématique',
    desc: 'Lagrange/Euler, dérivée particulaire, lignes',
    questions: [
      {
        q: "La description **eulérienne** consiste à :",
        options: [
          "Suivre chaque particule fluide individuellement",
          "Observer le champ de vitesse en un point fixe de l'espace",
          "Calculer les trajectoires sur tout le domaine",
          "Suivre la chaleur d'une particule"
        ],
        correct: 1,
        explanation: "L'approche **eulérienne** se base sur des points fixes de l'espace (champ $\\vec{u}(x,y,z,t)$). C'est l'approche dominante en mécanique des fluides industrielle."
      },
      {
        q: "La dérivée particulaire d'un champ scalaire $f$ s'écrit :",
        options: [
          "$Df/Dt = \\partial f/\\partial t$",
          "$Df/Dt = (\\vec{u} \\cdot \\nabla)f$",
          "$Df/Dt = \\partial f/\\partial t + (\\vec{u} \\cdot \\nabla)f$",
          "$Df/Dt = \\nabla \\cdot \\vec{u}$"
        ],
        correct: 2,
        explanation: "$\\dfrac{Df}{Dt} = \\dfrac{\\partial f}{\\partial t} + (\\vec{u}\\cdot\\nabla)f$ — terme **instationnaire** + terme **convectif**. Formule à connaître par cœur ⭐"
      },
      {
        q: "En régime stationnaire, qu'est-ce qui coïncide ?",
        options: [
          "Trajectoires et lignes de courant",
          "Vorticité et circulation",
          "Pression et vitesse",
          "Rien ne coïncide"
        ],
        correct: 0,
        explanation: "En **régime stationnaire**, les lignes de courant, les trajectoires et les lignes d'émission **coïncident**. C'est faux en instationnaire."
      },
      {
        q: "L'équation $\\nabla \\cdot \\vec{u} = 0$ exprime :",
        options: [
          "Le caractère stationnaire",
          "L'incompressibilité",
          "L'irrotationnalité",
          "La conservation de la qté de mouvement"
        ],
        correct: 1,
        explanation: "$\\nabla \\cdot \\vec{u} = 0$ = **incompressibilité**. C'est le taux de dilatation volumique nul. Pour l'irrotationnalité c'est $\\nabla \\times \\vec{u} = 0$."
      },
      {
        q: "Dans une conduite de section variable, quand $S$ diminue par 2 (incompressible) :",
        options: [
          "La vitesse est divisée par 2",
          "La vitesse est inchangée",
          "La vitesse est multipliée par 2",
          "La pression augmente"
        ],
        correct: 2,
        explanation: "Conservation du débit : $S_1 V_1 = S_2 V_2$. Si $S$ /2 → $V$ ×2. (Et par Bernoulli, la pression diminue : effet Venturi.)"
      },
      {
        q: "La vorticité d'une rotation solide $\\vec{u} = \\omega(-y, x, 0)$ vaut :",
        options: [
          "0",
          "$\\omega$",
          "$2\\omega$",
          "$\\omega/2$"
        ],
        correct: 2,
        explanation: "$\\nabla \\times \\vec{u} = 2\\omega \\, \\vec{e_z}$. La vorticité est le **double** de la vitesse angulaire pour une rotation solide. À l'inverse, un tourbillon ponctuel $u_\\theta = \\Gamma/(2\\pi r)$ est irrotationnel sauf en $r=0$."
      }
    ]
  },
  {
    id: 'q-bilans',
    title: 'Bilans (masse + qté mvt)',
    desc: 'Continuité, quantité de mouvement, force sur paroi',
    questions: [
      {
        q: "L'équation de continuité locale s'écrit :",
        options: [
          "$\\partial \\rho/\\partial t + \\nabla \\cdot \\vec{u} = 0$",
          "$\\partial \\rho/\\partial t + \\nabla \\cdot (\\rho \\vec{u}) = 0$",
          "$\\rho + \\nabla \\cdot \\vec{u} = 0$",
          "$\\nabla \\cdot \\vec{u} = \\rho$"
        ],
        correct: 1,
        explanation: "Forme générale : $\\partial \\rho/\\partial t + \\nabla \\cdot (\\rho \\vec{u}) = 0$. En **incompressible** elle se réduit à $\\nabla \\cdot \\vec{u} = 0$."
      },
      {
        q: "Un jet d'eau de section $5\\,cm^2$ et vitesse $20\\,m/s$ frappe une plaque verticale et est dévié à 90°. Quelle force ?",
        options: [
          "100 N",
          "200 N",
          "400 N",
          "800 N"
        ],
        correct: 1,
        explanation: "$F = \\rho V^2 S = 1000 \\times 400 \\times 5 \\times 10^{-4} = 200$ N. Pour une déviation à 180° (Pelton), ce serait $2\\rho V^2 S = 400$ N."
      },
      {
        q: "Le théorème de transport de Reynolds permet de :",
        options: [
          "Calculer le nombre de Reynolds critique",
          "Passer d'une intégrale sur volume matériel à un volume de contrôle fixe",
          "Calculer les pertes de charge",
          "Modéliser la turbulence"
        ],
        correct: 1,
        explanation: "Le **théorème de transport de Reynolds** est l'outil mathématique fondamental qui relie d/dt sur D(t) à ∂/∂t + flux sur un volume de contrôle fixe. C'est la base des bilans intégraux."
      },
      {
        q: "Le tenseur des contraintes pour un fluide newtonien incompressible s'écrit :",
        options: [
          "$\\sigma = -pI$",
          "$\\sigma = -pI + 2\\mu D$",
          "$\\sigma = \\mu D$",
          "$\\sigma = \\rho V^2$"
        ],
        correct: 1,
        explanation: "$\\bar{\\bar{\\sigma}} = -p\\bar{\\bar{I}} + 2\\mu \\bar{\\bar{D}}$ où $D_{ij} = \\frac{1}{2}(\\partial_j u_i + \\partial_i u_j)$ est le tenseur des taux de déformation."
      },
      {
        q: "Sur quelle grandeur est conservé le débit massique en régime stationnaire ?",
        options: [
          "Sur la vitesse moyenne",
          "Sur le produit $\\rho S V$",
          "Sur le nombre de Reynolds",
          "Sur la pression"
        ],
        correct: 1,
        explanation: "Régime stationnaire + tube de courant : $\\rho_1 S_1 V_1 = \\rho_2 S_2 V_2$. Si en plus incompressible : $S_1 V_1 = S_2 V_2$."
      }
    ]
  },
  {
    id: 'q-bernoulli',
    title: 'Bernoulli',
    desc: 'Hypothèses, applications, Pitot, Venturi',
    questions: [
      {
        q: "Combien d'hypothèses sont requises pour appliquer Bernoulli classique ?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "**5 hypothèses** : fluide parfait (μ=0), stationnaire, incompressible, force conservative, le long d'une ligne de courant. À connaître par cœur ⭐"
      },
      {
        q: "Vidange d'un réservoir avec $h = 5$ m. Vitesse de sortie ?",
        options: [
          "5 m/s",
          "$\\sqrt{2g \\cdot 5} \\approx 9.9$ m/s",
          "10 m/s exactement",
          "Dépend de la section"
        ],
        correct: 1,
        explanation: "**Formule de Torricelli** : $V = \\sqrt{2gh} = \\sqrt{2 \\times 9.81 \\times 5} \\approx 9.9$ m/s. Indépendant de la section de l'orifice. ⭐"
      },
      {
        q: "Le tube de Pitot mesure :",
        options: [
          "La pression atmosphérique",
          "La vitesse via $\\sqrt{2\\Delta p/\\rho}$",
          "Le débit massique",
          "La viscosité"
        ],
        correct: 1,
        explanation: "$V = \\sqrt{2(p_t - p_s)/\\rho}$. Le Pitot compare pression totale (point d'arrêt) et pression statique. Utilisé sur les avions."
      },
      {
        q: "Dans un Venturi, lorsque la section diminue :",
        options: [
          "Pression et vitesse diminuent",
          "Pression augmente, vitesse diminue",
          "Pression diminue, vitesse augmente",
          "Pression et vitesse augmentent"
        ],
        correct: 2,
        explanation: "Effet Venturi : $S \\downarrow \\Rightarrow V \\uparrow$ (continuité) $\\Rightarrow p \\downarrow$ (Bernoulli). C'est le principe des trompes à eau, atomiseurs, carburateurs."
      },
      {
        q: "La forme généralisée de Bernoulli (avec pompe et pertes) s'écrit :",
        options: [
          "$p_1 + V_1^2/2 = p_2 + V_2^2/2$",
          "$H_1 + H_p = H_2 + \\Delta H$",
          "$Q_1 = Q_2$",
          "$\\rho V_1 = \\rho V_2$"
        ],
        correct: 1,
        explanation: "$\\dfrac{p_1}{\\rho g} + \\dfrac{V_1^2}{2g} + z_1 + H_p = \\dfrac{p_2}{\\rho g} + \\dfrac{V_2^2}{2g} + z_2 + \\Delta H$. Les termes sont en hauteurs (m)."
      },
      {
        q: "Pour une pompe : $Q = 30$ L/s, $H = 20$ m, $\\rho = 1000$ kg/m³. Puissance hydraulique ?",
        options: [
          "$\\approx 600$ W",
          "$\\approx 6$ kW",
          "$\\approx 60$ kW",
          "$\\approx 600$ kW"
        ],
        correct: 1,
        explanation: "$P = \\rho g Q H = 1000 \\times 9.81 \\times 0.030 \\times 20 \\approx 5886$ W $\\approx 5.9$ kW."
      }
    ]
  },
  {
    id: 'q-navier-stokes',
    title: 'Navier-Stokes',
    desc: 'Poiseuille, Couette, Stokes, conditions limites',
    questions: [
      {
        q: "Sur une paroi solide fixe en présence d'un fluide visqueux, on impose :",
        options: [
          "$\\vec{u} = 0$ (adhérence)",
          "$\\vec{u} \\cdot \\vec{n} = 0$ uniquement",
          "$p = p_{atm}$",
          "Aucune condition"
        ],
        correct: 0,
        explanation: "**Condition d'adhérence (no-slip)** : tout fluide visqueux a la même vitesse que la paroi. Si paroi fixe : $\\vec{u} = 0$. Pour un fluide parfait, on impose seulement l'imperméabilité $\\vec{u} \\cdot \\vec{n} = 0$."
      },
      {
        q: "Quelle est la forme du profil de vitesse pour un Poiseuille en conduite ?",
        options: ["Linéaire", "Parabolique", "Logarithmique", "Constant"],
        correct: 1,
        explanation: "Profil **parabolique** : $u(r) = \\dfrac{G}{4\\mu}(R^2 - r^2)$ où $G = -dp/dx$. Vitesse maximale au centre, nulle à la paroi."
      },
      {
        q: "Pour un Poiseuille, quelle relation entre $u_{max}$ et $\\bar{u}$ (vitesse moyenne) ?",
        options: [
          "$\\bar{u} = u_{max}$",
          "$\\bar{u} = u_{max}/2$",
          "$\\bar{u} = u_{max}/3$",
          "$\\bar{u} = 2 u_{max}$"
        ],
        correct: 1,
        explanation: "$\\bar{u} = u_{max}/2$ pour un Poiseuille en conduite. Pour un Couette plan c'est aussi la moitié de la vitesse de la plaque mobile."
      },
      {
        q: "La loi de Hagen-Poiseuille donne le débit :",
        options: [
          "$Q = \\pi R^2 V$",
          "$Q = \\pi R^4 \\Delta p / (8\\mu L)$",
          "$Q = \\rho g h$",
          "$Q = \\sqrt{2gh}$"
        ],
        correct: 1,
        explanation: "$Q = \\dfrac{\\pi R^4}{8 \\mu L} \\Delta p$. Le **rayon à la puissance 4** : doubler $R$ multiplie $Q$ par 16. ⭐"
      },
      {
        q: "Un écoulement de Stokes ($Re \\ll 1$) néglige :",
        options: [
          "Le terme visqueux",
          "Le terme inertiel $(\\vec{u}\\cdot\\nabla)\\vec{u}$",
          "La pression",
          "La gravité"
        ],
        correct: 1,
        explanation: "À très bas $Re$, le terme inertiel disparaît : $0 = -\\nabla p + \\mu \\Delta \\vec{u}$. Application : sédimentation, microfluidique."
      },
      {
        q: "La traînée d'une bille en régime de Stokes vaut :",
        options: [
          "$\\frac{1}{2}\\rho V^2 S$",
          "$6\\pi \\mu R V$",
          "$\\pi R^2 V$",
          "$\\rho R V$"
        ],
        correct: 1,
        explanation: "**Loi de Stokes** : $F = 6\\pi\\mu R V$. Valable pour $Re \\ll 1$. Permet de déduire la viscosité d'un fluide via la chute libre d'une bille."
      }
    ]
  },
  {
    id: 'q-adimensionnement',
    title: 'Adimensionnement & similitude',
    desc: 'Reynolds, Mach, Froude, Vaschy-Buckingham',
    questions: [
      {
        q: "Le nombre de Reynolds vaut :",
        options: [
          "$\\rho V/\\mu$",
          "$\\rho V L/\\mu$",
          "$V L/\\rho$",
          "$\\mu V/\\rho$"
        ],
        correct: 1,
        explanation: "$Re = \\rho V L / \\mu = V L / \\nu$. Rapport **forces d'inertie / forces visqueuses**. ⭐"
      },
      {
        q: "Quel est le Reynolds critique pour la transition laminaire/turbulent en conduite ?",
        options: ["100", "1000", "2300", "100000"],
        correct: 2,
        explanation: "$Re_c \\approx 2300$ pour une conduite circulaire. En dessous : laminaire. Entre 2300 et 4000 : transition. Au-dessus : turbulent."
      },
      {
        q: "Le nombre de Mach $Ma = V/c$ caractérise :",
        options: [
          "Les effets visqueux",
          "Les effets de surface libre",
          "Les effets de compressibilité",
          "Les effets thermiques"
        ],
        correct: 2,
        explanation: "$Ma = V/c$ où $c$ est la vitesse du son. Si $Ma < 0.3$ : incompressible. Au-dessus : compressible avec ondes de choc à $Ma \\approx 1$."
      },
      {
        q: "Pour un écoulement à surface libre (rivière), le nombre clé est :",
        options: [
          "Reynolds",
          "Mach",
          "Froude",
          "Strouhal"
        ],
        correct: 2,
        explanation: "$Fr = V/\\sqrt{gL}$ : régime fluvial ($Fr < 1$) ou torrentiel ($Fr > 1$). Essentiel pour les essais en bassin de carène (navires)."
      },
      {
        q: "Le théorème de Vaschy-Buckingham : pour $n$ variables et $k$ unités, on a :",
        options: [
          "$n$ groupes π",
          "$n + k$ groupes π",
          "$n - k$ groupes π",
          "$nk$ groupes π"
        ],
        correct: 2,
        explanation: "$n - k$ nombres sans dimension indépendants. Permet de réduire considérablement les paramètres d'une étude expérimentale."
      },
      {
        q: "Une cheminée de $D=2\\,m$ exposée à $V=15\\,m/s$ (St=0.21). Fréquence des tourbillons ?",
        options: [
          "0.16 Hz",
          "1.58 Hz",
          "15 Hz",
          "31.5 Hz"
        ],
        correct: 1,
        explanation: "$f = St \\cdot V/D = 0.21 \\times 15/2 \\approx 1.58$ Hz. Si la fréquence propre de la cheminée est proche, il y a risque de **résonance** (pont du Tacoma 1940)."
      }
    ]
  }
];
