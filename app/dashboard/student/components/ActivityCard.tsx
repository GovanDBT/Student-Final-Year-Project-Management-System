interface Props {
  title: string;
  date: string;
}

const ActivityCard = ({ title, date }: Props) => {
  return (
    <div className="bg-base-300 w-full rounded-lg py-8 px-4 border-l-2 border-primary flex justify-between mb-3">
      <h3 className="text-[23px]">{title}</h3>
      <button className="btn btn-primary">{date}</button>
    </div>
  );
};

export default ActivityCard;
