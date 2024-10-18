export interface IAnalyticsProps {}
export default function Analytics({}: IAnalyticsProps) {
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
        This is Analytics component
      </h1>
    </div>
  );
}
