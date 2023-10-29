import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { rootStore } from "store/rootStore";
import SelectBox from "devextreme-react/select-box";
import DataGrid, { Column, Paging, Pager } from "devextreme-react/data-grid";

export const Quotes: React.FC = observer(() => {
  const [pageNum, setPageNum] = useState<number>(0);

  useEffect(() => {
    rootStore.loadQuotes();

    return () => {
      rootStore.clear();
    };
  }, []);

  const handlePageChange = (value: number) => {
    setPageNum(value);
  };

  const handleAuthorChange = (e: { selectedItem: string | null }) => {
    rootStore.setSelectedAuthor(e.selectedItem);
  };

  return (
    <div>
      <h1>Quotes</h1>
      <SelectBox
        items={rootStore.authors}
        placeholder="Choose Author"
        showClearButton={true}
        onSelectionChanged={handleAuthorChange}
      />
      <DataGrid dataSource={rootStore.filteredQuotes} showBorders={true}>
        <Paging
          defaultPageSize={10}
          pageIndex={pageNum}
          onPageIndexChange={handlePageChange}
        />
        <Pager showNavigationButtons={true} />
        <Column dataField="id" caption="ID" dataType="string" width="50px" />
        {/* <Column dataField="Product_Name" width={250} /> */}
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
