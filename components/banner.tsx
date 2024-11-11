import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <section className="w-24 sm:w-48 lg:w-full">
      <Image src="/logos/logo.svg" width={248} height={136} alt="Brand logo" priority />
    </section>
  );
};

export default Banner;
