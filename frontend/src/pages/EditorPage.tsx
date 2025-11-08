import { useParams } from 'react-router-dom';

export default function EditorPage() {
  const { projectId } = useParams();

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">LuwiEditor-AI</h1>
          <span className="text-sm text-gray-400">
            {projectId ? `Project: ${projectId}` : 'New Project'}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Export</button>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 bg-gray-800 p-4">
          <h2 className="text-lg font-semibold mb-4">Tools</h2>
          <div className="space-y-2">
            <ToolButton label="Cut" />
            <ToolButton label="Masks" />
            <ToolButton label="Keyframes" />
            <ToolButton label="AI Effects" />
            <ToolButton label="Transitions" />
          </div>
        </aside>

        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="text-gray-500">Preview Area</div>
          </div>

          <div className="h-64 bg-gray-800 p-4">
            <div className="bg-gray-700 rounded p-4 h-full">
              <div className="text-sm text-gray-400">Timeline</div>
            </div>
          </div>
        </main>

        <aside className="w-80 bg-gray-800 p-4">
          <h2 className="text-lg font-semibold mb-4">AI Assistant</h2>
          <div className="bg-gray-700 rounded p-4 h-full">
            <div className="text-sm text-gray-400">Chat with AI to generate effects...</div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ToolButton({ label }: { label: string }) {
  return (
    <button className="w-full px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 text-left">
      {label}
    </button>
  );
}
