import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const handleFileChange = async (e) => {
    console.log("File changed", e.target.files[0]);
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "meta-home"); // 🔁 Replace with your Cloudinary upload preset
    formData.append("folder", `users/${currentUser.uid}`);
    formData.append("public_id", "profile"); // optional clean name

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="email"
          id="email"
          defaultValue={currentUser.email}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <input
          type="password"
          id="password"
          placeholder="New password"
          className="p-3 border border-gray-300 rounded-lg"
        />

        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 transition cursor-pointer"
        >
          Update
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
