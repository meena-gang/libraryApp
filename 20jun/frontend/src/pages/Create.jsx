import React,{useState} from 'react'
import axios from 'axios';
import Navbar from '../component/Navbar';

const Create = () => {
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const book = { title, authorName, price};
            const token = localStorage.getItem('token');
            const res = await axios.post('https://librarybackend-5-5d3q.onrender.com/book/create', book,{
              headers: {
                authorization: `Bearer ${token}`
              }
            }
              
            );
            console.log(res);
            
        } catch (err) {
            setError('Book creation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }
  return (
    <>
    <Navbar />
    <form onSubmit={submitHandler}>
    <input 
        name="title" 
        placeholder="Enter book name" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title} 
        required
    />
    <input 
        name="authorName" 
        placeholder="Enter authorName" 
        onChange={(e) => setAuthorName(e.target.value)} 
        value={authorName} 
        required
    />
    <input 
        name="price" 
        placeholder="Enter price" 
        onChange={(e) => setPrice(e.target.value)} 
        value={price} 
        required
    />
   <button type="submit" disabled={loading}>Create</button>
    {loading && <p>Loading...</p>}
    {error && <p style={{color: 'red'}}>{error}</p>}
</form>
</>
  )
}

export default Create