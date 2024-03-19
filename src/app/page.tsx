export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-none">
      <div className="h-screen snap-start flex justify-center items-center bg-blue-500">第一屏</div>
      <div className="h-screen snap-start flex justify-center items-center bg-red-500">第二屏</div>
      <div className="h-screen snap-start flex justify-center items-center bg-green-500">第三屏</div>
    </div>
  )
}
