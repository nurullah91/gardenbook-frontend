export interface IManageContentProps {}
export default function ManageContent({}: IManageContentProps) {
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
        This is ManageContent component
      </h1>
    </div>
  );
}
