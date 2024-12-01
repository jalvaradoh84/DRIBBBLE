import React from "react";
import Categories from "@/components/Categories/Categories";
import LoadMore from "@/components/LoadMore/LoadMore";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

export default async function Home({searchParams}){
  const { category, endCursor } = searchParams;
  const data = await fetchAllProjects(category, endCursor);
  const projectsToDisplay = data?.projectSearch?.edges || [];

  
  const {
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor: endCursorDB,
  } = data?.projectSearch?.pageInfo || {};

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings min-h-[600px]">
        <Categories />
        <p className="no-result-text text-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }
  return (
    <main className="flex flex-col mb-16 p-4">
      <Categories />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-12 pt-4 md:pt-8">
        {projectsToDisplay.map(({ node }) => (
          <ProjectCard key={node?.id} project={{
            id: node?.id,
            title: node?.title,
            description: node?.description,
            creator: {
              name: node?.createdBy?.name,
              avatar: node?.createdBy?.avatarUrl,
            },
            image: node?.image,
          }} 
          />
        ))}
      </section>

      <LoadMore
        startCursor={startCursor}
        endCursor={endCursorDB}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
      />
    </main>
  );
}