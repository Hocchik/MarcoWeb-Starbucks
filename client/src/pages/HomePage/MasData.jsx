import Accordion from "./Accordion"
import Imagenes from "../../imgs/Imagenes.js";
import StarbucksAppSection from "./StarbucksAppSection.jsx";

function MasData() {
  return (
    <>
    <div className="py-10 bg-[#006241] my-8">
        <div className="px-20 grid grid-cols-2">
            <Accordion/>
            <img src={Imagenes.img3} alt="pensando.png" className="mt-12 ml-5" />
        </div>
    </div>

    <div>
        <StarbucksAppSection/>
    </div>
    </>
  )
}

export default MasData