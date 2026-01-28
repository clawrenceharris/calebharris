import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className=" flex text-center  justify-center items-center  ">
      <Link href={"home"}>
        {" "}
        <p>Back To Top </p>
      </Link>
    </footer>
  );
};

export default Footer;
