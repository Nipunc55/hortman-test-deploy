const ModalRow = ({ data }: { data: any }) => {
  const getDateValue = (dateInput: string) => {
    const inputDate = new Date(dateInput);

    const options: any = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    return inputDate.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {data?.length > 0 ? (
        <>
          {data?.map((item: any) => (
            <>
              {item?.notification_type === "Eligibility Acceptance" ? (
                <a
                  href="/donor/eligible-screen"
                  key={item?._id}
                  className="flex flex-col gap-2.5 border-b border-secondary px-4 pt-2.5 pb-4 outline-none"
                >
                  <div className="text-[#A7A7A7] text-xs font-semibold">
                    {getDateValue(item?.updated_at)}
                  </div>
                  <div className="text-xsxl font-normal text-black-500">
                    {item?.body}
                  </div>
                </a>
              ) : (
                <div
                  key={item?._id}
                  className="flex flex-col gap-2.5 border-b border-secondary px-4 pt-2.5 pb-4"
                >
                  <div className="text-[#A7A7A7] text-xs font-normal">
                    {getDateValue(item?.updated_at)}
                  </div>
                  <div className="text-xsxl font-normal text-black-500">
                    {item?.body}
                  </div>
                </div>
              )}
            </>
          ))}
        </>
      ) : (
        <>
          <div className="w-full my-10 h-20 flex flex-col ">
            <p className="absolute text-center mx-auto italic right-0 left-0 w-full">
              There are no data to be displayed
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalRow;
