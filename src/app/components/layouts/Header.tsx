"use client";

import React from "react";
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート

const Header = () => {


    return (
      <div
        className="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "50px",
          width: "100%",
          display: "flex",
          alignItems: "center", 
          justifyContent: "space-between",
          backgroundColor: "var(--sub4)", 
          zIndex: 1 ,
          borderBottom: "2px solid black", // 線の色を黒に設定
          borderBottomWidth: "4px", // 線の太さを2pxに設定
        }}
      >
              <Link href="/" legacyBehavior>
                <a 
                  className="ml-10"
                  style={{ fontSize: "16px", fontWeight: 'bold' }}
                >
                  Tech One Guild
                </a>
              </Link>

              <button 
                className="btn btn-square btn-ghost mr-5 ml-10"
                style={{ width: "60px", height: "40px"}} 
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-5 h-5 stroke-current"
                  style={{ width: "2em", height: "2em" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>

      </div>



    );
  };
  
  export default Header;