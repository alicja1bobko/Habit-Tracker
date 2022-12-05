const HeroBackground = ({ children }) => {
  return (
    <>
      <BackgroundImage>
        <div className="min-w-full flex flex-col">{children}</div>
      </BackgroundImage>
    </>
  );
};

const BackgroundImage = ({ children }) => {
  return (
    <>
      <div class="relative mix-blend-overlay">
        <div className="absolute bg-my_bg_image h-screen w-full object-cover bg-no-repeat bg-center opacity-30 " />
        <div className="absolute -z-10 bg-gradient-to-b from-indigo-900 via-slate-600 to-fuchsia-900 h-screen w-full " />
        {children}
      </div>
    </>
  );
};

export default HeroBackground;
