"use client";

interface ContentAreaProps {
  children: React.ReactNode;
}

const Content_Area: React.FC<ContentAreaProps> = ({ children }) => {
  return (
    <>
      <div className="flex h-12">{children}</div>
    </>
  );
};

export default Content_Area;
