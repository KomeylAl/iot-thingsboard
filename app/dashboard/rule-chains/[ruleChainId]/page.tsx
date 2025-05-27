"use client";

import React from "react";
import { NodeGraphEditor } from "../../_components/GraphView";

interface Params {
  ruleChainId: string;
}

interface PageProps {
  params: React.Usable<Params>;
}

const RuleChainPage = ({ params }: PageProps) => {
  const { ruleChainId } = React.use<Params>(params);
  return (
    <div className="w-full h-screen">
      <NodeGraphEditor ruleChainId={ruleChainId} />
    </div>
  );
};

export default RuleChainPage;
