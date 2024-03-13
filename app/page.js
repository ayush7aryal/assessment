"use client";
import { useRouter } from "next/navigation";

import React, { useState } from "react";

import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./components/LoginForm"), {
  ssr: false,
});
const MainPage = () => {
  const [email, setEmail] = useState(null);
  const router = useRouter();

  const handleLogin = (email) => {
    setEmail(email);
    localStorage.setItem("userEmail", email);
    if (router) {
      router.push("/product");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default MainPage;


