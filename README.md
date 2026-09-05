# Mon vieux Grimoire (Il doit être lancé sur backend et sur frontend)
Il faut avant toute chose vérifier qu'on dispose du fichier Environnement `.env`. Il qui contient
les variables d'environnement de l'application Grimoire. Il est à mettre dans le repertoire 
(ou dossier) du projet Grimoire. Il est livré à part et jamais envoyé dans le dépôt GitHub du projet.
Il est ignoré expréssement par git (voir `.gitignore`) car il contient des secrets 
(mot de passe de la base, clé de signature des tokens, le PORT par défaut est 4000 si non renseigné). 
Le fichier `.env.example` est son modèle : il est versionné, il liste les variables attendues **sans les valeurs**.
Il sert de mémo pour savoir quoi remplir quand on récupère le projet sur une nouvelle machine. 
Le `server.js` le charge le fichier `.env`au démarrage avec la ligne de code  `require('dotenv').config()`.

## Comment lancer le server sur le backend ? ### Avec npm ?
Se mettre sur le backend et faire la commande bash `npm install` pour installer les dépendances. (à faire une fois)
Puis, Faites la commande `npm start` qui lance `node server` ou `npm run dev` qui lance `nodemon server`.
Le server Node Express/mongoDB se lance sur le `backend` par défaut sur le <port=4000>. 

## Comment lancer le projet sur le frontend ? ### Avec npm ?
Se mettre sur le repertoire du projet et taper : npm install (à faire une fois).
Puis, Faites la commande `npm run start` : pour lancer le frontend <http://localhost:3000> ## 
Cela installera toutes les dépendances requises par l'application front-end, 
et lancera le server de développement qui affichera l'écran d'accueil. 
=====================================================================================================
