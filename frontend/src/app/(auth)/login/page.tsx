"use client";
import React from "react";
export interface ILoginForm {
  email: string;
  password: string;
  name: string;
  username: string;
}
const LoginPage = () => {
  const handleSubmit = (data: ILoginForm) => {
    console.log(data);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <div>
        <form method="POST">
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <button onClick={() => handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
