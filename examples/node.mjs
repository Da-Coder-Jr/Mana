const endpoint = process.env.MANA_URL || 'http://localhost:3001/chat';

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Write a one-line launch post for Mana.',
  }),
});

console.log(await response.json());
