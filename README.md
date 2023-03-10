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

# Azure

## Azure functions

## Azure Cosmos DB

## Deployement (with linked GitHub)
