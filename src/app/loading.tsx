export interface ILoadingProps {}
export default function Loading({}: ILoadingProps) {
  return (
    <div>
      <h1 className="font-bold text-center text-rose-500 text-3xl">
        The page is loading...
      </h1>
    </div>
  );
}
