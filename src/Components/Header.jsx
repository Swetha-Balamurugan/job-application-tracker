import { FaBriefcase } from "react-icons/fa";

function Header() {
  return (
    <h1 className="text-primary fw-bold text-center mb-4">
      <FaBriefcase className="me-2" />
      Job Application Tracker
    </h1>
  );
}

export default Header;