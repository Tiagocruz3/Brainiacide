import React from 'react';

const EXAMPLE_PROMPTS = [
  { text: 'Create a mobile app with Brainiac IDE' },
  { text: 'Build a todo app in React using Tailwind' },
  { text: 'Build a simple blog using Astro' },
  { text: 'Create a cookie consent form using Material UI' },
  { text: 'Make a space invaders game' },
  { text: 'Make a Tic Tac Toe game in html, css and js only' },
];

export function ExamplePrompts(sendMessage?: { (event: React.UIEvent, messageInput?: string): void | undefined }) {
  return (
    <div id="examples" className="relative flex flex-col gap-9 w-full max-w-3xl mx-auto flex justify-center mt-6">
      <div
        className="flex flex-wrap justify-center gap-2"
        style={{
          animation: '.25s ease-out 0s 1 _fade-and-move-in_g2ptj_1 forwards',
        }}
      >
        {EXAMPLE_PROMPTS.map((examplePrompt, index: number) => {
          return (
            <button
              key={index}
              onClick={(event) => {
                sendMessage?.(event, examplePrompt.text);
              }}
              className="border border-cyan-500/30 rounded-full bg-gray-900/50 hover:bg-cyan-500/10 text-cyan-400/70 hover:text-cyan-300 px-3 py-1 text-xs transition-all hover:border-cyan-500/50 hover:shadow-[0_0_10px_rgba(0,212,255,0.15)] font-['Rajdhani'] tracking-wide"
            >
              {examplePrompt.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
