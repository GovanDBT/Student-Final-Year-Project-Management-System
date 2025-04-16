interface Props {
  date: string;
  title: string;
  author: string;
  role: string;
  description: string;
}

const Announcement = ({ date, title, author, role, description }: Props) => {
  return (
    <div className="bg-base-300 rounded-lg p-5 mb-5">
      <div className="flex justify-between">
        <div>
          <h2>{title}</h2>
          <p className="font-bold text-primary mb-4">
            by {author} ({role})
          </p>
        </div>
        <p className="btn bg-base-100 m-0">{date}</p>
      </div>
      <p className="mb-3">{description}</p>
    </div>
  );
};

export default Announcement;
