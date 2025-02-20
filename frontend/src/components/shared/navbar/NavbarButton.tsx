import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <motion.div 
      className="relative z-50"
      animate={{
        scale: isOpen ? 1.2 : 1,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <button 
        className="rounded-md text-white hover:text-gray-200 focus:outline-none"
        onClick={toggleMenu}
      >
        <AnimatePresence mode='wait' initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <motion.line
                  x1="5" y1="12" x2="35" y2="12"
                  initial={{ rotate: 0, y: 0, x: 0 }}
                  animate={{ 
                    rotate: -45,
                    y: 8,
                    x: 0,
                  }}
                  transition={{ duration: 0.5 }}
                  transformOrigin="center"
                />
                <motion.line
                  x1="5" y1="20" x2="35" y2="20"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.line
                  x1="5" y1="28" x2="35" y2="28"
                  initial={{ rotate: 0, y: 0, x: 0 }}
                  animate={{ 
                    rotate: 45,
                    y: -8,
                    x: 0,
                  }}
                  transition={{ duration: 0.5 }}
                  transformOrigin="center"
                />
              </motion.svg>
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <motion.line
                  x1="5" y1="12" x2="35" y2="12"
                  initial={{ rotate: -45, y: 8 }}
                  animate={{ rotate: 0, y: 0 }}
                  transition={{ duration: 1 }}
                  transformOrigin="center"
                />
                <motion.line
                  x1="5" y1="20" x2="35" y2="20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                />
                <motion.line
                  x1="5" y1="28" x2="35" y2="28"
                  initial={{ rotate: 45, y: -8 }}
                  animate={{ rotate: 0, y: 0 }}
                  transition={{ duration: 0.5 }}
                  transformOrigin="center"
                />
              </motion.svg>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
};

const TrailingEffect = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {[...Array(8)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute right-1 top-[28px]"
          initial={{
            width: '32px',
            height: '32px',
            y: 0,
            opacity: 0,
            backgroundColor: 'white',
            borderRadius: '2px',
          }}
          animate={{
            width: '32px',
            height: '32px',
            y: isOpen ? [-8, -48] : [-16, 0],
            opacity: isOpen 
              ? [0, 0.2, 0.15, 0.1, 0] 
              : [0, 0, 0.15, 0],
            backgroundColor: [
              'rgba(255,255,255,0.9)',
              'rgba(255,255,255,0.4)',
            ],
          }}
          transition={{
            duration: isOpen ? 1.2 : 0.8,
            delay: index * 0.05,
            repeat: Infinity,
            repeatDelay: 0.5,  
            ease: "easeInOut",
            opacity: { 
              duration: isOpen ? 1.2 : 0.8,
              ease: "easeInOut"
            },
          }}
        />
      ))}
    </AnimatePresence>
  );
};

export { NavbarButton, TrailingEffect };