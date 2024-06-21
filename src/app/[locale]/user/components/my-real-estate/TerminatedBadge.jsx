import { useTranslations } from "next-intl";
import Typography from "../../../components/Shared/Typography";

function TerminatedBadge() {
    const t = useTranslations("Account.RealEstates")
    return (
        <div className="absolute top-2 left-2 rounded-md bg-red py-1 px-2 ">
            <Typography variant="body-xs-medium" as="p" className="text-white">
                {t("terminated")}
            </Typography>
        </div>
    );
}

export default TerminatedBadge;
