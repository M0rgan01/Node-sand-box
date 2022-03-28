# NodeJs sand-box project

## Dépendances requises

- **node** version : 16+
- **yarn** version : 1.22+

## Dépendances optionnelles

- **docker** version : 20 lors de la création du projet
- **CLI Heroku** version : 7.60.0

## Commandes utiles

- yarn start : Permet de démarrer l'application sur un environnement de développement.
- yarn build : Permet de construire le livrable de l'application de production.
- yarn test : Permet de jouer l'ensemble des tests sur l'application.
- yarn lint : Permet de vérifier le formatage et la qualité du code.

## Variables d'environnements

L'ensemble des variables d'environnements modifiable de l'application

- KEYCLOAK_AUTH_URL -> adresse d'authentification de keycloak
- KEYCLOAK_REALM -> royaume keycloak cible
- KEYCLOAK_CLIENT -> client keycloak cible
- PORT -> port utilisé pour l'application
- SESSION_SECRET -> secret de la session express

Il est possible pour l'environnement de development d'avoir un fichier `.env` (non versionné) 
contenant les variables d'environnements.

## Déploiement Heroku

Voiçi les commandes de déploiement sur Heroku :

Commande de Login : 
```
$ heroku login -i
```

Commande de Login docker :
```
$ heroku container:login
```

Commande de Push de l'image (le dockerfile doit être dans le même répertoire) :
```
$ heroku container:push web -a { HEROKU_APP_NAME }
```

Commande de déploiement :
```
heroku container:release web -a { HEROKU_APP_NAME }
```
