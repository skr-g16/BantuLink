import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
const [firstName, setFirstName] = useState("");
const [telp, setTelp] = useState("");
const [address, setAddress] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

const navigate = useNavigate();

const handleSubmit = (e) => {
e.preventDefault();
console.log('first name: ', firstName);
console.log('Telepon: ', telp);
console.log('Alamat: ', address);
console.log('password: ', password);
console.log('email: ', email);

navigate('/login');
};
return (
<>
    <div id="app">
        <div className="card">
            <div className="card2">
                <form className="form" id="signupForm" onSubmit={handleSubmit}>
                    <p id="heading">Sign Up</p>
                    <div className="field">
                        <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
                            xmlns="http://www.w3.org/2000/svg" className="input-icon">
                            <path
                                d="M8 0a4 4 0 1 1 0 8A4 4 0 0 1 8 0zm0 10a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z">
                            </path>
                        </svg>
                        <input id="firstName" type="text" className="input-field" placeholder="Nama Depan"
                            value={firstName} onChange={(e)=> setFirstName(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field">
                        <svg viewBox="0 0 507.172 507.172" fill="currentColor" height="20" width="20">
                            <path
                                d="M253.588,0C113.764,0,0,113.76,0,253.592c0,139.828,113.764,253.58,253.588,253.58s253.584-113.752,253.584-253.58 C507.168,113.76,393.412,0,253.588,0z M387.108,349.432l-24.032,24.036c-1.548,1.548-4.056,1.548-5.604,0L352.5,368.5 c-10.28,6.42-24.424,15.288-26.432,16.624c-2.372,2.256-5.62,3.564-8.948,3.564c-2.464,0-4.872-0.696-6.96-2.024 c-69.444-44.032-145.676-120.276-189.72-189.72c-3.164-5-2.504-11.612,1.524-15.884c1.356-2.08,10.052-16.384,16.34-26.756 l-5.008-5.008c-0.744-0.748-1.16-1.752-1.16-2.804c0-1.048,0.416-2.056,1.16-2.8l24.032-24.036c1.476-1.484,4.108-1.484,5.6,0 l67.132,67.124c0.748,0.744,1.164,1.752,1.164,2.796c0,1.056-0.416,2.064-1.164,2.804l-24.032,24.032 c-1.548,1.544-4.056,1.544-5.608,0l-4.852-4.852l-11.672,11.672c24.924,31.28,68.264,74.66,99.604,99.688l11.712-11.72 l-4.86-4.852c-0.748-0.744-1.164-1.752-1.164-2.804c0-1.04,0.416-2.056,1.164-2.796l24.032-24.048c1.488-1.484,4.12-1.484,5.604,0 l67.116,67.124C388.656,345.376,388.656,347.884,387.108,349.432z" />
                        </svg>
                        <input id="telp" type="tel" className="input-field" placeholder="Telepon" value={telp}
                            onChange={(e)=> setTelp(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field">
                    <svg 
                        fill="#FFFFFF" width="20" height="20"  // Mengubah warna menjadi putih
                        viewBox="0 0 1920 1920" 
                        xmlns="http://www.w3.org/2000/svg"
                        ><path d="M1801.441 0v1920H219.03v-439.216h-56.514c-31.196 0-56.515-25.299-56.515-56.47 0-31.172 25.319-56.47 56.515-56.47h56.514V1029.02h-56.514c-31.196 0-56.515-25.3-56.515-56.471 0-31.172 25.319-56.47 56.515-56.47h56.514V577.254h-56.514c-31.196 0-56.515-25.299-56.515-56.47 0-31.172 25.319-56.471 56.515-56.471h56.514V0h1582.412ZM1029 499c-112.782 0-236.48 91.718-236.48 204.5v102.25c0 45.604 16.128 87.22 41.383 121.269-32.159 9.38-50.769 20.118-91.408 39.468C669.163 1001.404 620 1072.214 620 1154.116v139.98l23.824 15.03c100 63.089 214.112 101.126 330.166 110.022 18.2 1.329 35.89 2.045 53.374 2.045 178.835 0 316.975-68.406 386.607-111.862l24.029-15.03v-140.799c0-81.8-48.876-155.726-124.438-188.446-39.06-16.872-64.487-28.426-105.285-38.038 24.744-33.844 47.167-76.278 47.167-121.268V703.5c0-112.782-113.662-204.5-226.444-204.5Zm-306.697 655.5c0-41.003 23.825-77.813 60.839-93.764 76.279-33.027 155.216-49.694 235.277-51.125 3.579.102 15.747.307 18.405.204 13.19.205 26.279-.306 39.469.716 67.485 5.113 133.743 21.575 196.831 48.773 38.037 16.463 62.68 53.58 62.68 94.582v83.333c-72.087 40.39-197.957 92.128-353.99 80.369-90.39-6.953-179.551-34.56-259.51-80.164v-82.925Zm165.835-450.947c0-56.34 84.58-102.25 141.022-102.25 56.442 0 131.051 45.91 131.051 102.25v102.25c0 55.318-73.178 100-128.086 101.637-2.147 0-4.294-.102-6.442-.102-54.703-1.943-137.545-46.422-137.545-101.535v-102.25Z" />
                    </svg>
                        <input id="address" type="text" className="input-field" placeholder="Alamat" value={address}
                            onChange={(e)=> setAddress(e.target.value)}
                        required
                        />
                    </div>
                    
                    <div className="field">
                        <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
                            xmlns="http://www.w3.org/2000/svg" className="input-icon">
                            <path
                                d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772 -.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z">
                            </path>
                        </svg>
                        <input id="email" type="email" className="input-field" placeholder="Email" value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                        required
                        />
                    </div>
                    <div className="field">
                        <svg viewBox="0 0 16 16" fill="currentColor" height="16" width="16"
                            xmlns="http://www.w3.org/2000/svg" className="input-icon">
                            <path
                                d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z">
                            </path>
                        </svg>
                        <input id="password" type="password" className="input-field" placeholder="Password"
                            value={password} onChange={(e)=> setPassword(e.target.value)}
                        required
                        />
                    </div>
                    <div className="btn">
                        <button type="submit" className="button1">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Daftar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </button>
                        <button type="button" className="button2" onClick={()=> navigate('/login')}>Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</>
);
}