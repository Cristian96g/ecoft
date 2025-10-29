import React from "react";
import {
  FiMap,
  FiCalendar,
  FiAward,
  FiAlertCircle,
  FiBookOpen,
  FiUser,
} from "react-icons/fi";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard"
import {features} from "../constants/feature.js"
import HighlightSection from "../components/HighlightSection.jsx";
// import CallToAction from "../components/CalltoAction.jsx";
import RadialStatsSegmented from "../components/RadialStatsSegmented.jsx";



const icons = {
  FiMap,
  FiCalendar,
  FiAward,
  FiAlertCircle,
  FiBookOpen,
  FiUser,
};

function Home() {
  return (
    <div className="">
      <Hero />
      <section className="text-gray-900">
        <div className="mx-auto max-w-screen-xl px-4 lg:py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[380px] md:max-w-lg text-center">
            <h2 className="titlesecond">Funcionalidades Principales</h2>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = icons[feature.icon];
              return (
                <FeatureCard
                  key={feature.id}
                  icon={Icon}
                  title={feature.title}
                  description={feature.description}
                  link={feature.link}
                />
              );
            })}
          </div>
          <HighlightSection />
          <RadialStatsSegmented />
          {/* <CallToAction /> */}
        </div>
      </section>
    </div>

  );
}

export default Home;
