# Comment utiliser le projet

## Utilisation

Voici comment utiliser le projet.

#### Installer les dépendances
```bash
npm install
```

#### Pour lancer le serveur en developpement
```
npm run dev
```

Le serveur se lance par défaut port sur le port 9000.
Si le port est deja pris, modifier le port dans le package.json


#### Pour build toutes les sources en production
```
npm run build
```

Les sources compilées se trouvent dans le dossier ```/dist```
J'ai deja generé toutes les sources en cas de problèmes.

Pour tester en prod il faut servir le dossier ```/dist``` avec un serveur (ex : serveur local de phpstorm). On est obligé de les mettre sur un serveur (CORS).


## Informations complémentaires

Les sources se trouvent dans le dossier ```/src```

Les styles se trouvent dans le dossier ```/src/assets/style```

Les scripts se trouvent dans le dossier ```/src/js```

```app.js``` est le point d'entree

## Dans ce que j'ai réalisé

Le tri se fait du plus petit au plus grand pour les lettres comme pour les chiffres

La recherche se fait sur tous les champs y compris ceux non visibles

Le graphique est réalisé en canvas (class Graph)
