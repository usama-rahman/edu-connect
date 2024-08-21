import Image from "next/image";

export default function ThumbnailImage({ enrollment }) {
  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden">
      <Image
        src={`/assets/images/courses/${enrollment?.course?.thumbnail}`}
        alt={enrollment?.course?.title}
        className="object-cover"
        fill
      />
    </div>
  );
}
