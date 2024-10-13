export interface IAdminProfileProps {}
export default function AdminProfile({}: IAdminProfileProps) {
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
        This is AdminProfile component
      </h1>
    </div>
  );
}
