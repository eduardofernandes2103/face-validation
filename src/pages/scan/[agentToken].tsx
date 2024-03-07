import { useRouter } from "next/router";

export default function AgentToken(){
  const router = useRouter();

  return<>Code Token: {router.query.agentToken}</>
}