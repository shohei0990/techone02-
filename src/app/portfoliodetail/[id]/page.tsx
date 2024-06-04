import Header from "../../components/layouts/Header";
import Image from 'next/image';
import Link from "next/link";
import { getAllPosts } from '@/../libs/client';

export default async function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const posts = await getAllPosts();
  const post = posts.find(post => post.id === params.id);

  if (!post) {
    return <div>ポートフォリオが見つかりませんでした。</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
          {post.intro && <p>{post.intro}</p>}
          <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {post.top_image && <Image src={post.top_image} alt="トップ画像" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image01 && <Image src={post.image01} alt="画像01" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image02 && <Image src={post.image02} alt="画像02" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image03 && <Image src={post.image03} alt="画像03" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image04 && <Image src={post.image04} alt="画像04" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">プロジェクトメンバー</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {post.member.map((member, index) => (
                <Link key={index} href={`/memberdetail/${member.id}`}>
                  <div className="cursor-pointer">
                    <Image src={member.icon} alt={member.name} width={96} height={96} className="rounded-full" />
                    <p className="mt-2">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.job}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">タグ</h2>
            <div className="flex flex-wrap gap-2">
              {post.tag1.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tag}</span>
              ))}
              {post.tag2.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tag}</span>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">詳細テキスト</h2>
            {post.text00 && <p>{post.text00}</p>}
            {post.text01 && <p>{post.text01}</p>}
            {post.text02 && <p>{post.text02}</p>}
            {post.text03 && <p>{post.text03}</p>}
            {post.text04 && <p>{post.text04}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    id: post.id,
  }));
}