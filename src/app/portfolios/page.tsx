import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import Header from "../components/layouts/Header"; // Headerコンポーネントをインポート
import Footer from "../components/layouts/Footer"; // Headerコンポーネントをインポート
import { getAllPosts, } from '@/../libs/client'; // printAllPosts関数をインポート（パスの修正が必要な場合は適宜行ってください）

export default async function PortfolioPage() {
  try {
    const posts = await getAllPosts(); // printAllPosts関数を非同期で呼び出し、投稿データを取得

    return (
      // JSXを返す。これはHTMLに似たJavaScriptの拡張構文です。
      <div className="flex flex-col h-screen bg-[var(--sub3)]">
        <Header /> {/* Headerコンポーネントを表示 */}
        <div className="mt-20 px-5">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              // 投稿データをマッピングして各投稿ごとにリンク付きのカードを生成
              <Link key={post.id} href={`/portfoliodetail/${post.id}`} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <div className="w-full h-60 overflow-hidden">
                  {/* 投稿のトップ画像を表示 */}
                  <img src={post.top_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-center mt-2">
                  {/* 投稿のタイトルを表示 */}
                  <p className="font-bold">{post.title}</p>
                  <div className="flex flex-wrap justify-center mt-2">
                    <div className="flex flex-wrap justify-center mt-2">
                      {/* 投稿のタグ1を表示 */}
                      {post.tag1.map((tag, index) => (
                        <span key={index} className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center mt-2">
                      {/* 投稿のタグ2を表示 */}
                      {post.tag2.map((tag, index) => (
                        <span key={index} className="bg-orange-200 text-orange-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("投稿の取得中にエラーが発生しました:", error); // エラーが発生した場合、コンソールにエラーメッセージを出力
    return <h1>エラーが発生しました</h1>; // エラーが発生した場合、エラーメッセージを表示
  }
}