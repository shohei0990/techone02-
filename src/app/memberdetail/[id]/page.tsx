import Header from "../../components/layouts/Header"; // Headerコンポーネントをインポート
import Image from 'next/image'; // Next.jsのImageコンポーネントをインポート
import { getAllMembers } from '@/../libs/client'; // getAllMembers関数をインポート

export async function generateStaticParams() {
  const members = await getAllMembers(); // getAllMembers関数を使用
  return members.map((member) => ({
    id: member.id,
  }));
}

export default async function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const members = await getAllMembers(); // 全てのメンバー情報を取得
  const member = members.find((member) => member.id === params.id); // 特定のIDのメンバー情報を検索

  if (!member) {
    return <div>メンバーが見つかりませんでした。</div>; // メンバーが見つからない場合の表示
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg mt-8">{member.jobtitle}</p>
          <h1 className="text-2xl font-bold mt-2">{member.name}</h1>
          <div className="mt-4">
            <Image
              src={member.member_photo}
              alt={member.name}
              width={300}
              height={300}
              className="rounded-full mx-auto"
            />
          </div>
          <div className="mt-12">
            <Image
              src={member.job_career}
              alt={member.name}
              width={600}
              height={600}
              className="mx-auto"
            />
          </div>
          
          <p className="mt-12">{member.selfintro}</p>
          <div className="mt-8">
          </div>
        </div>
      </div>
    </div>
  );
}