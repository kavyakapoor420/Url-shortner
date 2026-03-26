# URL Shortener

A full-stack URL shortener built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Project Structure

```text
url-shortener/
├── client/
├── server/
├── .gitignore
├── package.json
└── README.md
```

## 1. Install Dependencies

From the `url-shortener` root:

```bash
npm install
```

This installs the root tooling plus dependencies for both `client` and `server` using npm workspaces.

## 2. Backend Setup

1. Move into the server folder:

   ```bash
   cd server
   ```

2. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

3. Update the values in `.env`:

   ```env
   PORT=5001
   MONGO_URI=mongodb://127.0.0.1:27017/url-shortener
   JWT_SECRET=replace_with_a_long_random_secret
   CLIENT_URL=http://localhost:5173
   BASE_URL=http://localhost:5001
   NODE_ENV=development
   ```

4. Start the backend:

   ```bash
   npm run dev
   ```

## 3. Frontend Setup

1. Open a new terminal and move into the client folder:

   ```bash
   cd client
   ```

2. Create a `.env` file from the example:

   ```bash
   cp .env.example .env
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

## 4. Integration

1. Make sure MongoDB is running locally.
2. Keep the backend running on `http://localhost:5001`.
3. Keep the frontend running on `http://localhost:5173`.
4. Open the frontend in your browser and create an account.
5. Log in, shorten a URL, and test the generated short link.

## API Overview

- `POST /api/auth/signup` - register a new user
- `POST /api/auth/login` - log in and set the JWT cookie
- `POST /api/auth/logout` - clear the auth cookie
- `GET /api/auth/me` - get the current logged-in user
- `GET /api/urls` - get only the logged-in user's URLs
- `POST /api/urls` - create a short URL for the logged-in user
- `GET /:shortCode` - redirect to the original URL and increment clicks

## Features

- JWT authentication using HTTP-only cookies
- Protected routes on backend and frontend
- User-specific dashboard
- Click analytics for every short URL
- Modern dark SaaS-style UI with Tailwind CSS
- Reusable frontend components and MVC backend structure

## Optional Root Commands

From the `url-shortener` root, you can also use:

```bash
npm run dev
```

## Authentication And Authorization Concept

Authentication answers "who are you?", and authorization answers "what are you allowed to access?". In this project, authentication happens when a user signs up or logs in, and authorization happens when the backend checks whether that logged-in user is allowed to access protected routes and only their own URLs.

Here's the full workflow in your app.

### 1. Signup Flow

When a user signs up from the frontend, the form sends `name`, `email`, and `password` to the backend route in [`authRoutes.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/routes/authRoutes.js). That request reaches the controller in [`authController.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/controllers/authController.js).

Inside signup:

- The backend validates that all fields exist.
- It checks whether the email already exists in MongoDB.
- A new user is created using the schema in [`User.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/models/User.js).
- Before saving, the `pre("save")` hook hashes the password with `bcrypt`.

Important concept:

- We never store the plain password.
- We only store a hashed version, so even if the database leaks, the original password is not directly visible.

After the user is created:

- The backend generates a JWT using [`generateToken.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/utils/generateToken.js).
- That JWT contains the user id.
- The server sends it to the browser in an HTTP-only cookie using [`cookieOptions.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/utils/cookieOptions.js).

So after signup, the user is already "logged in".

### 2. Login Flow

Login is similar:

- Frontend sends `email` and `password`.
- Backend finds the user by email.
- Backend compares the entered password with the hashed password using `bcrypt.compare`.
- If it matches, backend creates a JWT again.
- JWT is sent back in an HTTP-only cookie.

Why cookie + JWT together?

- JWT gives stateless authentication.
- Cookie makes it easy for the browser to automatically send the token on future requests.
- `httpOnly: true` means JavaScript in the browser cannot read the token, which is safer than storing it in localStorage.

### 3. What Is Inside The JWT

The JWT is created in [`generateToken.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/utils/generateToken.js). It stores:

- `userId`
- expiry time like `7d`

It is signed using `JWT_SECRET` from your `.env`.

Important idea:

- The token is not encrypted by default, it is signed.
- Signed means the server can detect if someone has tampered with it.
- If the signature is invalid, backend rejects it.

### 4. How The Browser Stays Logged In

After login/signup:

- Browser stores the cookie.
- Every later request to the backend includes that cookie automatically because Axios uses `withCredentials: true` in [`axios.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/client/src/api/axios.js).
- That's why your CORS config must allow credentials.

So when frontend calls `/api/auth/me` or `/api/urls`, the cookie goes along with the request.

### 5. How Authentication Is Checked On Protected Routes

Protected routes use the middleware in [`authMiddleware.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/middleware/authMiddleware.js).

