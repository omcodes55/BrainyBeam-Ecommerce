const Card = ({ name, img, description, price }) => {
  return (
    <div className="card shadow-sm border-0 h-100 product-card">

      <img
        src={img}
        className="card-img-top p-3"
        style={{ height: "200px", objectFit: "contain" }}
      />

      <div className="card-body">

        <h6 className="fw-bold">{name}</h6>

        <p className="text-muted small">
          {description.slice(0, 60)}...
        </p>

        <h5 className="text-success fw-bold">
          ₹ {price}
        </h5>

        <button className="btn btn-dark w-100 mt-2">
          Add To Cart
        </button>

      </div>

    </div>
  );
};


export default Card;