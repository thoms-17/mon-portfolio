import AboutSection from "../sections/AboutSection";

const Home = () => {
  return (
    <section className="min-h-screen pt-16">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Bienvenue sur mon portfolio
      </h1>
      <p className="text-gray-700 max-w-prose mb-16">
        Ce site présente mes projets, mon parcours et les moyens de me contacter.
      </p>

      <AboutSection />
    </section>
  );
};

export default Home;
