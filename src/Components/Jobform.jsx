import { FaPlus } from "react-icons/fa";

function JobForm({
  jobTitle,
  setJobTitle,
  status,
  setStatus,
  addJob,
  isEditing,
}) {
  return (
    <>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter Company Name"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />

      <select
        className="form-select mb-3"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </select>

      <div className="text-center mb-3">
        <button
          className="btn btn-primary"
          onClick={addJob}
          disabled={jobTitle.trim() === ""}
        >
          <FaPlus className="me-2" />
          {isEditing ? "Update Job" : "Add Job"}
        </button>
      </div>
    </>
  );
}

export default JobForm;