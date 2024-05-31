import React, { ChangeEvent, FormEvent } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { signIn } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [viewPassword, setViewPassword] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userInfo.password || !userInfo.password) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      if (data.user && data.success) {
        dispatch(signIn(data.user));
        setLoading(false);
        navigate("/");
        return;
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (err) {
      setLoading(false);
      setError("Something unexpected occured. Please try again");
    }
  };

  const [emailIconColor, setEmailIconColor] = React.useState("");
  const [passwordIconColor, setPasswordIconColor] = React.useState("");

  return (
    <div className="my-40 bg-white max-w-md mx-auto p-9 rounded-lg">
      <h3 className="text-center text-2xl text-black mb-5 font-semibold">
        Log In
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
            className="form-control-sign-in w-full text-black"
            onFocus={() =>
              setEmailIconColor((prev) => {
                if (prev) return "";
                return "text-black";
              })
            }
            onBlur={() => setEmailIconColor("")}
            required
          />
          <HiOutlineMail
            size={20}
            className={`${emailIconColor} hover:${emailIconColor}`}
          />
        </span>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type={viewPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="form-control-sign-in w-full text-black"
            onFocus={() =>
              setPasswordIconColor((prev) => {
                if (prev) return "";
                return "text-black";
              })
            }
            onBlur={() => setPasswordIconColor("")}
            required
          />
          <IoEyeOutline
            size={20}
            className={`${passwordIconColor} cursor-pointer hover:${passwordIconColor}`}
            onClick={() => setViewPassword((prev) => !prev)}
          />
        </span>
        <button className="text-black text-center bg-[#fe9d73] rounded-xl py-2 text-lg hover:opacity-[.9]">
          {loading ? "Signing In" : "Sign In"}
        </button>

        <button className="text-center bg-[#fe9d73] rounded-xl py-2 text-lg hover:opacity-[.9]">
          <span className="flex text-black items-center justify-center gap-3">
            Continue With Google{" "}
            <img
              src="/assets/google.svg"
              alt="google sign in"
              className="w-6 h-6"
            />
          </span>
        </button>
        <span className="text-center text-black">
          Don't Have an Account?{" "}
          <Link to="/sign-up" className="underline cursor-pointer">
            {" "}
            Sign up
          </Link>
        </span>
        <p className="text-red-500 text-center">{error}</p>
      </form>
    </div>
  );
};
