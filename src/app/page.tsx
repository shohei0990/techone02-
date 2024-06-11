// Homeのページ

"use client"; // Next.jsのクライアントサイドのみでこのコンポーネントを実行することを指定

import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート

export default function Home() {
  return (
    // JSXを返す。これはHTMLに似たJavaScriptの拡張構文です。
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* メインコンテンツを中央に配置するためのdivタグ */}
      <h1 className="text-4xl font-bold mb-8">Welcome to My Portfolio</h1>
      {/* ポートフォリオへようこそという見出し */}
      <Link href="/portfolios">
        {/* Linkコンポーネントを使用して、'/portfolios'へのリンクを作成 */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {/* ボタンスタイルを適用し、ポートフォリオページへのリンクボタンを表示 */}
          Go to Portfolio
        </button>
      </Link>
    </div>
  );
}

