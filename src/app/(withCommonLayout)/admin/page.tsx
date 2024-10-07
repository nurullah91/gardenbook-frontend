export interface IAdminProps {}
export default function Admin({}: IAdminProps) {
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
        This is Admin component
      </h1>
    </div>
  );
}
