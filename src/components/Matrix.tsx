interface MatrixProps {
  matrix: number[][];
  size: number;
}

const Matrix = ({ matrix, size }: MatrixProps) => {
    
    const styles = {
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        gap: "1px",
        border: "1px solid black",
        padding: "0",
        margin: "0",
        height: "300px",
      };

  return (
    <div style={styles}>
      {matrix.map((row, rowIndex) =>
        row.map((value, colIndex) => (
          <div key={`${rowIndex}_${colIndex}`} style={{ backgroundColor: value ? "black" : "white" }}>
            {value}
          </div>
        ))
      )}
    </div>
  );
};

export default Matrix;