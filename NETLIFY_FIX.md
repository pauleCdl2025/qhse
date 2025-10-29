# Correction de l'erreur Netlify "Host key verification failed"

Cette erreur se produit lorsque Netlify ne peut pas accéder au dépôt GitHub.

## Solution 1 : Vérifier la connexion GitHub dans Netlify

1. **Allez sur votre dashboard Netlify** : https://app.netlify.com
2. **Sélectionnez votre site**
3. **Allez dans "Site settings"** → **"Build & deploy"** → **"Continuous Deployment"**
4. **Vérifiez que le dépôt est connecté** :
   - Si ce n'est pas le cas, cliquez sur **"Connect to Git provider"**
   - Sélectionnez **GitHub** et autorisez l'accès

## Solution 2 : Reconnecter le dépôt GitHub

1. Dans Netlify, allez dans **"Site settings"** → **"Build & deploy"**
2. Dans la section **"Continuous Deployment"**, cliquez sur **"Stop publishing"**
3. Puis cliquez sur **"Link repository"** ou **"Change repository"**
4. Sélectionnez le dépôt `pauleCdl2025/qhse`
5. Assurez-vous que :
   - **Branch to deploy** : `main`
   - **Build command** : `npm run build`
   - **Publish directory** : `dist`
   - **Base directory** : (vide ou `.`)

## Solution 3 : Vérifier que Netlify a accès au dépôt

1. Allez sur GitHub : https://github.com/pauleCdl2025/qhse
2. Vérifiez que le dépôt est **public** ou que Netlify a les permissions pour accéder à un dépôt privé
3. Pour un dépôt privé :
   - Allez dans **GitHub Settings** → **Applications** → **Installed GitHub Apps**
   - Trouvez **Netlify** et vérifiez les permissions
   - Assurez-vous que Netlify a accès au dépôt `qhse`

## Solution 4 : Utiliser un déploiement manuel temporaire

Si le problème persiste, vous pouvez déployer manuellement :

1. Dans Netlify, allez dans **"Deploys"**
2. Cliquez sur **"Trigger deploy"** → **"Deploy site"**
3. Ou utilisez le CLI Netlify :
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

## Solution 5 : Vérifier la configuration netlify.toml

Le fichier `netlify.toml` doit être présent à la racine du projet (✅ déjà présent).

## Configuration recommandée pour Netlify

Assurez-vous que dans Netlify :
- **Build command** : `npm run build`
- **Publish directory** : `dist`
- **Base directory** : (vide)
- **Node version** : (utilisez la dernière LTS ou laissez vide)
- **Package directory** : (vide)

## Variables d'environnement dans Netlify

Assurez-vous que les variables d'environnement suivantes sont configurées dans Netlify :

1. Allez dans **"Site settings"** → **"Environment variables"**
2. Ajoutez :
   - `VITE_SUPABASE_URL` = `https://uehamaitijekflxpeuxj.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaGFtYWl0aWpla2ZseHBldXhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NDQ2OTYsImV4cCI6MjA3NzIyMDY5Nn0.fDxXA9GiDrJZTPQdzsFhk6uoS7PgYzpC5wbLBdZn3Ck`

## Actions immédiates

1. ✅ Le dépôt GitHub existe et est accessible : `https://github.com/pauleCdl2025/qhse.git`
2. ⚠️ Vérifiez que Netlify est bien connecté à ce dépôt
3. ⚠️ Vérifiez les permissions GitHub pour Netlify

## Si le problème persiste

1. **Déconnectez puis reconnectez le dépôt** dans Netlify
2. **Vérifiez les logs de build** pour plus de détails
3. **Contactez le support Netlify** avec l'erreur complète

