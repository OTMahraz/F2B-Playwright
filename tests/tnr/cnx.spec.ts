import { test } from './../../fixtures/auth.fixture'; 

test('Accès dashboard pour BP', async ({ page, user }) => {
  // user est bien typé UserCredentials
}); 





/*Lancer en UAT :
ENV=uat npx playwright test

Lancer en Preprod :
ENV=preprod npx playwright test

Lancer avec rôle Management :
ROLE=MGMT npx playwright test*/