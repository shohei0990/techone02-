"use client";

import React from "react";

const Footer = () => {
  return (
    <div
      className="footer"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "50px",
        width: "100%",
        display: "flex",
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: "var(--sub4)", 
        zIndex: 1,
        borderTop: "2px solid black", // 上線の色を黒に設定
        borderTopWidth: "2px", // 上線の太さを2pxに設定
      }}
    >
      <p style={{ fontSize: "16px", fontWeight: 'bold' }}>
        解き放たれたテクノロジー集団
      </p>
    </div>
  );
};

export default Footer;