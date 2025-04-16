import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <header className="bg bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to="/">
                    <h1 className="text-sm sm:text-xl font-bold text-slate-900 flex flex-wrap">
                        <span className="text-slate-500">MetaHome</span>
                        <span className="text-slate-700">Estates</span>
                    </h1>
                </Link>
                <form>
                    <input
                        type="search"
                        placeholder="Search for properties"
                        className="rounded-lg border border-gray-300 p-2 sm:w-64"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-lg p-2 cursor-pointer"
                    >
                        Search
                    </button>
                </form>
                <ul className="flex gap-4">
                    <Link to="/">
                        <li className="hidden sm:inline text-slate-700 hover:underline">
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline text-slate-700 hover:underline">
                            About
                        </li>
                    </Link>


                    <Link to="/profile">
                        {currentUser ? (
                            <img src={currentUser.avatar} alt="avatar" className="rounded-full h-7 w-7 object-cover" />
                        ) :
                            (<li className="text-slate-700 hover:underline">
                                Sign In
                            </li>)
                        }

                    </Link>

                </ul>
            </div>

        </header>
    )
}

export default Header
