import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Layout } from "@/components/Layout";
import type { SimulationInput } from "@/lib/simulator";

export default function Simulate() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<SimulationInput>({
    electionScope: "lokSabhaAndStates",
    syncType: "current",
    timeHorizon: 10,
    costPerCycle: 4000,
    mccDuration: 60,
    participatingStates: 28,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store in sessionStorage for results page
    sessionStorage.setItem("simulationInput", JSON.stringify(formData));
    navigate("/results");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Configure Simulation
            </h1>
            <p className="text-muted-foreground text-lg">
              Adjust the parameters below to run your custom election synchronization
              simulation.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section A: Election Scope */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                  A
                </span>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Election Scope
                </h2>
              </div>

              <div className="space-y-4">
                <Label>Select the scope of elections to simulate</Label>
                <Select
                  value={formData.electionScope}
                  onValueChange={(value: "lokSabha" | "lokSabhaAndStates") =>
                    setFormData({ ...formData, electionScope: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select scope" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lokSabha">Lok Sabha Only</SelectItem>
                    <SelectItem value="lokSabhaAndStates">
                      Lok Sabha + State Assemblies
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Section B: Synchronization Type */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                  B
                </span>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Synchronization Type
                </h2>
              </div>

              <RadioGroup
                value={formData.syncType}
                onValueChange={(value: "current" | "partial" | "full") =>
                  setFormData({ ...formData, syncType: value })
                }
                className="space-y-4"
              >
                <div className="flex items-start space-x-4 p-4 rounded-xl border border-border hover:border-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="current" id="current" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="current" className="cursor-pointer font-medium">
                      Current System (Multiple Elections)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Elections held at different times as per current schedule
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl border border-border hover:border-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="partial" id="partial" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="partial" className="cursor-pointer font-medium">
                      Partial Synchronization
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Some state elections aligned with general elections
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl border border-border hover:border-accent/50 transition-colors cursor-pointer">
                  <RadioGroupItem value="full" id="full" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="full" className="cursor-pointer font-medium">
                      Full Synchronization
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      All elections held simultaneously every 5 years
                    </p>
                  </div>
                </div>
              </RadioGroup>
            </motion.div>

            {/* Section C: Time Horizon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                  C
                </span>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Time Horizon
                </h2>
              </div>

              <div className="space-y-4">
                <Label>Projection period for simulation</Label>
                <Select
                  value={formData.timeHorizon.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, timeHorizon: parseInt(value) as 5 | 10 })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Section D: Assumptions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-2xl border border-border p-6 md:p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground text-sm font-bold">
                  D
                </span>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Assumptions
                </h2>
                <div className="ml-auto flex items-center gap-1 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span className="hidden sm:inline">Hypothetical values</span>
                </div>
              </div>

              <div className="space-y-8">
                {/* Cost per cycle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Average cost per election cycle</Label>
                    <span className="font-display font-semibold text-foreground">
                      ₹{formData.costPerCycle.toLocaleString()} Cr
                    </span>
                  </div>
                  <Slider
                    value={[formData.costPerCycle]}
                    onValueChange={([value]) =>
                      setFormData({ ...formData, costPerCycle: value })
                    }
                    min={1000}
                    max={10000}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹1,000 Cr</span>
                    <span>₹10,000 Cr</span>
                  </div>
                </div>

                {/* MCC Duration */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Average MCC duration per election</Label>
                    <span className="font-display font-semibold text-foreground">
                      {formData.mccDuration} Days
                    </span>
                  </div>
                  <Slider
                    value={[formData.mccDuration]}
                    onValueChange={([value]) =>
                      setFormData({ ...formData, mccDuration: value })
                    }
                    min={30}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>30 Days</span>
                    <span>120 Days</span>
                  </div>
                </div>

                {/* Participating States */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Number of participating states</Label>
                    <span className="font-display font-semibold text-foreground">
                      {formData.participatingStates} States
                    </span>
                  </div>
                  <Slider
                    value={[formData.participatingStates]}
                    onValueChange={([value]) =>
                      setFormData({ ...formData, participatingStates: value })
                    }
                    min={5}
                    max={36}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>5 States</span>
                    <span>36 States/UTs</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Button type="submit" variant="hero" size="xl">
                Run Simulation
                <ArrowRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </Layout>
  );
}
