import Typography from "../../components/Shared/Typography";

function TopBadge() {
  return (
    <div className="absolute top-2 right-2 rounded-md bg-white py-1 px-2 ">
      <Typography variant="body-xs-medium" as="p">
        For Rent
      </Typography>
    </div>
  );
}

export default TopBadge;
