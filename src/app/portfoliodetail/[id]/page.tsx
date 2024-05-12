
import Header from "../../components/layouts/Header";
import Image from 'next/image';
import Link from "next/link";
import { getPortfolioDetail, getPortfolios } from '@/../libs/client';

export default async function PortfolioDetailPage({ params }: { params: { id: string } }) {
  const portfolioDetail = await getPortfolioDetail(params.id);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto mt-12"> 
          <h1 className="text-2xl font-bold mb-3">{portfolioDetail.pj_name}</h1>
          <p>{portfolioDetail.pj_intro}</p>
          <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolioDetail.pj_images.map((imageUrl, index) => (
              <Image key={index} src={imageUrl} alt={`プロジェクトの詳細画像${index + 1}`} width={500} height={300} className="mx-auto rounded-lg shadow-lg" />
            ))}
          </div>
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">プロジェクトメンバー</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {portfolioDetail.pj_members.map((member, index) => (
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
              {portfolioDetail.pj_tags.map((tag, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const portfolios = await getPortfolios();

  return portfolios.map((portfolio) => ({
    id: portfolio.id,
  }));
}