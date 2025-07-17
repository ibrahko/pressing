# Application de Gestion de Pressing

Il s'agit d'une application web complète pour la gestion d'un pressing. Elle permet de gérer les clients, les articles, les commandes et les paiements.

## Technologies utilisées

-   **Frontend:** React
-   **Backend:** Node.js, Express
-   **Base de données:** MongoDB

## Prérequis

-   Node.js et npm
-   MongoDB

## Installation

1.  **Clonez le dépôt :**

    ```bash
    git clone https://github.com/ibrahko/pressing.git
    cd pressing
    ```

2.  **Installez les dépendances du backend :**

    ```bash
    npm install
    ```

3.  **Installez les dépendances du frontend :**

    ```bash
    npm install --prefix frontend
    ```

## Lancement de l'application

1.  **Démarrez le serveur backend :**

    ```bash
    npm start
    ```

    Le serveur backend sera lancé sur `http://localhost:5000`.

2.  **Démarrez l'application frontend :**

    Dans un autre terminal :

    ```bash
    npm start --prefix frontend
    ```

    L'application React sera lancée sur `http://localhost:3000`.

## Structure du projet

-   `backend/` : Contient le code du serveur Node.js/Express.
    -   `config/` : Fichiers de configuration (ex: connexion à la base de données).
    -   `middleware/` : Middlewares Express (ex: authentification).
    -   `models/` : Modèles de données Mongoose.
    -   `routes/` : Routes de l'API.
    -   `server.js` : Point d'entrée du serveur.
-   `frontend/` : Contient le code de l'application React.
    -   `public/` : Fichiers statiques.
    -   `src/` : Code source de l'application.
        -   `components/` : Composants React réutilisables.
        -   `pages/` : Pages principales de l'application.
        -   `App.js` : Composant principal et gestion du routage.
        -   `index.js` : Point d'entrée de l'application React.
