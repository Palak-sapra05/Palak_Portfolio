---
description: how to run the portfolio locally
---
### 1. Prerequisites
- Node.js installed
- MongoDB installed and running (or a MongoDB URI)

### 2. Setup Backend (Server)
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your `MONGO_URI` and `PORT`:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server (Development mode):
   ```bash
   npm run dev
   ```

### 3. Setup Frontend (Client)
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application:
   The terminal will provide a URL (usually `http://localhost:5173`).
