import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
const Home = async () => {
    const isAdmin = await checkRole('admin')
    const { userId } = await auth()
    if(!userId) {
        redirect('/sign-in')
    }

    if (isAdmin) {
      redirect('/admin')
    }

    return ( 
       <>
        <div className="flex flex-col items-center justify-center h-screen gap-8">
            <h1 className="text-6xl font-bold">Derya Mimarlık Tasarım</h1>
            <p className="text-2xl font-bold">YETKİSİZ GİRİŞ!</p>
        
        <SignOutButton>
            <Button>Çıkış Yap</Button>
        </SignOutButton>
        </div>
        </>
     );
}
 
export default Home;