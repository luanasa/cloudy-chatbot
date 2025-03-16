import { Heart, Info, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BotAvatar from './BotAvatar';
import { useTheme } from './ThemeProvider';
import { Toggle } from './ui/toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'; 

const ChatHeader = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 bg-background rounded-t-xl shadow-sm border-b border-border">
      <div className="flex items-center gap-3">
        <BotAvatar />
        <div>
          <h2 className="font-semibold text-foreground">Cloudy</h2>
          <p className="text-xs text-muted-foreground">Sempre ON pra você</p>
        </div>
      </div>

      <div className="flex gap-2">
        <Toggle
          pressed={theme === 'dark'}
          onPressedChange={toggleTheme}
          className="text-muted-foreground hover:text-foreground hover:bg-accent/20"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Toggle>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-cute-primary hover:text-foreground hover:bg-accent/20"
              >
                <Info className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] p-4 bg-background border border-border shadow-lg">
              <h3 className="font-semibold mb-2">Como o Cloudy funciona:</h3>
              <p className="text-sm">
                Você digita um problema específico (ex.: "Como configurar a integração do AC e PONTO?").
              </p>
              <p className="text-sm mt-2">
                O Cloudy usa IA para entender o contexto e exibe os links mais relevantes de tutoriais, documentações ou artigos (ex.: links da documentação oficial, tutoriais do time, etc.).
              </p>
              <p className="text-sm mt-2">
                Ele também pode sugerir múltiplos links, organizados por relevância ou fonte confiável.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ChatHeader;