"use client";

import React from "react";
import RuleChainEditorPage from "../../_components/ui/GraphEditor/NodeGraphEditor";

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
      <RuleChainEditorPage 
        ruleChainId={ruleChainId}
      />
    </div>
  );
};

export default RuleChainPage;
