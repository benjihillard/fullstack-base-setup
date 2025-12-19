function About() {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-6">About</h1>
      <div className="prose">
        <p className="text-gray-600 mb-4">
          This is a fullstack starter template with:
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>
            <strong>Frontend:</strong>
            {' '}
            React, TypeScript, Vite, TailwindCSS, React Router, React Query
          </li>
          <li>
            <strong>Backend:</strong>
            {' '}
            Node.js, Express, TypeScript
          </li>
          <li>
            <strong>Database:</strong>
            {' '}
            PostgreSQL
          </li>
          <li>
            <strong>Testing:</strong>
            {' '}
            Vitest
          </li>
          <li>
            <strong>DevOps:</strong>
            {' '}
            Docker, Docker Compose
          </li>
        </ul>
      </div>
    </div>
  );
}

export default About;
