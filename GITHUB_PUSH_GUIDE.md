# 📚 Guide Complet : Pousser un Projet vers GitHub

**Pour les débutants complets** - Aucune connaissance préalable requise  
⏱️ **Durée totale** : 15-20 minutes

---

## Table des matières

1. [Installer Git](#1-installer-git)
2. [Vérifier que Git est installé](#2-vérifier-que-git-est-installé)
3. [Configurer Git](#3-configurer-git-nom-et-email)
4. [Initialiser votre projet local](#4-initialiser-votre-projet-local)
5. [Créer un dépôt GitHub](#5-créer-un-dépôt-github)
6. [Connecter local à GitHub](#6-connecter-votre-projet-local-à-github)
7. [Les 3 commandes principales](#7-les-3-commandes-principales)
8. [Dépanner les erreurs courantes](#8-dépanner-les-erreurs-courantes)
9. [Mettre à jour votre projet](#9-mettre-à-jour-votre-projet)
10. [Bonnes pratiques](#10-bonnes-pratiques)

---

## 1. Installer Git

### Étape 1a : Sur **Windows**

Aller à : [git-scm.com](https://git-scm.com)

```
1. Cliquez sur "Download for Windows"
2. Téléchargez l'installateur
3. Double-cliquez sur le fichier .exe
4. Acceptez les conditions par défaut (clic "Next" partout)
5. Terminez l'installation
```

**✅ Installation réussie** → Redémarrez votre ordinateur

---

### Étape 1b : Sur **macOS**

```bash
# Option 1 : Via Homebrew (recommandé)
brew install git

# Option 2 : Directement depuis git-scm.com
# Téléchargez et installez le fichier .pkg
```

---

### Étape 1c : Sur **Linux** (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install git
```

---

## 2. Vérifier que Git est installé

### Ouvrir le terminal/PowerShell

**Sur Windows** :
- Cliquez sur le bouton "Démarrer" (🪟)
- Tapez `PowerShell`
- Appuyez sur `Entrée`

**Sur macOS/Linux** :
- Ouvrez l'application "Terminal"

### Vérifier la version

```bash
git --version
```

**Résultat attendu** :
```
git version 2.42.0
```

✅ Si vous voyez un numéro de version → **Git est installé correctement**

---

## 3. Configurer Git (Nom et Email)

### Pourquoi ?
Git a besoin de connaître vos informations pour enregistrer qui a modifié chaque fichier.

### Commandes de configuration

```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

**Exemple** :
```bash
git config --global user.name "Marie Dupont"
git config --global user.email "marie.dupont@company.fr"
```

### Vérifier votre configuration

```bash
git config --global user.name
git config --global user.email
```

**Résultat attendu** :
```
Marie Dupont
marie.dupont@company.fr
```

✅ **Configuration ok !** Les informations sont enregistrées.

---

## 4. Initialiser votre projet local

### Étape 1 : Ouvrir votre dossier de projet

Allez dans votre dossier projet avec le terminal :

```bash
# Exemple : votre projet est dans C:\Users\mahra\OneDrive\Documents\Playwright\F2B-Playwright
cd C:\Users\mahra\OneDrive\Documents\Playwright\F2B-Playwright
```

**💡 Conseil** : Vous pouvez aussi ouvrir PowerShell/Terminal **dans** le dossier :
- Sur Windows : Clic droit dans le dossier → "Ouvrir dans Terminal"

### Étape 2 : Initialiser Git

```bash
git init
```

**Résultat** :
```
Initialized empty Git repository in C:\...\F2B-Playwright\.git
```

✅ **Succès !** Un dossier `.git` (caché) a été créé automatiquement.

### Étape 3 : Vérifier l'initialisation

```bash
git status
```

**Résultat attendu** :
```
On branch master

No commits yet

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        package.json
        playwright.config.ts
        [... tous vos fichiers ...]
```

✅ Votre projet local est **prêt à être synchronisé**.

---

## 5. Créer un dépôt GitHub

### Étape 1 : Créer un compte GitHub (si vous n'en avez pas)

Allez sur : [github.com](https://github.com)

```
1. Cliquez sur "Sign up"
2. Créez un compte avec votre email
3. Vérifiez votre email
```

### Étape 2 : Créer un nouveau dépôt

```
1. Cliquez sur votre profil (coin haut-droit)
2. Sélectionnez "Your repositories"
3. Cliquez sur le bouton vert "New"
```

### Étape 3 : Configurer le dépôt

**Formulaire à remplir** :

```
Repository name:        F2B-Playwright
Description:            Framework Playwright automation - French edition
Visibility:             Public (ou Private selon vos préférences)
Initialize with README: ❌ NE PAS COCHER (vous avez déjà les fichiers localement)
```

**Important** :
- ❌ **Ne cochez pas** "Add a README file"
- ❌ **Ne cochez pas** ".gitignore"
- Cliquez sur **"Create repository"**

### Résultat

Vous verrez une page avec :
```
https://github.com/votre-username/F2B-Playwright
```

✅ **Votre dépôt GitHub est créé !**

---

## 6. Connecter votre projet local à GitHub

### Étape crucialde : Copier l'URL du dépôt

1. Sur la page GitHub du dépôt, cliquez sur le bouton vert **"Code"**
2. Sélectionnez **HTTPS** (ou SSH si configuré)
3. Copiez l'URL
4. Elle ressemblera à : `https://github.com/votre-username/F2B-Playwright.git`

### Ajouter le "remote" (la connexion)

```bash
git remote add origin https://github.com/votre-username/F2B-Playwright.git
```

**Remplacez** `votre-username` par votre vrai nom d'utilisateur GitHub.

### Vérifier la connexion

```bash
git remote -v
```

**Résultat attendu** (apparaît 2 fois) :
```
origin  https://github.com/votre-username/F2B-Playwright.git (fetch)
origin  https://github.com/votre-username/F2B-Playwright.git (push)
```

✅ **Connexion établie !** Votre projet local est maintenant lié à GitHub.

---

## 7. Les 3 commandes principales

### 🔄 Le cycle complet : Ajouter → Valider → Pousser

```
┌─────────────────────────────────────────┐
│  1. git add .         (Préparer)        │
│  2. git commit -m ""  (Sauvegarder)     │
│  3. git push          (Envoyer)         │
└─────────────────────────────────────────┘
```

---

### **Commande 1 : `git add .`** (Préparer vos changements)

#### Que fait cette commande ?
Git peut voir que vous avez modifié des fichiers. `add` dit à Git : "Je veux inclure ces fichiers dans ma prochaine sauvegarde."

#### Syntaxe

```bash
git add .
```

**Explications** :
- `git add` = Ajouter des fichiers
- `.` = Tous les fichiers du dossier (point = tout)

#### Vérifier l'ajout

```bash
git status
```

**Résultat** :
```
On branch master
Changes to be committed:
  (use "git restore --cached <file>..." to unstage)
        new file:   package.json
        new file:   playwright.config.ts
        [...]
```

✅ Les fichiers sont **en attente de validation** (staging area).

---

### **Commande 2 : `git commit -m "message"`** (Valider vos changements)

#### Que fait cette commande ?
`commit` crée une **sauvegarde officielle** avec un message expliquant vos changements.

#### Syntaxe

```bash
git commit -m "Votre message descriptif"
```

#### Exemples de messages

```bash
# Premier envoi inicial
git commit -m "Initial commit: Project structure and setup"

# Après avoir ajouté une fonction
git commit -m "Add login page automation"

# Après correction de bug
git commit -m "Fix selector for dashboard element"

# Après mise à jour de la doc
git commit -m "Update README with GitHub instructions"
```

**💡 Conseils pour les messages** :
- ✅ Utilisez l'anglais ou le français, soyez cohérent
- ✅ Décrivez **ce que vous avez fait**
- ✅ Soyez **court et précis** (moins de 50 caractères)
- ❌ Évitez : "blah", "fix", "update"

#### Résultat attendu

```
[master (root-commit) 1a2b3c4] Initial commit: Project structure and setup
 48 files changed, 3500 insertions(+)
 create mode 100644 package.json
 create mode 100644 playwright.config.ts
 [...]
```

✅ Votre changement est **enregistré localement**.

---

### **Commande 3 : `git push`** (Envoyer vers GitHub)

#### Que fait cette commande ?
`push` envoie vos changements validés vers votre dépôt GitHub.

#### Syntaxe

```bash
git push origin master
```

**Explications** :
- `git push` = Envoyer
- `origin` = Vers GitHub (le remote)
- `master` = Sur la branche principale

**Raccourci (après le premier push)** :
```bash
git push
```

#### Résultat attendu

```
Enumerating objects: 48, done.
Counting objects: 100% (48/48), done.
Delta compression using up to 8 threads
Compressing objects: 100% (30/30), done.
Writing objects: 100% (48/48), 245.67 KiB | 1.23 MiB/s, done.
Total 48 (delta 0), reused 0 (delta 0), pack-reused 0

To https://github.com/votre-username/F2B-Playwright.git
 * [new branch]      master -> master
```

✅ **Congratulations!** Votre projet est maintenant sur GitHub! 🎉

#### Vérifier sur GitHub

1. Allez sur `https://github.com/votre-username/F2B-Playwright`
2. Vous verrez tous vos fichiers affichés
3. Cliquez sur "commits" pour voir l'historique

---

## 8. Dépanner les erreurs courantes

### ❌ Erreur 1 : "fatal: not a git repository"

**Cause** : Vous n'avez pas exécuté `git init` dans ce dossier.

**Solution** :
```bash
git init
```

---

### ❌ Erreur 2 : "fatal: The current branch master has no upstream branch"

**Cause** : C'est le premier push et Git ne sait pas où l'envoyer.

**Solution** :
```bash
git push -u origin master
```

Le `-u` dit à Git : "Mémorise cette connexion pour les prochains push".

---

### ❌ Erreur 3 : "remote already exists"

**Cause** : Le `remote origin` existe déjà.

**Solution** :
```bash
# Voir les remotes existants
git remote -v

# Supprimer l'ancien
git remote remove origin

# Ajouter le nouveau
git remote add origin https://github.com/votre-username/F2B-Playwright.git
```

---

### ❌ Erreur 4 : "Authentication failed" ou "Permission denied"

**Cause** : GitHub ne reconnaît pas vos identifiants.

**Solutions** :

**Option 1 : Utiliser un Personal Access Token (PAT)**

1. Aller à GitHub → Settings → Developer settings → Personal access tokens
2. Cliquez sur "Tokens (classic)"
3. Générez un nouveau token avec `repo` comme permission
4. Copiez le token
5. Quand Git demande un mot de passe, collez le token
6. GitHub enregistrera le token pour les futures requêtes

**Option 2 : Utiliser SSH** (plus secure)

```bash
# Générer une clé SSH
ssh-keygen -t ed25519 -C "votre.email@example.com"

# Acceptez la localisation par défaut (appuyez sur Entrée 3 fois)
# Aller à GitHub → Settings → SSH and GPG keys
# Collez votre clé publique
```

---

### ❌ Erreur 5 : "src refspec master does not match any"

**Cause** : Vous n'avez pas validé (commit) vos fichiers.

**Solution** :
```bash
git add .
git commit -m "Initial commit"
git push origin master
```

---

## 9. Mettre à jour votre projet

### Après avoir ajouté/modifié des fichiers

Le processus est **toujours le même** :

```bash
# Étape 1 : Préparer
git add .

# Étape 2 : Valider (avec un message à chaque fois)
git commit -m "Votre message descriptif"

# Étape 3 : Envoyer
git push
```

### Exemple réel

```bash
# Vous avez modifié pages/LoginPage.ts et ajouté tests/new-test.spec.ts

# 1. Préparer
git add .

# 2. Valider
git commit -m "Add new login test and improve LoginPage selectors"

# 3. Envoyer
git push
```

**Résultat** : Sur GitHub, vous verrez les changements immédiatement.

---

### Vérifier vos envois

```bash
git log
```

Affichera tous vos commits :
```
commit 1a2b3c4... (HEAD -> master, origin/master)
Author: Marie Dupont <marie@example.com>
Date:   Mon Feb 9 14:30:00 2026 +0100

    Add new login test and improve LoginPage selectors

commit 5e6f7g8...
Author: Marie Dupont <marie@example.com>
Date:   Mon Feb 9 14:25:00 2026 +0100

    Update README with GitHub instructions

commit 9h0i1j2...
Author: Marie Dupont <marie@example.com>
Date:   Mon Feb 9 14:20:00 2026 +0100

    Initial commit: Project structure and setup
```

---

## 10. Bonnes pratiques

### ✅ À faire

```bash
# ✅ Committer régulièrement (chaque 30 min de travail)
git commit -m "Implement user login flow"

# ✅ Messages clairs et en anglais ou français cohérent
git commit -m "Add retry logic to API tests"

# ✅ Ajouter tous les fichiers pertinents
git add .

# ✅ Vérifier avant de pousser
git status
git log --oneline -n 3
git push
```

### ❌ À éviter

```bash
# ❌ Commits trop gros (100+ fichiers à la fois)
git add .
git commit -m "Big update"  # Mauvais!

# ❌ Messages vagues
git commit -m "fix"         # Mauvais!
git commit -m "blah"        # Mauvais!

# ❌ Oublier le message
git commit  # Sans -m "message" → Ouvre un éditeur compliqué

# ❌ Pousser du code cassé (toujours tester avant)
npm run test  # Avant git push!
```

---

## 11. Workflow complet (vue d'ensemble)

```bash
# ═══════════════════════════════════════════════════════════
# PREMIÈRE FOIS (Setup initial)
# ═══════════════════════════════════════════════════════════

# 1. Configurez Git
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"

# 2. Allez dans votre projet
cd C:\Users\mahra\OneDrive\Documents\Playwright\F2B-Playwright

# 3. Initialisez Git
git init

# 4. Ajoutez le remote GitHub
git remote add origin https://github.com/votre-username/F2B-Playwright.git

# 5. Ajoutez tous vos fichiers
git add .

# 6. Créez votre premier commit
git commit -m "Initial commit: Project structure and setup"

# 7. Poussez vers GitHub (avec -u pour la première fois)
git push -u origin master

# ═══════════════════════════════════════════════════════════
# POUR LES PROCHAINS MISES À JOUR
# ═══════════════════════════════════════════════════════════

# (Vous modifiez vos fichiers...)

# 1. Préparez
git add .

# 2. Validez
git commit -m "Fix login page selectors"

# 3. Poussez
git push

# C'est tout! 🎉
```

---

## 12. Checklist pour vérifier votre progression

- [ ] Git est installé (`git --version` affiche un numéro)
- [ ] Votre nom et email sont configurés (`git config --global user.name`)
- [ ] Votre projet est initialisé (`git init` exécuté)
- [ ] Vos fichiers sont visible (`git status` les liste)
- [ ] Un commit initial est créé (`git log` montre au moins 1 commit)
- [ ] Le remote GitHub est connecté (`git remote -v` affiche l'URL)
- [ ] Votre projet est sur GitHub (visible sur github.com)
- [ ] Vous pouvez voir vos fichiers sur GitHub dans le navigateur

✅ **Si toutes les cases sont cochées** : Vous maîtrisez l'essentiel !

---

## Questions fréquentes

### Q : Dois-je toujours faire `git add .` ?

**R** : Oui, sauf si vous voulez ajouter seulement certains fichiers :
```bash
git add pages/LoginPage.ts     # Un seul fichier
git add tests/               # Un dossier entier
git add .                     # Tout
```

---

### Q : Que faire si je me trompe avec un commit ?

**R** : Vous pouvez modifier le dernier commit (avant de pousser) :
```bash
git add .
git commit --amend -m "Nouveau message"
```

Ou annuler le dernier commit :
```bash
git reset --soft HEAD~1
```

---

### Q : Comment récupérer le code depuis GitHub sur mon autre ordinateur ?

**R** : Utilisez `git clone` :
```bash
git clone https://github.com/votre-username/F2B-Playwright.git
```

---

### Q : Dois-je toujours utiliser `master` comme branche ?

**R** : Par défaut oui, mais GitHub recommande `main`. À la création du dépôt GitHub, il crée `main`. Pour changer :
```bash
git branch -M main
git push -u origin main
```

---

## Ressources supplémentaires

- **Docs officielles Git** : [git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Help** : [docs.github.com](https://docs.github.com)
- **Interactive Guide** : [learngitbranching.js.org](https://learngitbranching.js.org) (très cool!)

---

## Résumé rapide (A imprimer!)

```
┌──────────────────────────────────────────────────────┐
│              COMMANDES ESSENTIELLES                  │
├──────────────────────────────────────────────────────┤
│ git init                                 │ Initialiser
│ git add .                                │ Préparer
│ git commit -m "message"                  │ Valider
│ git push                                 │ Envoyer
│ git status                               │ Vérifier
│ git log                                  │ Historique
│ git remote add origin <url>              │ Connecter
│ git remote -v                            │ Voir connexion
└──────────────────────────────────────────────────────┘
```

---

**🎓 Vous êtes maintenant prêt à pousser votre projet vers GitHub!**

💪 Questions ? Relisez cette section spécifique ou cherchez "github [votre erreur]" sur Google.

Bon courage! 🚀
