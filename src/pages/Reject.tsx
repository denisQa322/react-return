import { useState, useEffect } from "react";
import useReturnFilters from "../hooks/useReturnFilters";
import useLocalStorage from "../hooks/useLocalStorage";
import ReturnList from "../components/ReturnList/ReturnList";
import LoadingIndicator from "../components/LoadingIndicator/LoadingComponent";
import { ReturnItemProps } from "../types/returns";

const Reject: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { state: returns, update: setReturns } = useLocalStorage<
    ReturnItemProps[]
  >("returns", []);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const savedReturns = JSON.parse(localStorage.getItem("returns") || "[]");
      setReturns(savedReturns);
      console.log(setReturns(savedReturns));
      setLoading(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterProps = useReturnFilters(returns);

  return (
    <main className="container">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ReturnList
            returns={filterProps.filteredReturns}
            handleEditStatus={() => {}}
            handleDeleteReturn={() => {}}
            completeReturn={() => {}}
          />
        </>
      )}
    </main>
  );
};

export default Reject;
