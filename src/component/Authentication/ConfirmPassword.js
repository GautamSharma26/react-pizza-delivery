import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ConfirmPassword = () => {
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [searchParams] = useSearchParams();
    const[passwordstatus, setPasswordStatus]=useState('');

    const passwordConfirm =()=>{
        axios.post("http://127.0.0.1:8000/password_reset/confirm/",{
        password,
        token
    })
    .then(res => setPasswordStatus(res.data.statusText))
    .catch(err => console.log(err))
    }
    useEffect(()=>{
        setToken(searchParams.get("token"));
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    useEffect(()=>{
        setPassword('');
    },[passwordstatus])

    return (
        <>
        <div className="row">
            <div className="col-md-3 offset-5 bg-dark">
                <div class="mb-3 row mt-2">
                    <label for="inputPassword" class="col-sm-2 col-form-label text-light">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="text-center">
                    <button type="button" className="btn-primary mx-2 mb-4 btn-lg " onClick={passwordConfirm}>Submit</button>
                </div>
            </div>
        </div>
        </>
    );
}
export default ConfirmPassword;
