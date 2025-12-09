# Movie Player App — Backend

Backend service for a movie-player application: handles user authentication & authorization, and provides movie data fetching APIs.

## Key Features

- User authentication & authorization (signup / signin / protected routes)  
- Movie data fetching endpoints (e.g. get movie list, movie details, get popular movies, get similar movies recommendations)  
- Built with modern TypeScript runtime using bun  
- Modular structure: controllers, services, routes, middlewares, utils, etc.

## Environment Variables

Create a `.env` file in the project root:

```env
TMDB_READ_ACCESS_TOKEN=your_tmdb_read_access_token_here
TMDB_API_KEY=your_tmdb_api_key_here
PORT=your port
MONGO_DB_URL=mongodb://127.0.0.1:27017/movie-app-db
PG_USER=postgres
PG_PASSWORD=your_pg_password_here
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=movie_db
JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
SALT_ROUNDS=enter salt rounds
```

## Getting Started

### Installation

```bash
# Clone the repo  
git clone https://github.com/upahar-khatiwada/movie-player-app-backend.git  

# Change into project directory  
cd movie-player-app-backend  

# Install dependencies
bun install

# Start the server
bun run dev
```

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
