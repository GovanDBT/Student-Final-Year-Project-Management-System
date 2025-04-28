import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FeedbackCard from "@/app/components/FeedbackCard";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";

const FeedbackPage = async () => {
  // Get the current session
  const session = await getServerSession(authOptions);

  // Fetch the current user
  const currentUser = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  });

  if (!currentUser) {
    return (
      <div className="container mx-auto">
        <h1>Submission Feedbacks</h1>
        <div className="divider mt-2 mb-6"></div>
        <p>No user found. Please log in.</p>
      </div>
    );
  }

  // Fetch submissions made by the current user
  const submissions = await prisma.submission.findMany({
    where: { userId: currentUser.userId ?? undefined },
    include: { deadline: { select: { title: true } } },
  });

  // Fetch feedbacks for the user's submissions
  const feedbacks = await prisma.feedback.findMany({
    where: { submissionId: { in: submissions.map((sub) => sub.id) } },
    include: { supervisor: true },
    orderBy: {
      dateSubmitted: "desc",
    },
  });

  return (
    <div className="container mx-auto">
      <h1>Submission Feedbacks</h1>
      <div className="divider mt-2 mb-6"></div>
      {submissions.length > 0 ? (
        submissions.map((sub) => {
          // Filter feedbacks for the current submission
          const submissionFeedbacks = feedbacks.filter(
            (feed) => feed.submissionId === sub.id
          );

          return (
            <div key={sub.id}>
              <h3 className="divider divider-start">
                {sub.deadline.title} Submission -{" "}
                {new Date(sub.dateSubmitted).toLocaleDateString()}
              </h3>
              <div className="space-y-5">
                {submissionFeedbacks.length > 0 ? (
                  submissionFeedbacks.map((feed) => (
                    <FeedbackCard
                      key={feed.id}
                      title={feed.title}
                      author={feed.supervisor?.name ?? "Unknown"}
                      date={new Date(feed.dateSubmitted).toLocaleDateString()}
                      description={feed.description}
                    />
                  ))
                ) : (
                  <p>No Feedbacks yet for this submission.</p>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>You have no submissions made.</p>
      )}
    </div>
  );
};

export default FeedbackPage;
