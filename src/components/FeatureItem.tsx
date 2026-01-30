import React from "react";

interface FeatureItemProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function FeatureItem({
  title,
  description,
  icon,
}: FeatureItemProps) {
  return (
    <div className="feature-card">
      {icon && <div className="feature-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
