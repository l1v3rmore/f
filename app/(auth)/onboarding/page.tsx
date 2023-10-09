import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import AccountProfile from "@/components/forms/AccountProfile";

async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid TypeScript warnings

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className='flex justify-center items-center min-h-screen'>
      <div className='max-w-3xl w-full px-10 py-20'>
        <h1 className='head-text text-center'>Onboarding</h1>
        <p className='mt-3 text-base-regular text-light-2 text-center'>
          Complete your profile now to use fotoplix.
        </p>

        <section className='mt-9 bg-dark-2 p-10'>
          <AccountProfile user={userData} btnTitle='Continue' />
        </section>
      </div>
    </main>
  );
}

export default Page;
