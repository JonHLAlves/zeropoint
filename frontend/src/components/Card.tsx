import React from 'react';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // Mudado de string para ReactNode para aceitar Lucide
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
      {icon && <div className="mb-4 text-indigo-600">{icon}</div>}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;