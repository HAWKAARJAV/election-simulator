import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  IndianRupee,
  Calendar,
  TrendingUp,
  Users,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { ProgressRing } from "@/components/ProgressRing";
import {
  runSimulation,
  getComparisonData,
  type SimulationInput,
  type SimulationResult,
} from "@/lib/simulator";

const CHART_COLORS = [
  "hsl(222, 47%, 25%)",
  "hsl(38, 92%, 50%)",
  "hsl(173, 58%, 39%)",
];

const feasibilityConfig = {
  High: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  Medium: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  Low: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

export default function Results() {
  const navigate = useNavigate();
  const [input, setInput] = useState<SimulationInput | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [comparisonData, setComparisonData] = useState<ReturnType<
    typeof getComparisonData
  > | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("simulationInput");
    if (stored) {
      const parsedInput = JSON.parse(stored) as SimulationInput;
      setInput(parsedInput);
      setResult(runSimulation(parsedInput));
      setComparisonData(getComparisonData(parsedInput));
    }
  }, []);

  if (!input || !result || !comparisonData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-display text-2xl font-bold text-foreground mb-4">
              No Simulation Data
            </h2>
            <p className="text-muted-foreground mb-8">
              Please run a simulation first to see the results.
            </p>
            <Link to="/simulate">
              <Button variant="hero" size="lg">
                Configure Simulation
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const FeasibilityIcon = feasibilityConfig[result.feasibilityStatus].icon;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <Button
              variant="ghost"
              onClick={() => navigate("/simulate")}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Simulation
            </Button>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Simulation Results
            </h1>
            <p className="text-muted-foreground mt-2">
              {input.syncType === "current"
                ? "Current System"
                : input.syncType === "partial"
                ? "Partial Synchronization"
                : "Full Synchronization"}{" "}
              • {input.timeHorizon} Year Projection
            </p>
          </div>

          {/* Feasibility Badge */}
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl ${
              feasibilityConfig[result.feasibilityStatus].bg
            }`}
          >
            <FeasibilityIcon
              className={`h-8 w-8 ${
                feasibilityConfig[result.feasibilityStatus].color
              }`}
            />
            <div>
              <p className="text-sm text-muted-foreground">Feasibility</p>
              <p
                className={`font-display text-xl font-bold ${
                  feasibilityConfig[result.feasibilityStatus].color
                }`}
              >
                {result.feasibilityStatus}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Projected Cost"
            value={`₹${result.totalCost.toLocaleString()} Cr`}
            subtitle={`${result.costSavingsPercent}% savings vs current`}
            icon={IndianRupee}
            trend={
              result.costSavingsPercent > 0
                ? { value: result.costSavingsPercent, isPositive: true }
                : undefined
            }
            variant={result.costSavingsPercent > 20 ? "success" : "default"}
            delay={0.1}
          />
          <StatCard
            title="MCC Days (After)"
            value={result.mccDaysAfter}
            subtitle={`${result.mccReduction}% reduction from ${result.mccDaysBefore} days`}
            icon={Calendar}
            trend={
              result.mccReduction > 0
                ? { value: result.mccReduction, isPositive: true }
                : undefined
            }
            variant={result.mccReduction > 30 ? "success" : "info"}
            delay={0.2}
          />
          <StatCard
            title="Election Cycles"
            value={`${result.electionCyclesAfter} / ${result.electionCyclesBefore}`}
            subtitle="After / Before synchronization"
            icon={TrendingUp}
            delay={0.3}
          />
          <StatCard
            title="Admin Load Reduction"
            value={`${result.adminReduction}%`}
            subtitle={`From ${result.adminLoadBefore} to ${result.adminLoadAfter} units`}
            icon={Users}
            variant={result.adminReduction > 20 ? "success" : "warning"}
            delay={0.4}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Cost Comparison Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Cost Comparison (₹ Crores)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData.costComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()} Cr`, "Cost"]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {comparisonData.costComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* MCC Days Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              MCC Duration Analysis (Days)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={comparisonData.mccComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="before"
                  name="Before Sync"
                  stroke={CHART_COLORS[0]}
                  strokeWidth={3}
                  dot={{ fill: CHART_COLORS[0], strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="after"
                  name="After Sync"
                  stroke={CHART_COLORS[1]}
                  strokeWidth={3}
                  dot={{ fill: CHART_COLORS[1], strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Governance Score & Pie Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Governance Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center justify-center"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-8">
              Governance Stability Score
            </h3>
            <ProgressRing
              value={result.governanceScore}
              size={180}
              strokeWidth={12}
              sublabel="/100"
            />
            <p className="text-muted-foreground text-center mt-6 max-w-xs">
              Higher score indicates better governance continuity and policy
              implementation potential.
            </p>
          </motion.div>

          {/* Governance Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="lg:col-span-2 bg-card rounded-2xl border border-border p-6"
          >
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Scenario Comparison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={comparisonData.costComparison}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {comparisonData.costComparison.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()} Cr`, "Cost"]}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex flex-col justify-center space-y-4">
                {comparisonData.costComparison.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-3">
                    <div
                      className="h-4 w-4 rounded-full"
                      style={{ backgroundColor: CHART_COLORS[index] }}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ₹{item.value.toLocaleString()} Cr
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <Button
            variant="heroOutline"
            size="lg"
            onClick={() => navigate("/simulate")}
          >
            <ArrowLeft className="h-4 w-4" />
            Modify Parameters
          </Button>
          <Link to="/ethics">
            <Button variant="secondary" size="lg">
              View Ethics Statement
            </Button>
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
