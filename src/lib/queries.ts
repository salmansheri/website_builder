"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

export async function getAuthUserDetails() {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const userData = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      Agency: {
        include: {
          SidebarOption: true,
          SubAccount: {
            include: {
              SidebarOption: true,
            },
          },
        },
      },
      Permissions: true,
    },
  });

  return userData;
}

export async function saveActivityLogsNotification({
  agencyId,
  description,
  subaccountId,
}: {
  agencyId?: string;
  description?: string;
  subaccountId?: string;
}) {
  const authUser = await currentUser();

  let userData;

  if (!authUser) {
    const response = await db.user.findFirst({
      where: {
        Agency: {
          SubAccount: {
            some: {
              id: subaccountId,
            },
          },
        },
      },
    });

    if (response) {
      userData = response;
    }
  } else {
    userData = await db.user.findUnique({
      where: {
        email: authUser.emailAddresses[0].emailAddress,
      },
    });
  }

  if(!userData) {
    console.log("Could not find a User!")
    return; 
  }

  let foundAgencyId = agencyId 

  if(!foundAgencyId) {
    if(!subaccountId) {
        throw new Error("You need to provide atleast an agency Id or Subaccount Id")
    }
  }
const response = await db.subAccount.findUnique({
    where: {
        id: subaccountId, 
    }
})

if(response) foundAgencyId = response.agencyId

}

export async function createTeamUsers(agencyId: string, user: User) {
  if (user.role === "AGENCY_OWNER") return null;

  const response = await db.user.create({
    data: { ...user },
  });

  return response;
}

export async function verifyAndAcceptInvitation() {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const invitationExists = await db.invitation.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
      status: "PENDING",
    },
  });

  if (invitationExists) {
    const userDetails = await createTeamUsers(invitationExists.agencyId, {
      email: invitationExists.email,
      agencyId: invitationExists.agencyId,
      avatarUrl: user.imageUrl,
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,

      role: invitationExists.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
