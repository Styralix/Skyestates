import { Link } from 'react-router-dom';
import loginImg from '../assets/login.jpg';
import { useState, useContext } from 'react';
import useForm from '../hooks/useForm';

import { useAuthContext } from '../contexts/AuthContext';
import { AuthContext } from '../contexts/AuthContext';

function LoginPage() {
    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    // });

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     setFormData({ email: '', password: '' });
    // };

    //the above code can be replaced with the use of the custom useForm hook. Example is below:
    const { onLoginSubmit } = useAuthContext();

    const { values, onSubmit, onChangeHandler } = useForm(
        {
            email: '',
            password: '',
        },
        onLoginSubmit
    );

    return (
        <div className="h-screen bg-indigo-400 flex items-center justify-center">
            <div className="w-4/5 py-10 bg-white rounded-md flex justify-around items-center shadow-2xl">
                <div className="basis-[45%]">
                    <img
                        src={loginImg}
                        className="rounded-md"
                        alt="h-house-img"
                    />
                </div>
                <div className="basis-[40%]">
                    <div className="mx-auto w-[90px] h-[90px] mb-8 flex justify-center items-center rounded-full bg-indigo-100">
                        <i className="fas fa-home text-5xl text-indigo-400"></i>
                    </div>
                    <h1 className="text-center my-2 text-3xl font-bold">
                        Welcome to SkyLine{' '}
                        <span className="text-indigo-400">Estate</span>
                    </h1>
                    <p className="text-center mb-4 text-slate-500">
                        Welcome back! login with your data that you entered
                        during registration.
                    </p>
                    <form onSubmit={onSubmit}>
                        <label
                            htmlFor="email"
                            className="font-semibold text-slate-500"
                        >
                            Email adress
                        </label>
                        <div className="flex my-2 items-center relative">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={values.email}
                                onChange={onChangeHandler}
                                required
                                placeholder="Enter your email..."
                                className="border-2 block w-full p-2 rounded-md focus:outline-indigo-400"
                            />
                            <i className="fas fa-at absolute right-4 text-xl text-slate-500"></i>
                        </div>
                        <label
                            htmlFor="password"
                            className="font-semibold text-slate-500"
                        >
                            Password
                        </label>
                        <div className="flex my-2 items-center relative">
                            <input
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={onChangeHandler}
                                required
                                id="password"
                                placeholder="**********"
                                className="border-2 block w-full p-2 rounded-md focus:outline-indigo-400"
                            />
                            <i className="fas fa-lock absolute right-4 text-lg text-slate-500"></i>
                        </div>
                        <a href="" className="underline text-right">
                            Forgot your password?
                        </a>
                        <button className="w-full py-2 rounded-md mt-4 mb-2 uppercase text-white transition-all bg-indigo-400 hover:bg-indigo-500 active:scale-95">
                            Login
                        </button>
                        <div className='flex justify-between'>
                            <p>
                                Don't have an account?{' '}
                                <Link
                                    to={'/register'}
                                    className="font-semibold hover:underline"
                                >
                                    Register
                                </Link>
                            </p>
                            <p>
                                Go back{' '}
                                <Link
                                    to={'/'}
                                    className="font-semibold hover:underline"
                                >
                                    Home
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
