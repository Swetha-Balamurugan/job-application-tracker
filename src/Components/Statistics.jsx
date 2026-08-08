function Statistics({
  totalJobs,
  appliedJobs,
  interviewJobs,
  rejectedJobs,
  offerJobs,
}) {
  return (
    <div className="row text-center mb-4 px-4">

      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>{totalJobs}</h5>
            <small>Total</small>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>{appliedJobs}</h5>
            <small>Applied</small>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>{interviewJobs}</h5>
            <small>Interview</small>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>{rejectedJobs}</h5>
            <small>Rejected</small>
          </div>
        </div>
      </div>

      <div className="col">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5>{offerJobs}</h5>
            <small>Offer</small>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Statistics;