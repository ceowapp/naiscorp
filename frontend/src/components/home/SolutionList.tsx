'use client';

import React from 'react';
import { CircleCheck } from 'lucide-react';

type SolutionListProps = {
  solutions: string[];
  offset?: number;
};

const SolutionList: React.FC<SolutionListProps> = ({ solutions, offset = 0 }) => {
  return (
    <ul className="space-y-3 sm:space-y-2">
      {solutions.map((solution, index) => (
        <li 
          key={index + offset}
          className="flex items-center space-x-2 sm:space-x-3 text-gray-700"
        >
          <span className="mt-1 flex-shrink-0">
            <CircleCheck className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
          </span>
          <span className="text-sm font-light sm:text-base md:text-md lg:text-lg text-[#6D6D6D]">{solution}</span>
        </li>
      ))}
    </ul>
  );
};

export default SolutionList;
