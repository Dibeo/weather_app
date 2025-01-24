# Partie 1 : Explication et description en français

## Introduction
Ce projet est une application web développée en utilisant React, TypeScript et Vite. Elle permet d'afficher des informations météorologiques en temps réel. Deux fonctionnalités principales sont offertes :

1. Une fonctionnalité de géolocalisation permettant d'afficher la météo actuelle de l'utilisateur en fonction de sa position géographique.
2. Une fonctionnalité de recherche qui affiche la météo d'une ville spécifique en entrant simplement son nom.

---

## Fonctionnement

### 1. Géolocalisation
- Lors du chargement initial de l'application, l'utilisateur est invité à autoriser l'accès à sa localisation.
- Une fois la permission accordée, l'application utilise l'API Web Geolocation pour obtenir les coordonnées (latitude et longitude) de l'utilisateur.
- Ces coordonnées sont ensuite transmises à l'API météo tierce (OpenWeatherMap) pour récupérer les données météorologiques actuelles.

### 2. Recherche par nom de ville
- L'utilisateur peut saisir le nom d'une ville dans un champ de recherche.
- Une requête est envoyée à l'API météo avec le nom de la ville, et les données correspondantes sont affichées.

---

## Développement

### 1. Technologies utilisées
- **React** : Pour la création des composants et la gestion de l'état de l'application.
- **TypeScript** : Pour assurer une typage stricte et une meilleure maintenance du code.
- **Vite** : Pour un environnement de développement rapide et performant.
- **CSS/SCSS** : Pour le stylisme de l'interface utilisateur.
- **Bootstrap** : Pour des composants prêts à l'emploi et un design responsive.
- **MUI (Material-UI)** : Pour des composants React modernes et personnalisables.
- **SweetAlert2 (swal2)** : Pour afficher des boîtes de dialogue élégantes et interactives.
- **API OpenWeatherMap** : Pour obtenir les données météorologiques.

### 2. Étapes principales du développement
1. Initialisation du projet avec Vite.
2. Mise en place des composants principaux :
   - Composant pour afficher la météo actuelle.
   - Composant pour gérer la recherche par ville.
3. Intégration avec l'API météo.
4. Gestion des erreurs (par exemple : ville non trouvée ou refus d'accès à la géolocalisation) à l'aide de SweetAlert2.
5. Optimisation de l'interface utilisateur avec Bootstrap et MUI.

---

# Partie 2: Explanation and description in English

## Introduction
This project is a web application developed using React, TypeScript, and Vite. It displays real-time weather information and offers two main features:

1. A geolocation feature to show the user's current weather based on their geographic location.
2. A search feature to display the weather of a specific city by simply entering its name.

---

## Functionality

### 1. Geolocation
- Upon initial load, the application prompts the user to grant access to their location.
- Once permission is granted, the app uses the Web Geolocation API to retrieve the user's coordinates (latitude and longitude).
- These coordinates are sent to a third-party weather API (OpenWeatherMap) to fetch current weather data.

### 2. City Name Search
- The user can type a city name into a search field.
- A request is sent to the weather API with the city name, and the corresponding weather data is displayed.

---

## Development

### 1. Technologies Used
- **React**: For creating components and managing application state.
- **TypeScript**: To ensure strict typing and better code maintainability.
- **Vite**: For a fast and efficient development environment.
- **CSS/SCSS**: For styling the user interface.
- **Bootstrap**: For ready-to-use components and responsive design.
- **MUI (Material-UI)**: For modern and customizable React components.
- **SweetAlert2 (swal2)**: To display elegant and interactive dialog boxes.
- **OpenWeatherMap API**: To fetch weather data.

### 2. Main Development Steps
1. Initializing the project with Vite.
2. Setting up the main components:
   - Component to display current weather.
   - Component to handle city-based search.
3. Integrating with the weather API.
4. Handling errors (e.g., city not found or geolocation access denied) using SweetAlert2.
5. Optimizing the user interface with Bootstrap and MUI.
