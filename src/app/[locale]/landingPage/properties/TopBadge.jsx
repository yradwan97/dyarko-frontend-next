import { useTranslations } from "next-intl";
import Typography from "../../components/Shared/Typography";

function TopBadge({ isDark = false }) {
  const t = useTranslations("Properties.SingleProperty")
  return (
    <div className={`absolute top-2 right-2 rounded-md ${!isDark ? "bg-gray-500" : "bg-white"} py-1 px-2 `}>
      <Typography className={`capitalize ${!isDark && "text-white"}`} variant="body-xs-medium" as="p">
        {t("for-rent")}
      </Typography>
    </div>
  );
}

export default TopBadge;
