export interface IDashboardProps {}
export default function Dashboard({}: IDashboardProps) {
  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          textAlign: "center",
          color: "#f43f5e",
          fontSize: "1.875rem",
        }}
      >
        This is Dashboard component
      </h1>
    </div>
  );
}
