# Mon vieux Grimoire ( Il doit être lancé sur backend et sur frontend)
Il faut avant toute chose vérifier qu'on dispose du fichier Environnement (.env) qui contient les paramètres
de l'application Grimoire. Ce fichier est à mettre dans l'arborescence du projet, mais à l'exterieur du repertoire (ou dossier) backend. 
## Comment lancer le projet sur le fronted ? ### Avec npm ?
Faites la commande `npm install` pour installer les dépendances puis `npm start`pour lancer le projet sur /mnt/c/Users/HP/OCROOM/projet-backend/grimoire. 

Le projet a été testé sur Node Package Manager[ou npm] 19 (Le 10/08/2026). 

cd frontend (le 14/10/26)
npm install (à faire une fois)
## npm run start : Pour lancer le projet sur le fronted <http://localhost:3000> ## 
Cela installera toutes les dépendances requises par l'application front-end, 
et lancera le serveur de développement. Au lancement de l'application l'écran d'accueil est affiché. L'accès au backend se fait avec (await axios). Par exemple pour création d'un Book d'abord la page Addbook.js, ensuite BookForm avec utils/constants.js (parmetres routes) et lib/common.js (appel axios). Ici on voit que pour s'addresser à Express, on notifie l'url http://localhost:4000/api/books (Concordance avec port=4000 dans server.js)

## Comment lancer le server Node Express ? ### Avec npm ?
Faites la commande `node server` ou  `nodemon server` sur le  `backend:/mnt/c/Users/HP/OCROOM/projet-backend/grimoire/backend` pour lancer le server Node Express.
Procèdure : lancement du backend/server.js <port=4000> qui créé le serveur Express avec en paramètre appexp.js

===================================================================================
### src/utils/contents.js : les adresses suivantes en connexion avec les routes/user ou book de Backend (elles sont formattées et appelées par ex. par signin.jsx)
try {setIsLoading(true);
      const response = await axios({
        method: 'post', url: API_ROUTES.SIGN_IN,
        data: { email, password, } });}

const API_URL = 'http://localhost:4000';
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  SIGN_IN: `${API_URL}/api/auth/login`,
  BOOKS: `${API_URL}/api/books`,
  BEST_RATED: `${API_URL}/api/books/bestrating`,
};
export const APP_ROUTES = {  // Voir App.jsx
  SIGN_UP: '/Inscription',
  SIGN_IN: '/Connexion',
  ADD_BOOK: '/Ajouter',
  BOOK: '/livre/:id',
  UPDATE_BOOK: 'livre/modifier/:id',
};
### si fichier '.env' dans backend n'existe pas il faut le créer (bash). 
echo "JWT_SECRET=une_cle_secrete_longue_et_difficile" > .env
et dans controllers/user et book : require('dotenv').config(); 