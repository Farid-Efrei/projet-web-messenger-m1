const { BrowserRouter, Routes, Route, useNavigate } = ReactRouterDOM;
let token = localStorage.getItem('token');
const themes = {
  light: { '--bg': '#fff', '--text': '#000', '--border': '#ddd' },
  dark: { '--bg': '#1e1e1e', '--text': '#eee', '--border': '#555' }
};

function applyTheme(name) {
  const vars = themes[name];
  Object.entries(vars).forEach(([k, v]) =>
    document.documentElement.style.setProperty(k, v)
  );
  localStorage.setItem('theme', name);
}

function useAuth() {
  const [logged, setLogged] = React.useState(!!token);
  async function login(username, password) {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'mutation($u:String!,$p:String!){login(username:$u,password:$p)}',
        variables: { u: username, p: password }
      })
    });
    const json = await res.json();
    token = json.data.login;
    if (token) {
      localStorage.setItem('token', token);
      setLogged(true);
    }
  }
  return { logged, login };
}

function LoginPage() {
  const [username, setUsername] = React.useState('admin');
  const [password, setPassword] = React.useState('password');
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="user" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="pass" />
      <button onClick={async () => { await auth.login(username, password); navigate('/chat'); }}>Login</button>
    </div>
  );
}

function ChatPage() {
  const [messages, setMessages] = React.useState([]);
  const [text, setText] = React.useState('');
  const [room, setRoom] = React.useState('general');
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  const unread = messages.filter(m => !m.read).length;

  React.useEffect(() => { applyTheme(theme); }, [theme]);

  React.useEffect(() => {
    fetchMessages();
    const id = setInterval(fetchMessages, 5000);
    return () => clearInterval(id);
  }, [room]);

  async function fetchMessages() {
    const res = await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ query: 'query($r:String){ messages(roomId:$r){ id content senderId createdAt read } }', variables: { r: room } })
    });
    const json = await res.json();
    setMessages(json.data.messages);
  }

  async function send() {
    if (!text) return;
    await fetch('/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify({ query: 'mutation($c:String!,$r:String!){ sendMessage(content:$c,recipientId:"u2",senderId:"u1",roomId:$r){ id } }', variables: { c: text, r: room } })
    });
    setText('');
    fetchMessages();
  }

  return (
    <div className="container">
      <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? 'Dark' : 'Light'} mode
      </button>
      <h1>Room: {room} ({unread})</h1>
      <select value={room} onChange={e => setRoom(e.target.value)}>
        <option value="general">general</option>
        <option value="random">random</option>
      </select>
      <ul>
        {messages.map(m => <li key={m.id}>{m.createdAt.substring(11,19)} - {m.senderId}: {m.content}</li>)}
      </ul>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Type message" />
      <button onClick={send}>Send</button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
