# O’32 Rouen

Site de restaurant inspiré de l’organisation pratique du Snack Le 76 : carte, catégories, recherche, formules, téléphone, accès, mise en page mobile. Le site est également déployé sur le VPS Ancrage Digital dans un dossier non listé. L’identité du site est conservée dans `.openai/hosting.json`.

L’offre « une pizza achetée, la deuxième à −50 % » a été ajoutée sur instruction de l’utilisateur et mise en avant dans la bannière, le premier écran et un encadré dédié. Ses conditions détaillées restent à préciser auprès du restaurant. Le pied de page comprend le logo Ancrage Digital avec un lien vers https://ancrage.digital/.

## Prévisualiser

Depuis ce dossier :

```sh
node build.mjs
python3 -m http.server 8204 --bind 127.0.0.1 --directory dist
```

Ouvrir http://127.0.0.1:8204/

`src.html` contient la structure de la page ; `build.mjs` contient les rubriques et tarifs et génère `dist/index.html`. Les styles et les interactions se trouvent dans `dist/base.css`, `dist/style.css`, `dist/script.js`, `dist/motion.css` et `dist/motion.js`. Ces derniers ajoutent les animations au scroll, les transitions de la carte et les mouvements des visuels, en respectant la préférence de mouvement réduit.

## Informations reprises des photos fournies

- O’32 — pizzas, tacos, kebab, burgers.
- 09 80 73 95 40 — liens d’appel `tel:+33980739540`.
- 32 avenue de la Porte des Champs, 76000 Rouen.
- 65 produits et variantes répartis en 12 rubriques, avec tailles Moyenne / Méga pour les pizzas et portions 3 / 6 / 10 pour les Tex-Mex.
- Menus étudiants sandwich + frites + boisson 33 cl à 7 € et tacos + frites + boisson 33 cl à 8 € ; menu enfant à 6 €.

La carte est une transcription partielle. Les reflets masquent plusieurs noms et compositions (pizzas tomate, salades) et les horaires. Les recettes masquées ne sont pas reconstituées comme si elles étaient certaines ; le site invite à vérifier au téléphone et indique que d’autres recettes existent. Aucun horaire, livraison, label halal, fait maison, origine des viandes ou promotion supplémentaire n’est inventé. Avant publication, faire valider l’ensemble de la transcription et compléter les horaires et mentions légales.

## Visuels

Trois images originales ont été créées avec l’outil intégré Imagegen : kebab, pizza, French tacos. Aucune photo de plat du menu papier n’est affichée ou copiée dans le site. Les prompts complets figurent dans `generation-prompts.md` ; les originaux PNG restent dans `generated-originals/` et les images optimisées servies localement sont dans `dist/assets/`.

Le site les signale comme illustrations IA non contractuelles. Les images ne prouvent ni la présentation réelle des plats ni leur composition.

## Fonctionnement

La carte complète transcrite est dans le HTML et reste accessible sans JavaScript. JavaScript ajoute les filtres par catégorie, la recherche sans accents, les raccourcis des trois images et l’impression de toute la carte. Le bouton d’appel mobile reste visible. Aucun formulaire, aucune commande ni paiement en ligne. L’itinéraire ouvre une recherche Google Maps à l’adresse indiquée.

Toutes les ressources nécessaires au site sont locales, y compris les polices DM Sans.
