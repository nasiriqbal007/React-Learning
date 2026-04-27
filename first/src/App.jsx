import Content from "./component/Content";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

function App() {
  return (
    <>
    <div className="parent-div">
        <div className="main-div">
        <Sidebar />

        <div className="child-div">
          <Header />
          <Content />
         
        </div>
        
      </div>
       <Footer />
    </div>
    </>
  );
}

export default App;
