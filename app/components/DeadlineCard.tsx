import React from "react";

interface Props {
  title: string;
  days: number;
  date: string;
  desc?: string;
}

const DeadlineCard = ({ title, days, desc, date }: Props) => {
  return (
    <div className="stats border-1 border-sky-100/10 w-full">
      <div className="stat">
        <div className="stat-title font-bold text-wrap">
          <span className="text-white">{date}:</span> {title}
        </div>
        <div className="stat-value">{days} Days</div>
        <div className="stat-desc text-wrap">{desc}</div>
      </div>
    </div>
  );
};

export default DeadlineCard;
