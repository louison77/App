# Orange Cyberdéfense - Web App for audit

## Aperçu de projet

Le projet se concentre sur une application web Azure permettant aux consultants d'OCD de générer des feuilles de route SSI pour le compte de leurs clients.
Elle est actuellement gérée par un excel, ce qui limite les possibilités pour construire des feuilles de route personnalisées de manière industrielle.

## Fonctionnalités

- Authentification via Azure SSO (ou GitHub temporairement) avec une obligation d'être admin, chef de projet ou auditeur pour accéder au site
- Page admin avec gestion des chefs de projets et des administrateurs
- Page d'accueil avec tous les projets et création de projet (pour les chefs de projet uniquement)
- Page de synthèse avec des graphiques et la gestion des statuts de l'audit et du plan d'action (verrouillage des actions lors du statut "terminé")
- Page d'audit avec création d'exigences et gestion de ces dernières, évaluation de conformité et de maturité ainsi qu'une aide à la sélection des mesures pour le plan d'action
- Page de plan d'action avec gestion des mesures (priorité, complexité, filtres et tris...)
- Page de suivi avec gestion des auditeurs associés au projet (pour les chefs de projet uniquement)
- Page d'export PowerPoint pour les graphiques et Excel pour la table des mesures et la table des exigences

## Structure du code

L'app est composée d'un **frontend** (dossier app) et d'un **backend** (dossier api).

### API - Backend

Le backend contient un dossier pour chaque table avec une création de schéma, de model et de service (fonctions CRUD basique).  
Il s'agit d'une base de données noSQL **MongoDB**.  

> CRUD : Create Read Update Delete  
> voir aussi requêtes HTTP pour une bonne compréhension

***Important*** : obligation d'utiliser / créer une **azure fonction** pour toutes les tables.

### APP - Frontend

Le frontend est composé de pages, de composants et de styles (css).  

Pour les requêtes entre le back et le front, une utilisation d'Axios. Il s'agit d'une bibliothèque très populaire pour les requêtes HTTP.  
Axios offre de nombreux avantages par rapport à l'utilisation de la méthode native `fetch` de JavaScript puisqu'il permet de configurer facilement les requêtes avec des options (en-têtes, paramètres...).

## Utilisation de React
Quelques conseils et explications.

React est une bibliothèque JavaScript utilisée pour la construction d'interfaces utilisateur. Il est important de comprendre quelques concepts tels que les composants ou  les "state" qui réferent à l'état d'un composant.

L'utilisation de l'état est importante car elle permet aux composants React de répondre aux interactions de l'utilisateur et de changer leur apparence en temps réel sans avoir besoin de recharger toute la page.  
L'état est généralement modifié à l'aide de la méthode setState(). Cette méthode met à jour l'état actuel du composant et déclenche une nouvelle mise à jour du rendu du composant.  

# Azure - créer et installer le projet  
[Aide pour créer une app](https://learn.microsoft.com/fr-fr/azure/developer/javascript/how-to/with-web-app/static-web-app-with-swa-cli/create-react-app)

### Télécharger node.js, node version management(nvm), gitbash, vs code  
- [nodejs](https://nodejs.org/en)
- [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) --> download `nvm-setup.exe`
- [git](https://git-scm.com/downloads)
- [vs code](https://code.visualstudio.com/)

### Fork le repository pour avoir accès au code github du projet  

### Créer application web statique azure  
Créer un groupe de ressources dans lequel vous mettrez toutes les ressources de ce projet, donner un nom à votre app, cocher gratuit, mettre Europe-West pour la région, source Github, ensuite entrez votre compte github dans organisation puis choissisez le bon repository et branche.


### Créer une base de données mango db sur azure  
- Choisir API azure cosmo db pour mongodb
- Pareil qu’avant choisir le groupe de ressource précemment créer, nommez, et mettre Europe-West en région, cochez serverless et valider la création

### Associer base de données à l’application web statique  
- Aller dans l’onglet chaine de connexion dans la bdd créée sur azure
- Copier chaine de connexion principale  
![image](https://user-images.githubusercontent.com/77882255/226189703-e5d3b901-ccfb-42e2-8ece-fe7fd0ba7c3c.png)  
- Cette fois-ci aller dans l’application web statique et dans l’onglet configuration, faites ajouter, nommer la CONNECTION_STRING et coller la chaine de connexion.  
![image](https://user-images.githubusercontent.com/77882255/226189739-9cb458d8-d135-4897-8298-241c683602ac.png)

###  Extensions et console git  
Sur visual studio code il va falloir installer toutes les extensions nécessaires, et initialiser la console gitlab sur votre pc.
- Azure Acoount, Azure Cli tools, Azure App Service, Azure Functions, Azure tools, Git pull request and issues, Reactjs code snippets, et peut-être d’autres selon vos besoins
- Identifiez vous sur le azure du vscode, pareil avec github
- Dans le même temps vous ouvez faire les manipulations pour vous connecter sur la console git avec votre compte github sur votre pc si jamais vous ne l’avez jamais fait

### Cloner votre repository github 
- Créer un dossier vide et nommer le comme vous voulez
- Entrez la commande `git clone -b master (lien de votre repo github)`
- Faites `npm install` dans la racine de votre app pour installer toutes les dependencies
- Installer l’émulateur [azure static web app cli](https://github.com/Azure/static-web-apps-cli) (permet de tester des nouveautés en local). Faites `npm install -g @azure/static-web-apps-cli` dans votre app
- Changer votre version de nvm avec `nvm use 14.17.3` si cette version est préalablement installée
- Entrez `npm install -g azure-functions-core-tools@2 --unsafe-perm true`  car l’émulateur azure static web app cli ne fonctionne qu’avec certaines versions de node et d’azure functions
- A la racine de votre app si tout est bien configurer et qu’il ne manque pas de librairie utiliser la commande `npx @azure/static-web-apps-cli start` pour lancer votre app en local. Si toutes les librairies ne sont pas installées, il faut les installer à la main avec la commande `npm i` 

### Finalement il ne reste qu’à coder et déployer votre code 
Vous avez deux choix pour déployer votre code sur github, soit avec l’extension github et le source control de vscode, soit dans le terminal en tapant trois commandes de suite :
```Bash
git add .
git commit –m “message à définir”
git push
```
:warning: Il faut pull les modifications que les autres ont push avec la commande `git pull`

### Commandes utiles
```
npx create-react-app [name] #Créer une app react
npm start #Démarrer une app react dans la racine
nvm i 14.17.3 #Installer la version 14.17.3 de node
nvm use 14.17.3 #Changer la version de node pour la version 14.17.3
npm install -g @azure/static-web-apps-cli #Installer l’émulateur
npm install -g azure-functions-core-tools@2 --unsafe-perm true #Changer la version de azure-function-core-tools vers la version 2
npx @azure/static-web-apps-cli start #Lancer l’app et l’api connectées ensemble
```

## Azure functions  
