import Image from 'next/image';
import React from 'react';

const Banner = () => {
  return (
    <section>
      <Image src="/logos/logo.svg" width={248} height={136} alt="Brand logo" />
    </section>
  );
};

export default Banner;
