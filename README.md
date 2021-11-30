# Number Speller fr-FR
## Description
Une classe utilitaire qui permet d'obtenir la transcription en toutes lettres d'un nombre en français de France. Les nombres flottants et ceux de type *bigint* sont supportés. Pour l'instant, la limite est d'environ 10^108 mais je compte l'augmenter à `Number.MAX_SAFE_INTEGER`, la valeur maximale supportée par JavaScript qui est d'à peu près 10^308.
## Orthographe
L'orthographe utilisée est celle de la réforme de 1990. Tous les composants du nombre sont liés par des traits d'union.
## Exemples
La classe est entièrement statique. La seule méthode publique est `spell`.

```javascript
console.log(NumberSpellerFrFR.spell(3.14)); // trois, quatorze

const astronomicalNumber = BigInt(Number.MAX_SAFE_INTEGER);
console.log(NumberSpellerFrFR.spell(astronomicalNumber));
/* neuf-billiards-sept-billions-cent-quatre-vingt-dix-neuf-milliards-deux-cent-cinq
uante-quatre-millions-sept-cent-quarante-mille-neuf-cent-quatre-vingt-onze */
```