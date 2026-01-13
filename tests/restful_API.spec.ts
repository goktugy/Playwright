// Playwright API Testing Examples
// Install: npm install -D @playwright/test

import { test, expect } from '@playwright/test';

// Basic GET Request
test('GET request - fetch users', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
  
  const users = await response.json();
  expect(users).toBeInstanceOf(Array);
  expect(users.length).toBeGreaterThan(0);
});

// GET Request with Query Parameters
test('GET with query params', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts', {
    params: {
      userId: 1
    }
  });
  
  expect(response.ok()).toBeTruthy();
  const posts = await response.json();
  expect(posts.every(post => post.userId === 1)).toBeTruthy();
});

// POST Request - Create Resource
test('POST request - create user', async ({ request }) => {
  const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe'
  };
  
  const response = await request.post('https://jsonplaceholder.typicode.com/users', {
    data: newUser
  });
  
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);
  
  const created = await response.json();
  expect(created).toMatchObject(newUser);
  expect(created.id).toBeDefined();
});

// PUT Request - Update Resource
test('PUT request - update user', async ({ request }) => {
  const updatedUser = {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    username: 'janedoe'
  };
  
  const response = await request.put('https://jsonplaceholder.typicode.com/users/1', {
    data: updatedUser
  });
  
  expect(response.ok()).toBeTruthy();
  const result = await response.json();
  expect(result.name).toBe(updatedUser.name);
});

// PATCH Request - Partial Update
test('PATCH request - partial update', async ({ request }) => {
  const response = await request.patch('https://jsonplaceholder.typicode.com/users/1', {
    data: { name: 'Updated Name' }
  });
  
  expect(response.ok()).toBeTruthy();
  const result = await response.json();
  expect(result.name).toBe('Updated Name');
});

// DELETE Request
test('DELETE request - remove resource', async ({ request }) => {
  const response = await request.delete('https://jsonplaceholder.typicode.com/users/1');
  
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(200);
});

// Custom Headers
test('Request with custom headers', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users', {
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'custom-value'
    }
  });
  
  expect(response.ok()).toBeTruthy();
});

// Response Header Validation
test('Validate response headers', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  
  const headers = response.headers();
  expect(headers['content-type']).toContain('application/json');
});

// API Context with Base URL and Default Headers
test.describe('API Context Setup', () => {
  test('Use API context', async ({ playwright }) => {
    const context = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'User-Agent': 'Playwright-Test'
      }
    });
    
    const response = await context.get('/users/1');
    expect(response.ok()).toBeTruthy();
    
    await context.dispose();
  });
});

// Error Handling
test('Handle API errors', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/999999');
  
  expect(response.status()).toBe(404);
  expect(response.ok()).toBeFalsy();
});

// Schema Validation Example
test('Validate response schema', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
  const user = await response.json();
  
  // Check required fields
  expect(user).toHaveProperty('id');
  expect(user).toHaveProperty('name');
  expect(user).toHaveProperty('email');
  expect(user).toHaveProperty('username');
  
  // Check data types
  expect(typeof user.id).toBe('number');
  expect(typeof user.name).toBe('string');
  expect(typeof user.email).toBe('string');
});

// Performance Testing
test('Check API response time', async ({ request }) => {
  const startTime = Date.now();
  const response = await request.get('https://jsonplaceholder.typicode.com/users');
  const endTime = Date.now();
  
  const responseTime = endTime - startTime;
  
  expect(response.ok()).toBeTruthy();
  expect(responseTime).toBeLessThan(2000); // Response should be under 2 seconds
});
