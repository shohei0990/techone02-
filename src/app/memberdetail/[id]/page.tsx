import { getMember, getMembers } from '@/../libs/client';
import Header from "../../components/layouts/Header";
import Image from "next/image";

export default async function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const member = await getMember(params.id);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--sub3)]">
      <Header />
      <div className="px-5 py-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mt-12">
            <Image
              src={member.icon}
              alt={member.name}
              width={200}
              height={200}
              className="rounded-full mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold mt-8">{member.name}</h1>
          <p className="text-lg mt-2">{member.job}</p>
          <p className="mt-4">{member.intro}</p>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">役割</h2>
            <ul className="flex flex-wrap justify-center gap-2">
              {member.role.map((role, index) => (
                <li
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const members = await getMembers();
  return members.map((member) => ({
    id: member.id,
  }));
}