import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const topics = [
  {
    title: "BeanOrigins",
    description: "beanOriginsDesc",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e",
    fact: "beanOriginsFact"
  },
  {
    title: "BrewingMethods",
    description: "brewingMethodsDesc",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    fact: "brewingMethodsFact"
  },
  {
    title: "RoastingProcess",
    description: "roastingProcessDesc",
    image: "https://images.unsplash.com/photo-1501747315-124a0eaca060",
    fact: "roastingProcessFact"
  },
  {
    title: "CoffeeTasting",
    description: "coffeeTastingDesc",
    image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31",
    fact: "coffeeTastingFact"
  }
];

export const CoffeeEducation = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm text-muted-foreground">{t("education.learn")}</span>
          <h2 className="text-4xl font-bold mt-2">{t("education.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            {t("education.subtitle")}
          </p>
        </motion.div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {topics.map((topic, index) => (
              <CarouselItem key={topic.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="relative h-64">
                    <img
                      src={topic.image}
                      alt={t(`education.topics.${topic.title}.title`)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                      {t(`education.topics.${topic.title}.title`)}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground mb-4">
                      {t(`education.topics.${topic.title}.${topic.description}`)}
                    </p>
                    <div className="bg-secondary/50 p-4 rounded-lg">
                      <p className="text-sm italic">
                        {t(`education.topics.${topic.title}.${topic.fact}`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};