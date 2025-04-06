import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './services/auth.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors'; // Added for CORS support
import uploadRoutes from './routes/upload.js'; // Import upload route

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Enable CORS (for local development or when frontend is on different origin)
  app.use(cors());

  // Handle parsing of incoming JSON and url-encoded data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Mount image upload endpoint
  app.use('/api', uploadRoutes);

  // 🔐 Authentication middleware for GraphQL
  app.use(
    '/graphql',
    expressMiddleware(server as any, {
      context: authenticateToken as any,
    })
  );

  // 🚀 Serve static files if in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/dist')));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
    });
  }

  // 🧠 Start DB + server
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    console.log(`Upload endpoint at http://localhost:${PORT}/api/upload`);
  });
};

startApolloServer();


