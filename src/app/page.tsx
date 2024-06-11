// Homeのページ
"use client"; // Next.jsのクライアントサイドのみでこのコンポーネントを実行することを指定

import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import Image from "next/image"; // Next.jsのImageコンポーネントをインポート
import Head from "next/head"; // Next.jsのHeadコンポーネントをインポート

export default function Home() {
  return (
    <>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Ubuntu+Mono&display=swap" rel="stylesheet" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-ubuntu-mono">
        {/* メインコンテンツを中央に配置するためのdivタグ */}
        <div className="mb-50 mt-[-50px]"> {/* 画像の位置を上に調整 */}
          <Image
            src="/logo.png" // ロゴ画像のパス
            alt="Portfolio"
            width={200} // 画像の幅を指定
            height={200} // 画像の高さを指定
          />
        </div>
        {/* ポートフォリオへようこそという見出し */}
        <Link href="/portfolios" className="text-white text-center mt-20 text-lg">　Portfolio
        </Link>
      </div>
    </>
  );
}