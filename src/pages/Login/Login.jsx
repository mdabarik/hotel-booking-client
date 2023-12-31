import { useContext, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { GlobalContext } from "../../providers/GlobalProvider";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet";

const Login = () => {
    const axios = useAxios();
    const { user, loading, setLoading, googleSignIn, loginUser } = useContext(GlobalContext)
    const [errorMsg, setErrorMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    console.log('location, login', location);

    // useEffect(() => {
    //     const jwtData = {
    //         email: user?.email,
    //         name: user?.displayName
    //     }
    //     fetch('https://crud-jwt-server.vercel.app/jwt', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(jwtData),
    //         credentials: 'include' // Include cookies in the request
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data, 'jwt post request');
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }, [loading])

    if (loading) {
        return <p>Loading...</p>
    }

    if (user) {
        return <Navigate to="/" />
        // console.log('pathnamalkdjfladkjf');
    }



    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg("");
        loginUser(email, password)
            .then(res => {
                toast.success("login succesfull");
                console.log(res);
                // navigate('/');
            })
            .catch(err => {
                setErrorMsg(err.code);
            })
    }




    // const jwtData = {
    //     email: user?.email,
    //     name: user?.displayName
    // }
    // fetch('https://crud-jwt-server.vercel.app/jwt', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({email:'mdabarik19@gmail.com', name: 'md a barik'}),
    //     credentials: 'include' // Include cookies in the request
    // })
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });

    const handleGoogleSignedIn = async () => {
        googleSignIn()
            .then(res => {
                console.log(res, 'res');
                // axios.post('/jwt', { email: user?.email, name: user?.displayName })
                toast.success('Google SignIn Successfull')
                navigate('/');
            })
            .catch(err => {
                setErrorMsg(err.code);
            })
    }

    return (
        <div className="flex flex-col my-8 w-[90%] mx-auto items-center justify-center ">
            <Helmet>
                <title>Login - Hotel Booking</title>
            </Helmet>
            <div>
                <h1 className="text-3xl font-light normal-case">Login Now</h1>
            </div>
            <form onSubmit={handleLogin} className="mt-8 mb-2 w-[95%] md:w-[80%] lg:w-[60%]" autoComplete="off" >
                <div className="mb-4 flex flex-col gap-6">
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                    <div className="relative h-11 w-full min-w-[200px]">
                        <input onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full px-4 py-2 rounded-md bg-transparent outline-none border-[1px]" required />
                    </div>
                </div>
                <div className="inline-flex items-center">
                    <label className="cursor-pointer label">
                        <input type="checkbox" className="checkbox checkbox-secondary" required />
                        <span className="label-text ml-3">Accept terms & conditions</span>
                    </label>
                </div>
                <button className="mt-6 flex items-center justify-center w-full bg-[#db332a] py-3 px-6 text-center  text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="submit" data-ripple-light="true">
                    <CiLogin className="text-xl"></CiLogin>
                    <span className="ml-3">Login</span>
                </button>

                {
                    errorMsg ? <h2 className="text-center text-red-700 text-sm mt-2">{errorMsg}</h2> : ""
                }
                {/* <div>
                    {
                        !errorMsg ? "" :
                            <p className="font-bold text-center text-2xl text-red-600">
                                {errorMsg}
                            </p>
                    }
                </div> */}

                <div className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
                    <span className="mr-2">Don not have an account?</span>
                    <Link to="/register"
                        className="font-medium text-[#db332a] transition-colors hover:underline hover:text-blue-700">
                        Register now
                    </Link>
                </div>

            </form>
            <div onClick={handleGoogleSignedIn} className="flex hover:cursor-pointer flex-row items-center justify-center rounded-full border-[1px] p-1 px-5 mt-4 bg-[#9CA3AF95]">
                <FcGoogle className="text-4xl"></FcGoogle>
                <span className="ml-3">Sign in with Google</span>
            </div>
        </div>
    );
};

export default Login;