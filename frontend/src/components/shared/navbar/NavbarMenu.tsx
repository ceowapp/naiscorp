import React from 'react';
import { X } from 'lucide-react';
import NavbarItem from './NavbarItem';
import { navbarLinks } from '@/constants/data';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function NavbarMenu({ isOpen, toggleMenu }: NavbarMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed bg-cover bg-center bg-[url('/images/navbar-background.png')] rounded-lg w-screen h-screen z-50 shadow-xl"
        >
          <div className="relative flex flex-col items-center justify-center mt-24 space-y-9">
            {navbarLinks.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <NavbarItem 
                  href={`/${item.toLowerCase()}`} 
                  label={item} 
                  onClick={toggleMenu} 
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



