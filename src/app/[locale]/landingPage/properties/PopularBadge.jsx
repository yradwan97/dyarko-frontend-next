import ThreeStarSolid from "../../components/UI/icons/ThreeStarSolid";
import Typography from "../../components/Shared/Typography";

function PopularBadge() {
  return (
    <div className="absolute top-full  -left-2 -translate-y-1/2 rounded-tr-md rounded-br-md rounded-tl-lg bg-main-yellow-600">
      <div className="relative flex items-center py-2 px-4">
        <ThreeStarSolid className="mr-1 h-3 w-3 fill-white" />
        <Typography
          variant="body-xs-medium"
          as="p"
          className="flex items-center  uppercase text-white"
        >
          POPULAR
        </Typography>
        <div className="absolute top-[93%] -left-[2px] inline-block w-2 -rotate-90 overflow-hidden">
          <div className="h-3 origin-bottom-left rotate-45 transform bg-main-yellow-400 "></div>
        </div>
      </div>
    </div>
  );
}

export default PopularBadge;
