import  MyNavBar  from  '../Navbar/MyNavbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {getUser} from "../Services/Api";
import AuthenticationService from "../Services/AuthenticationService.js";
import UtilsService from "../Services/UtilsService";
import {Spinner} from "./Spinner";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [capVal,setCapVal] = useState('');
  const recaptcha = useRef();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // const captchaValue = recaptcha.current.valueOf().getValue();
    const data = {
      email: email,
      password: password
    };

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validPassword = UtilsService.validatePasswords(password);

    // if (!captchaValue) {
    //   alert("Please verify the reCAPTCHA!");
    // }else{
    try {
      if (!validEmail) {
        setErrorMessage("Invalid email");
      } else if (!validPassword) {
        setErrorMessage("Password must have at least 6 characters with at least one uppercase letter, one lowercase letter, one number, and one special character");
      } else {
        setLoading(true);
        const response = await getUser(data);
        setLoading(false);

        if (response.data.code === "401" || response.data.code === "500"
            || response.data.code === "400" || response.data.code === "403" || response.data.code === "404") {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }

        const token = response.data.token;
        AuthenticationService.registerSuccessfulLogin(token, email);


        if (token) {
          localStorage.setItem('token', token);
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'login Successful',
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/dashboard');
          setErrorMessage('');
        }
      }
    } catch (error) {
      setLoading(false);
      setPassword("");

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage('An error occurred while authenticating!!');
      }
    }
    // }
  };

  const renderErrorMessage = (name) =>
      name === errorMessage && <div className="error">{errorMessage}</div>;

  const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-3 mt-2">
            <input
                placeholder="Email"
                className="form-control"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {renderErrorMessage('email')}
          </div>
          {loading && <Spinner/>}

          <div className="input-group mb-3">
            <input
                type={showPassword ? 'text' : 'password'}
                className="form-control password-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <div className="input-group-append">
              {renderErrorMessage('password')}
        <span
            className="input-group-text password-revealer-icon"
            onClick={handleTogglePassword}
        >
          <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
          />
        </span>
            </div>
            {renderErrorMessage('pass')}
          </div>

          {errorMessage && (
              <div>
                <ul style={{marginBottom: '0px'}}>

                  <li>
                    <p style={{ fontSize: '12px', color: 'red' ,marginBottom:'0px'}}>
                      {errorMessage}
                    </p>
                  </li>
                </ul>
              </div>
          )}

          <div className="input-group mb-3 no-marg" >
            <input type="submit" className="form-control"  value="Login"/>
          </div>
          {/*<ReCAPTCHA ref={recaptcha} className="mb-1" sitekey="6LcVnnMpAAAAAP3EdmXP-pQnyKwxERGFp2J4K5n9" onChange={(e)=>setCapVal(e)}>*/}
          {/*</ReCAPTCHA>*/}
          <div>
            <a href="/forgot-password" className="account"  style={{textDecoration: 'none'}}>
              <p className="title-p ten-p mb-0 pb-1"> Forgot password?</p>
            </a>
          </div>
          <div>
            <p className="mb-0 pb-0">
              <a href="/register" className="account" style={{textDecoration: 'none'}}>
                Don't have an account?{' '}Click <span className="account-s">here</span> to register
              </a>
            </p>
          </div>

        </form>
      </div>
  );

  return (
      <div>
        <MyNavBar/>
        <div className="mt-60">
          <div className="signup">
            <main className="frame">
              <div className='container'>
                <div className="app justify-content-center align-items-center ">
                  <div className='col-md-5'>
                    <div className="login-form">


                      <div className="justify-content-center align-items-center mx-auto">
                        <h3> EcoCash CrowdFund</h3>
                        <p className="title-p ten-p mb-0 pb-1">Login to your account..</p>
                      </div>
                      { renderForm}
                    </div>
                  </div>
                </div>
              </div>
            </main>

          </div>
        </div>
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />

      </div>

  );
};


export default Login;

