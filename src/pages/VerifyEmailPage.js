import React,{ useEffect }  from 'react'
// import api from "../apiService";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions} from ".././redux/actions/auth.action"
// import 'bootstrap/dist/css/bootstrap.min.css';

const VerifyEmailPage = () => {
    let dispatch = useDispatch();
    const useQuery = ()=> {
        return new URLSearchParams(useLocation().search);
    }
    const query = useQuery();
	const codeQuery = query.get("code");
	console.log("Your code is:", codeQuery);
    // const verifyEmail = async () => {
    //     const url = `/users/verify_email`;
    //     const response = await api.post(url, { codeQuery });
    //     console.log(response);
    // };
    useEffect(() => {
        dispatch(authActions.verifyEmail(codeQuery));
    }, []);
    return (
        <div id="account"
            className="account">
            <div className="container container--small container--signin">
            <div className="account__form">
            <div className="social"></div>
            <h1>EMAIL VERIFICATION !!!</h1>
            </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
