import { valuesItem } from "@/constants";

const ValuesSection = () => {
  return (
    <section className="grid grid-cols-2 gap-5 pt-6 pb-6 lg:grid-rows-1 lg:grid-cols-4">
      {valuesItem.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 px-8 py-12 transition-all duration-200 select-none bg-secondary-gray hover:bg-gray-300 hover:-translate-y-2"
        >
          <div>{item.icon("text-5xl  lg:text-6xl")}</div>
          <span className="text-sm font-medium md:text-base xl:text-2xl">
            {item.title}
          </span>
          <span className="text-sm font-light text-gray-400 md:text-base">
            {item.subTitle}
          </span>
        </div>
      ))}
    </section>
  );
};

export default ValuesSection;
