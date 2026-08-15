# Mon vieux Grimoire


## Comment lancer le projet ? 

### Avec npm

Faites la commande `npm install` pour installer les dépendances puis `npm start`pour lancer le projet sur /mnt/c/Users/HP/OCROOM/projet-backend/grimoire. 

Le projet a été testé sur node 19. 

Le 10/08/2026
Node Package Manager ou npm


cd frontend le 14/10/26 ????
npm install (une fois)
npm run start (pour lancer le frontend http: //localhost:3000)

Cela installera toutes les dépendances requises par l'application front-end, 
et lancera le serveur de développement. Désormais, vous accédez à http://localhost:4200
pour voir l'affichage de l'accueil.

## Comment lancer le server Node Express ? 

### Avec npm

Faites la commande `node server` ou  `nodemon server` sur le  `backend:/mnt/c/Users/HP/OCROOM/projet-backend/grimoire/backend` pour lancer le server Node Express. 

===================================================================================
### src/utils/contents.js : les adresses suivantes en connexion avec les routes/user ou book de Backend (elles sont formattées et appelées par ex. par signin.jsx)
try { setIsLoading(true);
      const response = await axios({
        method: 'post', url: API_ROUTES.SIGN_IN,
        data: { email, password, } });

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