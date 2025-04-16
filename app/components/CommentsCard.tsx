interface Props {
  author: string;
  date: string;
  description: string;
}

const CommentsCard = ({ author, date, description }: Props) => {
  return (
    <div className="card bg-base-200 w-full">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{author}</h2>
          <div className="text-white/50">
            {new Intl.DateTimeFormat("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }).format(new Date(date))}
          </div>
        </div>
        <p className="text-base mb-1">{description}</p>
        <div className="divider my-0"></div>
      </div>
    </div>
  );
};

export default CommentsCard;
