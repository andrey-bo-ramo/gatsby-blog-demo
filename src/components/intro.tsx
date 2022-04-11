import React from "react";

interface IIntroProps {
  title: string;
}

export default function Intro(props: IIntroProps) {
  const { title } = props;
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-4 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}.
      </h1>
    </section>
  );
}
