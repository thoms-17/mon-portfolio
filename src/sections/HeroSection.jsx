const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center">
      <h1 className="text-5xl font-extrabold text-blue-600 mb-6">
        Bienvenue sur mon portfolio
      </h1>
      <p className="text-gray-700 text-lg max-w-prose">
        Je suis développeur web passionné, spécialisé en React. Faites défiler
        pour en savoir plus sur moi et mes projets.
      </p>
      <div className="mt-10 animate-bounce text-blue-600 text-sm">
        ↓ Faites défiler ↓
      </div>
    </section>
  );
};

export default HeroSection;
