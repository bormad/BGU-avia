import { useState, useEffect } from "react";

const DEFAULT_TICKETS_COUNT = 5;

const useShow = <T>(items: T[]): [T[], number, boolean, () => void] => {
  const [showed, setShowed] = useState(DEFAULT_TICKETS_COUNT);
  const [showAll, setShowAll] = useState(showed >= items.length);
  const [showedItems, setShowedItems] = useState(items.slice(0, showed));

  const addItems = () => {
    if (showed + DEFAULT_TICKETS_COUNT > items.length) {
      setShowed(items.length);
      setShowAll(true);
    } else {
      setShowed(showed + DEFAULT_TICKETS_COUNT);
    }
  };

  const itemsLeft = items.length - showed;

  useEffect(() => {
    setShowedItems(items.slice(0, showed));
    setShowAll(showed >= items.length);
  }, [showed, items]);

  useEffect(() => {
    setShowed(DEFAULT_TICKETS_COUNT);
    setShowAll(false);
    setShowedItems(items.slice(0, DEFAULT_TICKETS_COUNT));
  }, [items]);

  return [showedItems, itemsLeft > 0 ? itemsLeft : 0, showAll, addItems];
};

export default useShow;
