import Image from 'next/image';

const SidebarBrandLogo = ({ isMinimized }: { isMinimized: boolean }) => {
  return (
    <section
      className={`${isMinimized ? 'mx-3 my-4' : 'm-4'} h-[56px] transition-all duration-300 ease-in-out`}
    >
      <div className="relative h-[56px] w-full">
        <Image
          src="/logos/logo-short.svg"
          width={56}
          height={56}
          alt="Brand logo"
          className={`absolute left-0 top-0 transition-opacity ease-in-out ${isMinimized ? 'duration-100' : 'duration-500'}  ${isMinimized ? 'opacity-100' : 'opacity-0'}`}
        />
        <Image
          src="/logos/logo.svg"
          width={102}
          height={56}
          alt="Brand logo"
          className={`absolute left-0 top-0 transition-opacity ${isMinimized ? 'duration-100' : 'duration-500'} ease-in-out ${isMinimized ? 'opacity-0' : 'opacity-100'}`}
        />
      </div>
    </section>
  );
};

export default SidebarBrandLogo;
