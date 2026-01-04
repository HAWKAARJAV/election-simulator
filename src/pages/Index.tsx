import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Calculator, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";

const features = [
  {
    icon: Calculator,
    title: "Data-Driven Analysis",
    description:
      "Input custom parameters and see projected outcomes based on logical simulation models.",
  },
  {
    icon: BarChart3,
    title: "Visual Dashboards",
    description:
      "Interactive charts showing cost comparisons, governance impact, and administrative load.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description:
      "Real-time calculations with no waiting. Adjust inputs and see changes immediately.",
  },
  {
    icon: Shield,
    title: "Neutral & Academic",
    description:
      "No political messaging. Designed purely for academic and policy analysis purposes.",
  },
];

const stats = [
  { value: "₹4000+ Cr", label: "Avg. Election Cost (Assumed)" },
  { value: "28+", label: "States & UTs" },
  { value: "60+ Days", label: "Avg. MCC Duration" },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Zap className="h-4 w-4" />
                Academic Simulation Tool
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Election Synchronization
              <br />
              <span className="text-gradient-accent">Impact Simulator</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Analyze the potential impact of synchronized elections using data-driven
              simulations. This platform uses assumed data for academic and policy
              analysis purposes only.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
                <Link to="/simulate">
                  Run Simulation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="heroOutline" size="xl" className="w-full sm:w-auto">
                <Link to="/ethics">View Ethics Statement</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-border/50 bg-card/50">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <p className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our simulation engine processes your inputs through a logical model
              to project potential outcomes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-accent/30"
                >
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-16 text-center"
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Explore?
              </h2>
              <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
                Start your simulation now and see the projected impact of different
                election synchronization scenarios.
              </p>
              <Button asChild variant="hero" size="xl">
                <Link to="/simulate">
                  Start Simulation
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
