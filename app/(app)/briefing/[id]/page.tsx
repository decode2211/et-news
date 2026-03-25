"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { getBriefing } from "@/services/briefingService";
import BriefingSkeleton from "@/components/briefing/BriefingSkeleton";
import BriefingView from "@/components/briefing/BriefingView";
import ErrorState from "@/components/ui/ErrorState";

export default function BriefingPage() {
  const params = useParams();
  const id = params.id as string;

  const fetcher = useCallback(() => getBriefing(id), [id]);
  const { state, retry } = useFetch(fetcher);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-full"
    >
      {state.status === "loading" && <BriefingSkeleton />}
      {state.status === "error" && (
        <ErrorState message="Failed to fetch data" onRetry={retry} />
      )}
      {state.status === "success" && <BriefingView briefing={state.data} />}
    </motion.div>
  );
}
