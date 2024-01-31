import { Link } from 'react-router-dom';
import loginImg from '../assets/login.jpg';
import { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import useForm from '../hooks/useForm';

function RegisterPage() {
    const { onRegisterSubmit } = useAuthContext();

    const { values, onSubmit, onChangeHandler } = useForm(
        {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        onRegisterSubmit
    );

    return (
        <div className="bg-indigo-400 h-screen flex items-center justify-center">
            <div className="w-4/5 py-10 bg-white rounded-md flex justify-around items-center shadow-2xl">
                <div className="basis-[45%]">
                    <img
                        src={loginImg}
                        className="rounded-md"
                        alt="h-house-img"
                    />
                </div>
                <div className="basis-[40%]">
                    <h1 className="text-center my-2 text-3xl font-bold">
                        Welcome to Skyline{' '}
                        <span className="text-indigo-400">Estate</span>
                    </h1>
                    <p className="text-center mb-4 text-slate-500">
                        Not registered yet? You are a few clicks away!
                    </p>
                    <form onSubmit={onSubmit}>
                        <label
                            htmlFor="fullName"
                            className="font-semibold text-slate-500"
                        >
                            Full Name
                        </label>
                        <div className="flex my-2 items-center relative">
                            <input
                                type="text"
                                name="fullName"
                                id="fullName"
                                onChange={onChangeHandler}
                                value={values.fullName}
                                required
                                placeholder="Enter your username..."
                                className="border-2 block w-full p-2 rounded-md focus:outline-indigo-400"
                            />
                            <i
                                className={`fas fa-user absolute right-4 ${values.username != ''
                                    ? 'text-indigo-400'
                                    : ' text-slate-500'
                                    } `}
                            ></i>
                        </div>
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
                                onChange={onChangeHandler}
                                value={values.email}
                                required
                                placeholder="Enter your email..."
                                className="border-2 block w-full p-2 rounded-md focus:outline-indigo-400"
                            />
                            <i
                                className={`fas fa-at absolute right-4 text-xl ${values.email == ''
                                    ? `text-slate-500`
                                    : `text-indigo-400`
                                    }`}
                            ></i>
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
                                onChange={onChangeHandler}
                                value={values.password}
                                required
                                id="password"
                                placeholder="**********"
                                className="border-2 block w-full p-2 rounded-md focus:outline-indigo-400"
                            />
                            <i
                                className={`fas fa-lock absolute right-4 text-lg
                            ${values.password != ''
                                        ? 'text-indigo-400'
                                        : 'text-slate-500'
                                    }`}
                            ></i>
                        </div>
                        <label
                            htmlFor="password"
                            className="font-semibold text-slate-500"
                        >
                            Confirm Password
                        </label>
                        <div className="flex my-2 items-center relative">
                            <input
                                type="password"
                                name="confirmPassword"
                                onChange={onChangeHandler}
                                value={values.confirmPassword}
                                required
                                id="confirmPassword"
                                placeholder="**********"
                                className="border-2 block w-full p-2 rounded-md focus:outline-indigo-400"
                            />
                            <i
                                className={`fas fa-lock absolute right-4 text-lg
                                ${values.confirmPassword == values.password &&
                                        values.confirmPassword != ''
                                        ? `text-indigo-400`
                                        : `text-slate-500`
                                    }`}
                            ></i>
                        </div>
                        <button className="w-full py-2 rounded-md mt-4 mb-2 uppercase text-white transition-all bg-indigo-400 hover:bg-indigo-500 active:scale-95">
                            Register
                        </button>
                        <div className='flex justify-between'>
                            <p>
                                Already have an account?{' '}
                                <Link
                                    to={'/login'}
                                    className="font-semibold hover:underline"
                                >
                                    Login
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

export default RegisterPage;
