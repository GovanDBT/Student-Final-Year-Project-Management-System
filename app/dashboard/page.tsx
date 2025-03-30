import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function RedirectPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    // Redirect to the login page if the user is not authenticated
    redirect("/");
  }

  // Fetch the user's role from the database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });

  if (user?.role === "SUPERVISOR") {
    // Redirect to the supervisor dashboard
    redirect("/dashboard/supervisor");
  } else if (user?.role === "STUDENT") {
    // Redirect to the student dashboard
    redirect("/dashboard/student");
  } else {
    // Redirect to a fallback page or show an error if the role is invalid
    redirect("/");
  }

  return null; // This will never be rendered because of the redirects
}
