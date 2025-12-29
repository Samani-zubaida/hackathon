import PlaceList from "./PlaceList";

const LeftPanel = ({
  selectedPlace,
  setSelectedPlace,
  selectedCategory,
  center,
}) => {
  return (
    <div className="w-[420px] border-r h-full">
      <PlaceList
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        selectedCategory={selectedCategory}
        center={center}
      />
    </div>
  );
};

export default LeftPanel;
