// src/components/Header.tsx
import React from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface HeaderProps {
  title: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onLogout }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 border-b border-gray-700 py-4 px-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-100">{title}</h1>
        <Button onClick={onLogout} variant="secondary">
          Sair
        </Button>
      </div>
    </motion.header>
  );
};

export default Header;