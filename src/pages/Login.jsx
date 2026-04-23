// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
export default function Login() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleLogin(e) {
    e.preventDefault();
  }

  return (
    <div>
      <h1>login page</h1>

      <form className="flex-col" onSubmit={handleLogin}>
        <input type="text" placeholder="email" className="text-light-text dark:text-dark-text" />

        <input type="password" placeholder="password" className="text-light-text dark:text-dark-text" />

        <button type="submit">login</button>
      </form>
    </div>
  );
}
