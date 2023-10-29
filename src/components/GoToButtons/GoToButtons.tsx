import { observer } from "mobx-react-lite";
import { TQuotes } from "store/rootStore";
import { Button } from "devextreme-react/button";
import s from "./GoToButtons.module.css";

interface IProps {
  pageNum: number;
  setPageNum: (value: number) => void;
  quotes: TQuotes;
}

export const GoToButtons: React.FC<IProps> = observer(
  ({ pageNum, setPageNum, quotes }) => {
    const goToStart = () => {
      setPageNum(0);
    };

    const goToEnd = () => {
      setPageNum(Math.floor(quotes.length / 10));
    };

    return (
      <div className={s.goToButtons}>
        <Button
          text="Start page"
          onClick={goToStart}
          disabled={pageNum === 0}
        />
        <Button
          text="Last page"
          onClick={goToEnd}
          disabled={pageNum === Math.floor(quotes.length / 10)}
        />
      </div>
    );
  }
);
