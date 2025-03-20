import React from "react";

interface Props {
  title: string;
  days: number;
  desc: string;
}

const SubmissionCountdown = ({ title, days, desc }: Props) => {
  return (
    <div className="stats border-1 border-sky-100/10">
      <div className="stat">
        <div className="stat-title font-bold text-wrap">{title}</div>
        <div className="stat-value">{days} Days</div>
        <div className="stat-desc text-wrap">{desc}</div>
      </div>
    </div>
  );
};

export default SubmissionCountdown;
