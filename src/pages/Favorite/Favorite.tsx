import React, { useEffect, useState } from "react";
import { IQuote, rootStore } from "store/rootStore";
import SelectBox from "devextreme-react/select-box";
import DataGrid, {
  Column,
  Item,
  Pager,
  Paging,
  Toolbar,
} from "devextreme-react/data-grid";
import { observer } from "mobx-react-lite";
import s from "./Favorite.module.css";
import Button from "devextreme-react/button";
import { GoToButtons } from "components/GoToButtons";

export const Favorite: React.FC = observer(() => {
  const [pageNum, setPageNum] = useState<number>(0);

  useEffect(() => {
    return () => {
      rootStore.setSelectedAuthor(null);
    };
  }, []);

  const handlePageChange = (value: number) => {
    setPageNum(value);
  };

  const handleAuthorChange = (e: { selectedItem: string | null }) => {
    rootStore.setSelectedAuthor(e.selectedItem);
  };

  const actionsCellRender = (e: { data: IQuote }) => {
    return (
      <Button
        text="Delete"
        onClick={() => rootStore.toggleFaforite(e.data.id)}
      />
    );
  };

  return (
    <div className={s.favorite}>
      <DataGrid
        dataSource={rootStore.favoriteQuotes}
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
            <h1 className={s.title}>Favorite</h1>
          </Item>
          <Item location="after">
            <SelectBox
              items={rootStore.favoriteAuthors}
              placeholder="Choose Author"
              showClearButton={true}
              onSelectionChanged={handleAuthorChange}
              width="200px"
              defaultValue={rootStore.selectedAuthor}
            />
          </Item>
        </Toolbar>
        <Column dataField="id" caption="ID" dataType="string" width="50px" />
        <Column dataField="quote" caption="Favorite" dataType="string" />
        <Column
          dataField="author"
          caption="Author"
          dataType="string"
          width="250px"
        />
        <Column
          dataField="actions"
          caption="Actions"
          width="150px"
          cellRender={actionsCellRender}
          alignment="center"
        />
      </DataGrid>
      {rootStore.favoriteQuotes.length > 10 && (
        <GoToButtons
          pageNum={pageNum}
          setPageNum={setPageNum}
          quotes={rootStore.favoriteQuotes}
        />
      )}
    </div>
  );
});
