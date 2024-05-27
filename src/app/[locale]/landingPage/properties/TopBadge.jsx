import { useTranslations } from "next-intl";
import Typography from "../../components/Shared/Typography";

function TopBadge() {
  const t = useTranslations("Properties.SingleProperty")
  return (
    <div className="absolute top-2 right-2 rounded-md bg-white py-1 px-2 ">
      <Typography variant="body-xs-medium" as="p">
        {t("for-rent")}
      </Typography>
    </div>
  );
}

export default TopBadge;
