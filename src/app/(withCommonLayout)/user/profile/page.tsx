export interface IProfileProps {}
export default function Profile({}: IProfileProps) {
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
        This is Profile component
      </h1>
    </div>
  );
}
