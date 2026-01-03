// Election Synchronization Simulation Logic
// All data is hypothetical and for academic analysis only

export interface SimulationInput {
  electionScope: 'lokSabha' | 'lokSabhaAndStates';
  syncType: 'current' | 'partial' | 'full';
  timeHorizon: 5 | 10;
  costPerCycle: number; // in crores
  mccDuration: number; // days
  participatingStates: number;
}

export interface SimulationResult {
  totalCost: number;
  costSavings: number;
  costSavingsPercent: number;
  mccDaysBefore: number;
  mccDaysAfter: number;
  mccReduction: number;
  governanceScore: number;
  adminLoadBefore: number;
  adminLoadAfter: number;
  adminReduction: number;
  feasibilityStatus: 'Low' | 'Medium' | 'High';
  electionCyclesBefore: number;
  electionCyclesAfter: number;
}

// Base assumptions (hypothetical data)
const BASE_ASSUMPTIONS = {
  securityMultiplier: 1.4,
  adminLoadPerCycle: 25,
  stateElectionFrequency: 0.2, // 20% states have elections each year
  coordinationOverhead: 0.15, // 15% overhead for full sync
};

export function runSimulation(input: SimulationInput): SimulationResult {
  const { electionScope, syncType, timeHorizon, costPerCycle, mccDuration, participatingStates } = input;

  // Calculate election cycles based on scope
  const isFullScope = electionScope === 'lokSabhaAndStates';
  const baseElectionFrequency = isFullScope ? 1 + (participatingStates * BASE_ASSUMPTIONS.stateElectionFrequency) : 1;
  
  // Current system: Multiple election cycles
  const currentCycles = Math.round(baseElectionFrequency * timeHorizon);
  
  // Synchronized system: Fewer cycles based on sync type
  let syncedCycles: number;
  let syncEfficiency: number;
  
  switch (syncType) {
    case 'current':
      syncedCycles = currentCycles;
      syncEfficiency = 1;
      break;
    case 'partial':
      syncedCycles = Math.ceil(currentCycles / 2);
      syncEfficiency = 0.6;
      break;
    case 'full':
      syncedCycles = Math.ceil(timeHorizon / 5); // One major cycle every 5 years
      syncEfficiency = 0.4;
      break;
    default:
      syncedCycles = currentCycles;
      syncEfficiency = 1;
  }

  // Cost calculations
  const stateMultiplier = isFullScope ? participatingStates * 0.3 : 1;
  const totalCostBefore = currentCycles * costPerCycle * stateMultiplier * BASE_ASSUMPTIONS.securityMultiplier;
  const totalCostAfter = syncedCycles * costPerCycle * stateMultiplier * BASE_ASSUMPTIONS.securityMultiplier * (1 + (syncType === 'full' ? BASE_ASSUMPTIONS.coordinationOverhead : 0));
  const costSavings = totalCostBefore - totalCostAfter;
  const costSavingsPercent = (costSavings / totalCostBefore) * 100;

  // MCC calculations
  const mccDaysBefore = currentCycles * mccDuration;
  const mccDaysAfter = syncedCycles * mccDuration * syncEfficiency;
  const mccReduction = ((mccDaysBefore - mccDaysAfter) / mccDaysBefore) * 100;

  // Governance score (higher is better) - 0 to 100
  const governanceImpact = (mccDaysBefore - mccDaysAfter) / timeHorizon;
  const governanceScore = Math.min(100, Math.max(40, 50 + governanceImpact * 0.5));

  // Administrative load
  const adminLoadBefore = currentCycles * BASE_ASSUMPTIONS.adminLoadPerCycle;
  const adminLoadAfter = syncedCycles * BASE_ASSUMPTIONS.adminLoadPerCycle * (1 + (syncType === 'full' ? 0.3 : 0));
  const adminReduction = ((adminLoadBefore - adminLoadAfter) / adminLoadBefore) * 100;

  // Feasibility assessment
  let feasibilityStatus: 'Low' | 'Medium' | 'High';
  if (syncType === 'current') {
    feasibilityStatus = 'High';
  } else if (syncType === 'partial') {
    feasibilityStatus = participatingStates > 20 ? 'Medium' : 'High';
  } else {
    feasibilityStatus = participatingStates > 15 ? 'Low' : 'Medium';
  }

  return {
    totalCost: Math.round(totalCostAfter),
    costSavings: Math.round(costSavings),
    costSavingsPercent: Math.round(costSavingsPercent * 10) / 10,
    mccDaysBefore: Math.round(mccDaysBefore),
    mccDaysAfter: Math.round(mccDaysAfter),
    mccReduction: Math.round(mccReduction * 10) / 10,
    governanceScore: Math.round(governanceScore),
    adminLoadBefore: Math.round(adminLoadBefore),
    adminLoadAfter: Math.round(adminLoadAfter),
    adminReduction: Math.round(adminReduction * 10) / 10,
    feasibilityStatus,
    electionCyclesBefore: currentCycles,
    electionCyclesAfter: syncedCycles,
  };
}

// Comparison data for charts
export function getComparisonData(input: SimulationInput) {
  const currentResult = runSimulation({ ...input, syncType: 'current' });
  const partialResult = runSimulation({ ...input, syncType: 'partial' });
  const fullResult = runSimulation({ ...input, syncType: 'full' });

  return {
    costComparison: [
      { name: 'Current System', value: currentResult.totalCost + currentResult.costSavings, fill: 'hsl(var(--chart-1))' },
      { name: 'Partial Sync', value: partialResult.totalCost, fill: 'hsl(var(--chart-2))' },
      { name: 'Full Sync', value: fullResult.totalCost, fill: 'hsl(var(--chart-3))' },
    ],
    mccComparison: [
      { name: 'Current', before: currentResult.mccDaysBefore, after: currentResult.mccDaysAfter },
      { name: 'Partial', before: partialResult.mccDaysBefore, after: partialResult.mccDaysAfter },
      { name: 'Full', before: fullResult.mccDaysBefore, after: fullResult.mccDaysAfter },
    ],
    governanceScores: [
      { name: 'Current', score: currentResult.governanceScore },
      { name: 'Partial', score: partialResult.governanceScore },
      { name: 'Full', score: fullResult.governanceScore },
    ],
  };
}
