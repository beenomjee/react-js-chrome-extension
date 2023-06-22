import { useState } from "react";
import "./styles.css";
import axios from "axios";

function App() {
  const [error, setError] = useState('');
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [data, setdata] = useState()
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.get('http://localhost:3000/api/v1/name?id=' + id)
      setdata(res.data);
      setError('')
      setIsLoading(false)
    } catch (err) {
      setError(err?.response?.data?.message ?? err.message)
      setIsLoading(false)
    }
  }

  const onPost = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/api/v1/name', { name })
      setdata(res.data);
      setIsLoading(false)
      setError('')
    } catch (err) {
      setError(err?.response?.data?.message ?? err.message)
      setIsLoading(false)

    }
  }

  return (
    <div className="biba">
      <h4>Current Data</h4>
      <div>
        Id : {isLoading ? "Loading..." : data?.id ?? '---'}
        <br />
        name : {isLoading ? "Loading..." : data?.name ?? '---'}
      </div>
      <br />
      <br />
      <span className="error">{error}</span>
      <br />
      <br />
      <h4>Get Data</h4>
      <form onSubmit={onSubmit}>
        <label>
          <span>Id</span>
          <br />
          <input required type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <br />
        <button>Get Name</button>
      </form>
      <br />
      <br />
      <h4>Add New Name</h4>
      <form onSubmit={onPost}>
        <label>
          <span>Name</span>
          <br />
          <input type="text" required value={name} onChange={e => setName(e.target.value)} />
        </label>
        <br />
        <button>Post Name</button>
      </form>
    </div>
  );
}

export default App;
