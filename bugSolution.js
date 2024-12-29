const express = require('express');
const app = express();

// Simulate a database operation (replace with your actual database code)
const users = {
  '1': { id: '1', name: 'John Doe' },
  '2': { id: '2', name: 'Jane Smith' },
};

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users[id]) {
        resolve(users[id]);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};

app.get('/users/:id', async (req, res, next) => {
  try {
    const userId = req.params.id;
    if (isNaN(userId)){
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    const user = await getUser(userId);
    res.json(user);
  } catch (error) {
    next(error); // Pass the error to the error-handling middleware
  }
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});