# Plumbio — Site officiel

Site vitrine statique (HTML + CSS + JavaScript, sans framework ni compilation).
Projet indépendant de l'application Flutter PlombierSaaS.

## Structure

```
index.html              Page d'accueil (toutes les sections)
assets/css/styles.css   Styles (responsive, mobile d'abord)
assets/js/main.js       Menu mobile, formulaire de contact, année du pied de page
assets/img/favicon.svg  Logo / icône
serve.ps1               Petit serveur local (PowerShell, aucune installation)
```

## Lancer le site localement

Dans PowerShell, depuis ce dossier :

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Puis ouvrir http://localhost:8080 (Ctrl+C pour arrêter).
Autre port : `.\serve.ps1 -Port 3000`.

On peut aussi simplement double-cliquer sur `index.html`.

## À personnaliser

- **Courriel de contact** : aucune adresse pour l'instant. Quand elle existera, l'ajouter dans la section Contact de `index.html` et dans `assets/js/main.js` (`CONTACT_EMAIL`). D'ici là, le formulaire valide les champs mais n'envoie rien.
- **Boutons « Commencer gratuitement »** : repérables avec l'attribut `data-cta="start"`; remplacer leur `href` par le lien d'inscription de l'application quand elle sera prête.
- **Emplacements prévus** (commentaires dans `index.html`) : bouton « Se connecter », boutons App Store / Google Play, liens vers les pages légales.

## Mise en ligne

Le dossier peut être déployé tel quel sur n'importe quel hébergement statique (Netlify, Cloudflare Pages, GitHub Pages, etc.).
