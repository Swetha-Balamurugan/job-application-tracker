import { FaEdit, FaTrash } from "react-icons/fa";

function JobList({
  jobs,
  editJob,
  deleteJob,
}) {
  return (
    <ul className="list-group">
      {jobs.map((job, index) => (
        <li
          key={index}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div>
            <h5 className="mb-2">{job.company}</h5>

            <span
              className={`badge ${
                job.status === "Applied"
                  ? "bg-primary"
                  : job.status === "Interview"
                  ? "bg-warning text-dark"
                  : job.status === "Rejected"
                  ? "bg-danger"
                  : "bg-success"
              }`}
            >
              {job.status}
            </span>

            <div className="mt-2">
              <small className="text-muted">
                Applied on: {job.date || "Today"}
              </small>
            </div>
          </div>

          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => editJob(index)}
            >
              <FaEdit />
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteJob(index)}
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default JobList;