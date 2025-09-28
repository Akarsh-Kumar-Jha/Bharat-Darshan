import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import MapTooltip from '../components/Map/MapTooltip';
import InfoCard from '../components/Map/InfoCard';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Map() {
  const [loading, setLoading] = useState(true);
  const [activeState, setActiveState] = useState(null);
  const [tooltip, setTooltip] = useState({ content: null, position: { x: 0, y: 0 } });
  const [infoCardData, setInfoCardData] = useState(null);

  const svgRef = useRef(null);
  const mapContainerRef = useRef(null);
  const d3Refs = useRef({});
  const navigate = useNavigate();

  const districtFileMap = {
    "Andhra Pradesh": "andhra-pradesh.topojson", "Arunachal Pradesh": "arunachal-pradesh.topojson", "Assam": "assam.topojson", "Bihar": "bihar.topojson", "Chhattisgarh": "chhattisgarh.topojson", "Goa": "goa.topojson", "Gujarat": "gujarat.topojson", "Haryana": "haryana.topojson", "Himachal Pradesh": "himachal-pradesh.topojson", "Jharkhand": "jharkhand.topojson", "Karnataka": "karnataka.topojson", "Kerala": "kerala.topojson", "Madhya Pradesh": "madhya-pradesh.topojson", "Maharashtra": "maharashtra.topojson", "Manipur": "manipur.topojson", "Meghalaya": "meghalaya.topojson", "Mizoram": "mizoram.topojson", "Nagaland": "nagaland.topojson", "Odisha": "odisha.topojson", "Punjab": "punjab.topojson", "Rajasthan": "rajasthan.topojson", "Sikkim": "sikkim.topojson", "Tamil Nadu": "tamilnadu.topojson", "Telangana": "telangana.topojson", "Tripura": "tripura.topojson", "Uttar Pradesh": "uttar-pradesh.topojson", "Uttarakhand": "uttarakhand.topojson", "West Bengal": "west-bengal.topojson", "Andaman and Nicobar Islands": "andaman-and-nicobar-island.topojson", "Chandigarh": "chandigarh.topojson", "Dadra and Nagar Haveli and Daman and Diu": "dnh-and-dd.topojson", "Delhi": "delhi.topojson", "National Capital Territory of Delhi": "delhi.topojson", "Jammu and Kashmir": "jammu-and-kashmir.topojson", "Ladakh": "ladakh.topojson", "Lakshadweep": "lakshadweep.topojson", "Puducherry": "puducherry.topojson"
};

  // Data Loading Effect
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
            indiaStatesTopo, 
            allDistrictsTopoData, 
            biharData, 
            westBengalData, 
            sikkimData, 
            assamData, 
            nagalandData, 
            meghalayaData, 
            manipurData, 
            arunachalPradeshData
        ] = await Promise.all([
          d3.json("/india.topojson"),
          Promise.all(Object.values(districtFileMap).map(fileName => d3.json(`/${fileName}`)))
            .then(data => Object.keys(districtFileMap).reduce((acc, key, i) => ({ ...acc, [key]: data[i] }), {})),
          d3.json("/bihar-dist.json"),
          d3.json("/west-bengal-dist.json"),
          d3.json("/sikkim-dist.json"),
          d3.json("/assam-dist.json"),
          d3.json("/nagaland-dist.json"),
          d3.json("/meghalaya-dist.json"),
          d3.json("/manipur-dist.json"),
          d3.json("/arunachal-pradesh-dist.json").catch(() => ({}))
        ]);

        d3Refs.current.indiaStatesTopo = indiaStatesTopo;
        d3Refs.current.allDistrictsTopoData = allDistrictsTopoData;
        d3Refs.current.districtInfo = {
            "Bihar": biharData,
            "West Bengal": westBengalData,
            "Sikkim": sikkimData,
            "Assam": assamData,
            "Nagaland": nagalandData,
            "Meghalaya": meghalayaData,
            "Manipur": manipurData,
            "Arunachal Pradesh": arunachalPradeshData
        };

        setLoading(false);
      } catch (error) {
        console.error("Failed to load map data:", error);
        setLoading(false); // Stop loading even if there is an error
      }
    };
    loadData();
  }, []);

  const resetToIndiaView = useCallback(() => {
    setActiveState(null);
    setInfoCardData(null);
    setTooltip({ content: null, position: { x: 0, y: 0 } });

    const { svg, zoom } = d3Refs.current;
    if (!svg || !zoom) return;
    
    svg.transition().duration(750)
      .ease(d3.easeCubicInOut)
      .call(zoom.transform, d3.zoomIdentity);

    d3.select("#state-shapes").selectAll(".state").transition().duration(500).style("opacity", 1);
    d3.select("#state-labels").selectAll(".state-label").transition().duration(500).style("opacity", 0.7);
    d3.select("#district-shapes").selectAll("*").remove();
    d3.select("#district-labels").selectAll("*").remove();
  }, []);
  
  // D3 Initialization and Drawing Effect
  useEffect(() => {
    if (loading || !mapContainerRef.current) return;

    const { indiaStatesTopo } = d3Refs.current;
    const container = mapContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const states = topojson.feature(indiaStatesTopo, indiaStatesTopo.objects.states);
    const svg = d3.select(svgRef.current).attr("width", width).attr("height", height);
    svg.selectAll("*").remove();

    const g = svg.append("g");
    g.append("g").attr("id", "state-shapes");
    g.append("g").attr("id", "district-shapes");
    g.append("g").attr("id", "state-labels");
    g.append("g").attr("id", "district-labels");
    
    const projection = d3.geoMercator().fitSize([width, height], states);
    const path = d3.geoPath().projection(projection);

    const zoomed = (event) => {
        const { transform } = event;
        g.attr("transform", transform);
        g.selectAll(".district-label")
            .style("display", transform.k > 2 ? "block" : "none")
            .style("font-size", `${Math.max(2, 8 / transform.k)}px`);
    };

    const zoom = d3.zoom().scaleExtent([1, 25]).on("zoom", zoomed);
    svg.call(zoom);

    d3Refs.current = { ...d3Refs.current, svg, projection, path, zoom, width, height, g };

    d3.select("#state-shapes").selectAll(".state")
  .data(states.features)
  .join("path")
  .attr("class", "state")
  .attr("d", path)
  .attr("fill", "#374151") // Tailwind's gray-700 (dark fill)
  .attr("stroke", "#d1d5db") // Tailwind's gray-300 (light borders)
  .attr("stroke-width", 1)
  .on("mouseover", function() { d3.select(this).raise(); })
  .on("mousemove", (event, d) => {
      const [x, y] = d3.pointer(event, container);
      setTooltip({ content: `<strong>${d.properties.st_nm}</strong>`, position: { x, y } });
  })
  .on("mouseout", () => setTooltip({ content: null, position: { x: 0, y: 0 } }))
  .on("click", (event, d) => setActiveState(d));

      
d3.select("#state-labels").selectAll(".state-label")
  .data(states.features)
  .join("text")
  .attr("class", "state-label")
  .attr("transform", d => `translate(${path.centroid(d)})`)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .attr("fill", "white")   // white text
  .attr("font-size", "10px")
  .attr("opacity", 0.7)
  .text(d => d.properties.st_nm);

  }, [loading]);

  // Effect to handle zooming into a state
  useEffect(() => {
    if (!activeState || !d3Refs.current.path) return;

    const { path, width, height, svg, zoom, allDistrictsTopoData, districtInfo } = d3Refs.current;
    const container = mapContainerRef.current;
    const currentStateName = activeState.properties.st_nm;

    d3.select("#state-labels").selectAll(".state-label").transition().duration(500).style("opacity", 0);
    d3.select("#state-shapes").selectAll(".state").transition().duration(500).style("opacity", 0.15);
    d3.select("#state-shapes").selectAll(".state").filter(d => d.properties.st_nm === currentStateName)
      .transition().duration(500).style("opacity", 1);
    
    const [[x0, y0], [x1, y1]] = path.bounds(activeState);
    const scale = Math.min(15, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height));
    const translate = [width / 2 - scale * (x0 + x1) / 2, height / 2 - scale * (y0 + y1) / 2];
    const transform = d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale);

    svg.transition().duration(750).ease(d3.easeCubicInOut).call(zoom.transform, transform)
      .on("end", () => {
        const stateTopoData = allDistrictsTopoData[currentStateName];
        if (!stateTopoData) {
            console.warn(`No district topojson data found for: ${currentStateName}`);
            return;
        }

        const districtObjectKey = Object.keys(stateTopoData.objects)[0];
        const districtFeatures = topojson.feature(stateTopoData, stateTopoData.objects[districtObjectKey]).features;

       d3.select("#district-shapes").selectAll(".district-boundary")
  .data(districtFeatures, d => d.properties.district || d.properties.Dist_Name)
  .join("path")
  .attr("class", "district-boundary")
  .attr("d", path)
  .attr("fill", "#1f2937") // Tailwind gray-800 (darker than states for contrast)
  .attr("stroke", "#e5e7eb") // Tailwind gray-200 (light borders)
  .attr("stroke-width", 0.8)
  .style("opacity", 0)
  .on("mouseover", function() { d3.select(this).raise(); })
  .on("mousemove", (event, d) => {
      const distName = d.properties.district || d.properties.Dist_Name || "Unknown";
      const [x, y] = d3.pointer(event, container);
      setTooltip({ content: `<strong>${distName}</strong>`, position: { x, y } });
  })
  .on("mouseout", () => setTooltip({ content: null, position: { x: 0, y: 0 } }))
  .on("click", (event, d) => {
    const districtName = d.properties.district || d.properties.Dist_Name;
    setInfoCardData({ 
        districtName, 
        stateName: currentStateName,
        info: districtInfo[currentStateName]?.[districtName] 
    });
  })
  .transition().duration(500).delay((d, i) => i * 3).style("opacity", 0.9);
        
        dd3.select("#district-labels").selectAll(".district-label")
  .data(districtFeatures, d => d.properties.district || d.properties.Dist_Name)
  .join("text")
  .attr("class", "district-label")
  .attr("transform", d => `translate(${path.centroid(d)})`)
  .attr("dy", "0.35em")
  .attr("text-anchor", "middle")
  .attr("fill", "white") // white text
  .attr("font-size", "8px")
  .style("opacity", 0)
  .text(d => d.properties.district || d.properties.Dist_Name)
  .transition().duration(500).delay(200).style("opacity", 1);
      });
  }, [activeState]);
  
  // Effect for Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
        if(event.key === "Escape") {
            if(infoCardData) {
                setInfoCardData(null);
            } else if (activeState) {
                resetToIndiaView();
            }
        }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeState, infoCardData, resetToIndiaView]);
  
  if (loading) {
    return <div>Loading Map Data...</div>;
  }

  return (
   <main className="w-screen h-screen relative bg-black text-white flex flex-col items-center overflow-hidden">
      <h1 id="map-title" className="text-2xl font-bold my-4 animate-bounce">
       This section is under development. Stay tuned for upcoming features!
      </h1>

      <button onClick={() => navigate("/")} className='px-4 py-2 absolute top-3 left-5 bg-gray-700 hover:bg-gray-600 text-white rounded-2xl shadow-xl flex justify-center items-center gap-x-3'>
      <FaArrowLeft />  Back To Home
      </button>

      <div
        id="map-container"
        ref={mapContainerRef}
        className="relative w-[80%] h-[90%] border border-gray-700 rounded-lg"
      >
        {activeState && (
          <button
            id="back-button"
            onClick={resetToIndiaView}
            className="absolute top-3 left-3 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow"
          >
            ← Back to India Map
          </button>
        )}

        <svg id="india-map" ref={svgRef} className="w-full h-full" />
        <MapTooltip content={tooltip.content} position={tooltip.position} />
      </div>

      <InfoCard data={infoCardData} onClose={() => setInfoCardData(null)} />
    </main>
  );
}

export default Map