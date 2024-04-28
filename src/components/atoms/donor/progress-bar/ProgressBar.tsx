const ProgressBar = ({ progress }: { progress: number }) => {
  const progressBarStyle = {
    width: `${progress}%`,
    height: "13.157px",
    backgroundColor: "#9A793D", // Progress color
    borderRadius: "5px",
    transition: "width 0.3s ease-in-out"
  };

  const containerStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    overflow: "hidden",
    backgroundColor: "#EFE8D8" // Background color of the bar
  };

  return (
    <div className="w-full">
      <div style={containerStyle}>
        <div style={progressBarStyle}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
