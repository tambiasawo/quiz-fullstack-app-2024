import React, { ChangeEvent, FormEvent } from "react";
import { HiOutlineMail, HiOfficeBuilding, HiUserCircle } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    name: "",
    company: "",
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError("");
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!values.name || !values.email || !values.username || !values.password)
      return;

    if (values.password !== values.cpassword) {
      setError("Passwords must match");
      return;
    }
    const { cpassword, ...rest } = values;
    setLoading(true);
    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rest),
      });

      const data = await response.json();
      if (data.success) {
        setLoading(false);
        dispatch(signIn(data.user));
        navigate("/");
      } else {
        setLoading(false);
        setError(data.message);
      }
    } catch (e) {
      setLoading(false);
      setError("Somethign went wrong. Please try again");
      console.log(e);
    }
  };

  const handleIconColorChange = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.nextElementSibling) {
      if (e.type === "focus") {
        e.target.nextElementSibling.classList.add("active-field");
      } else {
        e.target.nextElementSibling.classList.remove("active-field");
      }
    }
  };
  return (
    <div className="my-10 bg-white max-w-md mx-auto p-9 rounded-lg">
      <h3 className="text-center text-2xl text-black mb-5 font-semibold">
        Sign Up{" "}
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handleForm}>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name*"
            className="form-control-sign-in w-full"
            onFocus={(e) => handleIconColorChange(e)}
            onBlur={(e) => handleIconColorChange(e)}
            required
          />
          <HiUserCircle size={20} />
        </span>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type="text"
            name="company"
            placeholder="Company"
            onChange={handleChange}
            className="form-control-sign-in w-full"
            onFocus={(e) => handleIconColorChange(e)}
            onBlur={(e) => handleIconColorChange(e)}
          />
          <HiOfficeBuilding size={20} />
        </span>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type="text"
            name="username"
            placeholder="Username*"
            onChange={handleChange}
            required
            className="form-control-sign-in w-full"
            onFocus={(e) => handleIconColorChange(e)}
            onBlur={(e) => handleIconColorChange(e)}
          />
          <HiUserCircle size={20} />
        </span>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type="email"
            name="email"
            placeholder="Email Address*"
            required
            onChange={handleChange}
            className="form-control-sign-in w-full"
            onFocus={(e) => handleIconColorChange(e)}
            onBlur={(e) => handleIconColorChange(e)}
          />
          <HiOutlineMail size={20} className={` hover:text-[#fe9d73]`} />
        </span>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type={viewPassword ? "text" : "password"}
            name="password"
            placeholder="Password*"
            required
            onChange={handleChange}
            className="form-control-sign-in w-full"
            onFocus={(e) => handleIconColorChange(e)}
            onBlur={(e) => handleIconColorChange(e)}
          />

          <IoEyeOutline
            size={20}
            className={` cursor-pointer hover:text-[#fe9d73]`}
            onClick={() => setViewPassword((prev) => !prev)}
          />
        </span>
        <span className="flex justify-between items-center form-control-sign-in">
          <input
            type={viewPassword ? "text" : "password"}
            name="cpassword"
            required
            onChange={handleChange}
            placeholder="Confirm Password*"
            className="form-control-sign-in w-full"
            onFocus={(e) => handleIconColorChange(e)}
            onBlur={(e) => handleIconColorChange(e)}
          />

          <IoEyeOutline
            size={20}
            className={`cursor-pointer hover:text-[#fe9d73]`}
            onClick={() => setViewPassword((prev) => !prev)}
          />
        </span>

        <button
          type="submit"
          disabled={loading}
          className="text-black text-center bg-[#fe9d73] rounded-xl py-2 text-lg hover:opacity-[.9]"
        >
          Sign Up
        </button>

        <span className="text-black text-center">
          Already Have an Account?{" "}
          <Link to="/sign-in" className="underline">
            {" "}
            Sign in
          </Link>
          <p className="text-red-500">{error}</p>
        </span>
      </form>
    </div>
  );
};
