import { Link } from 'react-router-dom';

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Projects</h1>
          <Link
            to="/editor"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            New Project
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCard
            title="Sample Project"
            description="A demo video project"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Link to="/editor/1" className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
        <div className="aspect-video bg-gray-200 flex items-center justify-center">
          <span className="text-gray-400">Thumbnail</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="mt-4 text-sm text-gray-500">Last edited: Today</div>
        </div>
      </div>
    </Link>
  );
}
