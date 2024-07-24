import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server"; 

import { redirect } from "next/navigation";




export default async function AgencyPage() {

    const authUser = await currentUser(); 

    if(!authUser) {
        return redirect("/agency/sign-in");
    }

    const agencyId = await verifyAndAcceptInvitation(); 

    const user = getAuthUserDetails();
    
    
    return (
        <div>

        </div>
    )
}