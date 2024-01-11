import Typography from "../../components/Shared/Typography";

function Price(props) {

  return (
    <div className="flex items-end">
      <Typography
        variant="body-2xl-extrabold"
        as="p"
        className="tracking-tightest text-main-yellow-600"
      >
        ${props.price}
      </Typography>
      {props.paymentType === "rent" && <Typography variant="body-md-medium" as="p" className="text-gray-400">
        {props.period && `${props.period}`}
      </Typography>}
    </div>
  );
}

export default Price;
