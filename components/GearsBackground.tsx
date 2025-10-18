'use client';

import Image from 'next/image';

type GearsBackgroundProps = {
  children?: React.ReactNode;
};

export default function GearsBackground({ children }: GearsBackgroundProps) {
  return (
    <div className="relative w-full min-h-[600px] md:min-h-[700px] bg-white overflow-hidden">
      {/* Gears Illustration - Centered Behind Hero Text */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] lg:w-[1200px] lg:h-[1200px] opacity-50">
        <Image 
          src="/illustration/gears.png"
          alt="Gears Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center h-full min-h-[600px] md:min-h-[700px]">
        {children}
      </div>
    </div>
  );
}

