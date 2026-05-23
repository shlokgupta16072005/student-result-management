import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div>

      <Navbar />

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;