import { motion } from "framer-motion";
import { Shield, CheckCircle2, Info, BookOpen, Scale, Lock } from "lucide-react";
import { Layout } from "@/components/Layout";

const principles = [
  {
    icon: Lock,
    title: "No Personal Voter Data",
    description:
      "This platform does not collect, store, or process any personal voter information. All simulations use assumed, hypothetical data.",
  },
  {
    icon: Scale,
    title: "Political Neutrality",
    description:
      "The simulator does not promote or oppose any political policy or party. It is designed purely for academic and analytical purposes.",
  },
  {
    icon: BookOpen,
    title: "Academic Purpose Only",
    description:
      "This tool is created for educational and policy research purposes. It helps understand potential outcomes of different electoral scenarios.",
  },
  {
    icon: Info,
    title: "Assumed Data Disclaimer",
    description:
      "All numerical values, costs, and projections are hypothetical assumptions. They should not be considered as actual government data.",
  },
];

const disclaimers = [
  "The simulation results are based on simplified mathematical models and assumed parameters.",
  "Actual implementation outcomes may vary significantly from projected results.",
  "This tool does not replace professional policy analysis or government data.",
  "No financial or administrative decisions should be based solely on these simulations.",
  "The platform is not affiliated with any government body or political organization.",
];

export default function Ethics() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary mb-6">
            <Shield className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ethics & Disclaimer
          </h1>
          <p className="text-lg text-muted-foreground">
            Transparency and responsibility are core to our simulation platform.
            Read our ethical guidelines and usage disclaimers.
          </p>
        </motion.div>

        {/* Core Principles */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Disclaimers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="bg-muted/50 rounded-2xl border border-border p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Info className="h-6 w-6 text-accent" />
              Important Disclaimers
            </h2>
            <ul className="space-y-4">
              {disclaimers.map((disclaimer, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground">{disclaimer}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>

        {/* Usage Guidelines */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              Intended Use
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              This Election Synchronization Simulator is designed for:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Academic research and education",
                "Policy analysis and discussions",
                "Understanding electoral logistics",
                "Comparative scenario studies",
              ].map((use, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border"
                >
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-foreground font-medium">{use}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto text-center mt-16"
        >
          <p className="text-muted-foreground text-sm">
            By using this platform, you acknowledge that you have read and
            understood these ethical guidelines and disclaimers. For questions or
            concerns, please contact the development team.
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
