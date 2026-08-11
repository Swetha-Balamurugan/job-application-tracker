import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  FaBriefcase,
  FaUserTie,
  FaTimesCircle,
  FaGift,
  FaEdit,
  FaTrash,
} from "react-icons/fa";



function KanbanBoard({ jobs, setJobs, editJob, deleteJob }) {
  const columns = [
    {
      id: "Applied",
      title: "Applied",
      icon: <FaBriefcase />,
      color: "primary",
    },
    {
      id: "Interview",
      title: "Interview",
      icon: <FaUserTie />,
      color: "warning",
    },
    {
      id: "Rejected",
      title: "Rejected",
      icon: <FaTimesCircle />,
      color: "danger",
    },
    {
      id: "Offer",
      title: "Offer",
      icon: <FaGift />,
      color: "success",
    },
  ];

  function handleDragEnd(result) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedJobs = jobs.map((job) => {
      if (job.id === draggableId) {
        return {
          ...job,
          status: destination.droppableId,
        };
      }

      return job;
    });

    setJobs(updatedJobs);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="row g-3">
        {columns.map((column) => {
          const columnJobs = jobs.filter(
            (job) => job.status === column.id
          );

          return (
            <div
              className="col-12 col-md-6 col-lg-3"
              key={column.id}
            >
              <div className="card shadow-sm h-100">

              
                <div
                  className={`card-header text-center fw-bold text-${column.color}`}
                >
                  <span className="me-2">
                    {column.icon}
                  </span>

                  {column.title}

                  <span className="badge bg-secondary ms-2">
                    {columnJobs.length}
                  </span>
                </div>

               
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={
                        snapshot.isDraggingOver
                          ? "bg-light p-2"
                          : "p-2"
                      }
                      style={{
                        minHeight: "220px",
                      }}
                    >

                      {columnJobs.length === 0 ? (
                        <p className="text-center text-muted small mt-3">
                          No jobs
                        </p>
                      ) : (
                        columnJobs.map((job, index) => (
                          <Draggable
                            key={job.id}
                            draggableId={job.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="card mb-2 shadow-sm"
                                style={{
                                  cursor: "grab",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <div className="card-body p-3">

                               
                                  <h6 className="fw-bold mb-2">
                                    {job.company}
                                  </h6>

                                 
                                  <small className="text-muted d-block mb-3">
                                    Applied on:{" "}
                                    {job.date || "Today"}
                                  </small>

                                 
                                  <div className="d-flex justify-content-end gap-2">

                                    <button
                                      type="button"
                                      className="btn btn-warning btn-sm"
                                      title="Edit Job"
                                      onClick={() =>
                                        editJob(
                                          jobs.findIndex(
                                            (item) =>
                                              item.id === job.id
                                          )
                                        )
                                      }
                                    >
                                      <FaEdit />
                                    </button>

                                    <button
                                      type="button"
                                      className="btn btn-danger btn-sm"
                                      title="Delete Job"
                                      onClick={() =>
                                        deleteJob(
                                          jobs.findIndex(
                                            (item) =>
                                              item.id === job.id
                                          )
                                        )
                                      }
                                    >
                                      <FaTrash />
                                    </button>

                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
