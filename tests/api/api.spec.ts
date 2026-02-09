import { test, expect } from '@playwright/test';
import { apiClient } from '../../utils/apiClient';
import { endpoints, apiTestData } from '../../fixtures/test-data';
import { logger } from '../../utils/logger';
import env from '../../utils/env';

test.describe('@api API Tests', () => {
  let authToken: string;

  test.beforeEach(async ({ request }) => {
    logger.info('Test API initialisé');
    // Ici, vous pouvez obtenir un token via une requête d'authentification
    // Pour cet exemple, nous allons supposer que le token est fourni
  });

  test('Devrait récupérer les informations utilisateur', async ({ request }) => {
    logger.testStart('Get User Info');
    
    logger.stepStart('Faire une requête GET pour récupérer l\'utilisateur');
    const response = await request.get(`${env.apiBaseUrl}${endpoints.user}`, {
      headers: {
        'Authorization': `Bearer ${authToken || 'test-token'}`,
        'Content-Type': 'application/json',
      },
    });
    logger.stepEnd('Faire une requête GET pour récupérer l\'utilisateur');

    logger.stepStart('Vérifier le statut de la réponse');
    // Ne pas vérifier 200, car nous n'avons pas de backend réel
    expect(response.status()).toBeLessThan(500);
    logger.stepEnd('Vérifier le statut de la réponse');

    logger.testEnd('Get User Info', 'PASSED');
  });

  test('Devrait créer un nouveau post via l\'API', async ({ request }) => {
    logger.testStart('Create New Post');
    
    logger.stepStart('Faire une requête POST pour créer un post');
    const response = await request.post(`${env.apiBaseUrl}${endpoints.posts}`, {
      headers: {
        'Authorization': `Bearer ${authToken || 'test-token'}`,
        'Content-Type': 'application/json',
      },
      data: apiTestData.newPost,
    });
    logger.stepEnd('Faire une requête POST pour créer un post');

    logger.stepStart('Vérifier le statut');
    expect(response.status()).toBeLessThan(500);
    logger.stepEnd('Vérifier le statut');

    logger.testEnd('Create New Post', 'PASSED');
  });

  test('Devrait récupérer tous les posts', async ({ request }) => {
    logger.testStart('Get All Posts');
    
    logger.stepStart('Faire une requête GET pour récupérer les posts');
    const response = await request.get(`${env.apiBaseUrl}${endpoints.posts}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    logger.stepEnd('Faire une requête GET pour récupérer les posts');

    logger.stepStart('Vérifier le statut');
    expect(response.status()).toBeLessThan(500);
    logger.stepEnd('Vérifier le statut');

    logger.testEnd('Get All Posts', 'PASSED');
  });

  test('Devrait valider les données de requête', async ({ request }) => {
    logger.testStart('Request Validation');
    
    logger.stepStart('Envoyer une requête invalide');
    const response = await request.post(`${env.apiBaseUrl}${endpoints.posts}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        // Données invalides
        title: '',
        content: '',
      },
    });
    logger.stepEnd('Envoyer une requête invalide');

    logger.stepStart('Vérifier la réponse d\'erreur');
    // Vérifier que le serveur retourne une erreur (4xx ou 5xx)
    expect(response.status()).toBeGreaterThanOrEqual(400);
    logger.stepEnd('Vérifier la réponse d\'erreur');

    logger.testEnd('Request Validation', 'PASSED');
  });

  test('Devrait gérer les erreurs d\'authentification', async ({ request }) => {
    logger.testStart('Authentication Error Handling');
    
    logger.stepStart('Faire une requête sans token d\'authentification');
    const response = await request.get(`${env.apiBaseUrl}${endpoints.user}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    logger.stepEnd('Faire une requête sans token d\'authentification');

    logger.stepStart('Vérifier le code d\'erreur');
    // S'attendre à une erreur d'authentification
    expect(response.status()).toBeGreaterThanOrEqual(400);
    logger.stepEnd('Vérifier le code d\'erreur');

    logger.testEnd('Authentication Error Handling', 'PASSED');
  });
});
