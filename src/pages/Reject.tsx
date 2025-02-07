import { useState, useEffect } from "react";
import useReturnFilters from "../hooks/useReturnFilters ";
import useLocalStorage from "../hooks/useLocalStorage";
import ReturnFilters from "../components/ReturnFilters/ReturnFilters";
import ReturnList from "../components/ReturnList/ReturnList";
import LoadingIndicator from "../components/LoadingComponent";
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
      setLoading(false);
    }, 1000);
  }, []);

  const filterProps = useReturnFilters(returns);

  return (
    <main className="container">
      {loading ? (
        <LoadingIndicator />
      ) : (
        <>
          <ReturnFilters
            returnStatusList={[]}
            returnReasonList={[]}
            returnSellerList={[]}
            returnActiveStatusList={[]}
            {...filterProps}
          />
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
