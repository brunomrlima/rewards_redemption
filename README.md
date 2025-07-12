# Rewards Redemption
Please check the assumptions portion at the end of this file

### Prerequisites
- **Ruby** `3.4.3`
- **Bundler** (`gem install bundler`)
- **Yarn**

### Setup
```bash
bundle install
yarn install
bin/rails db:setup
```

### Starting the application
```bash
bin/dev
```
This will run both the Rails server (port 3000) and the Vite server (frontend)

Visit the app: `localhost:3000`

### CLI Interface
Thor-based CLI is available for interacting with the API.

Available Commands:
```bash
bin/cli rewards             # List all available rewards
bin/cli redemptions         # List all redemptions for the last user in the database
bin/cli redeem <REWARD_ID>  # Redeem a reward for the last user in the database
```

### Running tests
#### Backend
```bash
bundle exec rspec
```

### Running code checker
```bash
rubocop
rubocop --auto-gen-config
```

### Assumptions

- **No Authentication Required**  
Since the challenge did not mention user authentication, I chose not to integrate any authentication system. 
All users are accessible without login or authentication checks.

- **Single User Context**  
For simplicity, the backend returns the last user in the database (`User.last`) to simulate a “current user.” 
This is reflected in the `/api/v1/users/current_user` endpoint.

- **Frontend User Context**  
The frontend uses a `UserContext` provider to simulate a logged-in user. This context is initialized by fetching 
the current user from the backend and makes the user data (id, name, points) available throughout the app.

- **Pre-populated Data**  
This setup assumes that the database contains at least one user. Please run `rails db:seed`. It is idempotent, 
so you can run it multiple times to reset your points.

- **Deployment**
Since this is a take-home challenge, I am assuming that there are no expectations for deployment, 
hence there are no deployment instructions

### Technical Decisions
#### Why Vite?
[Vite](https://vitejs.dev/) was chosen as the frontend build tool for its blazing-fast hot module replacement, 
modern ES module support, and great integration with React and Rails via `vite-plugin-ruby`. 
It significantly improves developer experience over Webpacker and other traditional Rails asset pipelines.

#### Why TanStack Query (React Query)?
[@tanstack/react-query](https://tanstack.com/query/latest) is used to manage API state and server-side caching in a 
clean, declarative way. It provides:
- Automatic caching and background refreshing of data.
- Built-in loading and error handling states.
- Mutations with optimistic updates and side effect tracking.
- A clean abstraction away from `useEffect` + `useState` data fetching logic.

This keeps components lean and focused on UI, not data fetching logic.

#### Why Bootstrap?
[Bootstrap 5](https://getbootstrap.com/) was chosen for:
- Rapid prototyping and mobile responsiveness.
- A familiar utility-first CSS system for layout and spacing.
- A professional look without investing time in custom styling.

It allowed the project to remain visually clean and usable, without requiring a heavy frontend design phase.

#### Why Thor for CLI?
[Thor](https://github.com/erikhuda/thor) was chosen as the CLI framework because it is:

- Well-integrated with Ruby and Rails, making it a natural fit for Ruby projects.
- Designed for command-line interfaces.
- Provides a clean way to define descriptive commands, arguments, and options with built-in help output.
- Easy to extend and maintain, making it scalable as more CLI features are added.

Using Thor ensures the CLI is both user-friendly and structured.
