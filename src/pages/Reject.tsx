import { useEffect } from "react";

import LoadingIndicator from "../components/LoadingIndicator/LoadingComponent";

const Reject: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {}, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="container">
      <LoadingIndicator />
    </main>
  );
};

export default Reject;
