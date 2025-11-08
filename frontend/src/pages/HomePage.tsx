import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          LuwiEditor-AI
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl">
          Open-source AI-powered video editor with advanced features and no watermark
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/editor"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Start Editing
          </Link>
          <Link
            to="/projects"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            My Projects
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl">
          <FeatureCard title="4K Upscaling" description="AI-powered video enhancement" />
          <FeatureCard title="Music Gen" description="Copyright-free music" />
          <FeatureCard title="Smart Cuts" description="Viral shorts creator" />
          <FeatureCard title="AI Effects" description="Visual & audio effects" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
