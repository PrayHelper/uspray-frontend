import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AppleRedirecting = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    console.log(code);
  }, [code]);

  return null;
};

export default AppleRedirecting;
