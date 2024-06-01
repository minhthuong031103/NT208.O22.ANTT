import { ThongTinLayout } from "./(components)/ThongTinLayout";

async function page() {
  return (
    <div className="container mx-auto lg:px-[52px]">
      <div className="ml-4">
        <div className="container pt-[48px]">
          <div>
            <h1 className="text-[32px] text-neutral-700 font-semibold mt-4">
              Thông tin văn phòng
            </h1>
            <ThongTinLayout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
