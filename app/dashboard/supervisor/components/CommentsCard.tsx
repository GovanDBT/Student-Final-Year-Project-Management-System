interface Props {
  author: string;
  date: string;
  description: string;
}

const CommentsCard = ({ author, date, description }: Props) => {
  return (
    <div className="card bg-base-300 shadow-sm w-full">
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">{author}</h2>
          <div className="text-white/40">{date}</div>
        </div>
        <div className="divider my-0.5"></div>
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
};

export default CommentsCard;
