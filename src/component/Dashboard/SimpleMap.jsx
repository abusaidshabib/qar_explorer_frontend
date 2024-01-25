import { Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";
import marker from "../../assets/locationMarker.png";
import pin from "../../assets/icons/location.png";
import { useRef, useState, useEffect } from "react";

const SimpleMap = () => {
  const { words, lang } = useSelector((state) => state.language);
  const { selectedTent } = useSelector((state) => state.tent);
  const position = [selectedTent?.lat, selectedTent?.long]; // initial map position
  const point = L.point(100, -25);
  const [loading, setLoading] = useState(false);
  const interval = useRef(null);
  useEffect(() => {
    if (loading) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }, [loading]);
  useEffect(() => {
    interval.current = setInterval(() => {
      setLoading((prev) => true);
    }, 10000);
  }, []);
  return selectedTent ? (
    <Card className="bg-bgalt">
      <CardHeader className="pb-0">
        <h3 className="flex items-center gap-2">
          <span>
            <img src={pin} alt="pin" width={25} />
          </span>{" "}
          <span className="text-text">{words["Location"][lang]}</span>
        </h3>
      </CardHeader>
      <CardBody>
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={position}
            zoom={20}
            icon={L.icon({
              iconUrl: marker,
              iconSize: [64, 64],
              iconAnchor: [16, 32],
            })}
          >
            <Tooltip permanent={true} direction="top" offset={point}>
              Hajj Demo Event <br /> 2024
            </Tooltip>
          </Marker>
        </MapContainer>
      </CardBody>
    </Card>
  ) : (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {!loading ? <Spinner color="success" /> : 
      <p className="text-red-500 text-xl font-bold">No Tent Location Available</p>}
    </div>
  );
};

export default SimpleMap;
