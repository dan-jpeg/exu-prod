import WorksComponent from "./WorksComponent.jsx";
import NewHome from "./NewHome.jsx";
import WorksNavBar from "@/components/WorksNavBar.jsx";
import NewHomeMobile from "@/NewHomeMobile.jsx"


const App = () => {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? <NewHomeMobile /> : <NewHome />;
};


export default App;