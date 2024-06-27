import React,{useState} from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios';

const Update = () => {
    const{bookId} = useParams();
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const [title, setTitle] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();

   
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const book = { title, authorName, price};
            const token = localStorage.getItem('token');
            const res = await axios.patch(`https://librarybackend-5-5d3q.onrender.com/book/update/${bookId}`, book,{
              headers: {
                authorization: `Bearer ${token}`
              }
            }
              
            );
            console.log(res);
            navigate('/library');
            
        } catch (err) {
            setError('Book updation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }
  return (
    <>
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
    <button type="submit" disabled={loading}>Update</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
    </>
  )
}

export default Update