import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import lunr from 'lunr';
import tutorials from '../tutorials.json'; // Importe o JSON diretamente

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
  buttons?: { label: string; value: string }[]; // Botões de feedback
}

interface Tutorial {
  title: string;
  description: string;
  link: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Olá! Eu sou o Cloudy, seu assistente virtual. 🌟\nEstou aqui para ajudar você a encontrar tutoriais e documentações.\n\n👉 Como posso ajudar hoje?",
    isBot: true,
    timestamp: formatTime(new Date())
  }
];

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const idx = lunr(function () {
  this.ref('link');
  this.field('title');
  this.field('description');

  tutorials.forEach((tutorial) => {
    this.add(tutorial);
  });
});



const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [isCollectingDetails, setIsCollectingDetails] = useState(false); // Estado para coletar detalhes
  const [tutorialTitle, setTutorialTitle] = useState(''); // Título do tutorial
  const [tutorialContent, setTutorialContent] = useState(''); // Conteúdo do tutorial
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // Se estiver coletando detalhes, processe as respostas
    if (isCollectingDetails) {
      if (!tutorialTitle) {
        setTutorialTitle(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "O que deve ser abordado no tutorial?",
          isBot: true,
          timestamp: formatTime(new Date())
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        return;
      } else if (!tutorialContent) {
        setTutorialContent(text);
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Obrigado pelos detalhes! Vou enviar sua solicitação para a equipe de conteúdo. 🚀",
          isBot: true,
          timestamp: formatTime(new Date())
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);

        // Envia o e-mail com os detalhes
        sendEmailToResponsible(tutorialTitle, tutorialContent);

        // Reseta o estado de coleta de detalhes
        setIsCollectingDetails(false);
        setTutorialTitle('');
        setTutorialContent('');
        return;
      }
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: formatTime(new Date())
    };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Show bot is typing
    setIsTyping(true);

    try {
      // Busca os tutoriais relevantes
      const results = idx.search(text);
      const relevantTutorials = results.map(result => {
        return tutorials.find(tutorial => tutorial.link === result.ref);
      });

      if (relevantTutorials.length > 0) {
        // Formata a resposta com os links
        let botResponse = "Aqui estão alguns tutoriais que podem ajudar:\n\n";
        relevantTutorials.forEach((tutorial, index) => {
          if (tutorial) {
            botResponse += `${index + 1}. [${tutorial.title}](${tutorial.link})\n`;
          }
        });

        // Add bot response to messages
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isBot: true,
          timestamp: formatTime(new Date()),
          buttons: [
            { label: 'Sim', value: 'sim' },
            { label: 'Não', value: 'nao' }
          ]
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      } else {
        // Se não encontrar tutoriais
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Desculpe, não encontrei um tutorial para isso. Você gostaria de solicitar a criação de um novo tutorial?",
          isBot: true,
          timestamp: formatTime(new Date()),
          buttons: [
            { label: 'Sim', value: 'solicitar' },
            { label: 'Não', value: 'nao_obrigado' }
          ]
          
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }
    } catch (error) {
      console.error("Erro ao buscar tutoriais:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao buscar tutoriais. Tente novamente mais tarde.",
        isBot: true,
        timestamp: formatTime(new Date())
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleButtonClick = (value: string) => {
  
    if (value === 'sim') {
      // Resposta engraçada e fofa
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Que maravilha! Fico feliz em ajudar. 🥳\nSe precisar de mais alguma coisa, estou por aqui!",
        isBot: true,
        timestamp: formatTime(new Date())
      };
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, botMessage];
        console.log("Novas mensagens (Sim):", newMessages); // Log para depuração
        return newMessages;
      });
    } else if (value === 'nao_obrigado') { 
      // Mensagem de encerramento
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Tudo bem! Se precisar de ajuda no futuro, estou por aqui. 😊\nO chat será encerrado agora. Até logo!",
        isBot: true,
        timestamp: formatTime(new Date())
      };
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, botMessage];
        return newMessages;
      });
  
      // Opcional: Encerrar o chat após um pequeno delay
      setTimeout(() => {
        console.log("Chat encerrado."); // Log para depuração
      }, 3000); // Encerra após 3 segundos
    } else if (value === 'solicitar') {
      // Inicia a coleta de detalhes
      setIsCollectingDetails(true);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Claro! Qual é o título do tutorial?",
        isBot: true,
        timestamp: formatTime(new Date())
      };
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, botMessage];
        console.log("Novas mensagens (Solicitar):", newMessages); // Log para depuração
        return newMessages;
      });
    }
  };
  

  const sendEmailToResponsible = (title: string, content: string) => {
    // Simula o envio de um e-mail (substituir por uma chamada real à API de e-mail)
    const emailBody = `
      Título do Tutorial: ${title}
      Conteúdo a ser abordado: ${content}
    `;
    console.log("E-mail enviado para luanamartins@fortestecnologia.com.br");
    console.log("Assunto: Solicitação de Novo Tutorial");
    console.log("Corpo do e-mail:", emailBody);
  };

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto rounded-xl shadow-lg overflow-hidden border border-cute-secondary/30">
      <ChatHeader />
      
      <div className="flex-1 p-4 overflow-y-auto bg-cute-background">
        {messages.map((message) => (
          <ChatBubble
          key={message.id}
          message={message.text}
          isBot={message.isBot}
          timestamp={message.timestamp}
          buttons={message.buttons} // Passa os botões
          onButtonClick={handleButtonClick} // Passa a função de callback
        />
        ))}
        
        {isTyping && (
          <div className="flex items-center gap-2 text-cute-foreground ml-16 mb-4">
            <div className="w-2 h-2 bg-cute-primary rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-cute-primary rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-cute-primary rounded-full animate-pulse delay-150"></div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatInterface;