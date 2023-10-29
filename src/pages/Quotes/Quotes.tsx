import { observer } from "mobx-react-lite";
import { useState } from "react";
import { IQuote, rootStore } from "store/rootStore";
import SelectBox from "devextreme-react/select-box";
import DataGrid, {
  Column,
  Paging,
  Pager,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import s from "./Quotes.module.css";
import "./quotes.css";

export const Quotes: React.FC = observer(() => {
  const [pageNum, setPageNum] = useState<number>(0);

  const handlePageChange = (value: number) => {
    setPageNum(value);
  };

  const handleAuthorChange = (e: { selectedItem: string | null }) => {
    rootStore.setSelectedAuthor(e.selectedItem);
  };

  const favoriteQuoteIds = rootStore.favoriteQuoteIds;

  const favoriteCellRender = (e: { data: IQuote }) => {
    return (
      <Button
        icon={favoriteQuoteIds.includes(e.data.id) ? "favorites" : "add"}
        onClick={() => rootStore.toggleFaforite(e.data.id)}
      />
    );
  };

  return (
    <div className={s.quotes}>
      <DataGrid
        dataSource={rootStore.filteredQuotes}
        showBorders={true}
        height={"100%"}
      >
        <Paging
          defaultPageSize={10}
          pageIndex={pageNum}
          onPageIndexChange={handlePageChange}
        />
        <Pager showNavigationButtons={true} />
        <Toolbar>
          <Item location="before">
            <h1 className={s.title}>Quotes</h1>
          </Item>
          <Item location="after">
            <SelectBox
              items={rootStore.authors}
              placeholder="Choose Author"
              showClearButton={true}
              onSelectionChanged={handleAuthorChange}
              width="200px"
              defaultValue={rootStore.selectedAuthor}
            />
          </Item>
        </Toolbar>
        <Column dataField="id" caption="ID" dataType="string" width="50px" />
        <Column
          dataField="favorite"
          caption="Favorite"
          width="70px"
          cellRender={favoriteCellRender}
          alignment="center"
        />
        <Column dataField="quote" caption="Quotes" dataType="string" />
        <Column
          dataField="author"
          caption="Author"
          dataType="string"
          width="250px"
        />
      </DataGrid>
    </div>
  );
});
