import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { projects } from "./data";
import { redirect } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export const generateStaticParams = async () => {
  return ["pos", "marigold", "digirent", "goodtime"].map((slug) => ({ slug }));
};

const Project = async ({ params }: Props) => {
  const project = projects.find((project) => project.slug === params.slug);

  if (!project) {
    return redirect("/");
  }

  return (
    <section className="pb-32 md:pb-40 lg:pb-52">
      <Link
        href="/"
        className="absolute left-4 top-4 flex gap-x-2 rounded-button p-2 text-sm text-t-primary transition-all font-heading font-bold duration-300 hover:bg-neutral-100 hover:text-t-primary md:left-8 md:top-10 md:px-4 md:py-3 md:text-base"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 md:h-6 md:w-6"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.88702 17.637C7.56972 17.9543 7.05528 17.9543 6.73798 17.637L2.67548 13.5745C2.35817 13.2572 2.35817 12.7428 2.67548 12.4255L6.73798 8.36298C7.05528 8.04567 7.56972 8.04567 7.88702 8.36298C8.20433 8.68028 8.20433 9.19472 7.88702 9.51202L5.21155 12.1875L22.75 12.1875C23.1987 12.1875 23.5625 12.5513 23.5625 13C23.5625 13.4487 23.1987 13.8125 22.75 13.8125L5.21155 13.8125L7.88702 16.488C8.20433 16.8053 8.20433 17.3197 7.88702 17.637Z"
            fill="currentColor"
          />
        </svg>
        Home
      </Link>
      <div className="px-default mx-auto py-16 md:pb-24 md:pt-28 lg:pb-28 lg:pt-32">
        <h1 className="text-center text-h1 font-bold text-t-primary">
          {project.title}
        </h1>

        <div className="mx-auto mt-12 grid max-w-post-content gap-4 gap-y-6 md:mt-16 md:grid-cols-3 lg:mt-20">
          <div>
            <span className="mb-3 block text-sm text-accent">Timeline</span>
            <span className="font-heading text-lg font-bold text-t-primary sm:text-xl lg:text-2xl">
              {project.timeline}
            </span>
          </div>
          <div>
            <span className="mb-3 block text-sm text-accent">Team</span>
            <div className="flex -space-x-1.5">
              {project.team.map((teammate, index) => (
                <TooltipProvider key={teammate.name} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        src={teammate.photoSrc}
                        alt={`photo of ${teammate.name}`}
                        width={100}
                        height={100}
                        className="z-[1] block h-8 w-8 rounded-full bg-neutral-200 outline outline-2 outline-white transition-transform duration-150 hover:-translate-y-1"
                      />
                    </TooltipTrigger>
                    <TooltipContent>{teammate.name}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
          <div>
            <span className="mb-3 block text-sm text-accent">Role</span>
            <span className="font-heading text-lg font-bold text-t-primary sm:text-xl lg:text-2xl">
              {project.role}
            </span>
          </div>
        </div>
      </div>

      {project.photos?.[0] && (
        <Image
          src={project.photos[0].photoSrc}
          width={1440}
          height={930}
          alt={project.photos[0].alt}
          className="w-full"
          quality={100}
          priority
        />
      )}

      {project.contents.length && (
        <div className="px-default mx-auto mt-16 max-w-post-content space-y-20 text-t-primary md:mt-20">
          {project.contents.map((content) =>
            content.isFullWidth ? (
              <div key={content.title}>
                <h2 className="mb-6 text-h5 font-bold">{content.title}</h2>
                <p className="whitespace-pre-line text-base leading-relaxed sm:text-body-large">
                  {content.content.trim()}
                </p>
              </div>
            ) : (
              <div key={content.title} className="grid sm:grid-cols-12">
                <h2 className="col-span-5 mb-6 text-h5 font-bold leading-none text-t-primary sm:mb-0">
                  {content.title}
                </h2>
                <ul className="col-span-7 list-disc pl-5 text-body-large sm:pl-0">
                  {typeof content.content !== "string"
                    ? content.content.map((item) => <li key={item}>{item}</li>)
                    : null}
                </ul>
              </div>
            ),
          )}
        </div>
      )}

      <div className="px-default mx-auto mt-24 grid max-w-post-images grid-cols-12 gap-8 md:gap-12">
        {project.photos.slice(1).map((photo) => (
          <Image
            key={photo.alt}
            src={photo.photoSrc}
            width={1440}
            height={930}
            alt={photo.alt}
            className={cn(
              "col-span-12 h-full w-full rounded-card object-cover",
              photo.className,
            )}
          />
        ))}
      </div>

      <div className="px-default mt-48">
        <h2 className="text-center text-h3 font-bold text-t-primary">
          Discover More
        </h2>

        <div className="mx-auto mt-12 grid max-w-post-images grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects
            .filter((project) => project.slug !== params.slug)
            .slice(0, 3)
            .map((project) => (
              <div
                key={project.slug}
                className="relative overflow-hidden rounded-card shadow-xl shadow-neutral-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-neutral-200"
              >
                <Link
                  href={`/${project.slug}`}
                  className="absolute left-0 top-0 h-full w-full"
                ></Link>

                <Image
                  src={project.thumbnail}
                  alt={`thumbnail of ${project.title}`}
                  width={1000}
                  height={551}
                  className="aspect-[1000/551] w-full"
                />

                <div className="bg-white p-6 md:p-8">
                  <h4 className="font-body text-base uppercase tracking-widest text-t-secondary">
                    {project.company}
                  </h4>
                  <h3 className="text-h5 font-bold leading-tight text-t-primary md:text-h6">
                    {project.title}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Project;