That middleware:

- Reads `req.cookies.token`
- If token is missing, throws `401 Authentication required`
- Verifies token with `jwt.verify`
- Extracts `userId` from the token
- Finds that user in MongoDB
- Attaches the user to `req.user`

So after middleware runs, downstream controllers can trust `req.user`.

That is the core authentication check.

### 6. How Authorization Works

Authentication only proves the user is logged in.

Authorization is the next step:

- "This token belongs to user A"
- "So user A should only access user A's data"

In your URL routes, the backend filters by `owner: req.user._id` in [`urlController.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/controllers/urlController.js).

Example:

- `getMyUrls` only fetches URLs where `owner === loggedInUserId`
- `createShortUrl` saves the new URL with `owner: req.user._id`

That means each user only sees their own links.

This is authorization:

- same endpoint
- different users
- each user gets only permitted data

### 7. Why The `owner` Field Matters

In [`Url.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/models/Url.js), every shortened URL stores:

- `originalUrl`
- `shortCode`
- `clicks`
- `owner`

That `owner` links each URL to a user document.

Without this field:

- anyone logged in could potentially see everyone's URLs
- there would be no user-level data isolation

So `owner` is the backbone of authorization in this app.

### 8. What `/auth/me` Does

The route `/api/auth/me` is useful for session restore.

Flow:

- Frontend loads
- `AuthContext` calls `/auth/me`
- Cookie is sent automatically
- Backend verifies token through middleware
- If valid, backend returns current user
- Frontend sets user state and keeps the session alive

That is why refreshing the page does not log the user out, as long as the cookie still exists and the JWT is valid.

See [`AuthContext.jsx`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/client/src/context/AuthContext.jsx).

### 9. Logout Flow

Logout in [`authController.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/controllers/authController.js) works by clearing the cookie.

So:

- browser no longer sends the token
- future protected requests fail
- user is effectively logged out

JWT itself may still exist conceptually until expiry, but if the browser no longer has it, the session is gone from the app's perspective.

### 10. Frontend Route Protection

Frontend also protects routes using:

- [`ProtectedRoute.jsx`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/client/src/components/ProtectedRoute.jsx)
- [`PublicRoute.jsx`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/client/src/components/PublicRoute.jsx)

Frontend protection is mainly for user experience:

- if not logged in, redirect to login
- if logged in, prevent access to login/signup pages

But real security is always on the backend.
A user can bypass frontend checks, but cannot bypass backend middleware if it is written correctly.

### 11. Redirect Route Is Public

The short link redirect route `GET /:shortCode` in [`redirectRoutes.js`](/Users/ridhimakapoor/Desktop/Fork-IIIT-hack/url-shortener/server/src/routes/redirectRoutes.js) is intentionally public.

Why?

- Anyone with the short link should be able to open it.
- It does not need login.

It:

- finds the matching short code
- increases `clicks`
- redirects to the original URL

So this route is public, while dashboard and URL management routes are private.

### 12. Full Picture In One Sentence

The app logs a user in by generating a signed JWT and storing it in an HTTP-only cookie, then protects private routes by verifying that token and uses the logged-in user id to ensure each user can only access their own URL records.

### 13. Easy Mental Model

Think of it like this:

- Signup/Login = issuing an ID card
- JWT = the signed ID card
- Cookie = where the browser keeps that card
- Auth middleware = security guard checking the card
- `req.user` = confirmed identity after verification
- `owner` field in URLs = whose locker the data belongs to
- Authorization = guard allowing you into only your own locker

### 14. Why This Approach Is Good

This pattern is popular because it is:

- simple
- scalable
- beginner-friendly
- secure enough for many apps when configured properly

Benefits:

- no plaintext passwords
- token hidden from frontend JS via HTTP-only cookie
- backend controls access
- each user's data stays separated

### 15. Important Security Notes

A few best-practice ideas to keep in mind:

- Use a strong `JWT_SECRET`
- Use `secure: true` cookies in production over HTTPS
- Use `sameSite: "none"` only when needed with HTTPS cross-site usage
- Validate user input carefully
- Add rate limiting for login in production
- Consider refresh tokens for larger production systems

If you want, next I can teach this as a very simple step-by-step request lifecycle, like:
`Login button click -> backend controller -> JWT creation -> cookie storage -> protected route access`,
which is usually the easiest way to fully lock the concept in your mind.
