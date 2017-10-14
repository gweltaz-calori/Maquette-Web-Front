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

Le serveur se lance par d?faut port sur le port 9000.
Si le port est deja pris modifier le port dans le package.json


#### Pour build toutes les sources en production
```
npm run build
```

Les sources build?es se trouvent dans le dossier ```/dist```
J'ai d?ja g?n?r? toutes les sources en cas de probl?me.

Pour tester en prod il faut servir le dossier ```/dist``` avec un serveur (ex : serveur local de phpstorm). On est oblig? de les mettre sur un serveur ? cause du CORS.


## Informations compl?mentaires

Les sources se trouvent dans le dossier ```/src```

Les styles se trouvent dans le dossier ```/src/assets/style```

Les scripts se trouvent dans le dossier ```/src/js```

```app.js``` est le point d'entr?e
