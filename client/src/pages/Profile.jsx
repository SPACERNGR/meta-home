import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  console.log(formData);
  console.log(currentUser);

  const handleFileChange = async (e) => {
    console.log("File changed", e.target.files[0]);
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "meta-home"); // 🔁 Replace with your Cloudinary upload preset
    formData.append("folder", `users/${currentUser.uid}`);
    formData.append("public_id", `profile_${Date.now()}`);


    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dw1ol2dst/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data); // Check the response from Cloudinary

      if (data.secure_url) {
        setAvatar(data.secure_url);

        // Optional: You can now update Firebase user profile here
        // OR update your backend/database with the new avatar URL
        // (See notes below)

      } else {
        console.error("Cloudinary upload failed", data);
      }

    } catch (err) {
      console.error("Upload error:", err);
    }
  };


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          avatar, // ✅ add this
        }),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };


  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",

      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));


    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={handleFileChange}
        />

        <img
          onClick={() => fileRef.current.click()}
          src={avatar}
          alt="avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          placeholder="New password"
          onChange={handleChange}
          id="password"
          className="p-3 border border-gray-300 rounded-lg"
        />

        <button
          disabled={loading}
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition cursor-pointer"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <p className='text-red-700 mt-5'>{error ? error : ''}</p>

      <p className='text-green-700 mt-5'>{updateSuccess ? "Profile updated successfully!" : ''}</p>

      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete account</span>

        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
