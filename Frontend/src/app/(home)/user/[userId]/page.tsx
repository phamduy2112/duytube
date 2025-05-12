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
    <>
      <UserView userId={userId} />
    </>
  );
};

export default Page;
