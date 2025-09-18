import UserEditForm from "./UserEditForm";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/users?limit=100");
  const data = await res.json();

  return data.users.map((user: { id: number }) => ({
    userId: user.id.toString(),
  }));
}

export default async function EditPage({
  params,
}: {
  params: { userId: string };
}) {
  return <UserEditForm userId={params.userId} />;
}
