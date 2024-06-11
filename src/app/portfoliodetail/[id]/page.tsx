import React from 'react';
import Header from "../../components/layouts/Header"; // Headerコンポーネントをインポート
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポーネット
import Link from "next/link"; // Next.jsのLinkコンポーネントをインポート
import { getAllPosts, getAllMembers } from '@/../libs/client'; // getAllPosts関数をインポート

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({
    id: post.id,
  }));
}

export default async function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const posts = await getAllPosts(); // 全ての投稿を非同期で取得
  const members = await getAllMembers(); // 全てのメンバー情報を非同期で取得
  const post = posts.find(post => post.id === params.id); // URLパラメータのIDに一致する投稿を検索

  if (!post) {
    return <div>ポートフォリオが見つかりませんでした。</div>; // 投稿が見つからない場合の表示
  }

  // メンバー情報を名前でマッピング
  const memberMap = new Map(members.map(member => [member.name, member]));

  return (
    // JSXを返す。これはHTMLに似たJavaScriptの拡張構文です。
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header /> {/* Headerコンポーネントを表示 */} 
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto mt-12">
          <h1 className="text-2xl font-bold mb-3">{post.title}</h1> {/* 投稿のタイトルを表示 */}
          {post.intro && <p>{post.intro}</p>} {/* 投稿のイントロダクションがあれば表示 */}
          <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 投稿の画像を表示 */}
            {post.top_image && <Image src={post.top_image} alt="トップ画像" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image01 && <Image src={post.image01} alt="画像01" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image02 && <Image src={post.image02} alt="画像02" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image03 && <Image src={post.image03} alt="画像03" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
            {post.image04 && <Image src={post.image04} alt="画像04" width={500} height={300} className="mx-auto rounded-lg shadow-lg" />}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">プロジェクトメンバー</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* プロジェクトメンバーのリンク付きプロフィールを表示 */}
              {post.member_name && post.member_name.map((memberName, index) => { // ここでpost.member_nameを使用
                  const memberInfo = memberMap.get(memberName);
                  if (!memberInfo) return null; // memberInfoが存在しない場合はnullを返す
                  return (
                    <Link key={index} href={`/memberdetail/${memberInfo.id}`}>
                        <div className="cursor-pointer">
                            {memberInfo.member_photo && (
                                <Image src={memberInfo.member_photo} alt={memberInfo.name} width={96} height={96} className="rounded-full" />
                            )}
                            <p className="mt-2">{memberInfo.name || "Unknown"}</p>
                            <p className="text-sm text-gray-600">{memberInfo.jobtitle || "Unknown"}</p> {/* jobtitleを表示 */}
                        </div>
                    </Link>
                  );
              })}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">タグ</h2>
            <div className="flex flex-wrap gap-2">
              {/* 投稿のタグを表示 */}
              {post.tag1.map((tag, index) => (
                <span key={index} className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tag}</span>
              ))}
              {post.tag2.map((tag, index) => (
                <span key={index} className="inline-block bg-orange-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tag}</span>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">詳細テキスト</h2>
            {/* 投稿の詳細テキストを表示 */}
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