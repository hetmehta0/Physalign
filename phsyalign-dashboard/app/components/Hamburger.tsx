// app/components/Hamburger.tsx
export default function Hamburger() {
  return (
    <div className="hamburger">

      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>

      <style jsx>{`
        .hamburger {
          width: 2rem;
          height: 2rem;
          display: flex;
          justify-content: center;
          flex-flow: column nowrap;
          cursor: pointer;
          z-index: 10;
        }
        .bar {
          width: 2rem;
          height: 0.25rem;
          background-color: #333;
          margin: 0.2rem 0;
          border-radius: 10px;
          transition: all 0.3s linear;
        }
        .hamburger:hover .bar {
          background-color: #0066cc;
        }
      `}</style>
    </div>
  );
}