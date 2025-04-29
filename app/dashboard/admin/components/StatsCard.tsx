import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  count?: number;
  link: string;
}

const StatsCard = ({ title, count, link }: Props) => {
  return (
    <div className="stats shadow bg-base-300 w-full">
      <div className="stat">
        <div className="stat-title text-[15px]">{title}</div>
        <div className="stat-value">{count ? count : 0}</div>
        <Link href={link} className="stat-desc link link-success">
          View all {title}
        </Link>
      </div>
    </div>
  );
};

export default StatsCard;
