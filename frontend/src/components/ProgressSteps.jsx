// eslint-disable-next-line react/prop-types
const ProgressSteps = ({ step1, step2, step3 }) => {
  return (
<div className="flex justify-center items-center space-x-4 bg-[#FEF4EB] p-4 rounded-lg shadow-md">
  <div className={`${step1 ? "text-[#94C6C4]" : "text-[#565853]"}`}>
    <span className="ml-2 text-sm font-medium">Đăng Nhập</span>
    <div className="mt-2 text-lg text-center">{step1 ? "✅" : "⏳"}</div>
  </div>

  {step2 && (
    <>
      {step1 && <div className="h-0.5 w-[10rem] bg-[#94C6C4]"></div>}
      <div className={`${step1 ? "text-[#94C6C4]" : "text-[#565853]"}`}>
        <span className="text-sm font-medium">Địa Chỉ</span>
        <div className="mt-2 text-lg text-center">{step2 ? "✅" : "⏳"}</div>
      </div>
    </>
  )}

  <>
    {step1 && step2 && step3 ? (
      <div className="h-0.5 w-[10rem] bg-[#94C6C4]"></div>
    ) : (
      ""
    )}

    <div className={`${step3 ? "text-[#94C6C4]" : "text-[#565853]"}`}>
      <span
        className={`${!step3 ? "ml-[10rem]" : ""} text-sm font-medium`}
      >
        Hóa Đơn
      </span>
      {step1 && step2 && step3 ? (
        <div className="mt-2 text-lg text-center">✅</div>
      ) : (
        ""
      )}
    </div>
  </>
</div>

  );
};

export default ProgressSteps;
