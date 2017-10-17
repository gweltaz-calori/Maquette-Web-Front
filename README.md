# Comment utiliser le projet

## Utilisation

Voici comment utiliser le projet.

#### Installer les dependances
```bash
npm install
```

#### Pour lancer le serveur en developpement
```
npm run dev
```

Le serveur se lance par defaut port sur le port 9000.
Si le port est deja pris modifier le port dans le package.json


#### Pour build toutes les sources en production
```
npm run build
```

Les sources compilees se trouvent dans le dossier ```/dist```
J'ai deja genere toutes les sources en cas de problemes.

Pour tester en prod il faut servir le dossier ```/dist``` avec un serveur (ex : serveur local de phpstorm). On est oblige de les mettre sur un serveur (CORS).


## Informations complementaires

Les sources se trouvent dans le dossier ```/src```

Les styles se trouvent dans le dossier ```/src/assets/style```

Les scripts se trouvent dans le dossier ```/src/js```

```app.js``` est le point d'entree

## Dans ce que j'ai réalisé

Le tri se fait du plus petit au plus grand pour les lettres comme pour les chiffres

La recherche se fait sur tous les champs y compris ceux non visibles

Le graphique est réalisé en canvas (class Graph)
