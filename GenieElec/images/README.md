# Images pour le Document Moteurs à Effet Hall

Ce dossier contient les images et diagrammes utilisés dans le document LaTeX sur les propulseurs à effet Hall.

## Images Recommandées

### 1. Schéma de Principe
- **hall-thruster-schema.png** : Schéma en coupe d'un propulseur à effet Hall montrant:
  - Canal d'accélération annulaire
  - Cathode et anode
  - Lignes de champ magnétique
  - Trajectoire des électrons
  - Flux d'ions

### 2. Configuration SPT
- **spt-architecture.png** : Architecture d'un propulseur SPT (Stationary Plasma Thruster)
  - Parois diélectriques
  - Distribution du champ magnétique

### 3. Configuration TAL
- **tal-architecture.png** : Architecture d'un propulseur TAL (Thruster with Anode Layer)
  - Parois métalliques
  - Couche anodique

### 4. Applications Spatiales
- **satellite-application.png** : Illustration d'un satellite géostationnaire utilisant des propulseurs à effet Hall
- **bepi-colombo.png** : Mission BepiColombo vers Mercure

### 5. Diagrammes de Performance
- **performance-chart.png** : Graphique comparatif des performances (Isp vs poussée)
- **efficiency-curve.png** : Courbes de rendement en fonction de la puissance

## Notes

Pour ajouter des images au document LaTeX, utiliser:
```latex
\begin{figure}[H]
\centering
\includegraphics[width=0.8\textwidth]{images/nom-fichier.png}
\caption{Description de l'image}
\label{fig:label}
\end{figure}
```

## Sources d'Images

- Diagrammes techniques : À créer ou obtenir depuis les ressources CNAM
- Images de missions spatiales : ESA, NASA (domaine public)
- Schémas de principe : Techniques de l'Ingénieur (avec autorisation)
