import axios from 'axios';

import './App.css';

function App() {
  return (
    <button onClick={() => {
      alert();
      axios.delete('/api/v1/user')
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err)
      })
    }}>
      Click me :D
    </button>
  );
}

export default App;
