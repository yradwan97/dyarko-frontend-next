
import SingleProperty from "./SingleProperty";



const PropertiesSection = ({properties = []}) => {
  const mappedProperties = () => {
    return properties?.map((property) => (
      <SingleProperty key={property._id} property={property} />
    )) || [];
  };
  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-10 md:gap-8 lg:grid-cols-3">
        {mappedProperties()}
      </div>
    </>
  );
};

export default PropertiesSection;
