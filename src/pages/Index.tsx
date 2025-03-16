import ChatInterface from '@/components/ChatInterface';
import { useTheme } from '@/components/ThemeProvider';

const Index = () => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-b from-purple-50 to-pink-50' : 'bg-gradient-to-b from-gray-900 to-purple-950'} py-12 px-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Cloudy ☁️</h1>
          <p className="text-muted-foreground">Soluções na nuvem, tutoriais na tela!</p>
        </div>
        
        <ChatInterface />
        
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Cloudy The Chat by <span className="text-purple-400">Luana Sá</span></p>
        </div>
      </div>
    </div>
  );
};

export default Index;
