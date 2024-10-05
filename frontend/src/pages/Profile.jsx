import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../config/firebase";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut,
} from "../redux/user/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageProgress, setimageProgress] = useState(0);
  const [ImageError, setImageError] = useState(false);
  const [FormData, setFormData] = useState({});
  const [updateSuccess, setupdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageProgress(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...FormData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:5556/update/${editingUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
      }
      dispatch(updateUserSuccess(data));
      setupdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch(`/signout`);
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='bg-cover bg-[url("/7.jpg")] h- min-h-screen'>
        <div className="mt-24"></div>
        <div className="p-3 max-w-lg mx-auto bg-white rounded-2xl">
          <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src="/account.png"
              alt=""
              className="h-24 w-24 mt-2 self-center bg-slate-200 rounded-full cursor-pointer object-cover"
              onClick={() => fileRef.current.click()}
            />

            <p className="self-center text-sm">
              {ImageError ? (
                <span className="text-red-600">
                  Error uploading image (file size must be less than 2 mb)
                </span>
              ) : imageProgress > 0 && imageProgress < 100 ? (
                <span className="text-slate-700">{`Uploading: ${imageProgress} %`}</span>
              ) : imageProgress === 100 ? (
                <span className="text-green-600">
                  Image uploaded succesfully
                </span>
              ) : (
                ""
              )}
            </p>

            <input
              type="text"
              id="username"
              placeholder="Username"
              defaultValue={currentUser.username}
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              defaultValue={currentUser.address}
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              defaultValue={currentUser.email}
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="bg-slate-100 rounded-lg p-3"
              onChange={handleChange}
            />
            <button className="bg-[#f6e656] bg-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full">
              {loading ? "Loading" : "Update"}
            </button>
          </form>
          <div className="flex justify-center mt-5">
            <span
              onClick={handleSignOut}
              className="text-red-600 cursor-pointer"
            >
              Sign out
            </span>
          </div>
          <p className="text-red-600 mt-5">
            {error && "Something went wrong!"}
          </p>
          <p className="text-green-600 mt-5">
            {updateSuccess && "User is updated successfully!"}
          </p>
        </div>
      </div>
    </>
  );
};

export default Profile;
