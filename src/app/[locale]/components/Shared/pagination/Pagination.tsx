import Pagination from "@mui/material/Pagination";

export interface PaginatorProps {
  lastPage: number;
  page?: number;
  onChange: (newPage: number) => void;
}

const Paginator = ({ page = 1, lastPage, onChange }: PaginatorProps) => {
  const handleChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    onChange(newPage);
  };

  return (
    <div className="mt-12 flex justify-center space-x-3">
      <Pagination
        color="primary"
        size="large"
        sx={{
          ".Mui-selected": {
            color: "white !Important",
          },
          ".MuiPaginationItem-previousNext": {
            color: "#3DBAEC",
          },
        }}
        count={lastPage}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default Paginator;
