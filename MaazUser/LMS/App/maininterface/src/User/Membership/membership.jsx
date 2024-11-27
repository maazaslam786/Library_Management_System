import "./membership.css";

function Membership() {
  return (
    <>
      <header>{/* Header content */}</header>
      <main className="membership-container">
        <h1>Purchase Membership</h1>
        <div className="cards">
          {/* Silver Card */}
          <div className="card silver">
            <img src="../assets/silver.png" alt="Silver Membership" />
            <h2>Silver Membership</h2>
            <button className="pay-button">Pay</button>
          </div>

          {/* Gold Card */}
          <div className="card gold">
            <img src="../assets/gold.png" alt="Gold Membership" />
            <h2>Gold Membership</h2>
            <button className="pay-button">Pay</button>
          </div>

          {/* Platinum Card */}
          <div className="card platinum">
            <img src="../assets/platinum.png" alt="Platinum Membership" />
            <h2>Platinum Membership</h2>
            <button className="pay-button">Pay</button>
          </div>
        </div>
      </main>
      <footer>{/* Footer content */}</footer>
    </>
  );
}

export default Membership;
