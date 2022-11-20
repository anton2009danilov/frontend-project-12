const Login = () => (
  <>
    <div id="sidebar">
      <h1>Login</h1>
      <div>
        <form method="post">
          <input
            id="login"
            aria-label="Login"
            placeholder="username"
            name="login"
          />
          <input
            id="password"
            aria-label="password"
            placeholder="password"
            name="password"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>
    </div>
    <div id="detail" />
  </>
);

export default Login;
