import { useRouter } from "next/router";

export default function CodeToken(){
  const router = useRouter();

  return<>Code Token: {router.query.codeToken}</>
}