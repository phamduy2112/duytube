import UserView from "@/modules/user/views/user-view";

interface PageProps {
  params: Promise<{
    userId: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const { userId } = resolvedParams;

  return (
    <div className="">
      <UserView userId={userId} />
    </div>
  );
};

export default Page;
