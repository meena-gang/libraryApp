import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState([]);
    const [age, setAge] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCheckboxChange = (value) => {
        setRole(prevRole => 
            prevRole.includes(value) ? prevRole.filter(role => role !== value) : [...prevRole, value]
        );
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const user = { userName, password, email, role, age };
            const res = await axios.post('https://librarybackend-5-5d3q.onrender.com/user/register', user);
            console.log(res);
            navigate('/login');
            
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <input 
                name="userName" 
                placeholder="Enter your name" 
                onChange={(e) => setUserName(e.target.value)} 
                value={userName} 
                required
            />
            <input 
                name="email" 
                placeholder="Enter your email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                required
            />
            <input 
                name="password" 
                type="password" 
                placeholder="Enter your password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required
            />
            <div>
                <input 
                    type="checkbox" 
                    value="creator" 
                    onChange={(e) => handleCheckboxChange(e.target.value)} 
                    checked={role.includes('creator')}
                />
                <label>Creator</label>
                <input 
                    type="checkbox" 
                    value="viewer" 
                    onChange={(e) => handleCheckboxChange(e.target.value)} 
                    checked={role.includes('viewer')}
                />
                <label>Viewer</label>
                <input 
                    type="checkbox" 
                    value="view_all" 
                    onChange={(e) => handleCheckboxChange(e.target.value)} 
                    checked={role.includes('view_all')}
                />
                <label>View all</label>
            </div>
            <input 
                name="age" 
                placeholder="Enter your age" 
                onChange={(e) => setAge(e.target.value)} 
                value={age} 
                required
            />
            <button type="submit" disabled={loading}>Register</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </form>
    )
}

export default Register;
