const Root = () => (
  <div>
    <h1>React Router Contacts</h1>
    <div>
      <form id="search-form" role="search">
        <input
          id="q"
          aria-label="Search contacts"
          placeholder="Search"
          type="search"
          name="q"
        />
        <div
          id="search-spinner"
          aria-hidden
          hidden
        />
        <div
          className="sr-only"
          aria-live="polite"
        />
      </form>
      <form method="post">
        <button type="submit">New</button>
      </form>
    </div>
    <nav>
      <ul>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Root;
