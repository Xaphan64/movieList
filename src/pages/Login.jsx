// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
export default function Login({ nightmode }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleLogin(e) {
    e.preventDefault();

    console.log(nightmode);
  }

  return (
    <div>
      <h1>login page</h1>

      <form className="flex-col" onSubmit={handleLogin}>
        <input type="text" placeholder="email" />

        <input type="password" placeholder="password" />

        <button type="submit">login</button>
      </form>
    </div>
  );
}
