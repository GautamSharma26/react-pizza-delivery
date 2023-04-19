import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [statuss, setStatus] = useState(null);
    const passwordReset = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/password_reset/", {
            email
        })
            .then(resp => setStatus(resp.data[0]))
            .catch(err => setStatus(err.response.statusText))

    }
    useEffect(() => {
        setEmail('')
    }, [statuss])

    return (
        <>
            {
                statuss &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>{statuss}</strong>
                </div>
            }
            <label>Enter Your e-mail id here...</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="button" className="btn-primary mx-2" onClick={passwordReset}>Submit</button>
            <br />
            <Link to="/">Home</Link>

        </>
    );
}

export default ResetPassword;