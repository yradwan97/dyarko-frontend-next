import Typography from "../../../components/Shared/Typography";

function TerminatedBadge() {
    return (
        <div className="absolute top-2 left-2 rounded-md bg-white/30 py-1 px-2 ">
            <Typography variant="body-xs-medium" as="p">
                Terminated
            </Typography>
        </div>
    );
}

export default TerminatedBadge;
