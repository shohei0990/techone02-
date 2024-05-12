import Link from "next/link";
import Header from "../components/layouts/Header";
import { getPortfolios, printAllPosts } from '@/../libs/client'; // パスの修正が必要な場合は適宜行ってください

export default async function PortfolioPage() {
  const portfolios = await getPortfolios();
  const posts = await printAllPosts();
  //const posts: NotionPost[] = await printAllPosts();

  if (!portfolios) {
    return <h1>No Contents</h1>;
  }

  return (
    <div className="flex flex-col h-screen bg-[var(--sub3)]">
      <Header />
      <div className="mt-20 px-5">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/postdetail/${post.id}`} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              <div className="w-full h-40 overflow-hidden">
                <img src={post.files[0]} alt={post.title} className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-2">
                <p className="font-bold">{post.title}</p>
                <p>日付: {post.date}</p>
                <p>タイプ: {post.types.join(', ')}</p>
                <p>著者: {post.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
