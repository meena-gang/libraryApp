import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Library = () => {
    const[books, setBooks] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error, setError] = useState(false);
    const length = books.length;
    const [searchParams, setSearchParams] = useSearchParams();
    const old = searchParams.get('old');
    const new1 = searchParams.get('new1');

    
    const handleRemoveRow = async(id) => {
       const token = localStorage.getItem('token');
       const res = await axios.delete(`https://librarybackend-5-5d3q.onrender.com/book/delete/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
       console.log(res,'res');
       setBooks(books.filter(book => book['_id'] !== id));
    }

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setError(false);
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://librarybackend-5-5d3q.onrender.com/book/view?${new1? `new1=${new1}` : old ? `old=${old}` : ''}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBooks(response.data);
                console.log(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [length, new1,old]);


  return (
   <>
   <Navbar/>
   <button onClick={() => setSearchParams({ new1: 1 })}>New books</button>
   <button  onClick={() => setSearchParams({ old: 1 })}>Old books</button>
   <br/>
   {loading? <p>Loading</p> : error ? <p>Something is wrong</p> : 
    <table style={{border:"1px solid black",borderCollapse:"collapse"}}>
     <thead>
        <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Author</th>
            <th>price</th>
            <th>Delete</th>
            <th>Update</th>
        </tr>
     </thead>
     <tbody>
     {books? books.map((book,i) => 
     <tr key={i}>
        <td>{i+1}</td>
        <td>{book.title}</td>
        <td>{book.authorName}</td>
        <td>{book.price}</td>
        <td onClick={() => handleRemoveRow(book['_id'])}><button>Delete</button></td>
        <td><Link to={`/update/${book['_id']}`}><button>Update</button></Link></td>
     </tr>)
    
     : <p>books not found</p>}
      </tbody>
   </table> 
}
   </>
  )
}

export default Library