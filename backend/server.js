// Exécuter l'application Express (appexp.js) sur le serveur Node ! 

const http = require('http'); /* package Http de Node js */
 
const appexp = require('./appexp'); /* appexp : Equivalent fonction (req, res) */

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT ||'4000');
appexp.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
/** La requete suivante fait le lien entre Node/HTTP et l'application Express avec middleware(s). */
const server = http.createServer(appexp); /* EQU: http.createServer((req, res) => {appexp(req, res) }); */

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

/* Donc server.listen(port); 
    dit au serveur HTTP : « Commence à écouter les requêtes sur le port 3200. »
   Et http.createServer(appexp) signifie essentiellement :
   « Crée un serveur HTTP Node et confie le traitement de chaque requête à mon application Express appexp. »
*/