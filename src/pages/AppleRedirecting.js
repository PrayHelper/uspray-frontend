import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AppleRedirecting = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ORIGIN}/apple/login`, { body: code });
  }, [code]);

  return null;
};

export default AppleRedirecting;
