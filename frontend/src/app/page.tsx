"use client";

import { api } from "@/api";
import Image from "next/image";

export default function Home() {
  const handleClick = async () => {
    api.get("/").then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="home">
      <button onClick={handleClick}>get hello</button>
    </div>
  );
}
