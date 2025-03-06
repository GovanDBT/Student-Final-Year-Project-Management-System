import React from "react";

interface Props {
  title: string;
  days: number;
  desc: string;
}

const SubmissionCountdown = ({ title, days, desc }: Props) => {
  return (
    <div className="stats shadow">
      <div className="stat">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{days} Days</div>
        <div className="stat-desc">{desc}</div>
      </div>
    </div>
  );
};

export default SubmissionCountdown;
