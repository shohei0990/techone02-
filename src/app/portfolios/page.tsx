import Link from "next/link";
import Header from "../components/layouts/Header";
import { getPortfolios, printAllPosts } from '@/../libs/client'; // パスの修正が必要な場合は適宜行ってください

export default async function PortfolioPage() {
  try {
    const portfolios = await getPortfolios();
    const posts = await printAllPosts();

    if (!portfolios) {
      return <h1>No Contents</h1>;
    }

    return (
      <div className="flex flex-col h-screen bg-[var(--sub3)]">
        <Header />
        <div className="mt-20 px-5">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/portfoliodetail/${post.id}`} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <div className="w-full h-60 overflow-hidden">
                  <img src={post.top_image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="text-center mt-2">
                  <p className="font-bold">{post.title}</p>
                  <div className="flex flex-wrap justify-center mt-2">
                    <div className="flex flex-wrap justify-center mt-2">
                      {post.tag1.map((tag, index) => (
                        <span key={index} className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap justify-center mt-2">
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
    console.error("投稿の取得中にエラーが発生しました:", error);
    return <h1>エラーが発生しました</h1>;
  }
}
