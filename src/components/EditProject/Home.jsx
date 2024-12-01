import React, { useState, useEffect } from 'react';
import Categories from './components/Categories/Categories';
import LoadMore from './components/LoadMore/LoadMore';
import ProjectCard from './components/ProjectCard/ProjectCard';
import { fetchAllProjects } from './firebaseActions';  // Las acciones que crearemos más adelante

const Home = ({ searchParams }) => {
  const { category, endCursor } = searchParams;
  const [projects, setProjects] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetchAllProjects(category, endCursor);
      setProjects(data?.projectSearch?.edges || []);
      setPageInfo(data?.projectSearch?.pageInfo || {});
    };

    fetchProjects();
  }, [category, endCursor]);

  const { hasNextPage, hasPreviousPage, startCursor, endCursor: endCursorDB } = pageInfo;

  if (projects.length === 0) {
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
    <main className="flex-start flex-col paddings mb-16">
      <Categories />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 md:gap-12 pt-4 md:pt-8">
        {projects.map(({ node }) => (
          <ProjectCard
            key={node?.id}
            id={node?.id}
            title={node?.title}
            description={node?.description}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
            image={node?.image}
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
};

export default Home;
