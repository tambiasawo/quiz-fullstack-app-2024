import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { signOut, update } from "../store/features/auth/authSlice";
import React from "react";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = React.useState(false);
  const [error, setError] = React.useState("");
  const [formData, setFormData] = React.useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/auth/signout");
      const data = await response.json();
      if (data.success) {
        dispatch(signOut());
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setUpdateSuccess(false);
    if (Object.keys(formData).length === 0) {
      return; //or set a state
    }
    try {
      const response = await fetch(`/api/user/update/${user?._id}`, {
        method: "POST",
        credentials: "include", // includes the token in the header
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!data.email) {
        setError("Something Went Wrong. Could not Update User");
        return;
      }
      setUpdateSuccess(true);
      dispatch(update(data));
    } catch (error) {
      setError("Something Went Wrong. Could not Update User");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user/delete/${user?._id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      dispatch(signOut());
      navigate("/");
      if (!data.success) {
        return;
      }
    } catch (e) {}
  };

  return (
    <div className="bg-[#37373e] rounded-md h-[90%]">
      <div className="mx-auto p-3">
        <form
          className="flex justify-center items-center flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            //ref={fileRef}
            hidden
            accept="image/*"
            //onChange={handleImageChange}
          />

          <img
            src={user?.profileImage}
            alt="profile image"
            className="h-24 w-24 rounded-full self-center cursor-pointer object-cover my-3"
            //onClick={() => fileRef.current.click()}
          />
          {/*   <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-700">
                Error uploading image (file size must be less than 2 MB)
              </span>
            ) : imageUploadProgress > 0 && imageUploadProgress < 100 ? (
              <span className="text-slate-700">{`Uploading: ${imageUploadProgress} %`}</span>
            ) : imageUploadProgress === 100 ? (
              <span className="text-green-700">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p> */}
          <input
            type="text"
            id="name"
            placeholder={user?.name}
            className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
            onChange={handleChange}
          />
          <input
            type="username"
            id="username"
            placeholder={user?.username}
            className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
            onChange={handleChange}
          />
          <input
            type="email"
            id="email"
            placeholder={user?.email}
            className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
            onChange={handleChange}
          />
          <input
            type="text"
            id="company"
            placeholder={user?.company}
            className="bg-slate-50 rounded-lg py-2 px-2 outline-none w-full sm:w-[75%] lg:w-[35%]"
            onChange={handleChange}
          />
          <button className="bg-[#fe9d73] rounded-lg p-3 w-full sm:w-[75%] lg:w-[35%] disabled:opacity-70 hover:opacity-95 uppercase text-black">
            Update
          </button>

          <div className="flex justify-between w-full sm:w-[75%] lg:w-[35%]">
            <p>
              <Link
                to=""
                className="underline cursor-pointer text-red-500 hover:opacity-85"
                onClick={handleDelete}
              >
                Delete Account
              </Link>
            </p>
            <p>
              <Link
                to=""
                onClick={handleSignOut}
                className="underline hover:opacity-85 cursor-pointer text-red-500"
              >
                Sign Out
              </Link>
            </p>
          </div>
          <div className="mt-4">
            {error && (
              <p className="text-red-500 ">
                Something went wrong. Please try again.
              </p>
            )}
            {updateSuccess && (
              <p className="text-green-500">Profile Updated Successfully.</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
