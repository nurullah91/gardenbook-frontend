export interface ILoadingProps {}
export default function Loading({}: ILoadingProps) {
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
        The page is loading...
      </h1>
    </div>
  );
}
